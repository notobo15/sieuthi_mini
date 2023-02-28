const express = require("express");
const warehouseController = require("../controllers/warehouseController");
const router = express.Router();
const { auth, checkPermission: checkPer } = require("../middlewares/auth");
router.get("/list", auth, checkPer, warehouseController.getList);
router.post("/", auth, checkPer, warehouseController.create);
router.get("/:id", auth, checkPer, warehouseController.getSingle);
router.post("/edit/:id", auth, checkPer, warehouseController.editSingle);
router.post("/delete/:id", auth, checkPer, warehouseController.deleteSingle);

module.exports = router;
