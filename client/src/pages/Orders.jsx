import { useEffect, useState } from "react";
import { getOrders } from "../services/api";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOrders()
            .then((res) => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const filteredOrders = orders.filter((order) =>
        (order.PRODUCT_NAME || "").toLowerCase().includes(search.toLowerCase()) ||
        (order.EMAIL || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Orders</h1>
                <p style={subtitleStyle}>View and manage all customer orders</p>
            </div>

            <div style={searchContainerStyle}>
                <input
                    type="text"
                    placeholder="Search by product or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={searchInputStyle}
                />
                <p style={resultCountStyle}>{filteredOrders.length} orders found</p>
            </div>

            {loading ? (
                <div style={loadingStyle}>Loading orders...</div>
            ) : (
                <div style={tableWrapperStyle}>
                    <table style={tableStyle}>
                        <thead>
                            <tr style={tableHeaderRowStyle}>
                                <th style={tableHeaderCellStyle}>Order ID</th>
                                <th style={tableHeaderCellStyle}>Date</th>
                                <th style={tableHeaderCellStyle}>Email</th>
                                <th style={tableHeaderCellStyle}>Product</th>
                                <th style={tableHeaderCellStyle}>Quantity</th>
                                <th style={tableHeaderCellStyle}>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order, index) => (
                                    <tr key={order.ORDER_ID} style={getTableRowStyle(index)}>
                                        <td style={tableCellStyle}>{order.ORDER_ID}</td>
                                        <td style={tableCellStyle}>{order.ORDER_DATE}</td>
                                        <td style={tableCellStyle}>{order.EMAIL}</td>
                                        <td style={tableCellStyle}>{order.PRODUCT_NAME}</td>
                                        <td style={tableCellStyle}>{order.QUANTITY}</td>
                                        <td style={tableCellStyle}>₹ {order.TOTAL_PRICE}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={noDataStyle}>No orders found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

const containerStyle = {
    padding: "40px",
    background: "#FFFFFF",
    minHeight: "100vh",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
};

const headerStyle = {
    marginBottom: "30px"
};

const titleStyle = {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1F2937",
    margin: "0 0 8px 0"
};

const subtitleStyle = {
    fontSize: "14px",
    color: "#6B7280",
    margin: "0"
};

const searchContainerStyle = {
    marginBottom: "30px",
    display: "flex",
    alignItems: "center",
    gap: "20px"
};

const searchInputStyle = {
    padding: "10px 16px",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    fontSize: "14px",
    width: "300px",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s"
};

const resultCountStyle = {
    fontSize: "13px",
    color: "#6B7280",
    margin: "0"
};

const loadingStyle = {
    textAlign: "center",
    padding: "40px",
    color: "#9CA3AF"
};

const tableWrapperStyle = {
    background: "#F9FAFB",
    borderRadius: "12px",
    border: "1px solid #E5E7EB",
    overflow: "hidden"
};

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px"
};

const tableHeaderRowStyle = {
    background: "#F3F4F6",
    borderBottom: "1px solid #E5E7EB"
};

const tableHeaderCellStyle = {
    padding: "16px",
    textAlign: "left",
    fontWeight: "600",
    color: "#374151",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
};

const tableCellStyle = {
    padding: "14px 16px",
    color: "#374151"
};

const getTableRowStyle = (index) => ({
    borderBottom: "1px solid #E5E7EB",
    background: index % 2 === 0 ? "#FFFFFF" : "#F9FAFB",
    transition: "background-color 0.2s"
});

const noDataStyle = {
    textAlign: "center",
    padding: "40px 16px",
    color: "#9CA3AF"
};

export default Orders;