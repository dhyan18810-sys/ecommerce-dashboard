import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts()
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const getStockBadge = (quantity) => {
        if (quantity > 50) return { bg: "#DBEAFE", color: "#0369A1", text: "In Stock" };
        if (quantity > 0) return { bg: "#FEF3C7", color: "#92400E", text: "Low Stock" };
        return { bg: "#FEE2E2", color: "#991B1B", text: "Out of Stock" };
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Products</h1>
                <p style={subtitleStyle}>Manage your product catalog</p>
            </div>

            <div style={statsStyle}>
                <div style={statItemStyle}>
                    <span style={statLabelStyle}>Total Products</span>
                    <span style={statValueStyle}>{products.length}</span>
                </div>
            </div>

            {loading ? (
                <div style={loadingStyle}>Loading products...</div>
            ) : (
                <div style={tableWrapperStyle}>
                    <table style={tableStyle}>
                        <thead>
                            <tr style={tableHeaderRowStyle}>
                                <th style={tableHeaderCellStyle}>ID</th>
                                <th style={tableHeaderCellStyle}>Product Name</th>
                                <th style={tableHeaderCellStyle}>Category</th>
                                <th style={tableHeaderCellStyle}>Price</th>
                                <th style={tableHeaderCellStyle}>Stock</th>
                                <th style={tableHeaderCellStyle}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product, index) => {
                                    const stockBadge = getStockBadge(product.STOCK_QUANTITY);
                                    return (
                                        <tr key={product.PRODUCT_ID} style={getTableRowStyle(index)}>
                                            <td style={tableCellStyle}>{product.PRODUCT_ID}</td>
                                            <td style={tableCellStyle}>{product.PRODUCT_NAME}</td>
                                            <td style={tableCellStyle}>
                                                <span style={categoryBadgeStyle}>{product.CATEGORY}</span>
                                            </td>
                                            <td style={tableCellStyle}>₹ {product.SALE_PRICE}</td>
                                            <td style={tableCellStyle}>{product.STOCK_QUANTITY}</td>
                                            <td style={tableCellStyle}>
                                                <span style={{...badgeStyle, background: stockBadge.bg, color: stockBadge.color}}>
                                                    {stockBadge.text}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" style={noDataStyle}>No products found</td>
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

const categoryBadgeStyle = {
    display: "inline-block",
    padding: "4px 10px",
    background: "#E0E7FF",
    color: "#3730A3",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "500"
};

const badgeStyle = {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600"
};

const noDataStyle = {
    textAlign: "center",
    padding: "40px 16px",
    color: "#9CA3AF"
};

export default Products;