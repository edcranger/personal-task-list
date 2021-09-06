const { check, validationResult } = require("express-validator");
const User = require("../models/Users");
const { nanoid } = require("nanoid");

//@route    POST api/users
//@desc     Post Register a user
//@access   Private
exports.register = async (req, res, next) => {
  const { full_name, email, password } = req.body;
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exist" });

    user = await User.create({
      full_name,
      email,
      password,
    });

    const xcsrf_token = nanoid();

    const token = await user.getSignedJwtToken(xcsrf_token);

    res.status(200).json({ message: "ok", user });
  } catch (err) {
    return next(err);
  }
};
