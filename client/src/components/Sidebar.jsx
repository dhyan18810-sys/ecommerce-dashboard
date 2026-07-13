import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/products", label: "Products", icon: "📦" },
    { path: "/orders", label: "Orders", icon: "🛒" },
    { path: "/customers", label: "Customers", icon: "👥" },
    { path: "/analytics", label: "Analytics", icon: "📈" }
  ];

  return (
    <div style={sidebarStyle}>
      <div style={logoStyle}>
        <span style={logoIconStyle}>📊</span>
        <h2 style={logoTextStyle}>Analytics</h2>
      </div>

      <nav style={navStyle}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={getNavItemStyle(location.pathname === item.path)}
          >
            <span style={iconStyle}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div style={footerStyle}>
        <p style={versionStyle}>v1.0</p>
      </div>
    </div>
  );
}

const sidebarStyle = {
  width: "260px",
  height: "100vh",
  background: "#FFFFFF",
  borderRight: "1px solid #E5E7EB",
  position: "fixed",
  left: 0,
  top: 0,
  padding: "0",
  display: "flex",
  flexDirection: "column",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
};

const logoStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "24px 20px",
  borderBottom: "1px solid #E5E7EB"
};

const logoIconStyle = {
  fontSize: "28px"
};

const logoTextStyle = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#1F2937",
  margin: "0"
};

const navStyle = {
  flex: 1,
  padding: "16px 12px",
  display: "flex",
  flexDirection: "column",
  gap: "8px"
};

const getNavItemStyle = (isActive) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 16px",
  borderRadius: "8px",
  textDecoration: "none",
  color: isActive ? "#3B82F6" : "#6B7280",
  fontSize: "14px",
  fontWeight: isActive ? "600" : "500",
  background: isActive ? "#EFF6FF" : "transparent",
  transition: "all 0.2s ease",
  cursor: "pointer",
  borderLeft: isActive ? "3px solid #3B82F6" : "3px solid transparent",
  paddingLeft: isActive ? "16px" : "16px"
});

const iconStyle = {
  fontSize: "18px",
  display: "flex"
};

const footerStyle = {
  padding: "20px",
  borderTop: "1px solid #E5E7EB",
  textAlign: "center"
};

const versionStyle = {
  fontSize: "12px",
  color: "#9CA3AF",
  margin: "0"
};

export default Sidebar;