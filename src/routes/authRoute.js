const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const { auth } = require("../middlewares/auth");
router.get("/list", auth, userController.getListUser);
router.get("/cart/list", auth, userController.getListCart); // get danh sach gio hang
router.get("/order/list", auth, userController.getListOrder); // get danh sach don dat hang

router.get("/logout", userController.logoutUser);

router.post("/login", userController.loginUser);
router.post("/register", userController.createUser);
router.get("/:id", auth, userController.getSingleUser);
router.post("/edit", auth, userController.EditUser);
router.post("/delete/:user_id", auth, userController.deleteUser);

router.post("/cart", auth, userController.createCart); // them vao gio hang
router.post("/cart/delete/:id", auth, userController.deleteCart); // xoa san pham trong gio hang
router.post("/cart/:id", auth, userController.editCart); // edit quantity san pham
router.post("/empty-cart", auth, userController.emptyCart); // xoa tat ca san pham trong gio hang

router.post("/order", auth, userController.createOrder); // tao don hang
router.post("/order/edit/:order_id", auth, userController.editOrder); // edit trang thai don hang

module.exports = router;
