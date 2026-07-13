import { useEffect, useState } from "react";
import axios from "axios";

function Analytics() {

    const [analytics, setAnalytics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/analytics")
            .then((res) => {
                setAnalytics(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const topProduct = analytics.length > 0 ? analytics[0] : null;
    const totalRevenue = analytics.reduce((sum, item) => sum + item.REVENUE, 0);
    const totalUnits = analytics.reduce((sum, item) => sum + item.TOTAL_SOLD, 0);

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Top Selling Products</h1>
                <p style={subtitleStyle}>Analyze your best performing products</p>
            </div>

            {loading ? (
                <div style={loadingStyle}>Loading analytics...</div>
            ) : (
                <>
                    <div style={statsGridStyle}>
                        <div style={statCardStyle}>
                            <span style={statLabelStyle}>Total Revenue</span>
                            <span style={statValueStyle}>₹ {totalRevenue.toLocaleString()}</span>
                        </div>
                        <div style={statCardStyle}>
                            <span style={statLabelStyle}>Units Sold</span>
                            <span style={statValueStyle}>{totalUnits.toLocaleString()}</span>
                        </div>
                        <div style={statCardStyle}>
                            <span style={statLabelStyle}>Top Product</span>
                            <span style={statValueStyle}>{topProduct?.PRODUCT_NAME || "N/A"}</span>
                        </div>
                    </div>

                    <div style={tableWrapperStyle}>
                        <table style={tableStyle}>
                            <thead>
                                <tr style={tableHeaderRowStyle}>
                                    <th style={tableHeaderCellStyle}>Rank</th>
                                    <th style={tableHeaderCellStyle}>Product Name</th>
                                    <th style={tableHeaderCellStyle}>Units Sold</th>
                                    <th style={tableHeaderCellStyle}>Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analytics.length > 0 ? (
                                    analytics.map((item, index) => (
                                        <tr key={index} style={getTableRowStyle(index)}>
                                            <td style={tableCellStyle}>
                                                <span style={rankBadgeStyle}>{index + 1}</span>
                                            </td>
                                            <td style={tableCellStyle}>{item.PRODUCT_NAME}</td>
                                            <td style={tableCellStyle}>{item.TOTAL_SOLD.toLocaleString()}</td>
                                            <td style={tableCellStyle}>₹ {item.REVENUE.toLocaleString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" style={noDataStyle}>No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
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

const loadingStyle = {
    textAlign: "center",
    padding: "40px",
    color: "#9CA3AF"
};

const statsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
};

const statCardStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "20px",
    background: "#F3F4F6",
    borderRadius: "8px",
    border: "1px solid #E5E7EB"
};

const statLabelStyle = {
    fontSize: "12px",
    color: "#6B7280",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
};

const statValueStyle = {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1F2937"
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
    background: index % 2 === 0 ? "#FFFFFF" : "#F9FAFB"
});

const rankBadgeStyle = {
    display: "inline-block",
    padding: "6px 10px",
    background: "#E0E7FF",
    color: "#3730A3",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "700"
};

const noDataStyle = {
    textAlign: "center",
    padding: "40px 16px",
    color: "#9CA3AF"
};

export default Analytics;