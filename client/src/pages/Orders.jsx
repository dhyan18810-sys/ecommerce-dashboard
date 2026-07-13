import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        axios.get("http://localhost:5000/orders")
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    const filteredOrders = orders.filter((order) =>
        (order.PRODUCT_NAME || "").toLowerCase().includes(search.toLowerCase()) ||
        (order.EMAIL || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: "20px" }}>

            <h1>Orders</h1>

            <input
                type="text"
                placeholder="Search by Product or Email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "300px",
                    padding: "10px",
                    marginBottom: "20px"
                }}
            />

            <table
                border="1"
                cellPadding="10"
                style={{
                    borderCollapse: "collapse",
                    width: "100%"
                }}
            >
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Email</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>

                <tbody>

                    {filteredOrders.map((order) => (

                        <tr key={order.ORDER_ID}>

                            <td>{order.ORDER_ID}</td>

                            <td>{order.ORDER_DATE}</td>

                            <td>{order.EMAIL}</td>

                            <td>{order.PRODUCT_NAME}</td>

                            <td>{order.QUANTITY}</td>

                            <td>₹ {order.TOTAL_PRICE}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Orders;