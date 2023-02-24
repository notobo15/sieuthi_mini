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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

config(app);

const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const { errorHandler, notFound } = require("./middlewares/Handlers");

app.use("/api/user", authRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/category", categoryRoute);
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
