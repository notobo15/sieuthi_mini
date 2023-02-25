const express = require("express");
const suppilierController = require("../controllers/suppilierController");
const router = express.Router();
const { auth } = require("../middlewares/auth");
router.get("/list", suppilierController.getList);
router.post("/", auth, suppilierController.create);
router.get("/:id", suppilierController.getSingle);
router.post("/edit/:id", suppilierController.editSingle);
router.post("/delete/:id", suppilierController.deleteSingle);

module.exports = router;
