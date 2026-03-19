import mysql.connector
import snowflake.connector
import time

# -------------------------------
# CONFIGURATION
# -------------------------------
MYSQL_CONFIG = {
    "host": "127.0.0.1",
    "user": "root",
    "password": "",
    "database": "analytic",
    "port": 3306
}

SNOWFLAKE_CONFIG = {
    "user": "DHYAN",
    "password": "Smit@8373738383",
    "account": "aiomyxw-dk93822",
    "warehouse": "COMPUTE_WH",
    "database": "ECOMMERCE_AI_DB",
    "schema": "RAW_DATA"
}

# -------------------------------
# STOCK STATUS
# -------------------------------
def get_stock_status(qty):
    if qty is None:
        return "Unknown"
    elif qty == 0:
        return "Out of Stock"
    elif qty <= 5:
        return "Low Stock"
    else:
        return "In Stock"

# -------------------------------
# SYNC ORDERS (FINAL FIXED)
# -------------------------------
def sync_orders():
    try:
        print("\n🔄 Syncing Orders...")

        mysql_conn = mysql.connector.connect(**MYSQL_CONFIG)
        mysql_cursor = mysql_conn.cursor(dictionary=True)

        sf_conn = snowflake.connector.connect(**SNOWFLAKE_CONFIG)
        sf_cursor = sf_conn.cursor()

        # Get last synced order
        sf_cursor.execute("SELECT COALESCE(MAX(ORDER_ID),0) FROM ORDERS4")
        last_id = sf_cursor.fetchone()[0]

        print(f"📌 Last Order ID: {last_id}")

        # Fetch new orders
        mysql_cursor.execute(f"""
        SELECT 
            o.id AS order_id,
            o.date_created_gmt AS order_date,
            COALESCE(a.email, 'no_email') AS email,
            COALESCE(a.phone, 'no_phone') AS phone,
            COALESCE(a.first_name, 'no_name') AS first_name,
            COALESCE(a.last_name, 'no_last') AS last_name,
            COALESCE(a.city, 'no_city') AS city,
            COALESCE(a.state, 'no_state') AS state,
            oi.order_item_name AS product_name,

            (SELECT meta_value 
             FROM wp_woocommerce_order_itemmeta 
             WHERE order_item_id = oi.order_item_id 
             AND meta_key = '_qty' 
             LIMIT 1) AS quantity,

            (SELECT meta_value 
             FROM wp_woocommerce_order_itemmeta 
             WHERE order_item_id = oi.order_item_id 
             AND meta_key = '_line_total' 
             LIMIT 1) AS price

        FROM wp_wc_orders o
        JOIN wp_woocommerce_order_items oi 
            ON o.id = oi.order_id
        LEFT JOIN wp_wc_order_addresses a 
            ON o.id = a.order_id 
            AND a.address_type = 'billing'

        WHERE oi.order_item_type = 'line_item'
        AND o.id > {last_id}
        """)

        orders = mysql_cursor.fetchall()
        print(f"📦 New Orders: {len(orders)}")

        for row in orders:

            qty = int(row["quantity"]) if row["quantity"] else 1
            line_total = float(row["price"]) if row["price"] else 0

            unit_price = line_total / qty if qty > 0 else 0
            total_price = qty * unit_price

            print(f"➡️ {row['product_name']} | Qty: {qty} | Total: {total_price}")

            # ✅ PREVENT DUPLICATE INSERT
            sf_cursor.execute("""
            MERGE INTO ORDERS4 t
            USING (SELECT %s AS ORDER_ID, %s AS PRODUCT_NAME) s
            ON t.ORDER_ID = s.ORDER_ID AND t.PRODUCT_NAME = s.PRODUCT_NAME

            WHEN NOT MATCHED THEN INSERT (
                ORDER_ID,
                ORDER_DATE,
                EMAIL,
                PHONE,
                FIRST_NAME,
                LAST_NAME,
                CITY,
                STATE,
                PRODUCT_NAME,
                QUANTITY,
                PRICE,
                TOTAL_PRICE
            )
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
            """, (
                row["order_id"],
                row["product_name"],

                row["order_id"],
                row["order_date"],
                row["email"],
                row["phone"],
                row["first_name"],
                row["last_name"],
                row["city"],
                row["state"],
                row["product_name"],
                qty,
                unit_price,
                total_price
            ))

        sf_conn.commit()
        print("✅ Orders Synced")

        mysql_cursor.close()
        mysql_conn.close()
        sf_cursor.close()
        sf_conn.close()

    except Exception as e:
        print("❌ ORDER ERROR:", e)

# -------------------------------
# SYNC PRODUCTS
# -------------------------------
def sync_products():
    try:
        print("\n📦 Syncing Products...")

        mysql_conn = mysql.connector.connect(**MYSQL_CONFIG)
        mysql_cursor = mysql_conn.cursor(dictionary=True)

        sf_conn = snowflake.connector.connect(**SNOWFLAKE_CONFIG)
        sf_cursor = sf_conn.cursor()

        mysql_cursor.execute("""
        SELECT 
            p.ID AS product_id,
            p.post_title AS product_name,
            MAX(CASE WHEN pm.meta_key = '_price' THEN pm.meta_value END) AS price,
            MAX(CASE WHEN pm.meta_key = '_stock' THEN pm.meta_value END) AS stock_qty
        FROM wp_posts p
        LEFT JOIN wp_postmeta pm ON p.ID = pm.post_id
        WHERE p.post_type = 'product'
        GROUP BY p.ID, p.post_title
        """)

        products = mysql_cursor.fetchall()

        for p in products:
            qty = int(p["stock_qty"]) if p["stock_qty"] else 0
            status = get_stock_status(qty)

            sf_cursor.execute("""
            MERGE INTO PRODUCTS2 t
            USING (SELECT %s AS PRODUCT_ID) s
            ON t.PRODUCT_ID = s.PRODUCT_ID
            WHEN MATCHED THEN UPDATE SET
                PRODUCT_NAME = %s,
                SALE_PRICE = %s,
                STOCK_QUANTITY = %s,
                STOCK_STATUS = %s
            WHEN NOT MATCHED THEN INSERT (
                PRODUCT_ID, PRODUCT_NAME, CATEGORY, SALE_PRICE, STOCK_QUANTITY, STOCK_STATUS
            )
            VALUES (%s, %s, 'General', %s, %s, %s)
            """, (
                p["product_id"],
                p["product_name"],
                float(p["price"]) if p["price"] else 0,
                qty,
                status,
                p["product_id"],
                p["product_name"],
                float(p["price"]) if p["price"] else 0,
                qty,
                status
            ))

        sf_conn.commit()
        print("✅ Products Synced")

        mysql_cursor.close()
        mysql_conn.close()
        sf_cursor.close()
        sf_conn.close()

    except Exception as e:
        print("❌ PRODUCT ERROR:", e)

# -------------------------------
# MAIN LOOP
# -------------------------------
if __name__ == "__main__":
    print("🚀 AUTO SYNC STARTED")

    try:
        while True:
            sync_orders()
            sync_products()
            time.sleep(10)

    except KeyboardInterrupt:
        print("\n🛑 Stopped")