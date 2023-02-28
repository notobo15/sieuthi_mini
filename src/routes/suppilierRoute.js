const express = require("express");
const suppilierController = require("../controllers/suppilierController");
const router = express.Router();
const { auth, checkPermission: checkPer } = require("../middlewares/auth");
router.get("/list", auth, checkPer, suppilierController.getList);
router.post("/", auth, checkPer, auth, suppilierController.create);
router.get("/:id", auth, checkPer, suppilierController.getSingle);
router.post("/edit/:id", auth, checkPer, suppilierController.editSingle);
router.post("/delete/:id", auth, checkPer, suppilierController.deleteSingle);

module.exports = router;
