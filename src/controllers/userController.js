const jwt = require("jsonwebtoken");
const connectDB = require("../config/connectDB");
const pool = connectDB();
const getListUser = async (req, res) => {
  const query = "SELECT * FROM `user`";
  pool.query(query, async (err, data) => {
    console.log(data);
    await res.send(data);
  });
};
const loginUser = async (req, res) => {
  const { user_name, password } = req.body;
  console.log(req.body);
  if (user_name == "" || password == "") {
    return res.status(400).send("All input is required");
  }
  const query = "SELECT * FROM `user` where `user_name`= ? and `password` =? ";
  pool.query(query, [user_name, password], async (err, data) => {
    if (err) throw new Error(err);
    if (data.length !== 0) {
      console.log(data);
      // Create token
      const token = jwt.sign(
        { user_id: data[0].user_id, user_name: user_name, password },
        process.env.TOKEN_KEY,
        {
          expiresIn: 90,
        }
      );
      // save user token
      data[0].token = token;
      res.status(200).json(data[0]);
    }
    return res.status(400).send("Invalid Credentials");
  });
};
const logoutUser = async (req, res) => {
  const query = "SELECT * FROM `user`";
  pool.query(query, async (err, data) => {
    console.log(data);
    await res.send(data);
  });
};

const createUser = async (req, res) => {
  const { user_name, password, phone } = req.body;
  // check if user already exist
  if (!(user_name && password && phone)) {
    res.status(400).send("All input is required");
  }
  // Validate if user exist in our database
  const query = "SELECT * FROM `user` where `user_name`= ?";
  pool.query(query, [user_name], async (err, data) => {
    if (err) throw new Error(err);
    if (data.length !== 0) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // Validate user input
    const q =
      "INSERT INTO `user`(`user_name`, `password`, `phone`) VALUES (?, ?, ?);";
    pool.query(q, [user_name, password, phone], async (err, data) => {
      if (err) throw new Error(err);
      if (data.length !== 0) {
        console.log(data);
        // Create token

        const token = jwt.sign(
          { user_id: data[0].insertId, user_name },
          process.env.TOKEN_KEY,
          {
            expiresIn: 90,
          }
        );
        data[0].token = token;
        res.status(201).json(data[0]);
      }
    });
  });
};
const getSingleUser = async (req, res) => {
  const query = "SELECT * FROM `user`";
  pool.query(query, async (err, data) => {
    console.log(data);
    await res.send(data);
  });
};
const EditUser = async (req, res) => {
  const query = "SELECT * FROM `user`";
  pool.query(query, async (err, data) => {
    console.log(data);
    await res.send(data);
  });
};
module.exports = {
  getListUser,
  loginUser,
  logoutUser,
  createUser,
  getSingleUser,
  EditUser,
};
