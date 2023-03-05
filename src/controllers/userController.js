const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/connectDB");
const pool = connectDB();
const userModel = require("../Models/userModel");
const cartModel = require("../Models/cartModel");
const orderModel = require("../Models/orderModel");

const getListUser = async (req, res) => {
  try {
    const list = await userModel.find();
    return res.json(list);
  } catch (error) {
    console.log(error);
  }
};
const permissionModel = require("../Models/permissionModel");
const loginUser = async (req, res) => {
  let { user_name, password } = req.body;
  //user_name == "" || password == ""
  if (!(user_name && password)) {
    return res
      .status(400)
      .send({ message: "All input is required", statusCode: 400 });
  }
  const user = await userModel.findOne({ user_name });
  if (user) {
    const isMatched = await bcrypt.compare(password, user.password);
    let permissions = await permissionModel.find(user_name);

    if (isMatched) {
      const token = jwt.sign(
        {
          user_id: user.user_id,
          user_name: user_name,
          permissions,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );
      user.permissions = permissions;

      user.token = token;
      res.status(200).json(user);
    } else {
      return res.status(400).send("Invalid Credentials");
    }
  } else {
    return res.status(400).send("Not Found User");
  }
};
const logoutUser = async (req, res) => {
  localStorage.removeItem("token");
};

const createUser = async (req, res) => {
  let { user_name, password, phone } = req.body;
  // check if user already exist
  if (!(user_name && password && phone)) {
    res.status(400).json({ message: "All input is required", statusCode: 400 });
  }
  const user = await userModel.findOne({ user_name });
  if (user) {
    return res.status(409).send("User Already Exist. Please Login");
  } else {
    const salt = bcrypt.genSaltSync(10);
    req.password = await bcrypt.hash(password, salt);
    let newUser = await userModel.create(req.body);
    if (newUser) {
      return res.status(201).json(newUser);
    } else {
      console.log("loi");
    }
  }
};
const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findById(id);
  return res.json(user);
};
const EditUser = async (req, res) => {
  const { user_id } = req.body;
  const user = await userModel.findByIdAndUpdate(user_id, req.body);
  return res.json(user);
};
const deleteUser = async (req, res) => {
  const { user_id } = req.params;
  const user = await userModel.findByIdAndDelete(user_id);
  return res.json(user);
};
/// cart
const getListCart = async (req, res) => {
  const user = await cartModel.findByIdUser(req.user.user_id);
  return res.json(user);
};
const createCart = async (req, res) => {
  if (!(req.body?.quantity && req.body?.product_id && req.body?.price)) {
    res.status(400).send("All input is required");
  } else {
    const cart = await cartModel.createCart(req.user.user_id, req.body);
    return res.json(cart);
  }
};
const deleteCart = async (req, res) => {
  const cart = await cartModel.findByIdAndDelete(cart_id);
  return res.json(cart);
};
const editCart = async (req, res) => {
  const cart = await cartModel.findByIdAndUpdate(req.user.user_id, {
    quantity: res.body.quantity,
  });
  return res.json(cart);
};
const emptyCart = async (req, res) => {
  const cart = await cartModel.emptyCartUser(user_id);
  return res.json(cart);
};
const getListOrder = async (req, res) => {
  const { user_id } = req.user;
  let order = await orderModel.findByIdUser(user_id);
  return res.json(order);
};
const createOrder = async (req, res) => {
  const order = await orderModel.create(req.user.user_id, req.body);
  console.log(order);
  return res.json(order);
};
const editOrder = async (req, res) => {
  const { order_id } = req.params;
  const order = await orderModel.findByIdAndUpdate(order_id, req.body);
  console.log(order);
  return res.json(order);
};
const updateMyself = async (req, res) => {
  const { user_id } = req.user;
  const user = await userModel.findByIdAndUpdate(user_id, req.body);
  return res.json(user);
};
const deleteMyself = async (req, res) => {
  const { user_id } = req.user;
  const user = await userModel.findByIdAndDelete(user_id, req.body);
  return res.json(user);
};
module.exports = {
  getListUser,
  loginUser,
  logoutUser,
  createUser,
  getSingleUser,
  EditUser,
  deleteUser,
  getListCart,
  createCart,
  deleteCart,
  editCart,
  emptyCart,
  getListOrder,
  createOrder,
  editOrder,
  updateMyself,
  deleteMyself,
};
