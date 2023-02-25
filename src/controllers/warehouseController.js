const warehouseModel = require("../Models/warehouseModel");
const getList = async (req, res) => {
  let list = await warehouseModel.find();
  return res.json(list);
};
const getSingle = async (req, res) => {
  let { id } = req.params;
  let list = await warehouseModel.findById(id);
  return res.json(list);
};
const editSingle = async (req, res) => {
  let { id } = req.params;
  return res.json(await warehouseModel.findByIdAndUpdate(id, req.body));
};
const deleteSingle = async (req, res) => {
  let { id } = req.params;
  const category = await warehouseModel.findByIdAndDelete(id);
  return res.json(category);
};
const create = async (req, res) => {
  const category = await warehouseModel.create(req.body);
  return res.json(category);
};
module.exports = {
  create,
  getList,
  getSingle,
  editSingle,
  deleteSingle,
};
