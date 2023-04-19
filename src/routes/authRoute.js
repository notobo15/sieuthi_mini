const express = require("express");
const userCtrl = require("../controllers/userController");
const router = express.Router();
const { auth, checkPermission } = require("../middlewares/auth");
router.get("/list", userCtrl.getListUser);
router.get("/cart/list", auth, userCtrl.getListCart); // get danh sach gio hang
router.get("/order/list", userCtrl.getListOrder); // get danh sach don dat hang
router.get("/logout", userCtrl.logoutUser);
router.get("/:id", userCtrl.getSingleUser);

router.post("/myself/edit", auth, checkPermission, userCtrl.updateMyself);
router.post("/myself/delete", auth, checkPermission, userCtrl.deleteMyself);

router.post("/login", userCtrl.loginUser);
router.post("/register", userCtrl.createUser);
router.post("/edit", auth, checkPermission, userCtrl.EditUser);
router.post("/delete/:user_id", checkPermission, auth, userCtrl.deleteUser);

router.post("/cart", auth, checkPermission, userCtrl.createCart); // them vao gio hang
router.post("/cart/delete/:id", auth, checkPermission, userCtrl.deleteCart); // xoa san pham trong gio hang
router.post("/cart/:id", auth, checkPermission, userCtrl.editCart); // edit quantity san pham
router.post("/empty-cart", auth, checkPermission, userCtrl.emptyCart); // xoa tat ca san pham trong gio hang

router.post("/order", auth, checkPermission, userCtrl.createOrder); // tao don hang
router.post("/order/edit/:order_id",  userCtrl.editOrder); // edit trang thai don hang

module.exports = router;
