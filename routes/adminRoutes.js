const express = require("express");
const passport = require("../config/passport");
const { verifyAdmin, verifySameUser } = require("../middleware/authorization");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");
const { validateEmail, validatePassword } = require("../utils/validators");
const router = express.Router();

router.get(
  "/user/all",
  passport.authenticate("jwt", { session: false }),
  verifyAdmin,
  async (_req, res) => {
    res.json(await User.find());
  }
);

router.post(
  "/admin/register",
  passport.authenticate("jwt", { session: false }),
  verifyAdmin,
  async (req, res) => {
    // extract data from body
    const { name, password, email, phoneNumber } = req.body;

    // validate email and password
    if (!validateEmail(email))
      return res.status(400).json({ message: `invalid email ${email}` });

    if (!validatePassword(password))
      return res
        .status(400)
        .json({ message: `password does not match criteria` });

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
      role: "admin",
    });
    return res.status(201).json({
      user: { ...newUser._doc, password: undefined },
      jwt: generateToken(newUser),
    });
  }
);

router.delete(
  "/admin/:id",
  passport.authenticate("jwt", { session: false }),
  verifyAdmin,
  verifySameUser,
  async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user)
      return res.status(404).json({ message: `user not found with id ${id}` });

    await user.deleteOne();

    return res.status(204).json();
  }
);

module.exports = router;
