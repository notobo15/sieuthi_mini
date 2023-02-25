const mysql = require("mysql2");

function connectDB() {
  return mysql.createPool({
    // host: "db4free.net",
    // user: "binhnt2003",
    // password: "123456789",

    host: "localhost",
    user: "root",
    database: "sieuthi_mini",

    /* database: sieuthi_mini
username: 8qlsjttgajm8885zrcck
host: ap-southeast.connect.psdb.cloud
password: pscale_pw_F0jQ2neUdGAjLCFTGzZsVwoIGc95NGrjg8lpgIcbYoP
 */
    // database: "sieuthi_mini",
    // user: "8qlsjttgajm8885zrcck",
    // host: "ap-southeast.connect.psdb.cloud",
    // password: "pscale_pw_F0jQ2neUdGAjLCFTGzZsVwoIGc95NGrjg8lpgIcbYoP",
    // connectionLimit: 10,
  });
  // return mysql.createPool(process.env.DATABASE_URL);
}

module.exports = connectDB;
