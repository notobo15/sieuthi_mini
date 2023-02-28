const express = require("express");
const groupController = require("../controllers/groupController");
const router = express.Router();
const { auth } = require("../middlewares/auth");
router.get("/list", groupController.getList);
router.post("/", auth, groupController.create);
router.get("/:id", groupController.getSingle);
router.post("/edit/:id", groupController.editSingle);
router.post("/delete/:id", groupController.deleteSingle);

module.exports = router;
