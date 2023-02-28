const express = require("express");
const authRoute = require("./authRoute");
const productRoute = require("./productRoute");
const categoryRoute = require("./categoryRoute");
const warehouseRoute = require("./warehouseRoute");
const suppilierRoute = require("./suppilierRoute");
const groupRoute = require("./groupRoute");
const initWebRoute = (app) => {
  app.use("/api/user", authRoute);
  app.use("/api/product", productRoute);
  app.use("/api/category", categoryRoute);
  app.use("/api/warehouse", warehouseRoute);
  app.use("/api/suppilier", suppilierRoute);
  app.use("/api/group", groupRoute);
};

module.exports = initWebRoute;
