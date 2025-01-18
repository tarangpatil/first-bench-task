require("dotenv").config();
const express = require("express");
const { User } = require("./models");

const app = express();

app.get("/user/all", async (req, res) => {
  res.json(await User.find());
});

module.exports = app;
