const connectDB = require("../config/connectDB");
const pool = connectDB();
const productModel = function (data) {};
productModel.find = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT T1.*, T2.* FROM product T1 
      JOIN product_image T2 ON T1.product_id = T2.product_id
      WHERE T2.primary_img = 1;`,
        (err, rows) => {
          connection.release(); // return the connection to pool
          if (err) throw err;
          if (rows.length !== 0) {
            resolve(rows);
          } else {
            resolve([]);
          }
        }
      );
    });
  });
};
productModel.findByIdUser = async (user_id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT T1.cart_id ,T1.product_id, T1.quantity, T2.name, T2.price, T3.image_name FROM cart T1
        JOIN product T2 ON T1.product_id = T2.product_id
        JOIN product_image T3 ON T3.product_id = T1.product_id
        where user_id = ? and T3.primary_img = 1`,
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
productModel.findByIdCategory = async (category_id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `
        SELECT T2.* FROM category_product T1
        JOIN product T2 ON T1.category_id = T2.cate_id
        WHERE T1.category_id = ?`,
        [category_id],
        (err, rows) => {
          connection.release(); // return the connection to pool
          if (err) throw err;
          if (rows.affectedRows !== 0) {
            resolve(rows);
          } else {
            resolve({ message: "unsuccess" });
          }
        }
      );
    });
  });
};
productModel.findOne = async (data) => {
  let key = Object.keys(data)[0];
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT * FROM product where ${key}= ?`,
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

productModel.findById = async (id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT T1.*, T2.image_name FROM product T1 JOIN product_image T2
        ON T1.product_id = T2.product_id WHERE T1.product_id = ?`,
        [id],
        (err, rows) => {
          connection.release(); // return the connection to pool
          if (err) throw err;
          if (rows.length !== 0) {
            let result = rows[0];
            let arrImg = [];
            rows.forEach((item) => {
              arrImg.push(item.image_name);
            });
            result.arrImg = arrImg;

            resolve(result);
          } else {
            resolve({ message: "not found" });
          }
        }
      );
    });
  });
};

productModel.findByIdAndUpdate = async (id, newData) => {
  let str = Object.keys(newData)
    .map((key) => `${key}='${newData[key]}'`)
    .join(", ");
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `UPDATE product SET ${str} where product_id= ${id}`,
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
productModel.findByIdAndDelete = async (id) => {
  // let key = Object.keys(data)[0];
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `DELETE FROM product where product_id = ?`,
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

const slugify = require("slugify");
productModel.create = async (data) => {
  const slug = await slugify(data["name"], {
    lower: true, // convert to lower case, defaults to `false`
    locale: "vi", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
  let keys = Object.keys(data).join(", ");
  let values = Object.values(data).join("', '");
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `INSERT INTO product(slug, ${keys}) values ('${slug}', '${values}');`,
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

module.exports = productModel;
