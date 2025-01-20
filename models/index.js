const mongoose = require("mongoose");
const User = require("./User");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"));

module.exports = { User };
