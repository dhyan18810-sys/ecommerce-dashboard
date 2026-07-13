require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getConnection } = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "E-commerce Dashboard API",
    version: "1.0.0",
    endpoints: {
      dashboard: "/api/dashboard",
      products: "/api/products",
      orders: "/api/orders",
      revenue: "/api/revenue",
      customers: "/api/customers",
      analytics: "/api/analytics",
    },
  });
});

// Dashboard - Get overall statistics
app.get("/api/dashboard", async (req, res) => {
  try {
    const { connect, execute } = getConnection();
    await connect();

    const rows = await execute(`
      SELECT
        COUNT(*) as TOTAL_ORDERS,
        COALESCE(SUM(TOTAL_PRICE), 0) as TOTAL_REVENUE,
        COUNT(DISTINCT EMAIL) as TOTAL_CUSTOMERS,
        COALESCE(SUM(QUANTITY), 0) as TOTAL_PRODUCTS_SOLD
      FROM ECOMMERCE_AI_DB.RAW_DATA.ORDERS4
    `);

    res.json(rows[0] || {});
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Products - Get all products
app.get("/api/products", async (req, res) => {
  try {
    const { connect, execute } = getConnection();
    await connect();

    const rows = await execute(`
      SELECT * 
      FROM ECOMMERCE_AI_DB.RAW_DATA.PRODUCTS2 
      LIMIT 100
    `);

    res.json(rows);
  } catch (error) {
    console.error("Products error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Orders - Get all orders
app.get("/api/orders", async (req, res) => {
  try {
    const { connect, execute } = getConnection();
    await connect();

    const rows = await execute(`
      SELECT 
        o.ORDER_ID,
        o.ORDER_DATE,
        o.EMAIL,
        p.PRODUCT_NAME,
        o.QUANTITY,
        o.TOTAL_PRICE
      FROM ECOMMERCE_AI_DB.RAW_DATA.ORDERS4 o
      JOIN ECOMMERCE_AI_DB.RAW_DATA.PRODUCTS2 p ON o.PRODUCT_ID = p.PRODUCT_ID
      ORDER BY o.ORDER_DATE DESC
      LIMIT 100
    `);

    res.json(rows);
  } catch (error) {
    console.error("Orders error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Revenue - Get daily revenue
app.get("/api/revenue", async (req, res) => {
  try {
    const { connect, execute } = getConnection();
    await connect();

    const rows = await execute(`
      SELECT 
        TO_DATE(ORDER_DATE) as SALES_DATE,
        SUM(TOTAL_PRICE) as REVENUE
      FROM ECOMMERCE_AI_DB.RAW_DATA.ORDERS4
      GROUP BY SALES_DATE
      ORDER BY SALES_DATE DESC
      LIMIT 30
    `);

    res.json(rows);
  } catch (error) {
    console.error("Revenue error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Customers - Get customer list with stats
app.get("/api/customers", async (req, res) => {
  try {
    const { connect, execute } = getConnection();
    await connect();

    const rows = await execute(`
      SELECT 
        c.CUSTOMER_ID,
        c.FIRST_NAME,
        c.LAST_NAME,
        c.EMAIL,
        c.PHONE,
        c.CITY,
        COUNT(o.ORDER_ID) as TOTAL_ORDERS,
        COALESCE(SUM(o.TOTAL_PRICE), 0) as TOTAL_SPENT
      FROM ECOMMERCE_AI_DB.RAW_DATA.CUSTOMERS2 c
      LEFT JOIN ECOMMERCE_AI_DB.RAW_DATA.ORDERS4 o ON c.EMAIL = o.EMAIL
      GROUP BY c.CUSTOMER_ID, c.FIRST_NAME, c.LAST_NAME, c.EMAIL, c.PHONE, c.CITY
      ORDER BY TOTAL_SPENT DESC
      LIMIT 100
    `);

    res.json(rows);
  } catch (error) {
    console.error("Customers error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Analytics - Top selling products
app.get("/api/analytics", async (req, res) => {
  try {
    const { connect, execute } = getConnection();
    await connect();

    const rows = await execute(`
      SELECT 
        p.PRODUCT_NAME,
        SUM(o.QUANTITY) as TOTAL_SOLD,
        SUM(o.TOTAL_PRICE) as REVENUE
      FROM ECOMMERCE_AI_DB.RAW_DATA.ORDERS4 o
      JOIN ECOMMERCE_AI_DB.RAW_DATA.PRODUCTS2 p ON o.PRODUCT_ID = p.PRODUCT_ID
      GROUP BY p.PRODUCT_NAME
      ORDER BY TOTAL_SOLD DESC
      LIMIT 10
    `);

    res.json(rows);
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api/*`);
});
