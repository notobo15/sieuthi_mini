const connectDB = require("../config/connectDB");
const pool = connectDB();
function permissionModel() {}
permissionModel.find = async (user_name) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connnection) => {
      if (err) throw err;
      let q = `SELECT T5.per_id, T5.name
      FROM USER T1 
      JOIN groups T3 ON T1.group_id = T3.group_id 
      JOIN group_permission T4 ON T3.group_id = T4.group_id
      JOIN permission T5 ON T4.permission_id = T5.per_id
      WHERE T5.per_id NOT IN (SELECT ex_user_group.permission_id FROM ex_user_group WHERE user_id = 
      (SELECT user_id FROM user WHERE USER_name = ?))`;
      connnection.query(q, [user_name], (err, data) => {
        if (err) throw err;
        if (data.length !== 0) {
          resolve(data);
        } else {
          resolve({ message: "failed" });
        }
        connnection.release();
      });
    });
  });
};

permissionModel.findById = async (id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT * FROM permission where permission_id = ?`,
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
permissionModel.findByIdAndUpdate = async (id, newData) => {
  let str = Object.keys(newData)
    .map((key) => `${key}='${newData[key]}'`)
    .join(", ");
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `UPDATE permission SET ${str} where permission_id= ${id}`,
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
permissionModel.findByIdAndDelete = async (id) => {
  // let key = Object.keys(data)[0];
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `DELETE FROM permission where permission_id = ?`,
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
permissionModel.create = (data) => {
  let keys = Object.keys(data)[0];
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `INSERT INTO permission(${keys}) values ('${data[keys]}');`,
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
module.exports = permissionModel;
