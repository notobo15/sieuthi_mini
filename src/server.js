const express = require("express");
const config = require("./config/viewEngine");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const pool = connectDB();
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

config(app);

const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const warehouseRoute = require("./routes/warehouseRoute");
const suppilierRoute = require("./routes/suppilierRoute");
const { errorHandler, notFound } = require("./middlewares/Handlers");

// app.get("/", (req, res) => {
//   res.render("index.html");
// });

app.use("/api/user", authRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/warehouse", warehouseRoute);
app.use("/api/suppilier", suppilierRoute);
// app.use(errorHandler);
app.use(notFound);
const port = 9090;
pool.getConnection(async (err, con) => {
  if (err) {
    console.log(err);
    return;
  }
  if (con) {
    console.log("connected DB");
    app.listen(port, () => {
      console.log("Server is running...");
    });
  }
  await pool.releaseConnection(con);
});
/* SELECT T1.user_id, T1.user_name, T3.name,T4.*  FROM user T1 
JOIN user_per T2 ON T1.user_id = T2.user_id
JOIN permission T3 ON T2.per_id = T3.per_id
JOIN permission_detail T4 ON T3.per_id = T4.per_id
WHERE T1.user_id = 1 */
