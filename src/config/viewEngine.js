const path = require("path");
const express = require("express");

function config(app) {
  app.use(express.static(path.join("src", "public")));
}

module.exports = config;
