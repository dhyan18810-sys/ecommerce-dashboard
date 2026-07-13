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

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:5000/dashboard")
            .then((res) => {
                setDashboard(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const metrics = [
        {
            label: "Total Orders",
            value: dashboard.TOTAL_ORDERS,
            color: "#3B82F6",
            icon: "📦"
        },
        {
            label: "Total Revenue",
            value: `₹ ${dashboard.TOTAL_REVENUE.toLocaleString()}`,
            color: "#10B981",
            icon: "💰"
        },
        {
            label: "Customers",
            value: dashboard.TOTAL_CUSTOMERS,
            color: "#F59E0B",
            icon: "👥"
        },
        {
            label: "Products Sold",
            value: dashboard.TOTAL_PRODUCTS_SOLD.toLocaleString(),
            color: "#8B5CF6",
            icon: "🛍️"
        }
    ];

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Dashboard</h1>
                <p style={subtitleStyle}>Welcome back! Here's your business overview.</p>
            </div>

            {/* Metrics Grid */}
            <div style={metricsGridStyle}>
                {metrics.map((metric, index) => (
                    <div key={index} style={getMetricCardStyle(metric.color)}>
                        <div style={metricHeaderStyle}>
                            <span style={iconStyle}>{metric.icon}</span>
                            <span style={labelStyle}>{metric.label}</span>
                        </div>
                        <div style={valueStyle}>{metric.value}</div>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div style={chartContainerStyle}>
                <RevenueChart />
            </div>
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
    marginBottom: "40px"
};

const titleStyle = {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1F2937",
    margin: "0 0 8px 0",
    letterSpacing: "-0.5px"
};

const subtitleStyle = {
    fontSize: "14px",
    color: "#6B7280",
    margin: "0",
    fontWeight: "400"
};

const metricsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "40px"
};

const getMetricCardStyle = (color) => ({
    background: "#F9FAFB",
    padding: "24px",
    borderRadius: "12px",
    border: `1px solid #E5E7EB`,
    transition: "all 0.3s ease",
    cursor: "default",
    borderLeft: `4px solid ${color}`,
    "&:hover": {
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
    }
});

const metricHeaderStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px"
};

const iconStyle = {
    fontSize: "24px"
};

const labelStyle = {
    fontSize: "13px",
    fontWeight: "500",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
};

const valueStyle = {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1F2937"
};

const chartContainerStyle = {
    background: "#F9FAFB",
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid #E5E7EB"
};

export default Dashboard;