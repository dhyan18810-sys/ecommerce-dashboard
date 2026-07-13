const { getConnection } = require('../server/db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { conn, connect } = getConnection();
    await connect();

    return new Promise((resolve) => {
      conn.execute({
        sqlText: `
          SELECT
            DATE(ORDER_DATE) SALES_DATE,
            SUM(TOTAL_PRICE) REVENUE
          FROM ECOMMERCE_AI_DB.RAW_DATA.ORDERS4
          GROUP BY DATE(ORDER_DATE)
          ORDER BY SALES_DATE
        `,
        complete: (err, stmt, rows) => {
          conn.destroy && conn.destroy();
          
          if (err) {
            res.status(500).json({ error: err.message });
            resolve();
            return;
          }
          
          res.status(200).json(rows);
          resolve();
        },
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
