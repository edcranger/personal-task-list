const jwt = require("jsonwebtoken"),
  User = require("../models/Users");

exports.protect = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return res.json({ success: false, message: "you are not allowed" });
  }

  // console.log(token);
  try {
    // @ts-ignore
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    /*     if (decoded.xsrfToken !== req.headers["x-xsrf-token"]) {
      return next(new errorResponse(`You are not authorized`, 401));
    } */

    const user = await User.findById(decoded.id);

    console.log(user);

    if (!user) {
      return res.json({ success: false, message: "No user found" });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.json({ success: false, message: "Catched Error" });
  }
};
