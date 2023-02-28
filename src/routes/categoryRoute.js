const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();
const { auth, checkPermission: checkPer } = require("../middlewares/auth");
router.get("/list", categoryController.getList);
router.post("/", auth, checkPer, categoryController.create);
router.get("/:id", categoryController.getSingle);
router.post("/edit/:id", auth, checkPer, categoryController.editSingle);
router.post("/delete/:id", auth, checkPer, categoryController.deleteSingle);

module.exports = router;
