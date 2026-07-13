const snowflake = require("snowflake-sdk");

// NOTE: Do NOT reuse a single connection for all requests.
// Snowflake SDK connections can get terminated between requests in serverless environments.
// Create a fresh connection per request.

const getConnection = () => {
  const conn = snowflake.createConnection({
    account: process.env.SNOWFLAKE_ACCOUNT,
    username: process.env.SNOWFLAKE_USERNAME,
    password: process.env.SNOWFLAKE_PASSWORD,
    warehouse: process.env.SNOWFLAKE_WAREHOUSE,
    database: process.env.SNOWFLAKE_DATABASE,
    schema: process.env.SNOWFLAKE_SCHEMA,
    role: process.env.SNOWFLAKE_ROLE,
  });

  const connect = () =>
    new Promise((resolve, reject) => {
      conn.connect((err) => {
        if (err) return reject(err);
        resolve();
      });
    });

  return { conn, connect };
};

module.exports = {
  getConnection,
};
