const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["token"];

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
const authAdmin = async (req, res, next) => {
  const { user_name } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
};
module.exports = { auth, authAdmin };
