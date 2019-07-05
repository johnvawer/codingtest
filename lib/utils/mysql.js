const mysql = require("mysql");

const mysqlPool = mysql.createPool({
  connectionLimit: 5,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA_NAME
});

module.exports = mysqlPool;