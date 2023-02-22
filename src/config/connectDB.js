const mysql = require("mysql2");

function connectDB() {
  return mysql.createPool({
    // host: "db4free.net",
    // user: "binhnt2003",
    // password: "123456789",
    host: "localhost",
    user: "root",
    database: "sieuthi_mini",
    connectionLimit: 10,
  });
}

module.exports = connectDB;
