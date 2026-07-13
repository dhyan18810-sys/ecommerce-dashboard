import { useEffect, useState } from "react";
import axios from "axios";

function Analytics() {

    const [analytics, setAnalytics] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:5000/analytics")
            .then((res) => {
                setAnalytics(res.data);
            });

    }, []);

    return (

        <div style={{ padding: "20px" }}>

            <h1>Top Selling Products</h1>

            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>

                <thead>

                    <tr>

                        <th>Product</th>

                        <th>Units Sold</th>

                        <th>Revenue</th>

                    </tr>

                </thead>

                <tbody>

                    {analytics.map((item, index) => (

                        <tr key={index}>

                            <td>{item.PRODUCT_NAME}</td>

                            <td>{item.TOTAL_SOLD}</td>

                            <td>₹ {item.REVENUE}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Analytics;