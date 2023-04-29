const express = require("express");
const config = require("./config/viewEngine");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const fs = require("fs");
const initWebRoute = require("./routes/initWebRoute");
const { errorHandler, notFound } = require("./middlewares/Handlers");
require("dotenv").config();

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

initWebRoute(app);
// app.use(errorHandler);
console.log(__dirname);
app.get("/", (req, res) => {
  fs.readFile(__dirname + "/public/views/index.html", "utf8", (err, text) => {
    res.send(text);
  });
});
app.get("/ok", (req, res) => {
  res.send("ok");
});
app.use(notFound);
const port = 3001;
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
WHERE T1.user_id = 1 

SELECT T5.per_id, T5.name
FROM user T1 JOIN user_group T2 ON T1.user_id = T2.user_id
JOIN `group` T3 ON T2.group_id = T3.group_id 
JOIN group_permission T4 ON T3.group_id = T4.group_id
JOIN permission T5 ON T4.permission_id = T5.per_id
WHERE T5.per_id NOT IN (SELECT ex_user_group.permission_id FROM ex_user_group WHERE user_id = 1)
*/
