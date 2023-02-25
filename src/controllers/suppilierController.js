const suppilierModel = require("../Models/suppilierModel");
const getList = async (req, res) => {
  let list = await suppilierModel.find();
  return res.json(list);
};
const getSingle = async (req, res) => {
  let { id } = req.params;
  let category = await suppilierModel.findById(id);
  return res.json(category);
};
const editSingle = async (req, res) => {
  let { id } = req.params;
  const category = await suppilierModel.findByIdAndUpdate(id, req.body);
  return res.json(category);
};
const deleteSingle = async (req, res) => {
  let { id } = req.params;
  const category = await suppilierModel.findByIdAndDelete(id);
  return res.json(category);
};
const create = async (req, res) => {
  const category = await suppilierModel.create(req.body);
  return res.json(category);
};
module.exports = {
  create,
  getList,
  getSingle,
  editSingle,
  deleteSingle,
};
