import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        background: "#1f2937",
        color: "white",
        position: "fixed",
        padding: "20px",
      }}
    >
      <h2>Analytics</h2>

      <p><Link to="/" style={{ color: "white" }}>Dashboard</Link></p>

      <p><Link to="/orders" style={{ color: "white" }}>Orders</Link></p>

      <p><Link to="/products" style={{ color: "white" }}>Products</Link></p>

      <p><Link to="/customers" style={{ color: "white" }}>Customers</Link></p>

      <p><Link to="/analytics" style={{ color: "white" }}>Analytics</Link></p>
    </div>
  );
}

export default Sidebar;