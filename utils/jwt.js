const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return token;
}

function getClaims(token) {
  return jwt.decode(token, { json: true });
}

module.exports = { generateToken, getClaims };
