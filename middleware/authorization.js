const { getClaims } = require("../utils/jwt");

function verifyAdmin(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const claims = getClaims(token);
  if (!claims || claims.role !== "admin")
    return res.status(403).json({ message: `forbidden. admins only.` });
  next();
}

function verifySameUser(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const claims = getClaims(token);
  if (req.params.id !== claims.id)
    return res.status(403).json({ message: "you can't access this user" });
  next();
}

module.exports = { verifyAdmin, verifySameUser };
