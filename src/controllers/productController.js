const productModel = require("../Models/productModel");

const create = async (req, res) => {
  console.log(req.body);
  const { name, price, cate_id } = req.body;
  console.log(req.body);
  if (!(name && price && cate_id)) {
    return res.status(400).send("All input is required");
  }
  const result = await productModel.create(req.body);
  return res.json(result);
};

const getList = async (req, res) => {
  const list = await productModel.find();
  return res.send(list);
};
const getSingle = async (req, res) => {
  const { id } = req.params;
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
module.exports = {
  create,
  getList,
  getSingle,
  editSingle,
  deleteSingle,
  import_product,
};
