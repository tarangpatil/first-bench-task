const { User } = require("../models");

async function verifyUserActiveStatus(req, res, next) {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user.status === "deactivated")
    return res.status(400).json({ message: `account is deactivated` });
  next();
}

module.exports = { verifyUserActiveStatus };
