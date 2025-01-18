const mongoose = require("mongoose");
const User = require("./User");

mongoose.connect(process.env.MONGODB_URI);

module.exports = { User };
