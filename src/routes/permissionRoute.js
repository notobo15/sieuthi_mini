const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const { auth } = require("../middlewares/auth");
router.get("/list", auth, userController.getListUser);
router.get("/:id", userController.getSingleUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);
router.post("/register", userController.createUser);
router.post("/edit", userController.EditUser);

module.exports = router;
