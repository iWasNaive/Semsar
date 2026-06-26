const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  uri: process.env.uri,
  connectionLimit: 10,
  waitForConnections: true,
});

module.exports = db;
