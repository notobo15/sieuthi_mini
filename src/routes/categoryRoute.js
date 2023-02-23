const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();
const { auth } = require("../middlewares/auth");
router.get("/list", categoryController.getList);
router.post("/", auth, categoryController.create);
router.get("/:id", categoryController.getSingle);
router.post("/edit/:id", categoryController.editSingle);
router.post("/delete/:id", categoryController.deleteSingle);

module.exports = router;
