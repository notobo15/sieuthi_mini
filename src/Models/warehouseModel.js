const connectDB = require("../config/connectDB");
const pool = connectDB();
function warehouseModel() {}
warehouseModel.find = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connnection) => {
      if (err) throw err;
      connnection.query("SELECT * FROM warehouse", (err, data) => {
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

warehouseModel.findById = async (id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT * FROM warehouse where warehouse_id = ?`,
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
warehouseModel.findByIdAndUpdate = async (id, newData) => {
  let str = Object.keys(newData)
    .map((key) => `${key}='${newData[key]}'`)
    .join(", ");
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `UPDATE warehouse SET ${str} where warehouse_id= ${id}`,
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
warehouseModel.findByIdAndDelete = async (id) => {
  // let key = Object.keys(data)[0];
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `DELETE FROM warehouse where warehouse_id = ?`,
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
warehouseModel.create = (data) => {
  let keys = Object.keys(data)[0];
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `INSERT INTO warehouse(${keys}) values ('${data[keys]}');`,
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
module.exports = warehouseModel;
