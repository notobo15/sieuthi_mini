const notFound = (req, res, next) => {
  return res.status(404).json({ message: "404" });
};
const errorHandler = (err, req, res, next) => {};

module.exports = {
  errorHandler,
  notFound,
};
