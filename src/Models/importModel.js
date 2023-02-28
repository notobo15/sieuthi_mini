const connectDB = require("../config/connectDB");
const pool = connectDB();
function importModel() {}

importModel.create = (data) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `INSERT INTO import_mst(suppilier_id, warehouse_id)
        VALUES (?, ?)`,
        [data.suppilier_id, data.warehouse_id],
        (err, rows) => {
          if (err) throw err;
          if (rows.affectedRows !== 0) {
            data.products.forEach((e) => {
              let q = `
              INSERT INTO import_detail(import_mst_id, product_id, quantity)
              VALUES (?, ?, ?)`;
              connection.query(
                q,
                [rows.insertId, e.product_id, e.quantity],
                (err, result) => {
                  console.log(result);
                }
              );
            });

            resolve(rows);
          } else {
            resolve({ message: "not found rerords!" });
          }
          connection.release();
        }
      );
    });
  });
};
module.exports = importModel;
