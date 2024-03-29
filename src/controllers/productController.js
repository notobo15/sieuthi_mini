const productModel = require("../Models/productModel");

const create = async (req, res) => {
  console.log(req.body);
  const { name, price, cate_id } = req.body;
  if (!(name && price && cate_id)) {
    return res
      .status(400)
      .send({ message: "All input is required", statusCode: 400 });
  }
  const result = await productModel.create(req.body);
  return res.json(result);
};

const getList = async (req, res) => {
  const list = await productModel.find();
  return res.send(list);
};
const getSingle = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  console.log(id);
  const result = await productModel.findById(id);
  return res.send(result);
};
const editSingle = async (req, res) => {
  const { id } = req.params;
  const result = await productModel.findByIdAndUpdate(id, req.body);
  return res.json(result);
};
const deleteSingle = async (req, res) => {
  const { id } = req.params;
  const result = await productModel.findByIdAndDelete(id);
  return res.json(result);
};
const importModel = require("../Models/importModel");

const import_product = async (req, res) => {
  console.log(req.body);
  const result = await importModel.create(req.body);
  return res.json(result);
};
const uploadMultiImage = async (req, res) => {
  const { id } = req.params;
  let arrImgs = req.files.map((item) => item.originalname);
  const result = await productModel.uploadImages(id, arrImgs);
  return res.json(result);
};
module.exports = {
  create,
  getList,
  getSingle,
  editSingle,
  deleteSingle,
  import_product,
  uploadMultiImage,
};
