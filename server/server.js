const express = require("express");
const cors = require("cors");
const path = require("path");
const { getConnection } = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ================= METRICS TRACKING =================
let metrics = {
  startTime: Date.now(),
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  responseTimes: [],
};

// Middleware to track metrics
app.use((req, res, next) => {
  const startTime = Date.now();
  metrics.totalRequests++;

  const originalJson = res.json;
  res.json = function (data) {
    const responseTime = Date.now() - startTime;
    metrics.responseTimes.push(responseTime);
    if (metrics.responseTimes.length > 100) {
      metrics.responseTimes.shift();
    }

    if (res.statusCode < 400) {
      metrics.successfulRequests++;
    } else {
      metrics.failedRequests++;
    }

    return originalJson.call(this, data);
  };

  const originalSend = res.send;
  res.send = function (data) {
    const responseTime = Date.now() - startTime;
    metrics.responseTimes.push(responseTime);
    if (metrics.responseTimes.length > 100) {
      metrics.responseTimes.shift();
    }

    if (res.statusCode < 400) {
      metrics.successfulRequests++;
    } else {
      metrics.failedRequests++;
    }

    return originalSend.call(this, data);
  };

  next();
});

const withSnowflake = async (sqlText, res) => {
  const { conn, connect } = getConnection();

  try {
    await connect();
    conn.execute({
      sqlText,
      complete: (err, stmt, rows) => {
        // Always try to close connection
        conn.destroy && conn.destroy();

        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      },
    });
  } catch (e) {
    conn.destroy && conn.destroy();
    res.status(500).json({ error: e.message });
  }
};

// ================= HOME =================
app.get("/", (req, res) => {
  res.send("Business Analytics API is Running...");
});

// ================= ORDERS =================
app.get("/orders", (req, res) => {
  withSnowflake(
    "SELECT * FROM ECOMMERCE_AI_DB.RAW_DATA.ORDERS4 ORDER BY ORDER_DATE DESC",
    res
  );
});

// ================= PRODUCTS =================
app.get("/products", (req, res) => {
  withSnowflake("SELECT * FROM ECOMMERCE_AI_DB.RAW_DATA.PRODUCTS2", res);
});

// ================= CUSTOMERS =================
app.get("/customers", (req, res) => {
  withSnowflake("SELECT * FROM ECOMMERCE_AI_DB.RAW_DATA.CUSTOMERS", res);
});

// ================= DASHBOARD =================
app.get("/dashboard", (req, res) => {
  const sqlText = `
    SELECT
      COUNT(*) TOTAL_ORDERS,
      SUM(TOTAL_PRICE) TOTAL_REVENUE,
      COUNT(DISTINCT EMAIL) TOTAL_CUSTOMERS,
      SUM(QUANTITY) TOTAL_PRODUCTS_SOLD
    FROM ECOMMERCE_AI_DB.RAW_DATA.ORDERS4
  `;

  withSnowflake(sqlText, {
    status: (code) => ({ json: (obj) => res.status(code).json(obj) }),
    json: (rows) => res.json(rows[0] ?? {}),
  });
});

// ================= TOP PRODUCTS =================
app.get("/top-products", (req, res) => {
  const sqlText = `
    SELECT
      PRODUCT_NAME,
      SUM(QUANTITY) TOTAL_SOLD,
      SUM(TOTAL_PRICE) REVENUE
    FROM ECOMMERCE_AI_DB.RAW_DATA.ORDERS4
    GROUP BY PRODUCT_NAME
    ORDER BY TOTAL_SOLD DESC
    LIMIT 10
  `;

  withSnowflake(sqlText, res);
});

// ================= REVENUE CHART =================
app.get("/revenue", (req, res) => {
  const sqlText = `
    SELECT
      DATE(ORDER_DATE) SALES_DATE,
      SUM(TOTAL_PRICE) REVENUE
    FROM ECOMMERCE_AI_DB.RAW_DATA.ORDERS4
    GROUP BY DATE(ORDER_DATE)
    ORDER BY SALES_DATE
  `;

  withSnowflake(sqlText, res);
});

// ================= ANALYTICS =================
app.get("/analytics", (req, res) => {
  const sqlText = `
    SELECT
      PRODUCT_NAME,
      SUM(QUANTITY) TOTAL_SOLD,
      SUM(TOTAL_PRICE) REVENUE
    FROM ECOMMERCE_AI_DB.RAW_DATA.ORDERS4
    GROUP BY PRODUCT_NAME
    ORDER BY TOTAL_SOLD DESC
    LIMIT 5
  `;

  withSnowflake(sqlText, res);
});

// ================= ADMIN - DASHBOARD =================
app.get("/admin/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

// ================= ADMIN - STATUS & METRICS =================
app.get("/admin/status", (req, res) => {
  const uptime = Date.now() - metrics.startTime;
  const avgResponseTime =
    metrics.responseTimes.length > 0
      ? metrics.responseTimes.reduce((a, b) => a + b, 0) /
        metrics.responseTimes.length
      : 0;
  const successRate =
    metrics.totalRequests > 0
      ? (metrics.successfulRequests / metrics.totalRequests) * 100
      : 100;

  res.json({
    status: "online",
    uptime: Math.floor(uptime / 1000),
    totalRequests: metrics.totalRequests,
    successfulRequests: metrics.successfulRequests,
    failedRequests: metrics.failedRequests,
    successRate: successRate,
    avgResponseTime: avgResponseTime,
    lastUpdated: new Date().toISOString(),
    database: {
      type: "Snowflake",
      status: "configured",
    },
  });
});

// ================= START SERVER =================
app.listen(5000, () => {
  console.log("🚀 Server Running on http://localhost:5000");
  console.log("📊 Admin Dashboard: http://localhost:5000/admin/dashboard");
  console.log("📡 API Status: http://localhost:5000/admin/status");
});

