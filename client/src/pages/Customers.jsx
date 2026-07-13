import { useEffect, useState } from "react";
import { getCustomers } from "../services/api";

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCustomers()
            .then((res) => {
                const customersData = Array.isArray(res.data) ? res.data : [];
                setCustomers(customersData);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setCustomers([]);
                setLoading(false);
            });
    }, []);

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Customers</h1>
                <p style={subtitleStyle}>View all your customers and their activity</p>
            </div>

            <div style={statsStyle}>
                <div style={statItemStyle}>
                    <span style={statLabelStyle}>Total Customers</span>
                    <span style={statValueStyle}>{customers.length}</span>
                </div>
                <div style={statItemStyle}>
                    <span style={statLabelStyle}>Avg Orders</span>
                    <span style={statValueStyle}>
                        {customers.length > 0 
                            ? (customers.reduce((acc, c) => acc + c.TOTAL_ORDERS, 0) / customers.length).toFixed(1)
                            : 0
                        }
                    </span>
                </div>
            </div>

            {loading ? (
                <div style={loadingStyle}>Loading customers...</div>
            ) : (
                <div style={tableWrapperStyle}>
                    <table style={tableStyle}>
                        <thead>
                            <tr style={tableHeaderRowStyle}>
                                <th style={tableHeaderCellStyle}>ID</th>
                                <th style={tableHeaderCellStyle}>Name</th>
                                <th style={tableHeaderCellStyle}>Email</th>
                                <th style={tableHeaderCellStyle}>Phone</th>
                                <th style={tableHeaderCellStyle}>City</th>
                                <th style={tableHeaderCellStyle}>Orders</th>
                                <th style={tableHeaderCellStyle}>Total Spent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length > 0 ? (
                                customers.map((customer, index) => (
                                    <tr key={customer.CUSTOMER_ID} style={getTableRowStyle(index)}>
                                        <td style={tableCellStyle}>{customer.CUSTOMER_ID}</td>
                                        <td style={tableCellStyle}>{customer.FIRST_NAME} {customer.LAST_NAME}</td>
                                        <td style={tableCellStyle}>{customer.EMAIL}</td>
                                        <td style={tableCellStyle}>{customer.PHONE}</td>
                                        <td style={tableCellStyle}>{customer.CITY}</td>
                                        <td style={tableCellStyle}>
                                            <span style={orderBadgeStyle}>{customer.TOTAL_ORDERS}</span>
                                        </td>
                                        <td style={tableCellStyle}>₹ {customer.TOTAL_SPENT}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={noDataStyle}>No customers found</td>
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

const statsStyle = {
    display: "flex",
    gap: "20px",
    marginBottom: "30px"
};

const statItemStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "16px 20px",
    background: "#F3F4F6",
    borderRadius: "8px"
};

const statLabelStyle = {
    fontSize: "12px",
    color: "#6B7280",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
};

const statValueStyle = {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1F2937"
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
    background: index % 2 === 0 ? "#FFFFFF" : "#F9FAFB"
});

const orderBadgeStyle = {
    display: "inline-block",
    padding: "6px 12px",
    background: "#DBEAFE",
    color: "#0369A1",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600"
};

const noDataStyle = {
    textAlign: "center",
    padding: "40px 16px",
    color: "#9CA3AF"
};

export default Customers;