const express = require("express");
const passport = require("../config/passport");
const { verifyAdmin, verifySameUser } = require("../middleware/authorization");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");
const router = express.Router();

router.get(
  "/user/all",
  passport.authenticate("jwt", { session: false }),
  // verifyAdmin,
  async (_req, res) => {
    res.json(await User.find());
  }
);

router.post("/register", async (req, res) => {
  // extract data from body
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

  res.status(201).json({
    user: { ...newUser._doc, password: undefined },
    jwt: generateToken(newUser),
  });
});

router.get(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  verifySameUser,
  async (req, res) => {
    // get id
    const { id } = req.params;

    // find user
    const user = await User.findById(id).select("-password");

    // error handling
    if (!user)
      return res.status(404).json({ message: `user not found with id ${id}` });

    // return response
    return res.json(user);
  }
);

router.put(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  verifySameUser,
  async (req, res) => {
    // get id from params and find corresponding user
    const { id } = req.params;
    const user = await User.findById(id);

    // return 404 if not found
    if (!user)
      return res.status(404).json({ message: `user not found with id ${id}` });

    // update corresponding values
    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    if (req.body.password)
      user.password = await bcrypt.hash(req.body.password, 10);

    await user.save();
    user.password = undefined;
    return res.status(200).json(user);
  }
);

router.delete(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  verifySameUser,
  async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({ message: `user not found with id ${id}` });

    await user.deleteOne();
    res.status(204).send();
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return res
      .status(400)
      .json({ message: `user not found with email ${email}` });
  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches)
    return res.status(400).json({ message: `wrong password` });

  const jwt = generateToken(user);

  return res.json({ jwt });
});

module.exports = router;
