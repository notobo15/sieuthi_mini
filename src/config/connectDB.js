const mysql = require("mysql2");

function connectDB() {
  return mysql.createPool({
    // host: "sql12.freemysqlhosting.net",
    // user: "sql12602001",
    // database: "sql12602001",
    

    host: "localhost",
    user: "root",
    password:"123456",
    database: "notobo_sieuthimini",

    // database: "sieuthi_mini",
    // user: "8qlsjttgajm8885zrcck",
    // host: "ap-southeast.connect.psdb.cloud",
    // password: "pscale_pw_F0jQ2neUdGAjLCFTGzZsVwoIGc95NGrjg8lpgIcbYoP",
    // connectionLimit: 10,
  });
  // return mysql.createPool(process.env.DATABASE_URL);
}

module.exports = connectDB;
