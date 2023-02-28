const groupModel = require("../Models/groupModel");
const getList = async (req, res) => {
  let list = await groupModel.find();
  return res.json(list);
};
const getSingle = async (req, res) => {
  let { id } = req.params;
  let category = await groupModel.findById(id);
  let products = await productModel.findByIdCategory(id);
  category.products = products;
  return res.json(category);
};
const editSingle = async (req, res) => {
  let { id } = req.params;
  const category = await groupModel.findByIdAndUpdate(id, req.body);
  return res.json(category);
};
const deleteSingle = async (req, res) => {
  let { id } = req.params;
  const category = await groupModel.findByIdAndDelete(id);
  return res.json(category);
};
const create = async (req, res) => {
  const category = await groupModel.create(req.body);
  return res.json(category);
};
module.exports = {
  create,
  getList,
  getSingle,
  editSingle,
  deleteSingle,
};
