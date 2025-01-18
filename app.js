require("dotenv").config();
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  res.json();
});

module.exports = app;
