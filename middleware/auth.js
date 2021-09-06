const jwt = require("jsonwebtoken"),
  User = require("../models/Users");

exports.protect = (req, res, next) => {
  //Get the token from the header

  const token = req.headers["x-auth-token"];

  //check if not token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode.id;

    next();
  } catch (err) {
    req.status(401).json({ message: "Token is not valid" });
  }
};
