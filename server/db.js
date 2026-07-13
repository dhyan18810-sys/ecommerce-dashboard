const snowflake = require("snowflake-sdk");

// Create a fresh connection for each request (best practice for serverless/concurrent environments)
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
        console.log("✅ Connected to Snowflake");
        resolve();
      });
    });

  const execute = (sqlText) =>
    new Promise((resolve, reject) => {
      conn.execute({
        sqlText,
        complete: (err, stmt, rows) => {
          conn.destroy && conn.destroy();
          if (err) return reject(err);
          resolve(rows);
        },
      });
    });

  return { conn, connect, execute };
};

module.exports = { getConnection };
