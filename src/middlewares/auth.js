const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");
const auth = (req, res, next) => {
  const token = req.headers["token"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    // if (err) throw new Error(err.messgae);
    return res.status(401).send("Invalid Token");
  }
  return next();
};
const isAdmin = async (req, res, next) => {
  const { group_id, user_id } = req.user;
  const adminUser = await userModel.findById(user_id);

  if (adminUser.role !== "admin") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
};
const checkPermission = async (req, res, next) => {
  let permissions = await req.user.permissions;
  console.log("origin url : ", req.originalUrl);
  let isPer = permissions.some((item) => {
    return req.originalUrl.includes(item.code_name);
  });
  if (isPer) {
    await next();
  } else {
    res.json("Invalid Permisstion");
  }
};
module.exports = { auth, isAdmin, checkPermission };
