const connectDB = require("../config/connectDB");
const pool = connectDB();
const cartModel = function (data) {};
cartModel.find = async () => {
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
cartModel.findByIdUser = async (user_id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT T2.img, T1.cart_id ,T1.product_id, T1.quantity, T2.name, T2.price FROM cart T1
        JOIN product T2 ON T1.product_id = T2.product_id
        where user_id = ?`,
        [user_id],
        (err, rows) => {
          connection.release(); // return the connection to pool
          if (err) throw err;
          resolve(rows);
        }
      );
    });
  });
};

cartModel.findOne = async (data) => {
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

cartModel.findById = async (id) => {
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

cartModel.findByIdAndUpdate = async (id, newData) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `UPDATE cart SET quantity = quantity + ${newData.quantity} where user_id= ${id}`,
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
cartModel.findByIdAndDelete = async (id) => {
  // let key = Object.keys(data)[0];
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `DELETE FROM cart where cart_id= ?`,
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
cartModel.create = (data) => {
  let keys = Object.keys(data).join(", ");
  let values = Object.values(data).join("', '");

  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `INSERT INTO user(${keys}) values ('${values}');`,
        (err, rows) => {
          if (err) throw err;
          console.log(rows);
          console.log(err);
          connection.release(); // return the connection to pool
          rows.message = "success";
          resolve(rows);
        }
      );
    });
  });
};

cartModel.createCart = async (user_id, data) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT * FROM cart where user_id = ? and product_id = ?`,
        [user_id, data.product_id],
        (err, rows) => {
          if (err) throw err;
          console.log(rows);
          if (rows.length !== 0) {
            connection.query(
              `UPDATE cart SET quantity = quantity + ? where user_id = ? and product_id = ? ;`,
              [data.quantity, user_id, data.product_id],
              (err, rows) => {
                if (err) throw err;
                console.log(rows);
                connection.release(); // return the connection to pool
                rows.message = "success";
                resolve(rows);
              }
            );
          } else {
            connection.query(
              `INSERT INTO cart(user_id, quantity, product_id) values ('${user_id}', '${data.quantity}', '${data.product_id}');`,
              (err, rows2) => {
                if (err) throw err;
                console.log(rows2);
                connection.release(); // return the connection to pool
                rows.message = "success";
                resolve(rows);
              }
            );
          }
          connection.release(); // return the connection to pool
        }
      );
    });
  });
};

cartModel.emptyCartUser = async (user_id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(`DELETE FROM cart where user_id = ?`, (err, rows) => {
        if (err) throw err;
        console.log(rows);
        console.log(err);
        connection.release(); // return the connection to pool
        rows.message = "success";
        resolve(rows);
      });
    });
  });
};
module.exports = cartModel;
// (async () => {
//   let user = await cartModel.findByIdAndUpdate(
//     { user_id: 18 },
//     { phone: "1234567890", address: "HCM", gender: "nam" }
//   );
//   console.log(user);
// })();
