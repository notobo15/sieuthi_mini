const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
const { auth } = require("../middlewares/auth");
router.get("/list", productController.getList);
router.get("/:id", productController.getSingle);
router.post("/", productController.create);
router.post("/edit/:id", productController.editSingle);
router.post("/delete/:id", productController.deleteSingle);

module.exports = router;
