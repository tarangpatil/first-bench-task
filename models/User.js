const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 10,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "deactivated"],
    default: "active",
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
