require("dotenv").config();
const express = require("express");
const { User } = require("./models");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/user/all", async (req, res) => {
  res.json(await User.find());
});

app.post("/register", async (req, res) => {
  // extract data from body
  await User.deleteOne({ email: "tarangpatil@gmail.com" });
  const { name, password, email, phoneNumber } = req.body;

  // check if user with same email or phoneNumber exists
  if (await User.exists({ $or: [{ email }, { phoneNumber }] }))
    return res.status(400).json({ message: "user already exists" });

  // create new user with given data and return JSON data
  const hashedPW = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashedPW,
    phoneNumber,
  });
  res.status(201).json({ ...newUser._doc, password: undefined });
});

app.put("/user/:id", async (req, res) => {
  // get id from params and find corresponding user
  const { id } = req.params;
  const user = await User.findById(id);

  // return 404 if not found
  if (!user) return res.status(404).send(`user not found with id ${id}`);

  // update corresponding values
  user.email = req.body.email || user.email;
  user.name = req.body.name || user.name;
  user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

  if (req.body.password)
    user.password = await bcrypt.hash(req.body.password, 10);

  return res.status(200).json(await user.save());
});

module.exports = app;
