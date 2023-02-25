const connectDB = require("../config/connectDB");
const pool = connectDB();
const bcrypt = require("bcrypt");
const userModel = function (data) {
  this.user_id = data.user_id;
  this.user_name = data.user_name;
  this.password = data.password;
  this.first_name = data.first_name;
  this.last_name = data.last_name;
  this.phone = data.phone;
  this.birth_date = data.birth_date;
  this.address = data.address;
  this.gender = data.gender;
  this.delivery_address = data.delivery_address;
  this.status = data.status;
  this.createAt = data.createAt;
};
userModel.find = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query("SELECT * FROM`user`", (err, rows) => {
        connection.release(); // return the connection to pool
        if (err) throw err;
        resolve(rows);
      });
    });
  });
};
userModel.findOne = async (data) => {
  let key = Object.keys(data)[0];
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT * FROM user where ${key}= ?`,
        [data[key]],
        (err, rows) => {
          connection.release(); // return the connection to pool
          if (err) throw err;
          if (rows.affectedRows !== 0) {
            resolve(rows[0]);
          } else {
            resolve({ message: "unsuccess" });
          }
        }
      );
    });
  });
};

userModel.findById = async (id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT * FROM user where user_id= ?`,
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

userModel.findByIdAndUpdate = async (id, newData) => {
  // let key = Object.keys(data)[0];
  let str = Object.keys(newData)
    .map((key) => `${key}='${newData[key]}'`)
    .join(", ");
  console.log(str);
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `UPDATE user SET ${str} where user_id= ${id}`,
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
userModel.findByIdAndDelete = async (id) => {
  // let key = Object.keys(data)[0];
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `DELETE FROM user where user_id= ?`,
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
userModel.create = async (data) => {
  const salt = bcrypt.genSaltSync(10);
  data.password = await bcrypt.hash(data.password, salt);
  console.log(data);
  let keys = Object.keys(data).join(", ");
  let values = Object.values(data).join("', '");

  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `INSERT INTO user(${keys}) values ('${values}');`,
        (err, rows) => {
          console.log(rows);
          console.log(err);
          connection.release(); // return the connection to pool
          if (err) throw err;
          rows.message = "success";
          resolve(rows);
        }
      );
    });
  });
};
module.exports = userModel;
// (async () => {
//   let user = await userModel.findByIdAndUpdate(
//     { user_id: 18 },
//     { phone: "1234567890", address: "HCM", gender: "nam" }
//   );
//   console.log(user);
// })();
