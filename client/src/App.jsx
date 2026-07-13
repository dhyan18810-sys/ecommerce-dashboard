import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <div style={appContainerStyle}>
        <Sidebar />
        <main style={mainContentStyle}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

const appContainerStyle = {
  display: "flex",
  minHeight: "100vh",
  background: "#FFFFFF",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
};

const mainContentStyle = {
  flex: 1,
  marginLeft: "260px",
  background: "#FFFFFF"
};

export default App;