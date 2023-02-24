const connectDB = require("../config/connectDB");
const pool = connectDB();
function orderModel() {}
orderModel.findByIdUser = (user_id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        // "SELECT t1.order_id, t1.user_id, t1.order_id, T1.status, t2.product_id, t2.price, t2.quantity, t3.name FROM orders T1" +
        //   " JOIN order_detail T2 ON T1.order_id = T2.order_id" +
        //   " JOIN product T3 ON T3.product_id = T2.product_id" +
        //   " where user_id = ?",
        `SELECT T1.order_id, t1.user_id, T1.status,COUNT(T2.quantity)* T2.price AS totalPrice, GROUP_CONCAT(T3.name, ' : ',  T2.quantity,' : ' ,'<br/>') as product_detail
          FROM orders T1 
          JOIN order_detail T2 ON T1.order_id = T2.order_id 
          JOIN product T3 ON T3.product_id = T2.product_id 
          where user_id = ?
          GROUP BY T1.order_id`,
        [user_id],
        (err, rows) => {
          connection.release(); // return the connection to pool
          if (err) throw err;
          if (rows.length !== 0) {
            resolve(rows);
            // console.log(arr);
            // let a = rows.map((item) => {
            //   return {
            //     order_id: item.order_id,
            //     quantity: item.quantity,
            //     price: item.price,
            //     name: item.name,
            //   };
            // });
            // console.log(a);
            // let temp = [];
            // a.forEach((item) => {
            //   if (temp === 0) {
            //     temp.push(item);
            //   } else {
            //     let orders = [];
            //     a.forEach((i) => {
            //       if (i.order_id === item.order_id) {
            //         orders.
            //       }
            //     });
            //   }
            // });
            // console.log(temp);
            // let arr = [];
            // rows.forEach((item) => {
            //   if (arr.length === 0) {
            //     arr.push(item);
            //   } else {
            //     arr.forEach((i) => {
            //       if (i.order_id !== item.order_id) {
            //         arr.push(item);
            //       } else {
            //         let orders = rows.map((item) => {
            //           return {
            //             quantity: item.quantity,
            //             price: item.price,
            //             name: item.name,
            //           };
            //         });
            //       }
            //     });
            //   }
            // });
            // console.log("arr = ", arr);
            // let result = rows[0];
            // let orders = rows.map((item) => {
            //   return {
            //     quantity: item.quantity,
            //     price: item.price,
            //     name: item.name,
            //   };
            // });
            // result.orders = orders;

            // resolve(result);
          } else {
            resolve({ message: "unsuccess" });
          }
        }
      );
    });
  });
};

orderModel.create = async (user_id, data) => {
  console.log(user_id);
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `INSERT INTO orders(user_id) values (?);`,
        [user_id],
        (err, rows) => {
          if (err) throw err;
          if (rows.affectedRows !== 0) {
            resolve(rows);
          }
          connection.release(); // return the connection to pool
        }
      );
    });
  });
};
orderModel.findByIdAndUpdate = async (order_id, { status }) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `UPDATE orders SET status = ? WHERE order_id = ?`,
        [status, order_id],
        (err, rows) => {
          if (err) throw err;
          if (rows.affectedRows !== 0) {
            resolve(rows);
          }
          connection.release(); // return the connection to pool
        }
      );
    });
  });
};
module.exports = orderModel;
