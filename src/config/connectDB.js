const mysql = require("mysql2");

function connectDB() {
  return mysql.createPool({
    // host: "sql12.freemysqlhosting.net",
    // user: "sql12602001",
    // database: "sql12602001",
    // password: "IfuGFfsg1Z",

    host: "localhost",
    user: "root",
    database: "sieuthi_mini",

    // database: "sieuthi_mini",
    // user: "8qlsjttgajm8885zrcck",
    // host: "ap-southeast.connect.psdb.cloud",
    // password: "pscale_pw_F0jQ2neUdGAjLCFTGzZsVwoIGc95NGrjg8lpgIcbYoP",
    // connectionLimit: 10,
  });
  // return mysql.createPool(process.env.DATABASE_URL);
}

module.exports = connectDB;
