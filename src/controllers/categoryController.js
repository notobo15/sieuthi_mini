const categoryModel = require("../Models/categoryModel");
const productModel = require("../Models/productModel");
const getList = async (req, res) => {
  let list = await categoryModel.find();
  return res.json(list);
};
const getSingle = async (req, res) => {
  let { id } = req.params;
  let category = await categoryModel.findById(id);
  let products = await productModel.findByIdCategory(id);
  category.products = products;
  return res.json(category);
};
const editSingle = async (req, res) => {
  let { id } = req.params;
  const category = await categoryModel.findByIdAndUpdate(id, req.body);
  return res.json(category);
};
const deleteSingle = async (req, res) => {
  let { id } = req.params;
  const category = await categoryModel.findByIdAndDelete(id);
  return res.json(category);
};
const create = async (req, res) => {
  const category = await categoryModel.create(req.body);
  return res.json(category);
};
module.exports = {
  create,
  getList,
  getSingle,
  editSingle,
  deleteSingle,
};
