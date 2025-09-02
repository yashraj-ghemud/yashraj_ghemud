const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const header = req.headers.authorization; // “Bearer <token>”
  if (!header) return res.status(401).json({ message: "No token provided" });

  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const fullUser = await User.findById(decoded.id)
    if (!fullUser) return res.status(401).json({ message: "Invalid token"});
    req.user = { id: fullUser._id, isAdmin: fullUser.isAdmin };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;