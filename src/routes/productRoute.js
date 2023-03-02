const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
const uploadPhoto = require("../middlewares/uploadImages");
const { auth, checkPermission: checkPer } = require("../middlewares/auth");
router.get("/list", productController.getList);
router.get("/:id", productController.getSingle);
router.post(
  "/",
  auth,
  checkPer,
  uploadPhoto.single("images"),
  productController.create
);
router.post(
  "/upload-image/:id",
  uploadPhoto.array("images", 20),
  productController.uploadMultiImage
);
router.post(
  "/upload-image/edit/:id",
  uploadPhoto.array("images", 20),
  productController.uploadMultiImage
);
router.post(
  "/edit/:id",
  auth,
  checkPer,
  uploadPhoto.array("images", 10),
  productController.editSingle
);
// });
router.post("/edit/:id", auth, checkPer, productController.editSingle);
router.post("/delete/:id", auth, checkPer, productController.deleteSingle);

router.post("/import", productController.import_product);

module.exports = router;
