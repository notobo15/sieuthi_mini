const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
const uploadPhoto = require("../middlewares/uploadImages");
const { auth } = require("../middlewares/auth");
router.get("/list", productController.getList);
router.get("/:id", productController.getSingle);
router.post(
  "/",
  auth,
  uploadPhoto.array("images", 10),
  productController.create
);
router.post(
  "/edit/:id",
  auth,
  uploadPhoto.array("images", 10),
  productController.editSingle
);
// router.post("/upload-image", uploadPhoto.array("images", 10), (req, res) => {
//   try {
//     console.log(req.body.name);
//   } catch (error) {
//     console.log(error);
//     res.send(400);
//   }
// });
router.post("/edit/:id", auth, productController.editSingle);
router.post("/delete/:id", auth, productController.deleteSingle);

module.exports = router;
