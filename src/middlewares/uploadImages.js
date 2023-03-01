const multer = require("multer");
const path = require("path");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/img/products");
  },
  filename: (req, file, cb) => {
    req.body.img = file.originalname;
    cb(null, file.originalname);
  },
});

const multerFilter = (req, file, cb) => {
  console.log("file", file);
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      {
        massage: "Unsupported file format",
      },
      false
    );
  }
};
const uploadPhoto = multer({
  storage: multerStorage,
  // fileFilter: multerFilter,
  limits: { fieldSize: 2000000 },
});
module.exports = uploadPhoto;
