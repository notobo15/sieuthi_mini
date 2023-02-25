const express = require("express");
const warehouseController = require("../controllers/warehouseController");
const router = express.Router();
const { auth } = require("../middlewares/auth");
router.get("/list", warehouseController.getList);
router.post("/", auth, warehouseController.create);
router.get("/:id", warehouseController.getSingle);
router.post("/edit/:id", warehouseController.editSingle);
router.post("/delete/:id", warehouseController.deleteSingle);

module.exports = router;
