const connectDB = require("../config/connectDB");
const pool = connectDB();
function suppilierModel() {}
suppilierModel.find = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connnection) => {
      if (err) throw err;
      connnection.query("SELECT * FROM suppilier", (err, data) => {
        if (err) throw err;
        if (data.affectedRows !== 0) {
          resolve(data);
        } else {
          resolve({ message: "failed" });
        }
        connnection.release();
      });
    });
  });
};

suppilierModel.findById = async (id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT * FROM suppilier where suppilier_id = ?`,
        [id],
        (err, rows) => {
          connection.release(); // return the connection to pool
          if (err) throw err;
          if (rows.length !== 0) {
            resolve(rows[0]);
          } else {
            resolve({ message: "not found" });
          }
        }
      );
    });
  });
};
suppilierModel.findByIdAndUpdate = async (id, newData) => {
  let str = Object.keys(newData)
    .map((key) => `${key}='${newData[key]}'`)
    .join(", ");
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `UPDATE suppilier SET ${str} where suppilier_id= ${id}`,
        (err, rows) => {
          connection.release(); // return the connection to pool
          if (err) throw err;
          if (rows.affectedRows !== 0) {
            rows.message = "success";
            resolve(rows);
          } else {
            resolve({ message: "not found rerords!" });
          }
        }
      );
    });
  });
};
suppilierModel.findByIdAndDelete = async (id) => {
  // let key = Object.keys(data)[0];
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `DELETE FROM suppilier where suppilier_id = ?`,
        [id],
        (err, rows) => {
          connection.release(); // return the connection to pool
          if (err) throw err;
          if (rows.affectedRows !== 0) {
            rows.message = "success";
            resolve(rows);
          } else {
            resolve({ message: "not found" });
          }
        }
      );
    });
  });
};
suppilierModel.create = (data) => {
  let keys = Object.keys(data)[0];
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `INSERT INTO suppilier(${keys}) values ('${data[keys]}');`,
        (err, rows) => {
          if (err) throw err;
          connection.release(); // return the connection to pool
          if (rows.affectedRows !== 0) {
            rows.message = "success";
            resolve(rows);
          } else {
            resolve({ message: "not found rerords!" });
          }
        }
      );
    });
  });
};
module.exports = suppilierModel;
