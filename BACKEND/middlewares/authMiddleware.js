const jwt = require("jsonwebtoken");
const { findUserById } = require("../services/userService");

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token)
      return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    req.userDetails = await findUserById(decoded.id);

    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid Token" });
  }
};
