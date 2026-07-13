import { useEffect, useState } from "react";
import axios from "axios";
import RevenueChart from "../components/RevenueChart";

function Dashboard() {

    const [dashboard, setDashboard] = useState({
        TOTAL_ORDERS: 0,
        TOTAL_REVENUE: 0,
        TOTAL_CUSTOMERS: 0,
        TOTAL_PRODUCTS_SOLD: 0
    });

    useEffect(() => {

        axios
            .get("http://localhost:5000/dashboard")
            .then((res) => {
                setDashboard(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    return (
        <div
            style={{
                padding: "20px",
                background: "#f5f5f5",
                minHeight: "100vh"
            }}
        >
            <h1>Business Analytics Dashboard</h1>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    marginTop: "30px"
                }}
            >

                <div style={cardStyle}>
                    <h3>Total Orders</h3>
                    <h1>{dashboard.TOTAL_ORDERS}</h1>
                </div>

                <div style={cardStyle}>
                    <h3>Total Revenue</h3>
                    <h1>₹ {dashboard.TOTAL_REVENUE}</h1>
                </div>

                <div style={cardStyle}>
                    <h3>Total Customers</h3>
                    <h1>{dashboard.TOTAL_CUSTOMERS}</h1>
                </div>

                <div style={cardStyle}>
                    <h3>Products Sold</h3>
                    <h1>{dashboard.TOTAL_PRODUCTS_SOLD}</h1>
                </div>

            </div>

            {/* Revenue Chart */}

            <div style={{ marginTop: "40px" }}>
                <RevenueChart />
            </div>

        </div>
    );
}

const cardStyle = {

    width: "220px",

    background: "white",

    padding: "20px",

    borderRadius: "10px",

    boxShadow: "0px 0px 10px rgba(0,0,0,0.15)",

    textAlign: "center"

};

export default Dashboard;