const { check, validationResult } = require("express-validator");
const User = require("../models/Users");
const { nanoid } = require("nanoid");

//@route    GET api/users
//@desc     Get logged in  user
//@access   Private
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.log(err);
  }
};

//@route    POST api/users
//@desc     POST logged in  user
//@access   Private
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const passwordMatch = await user.isPasswordMatch(password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

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

    sendTokenResponse(user, 200, res);
  } catch (err) {
    return next(err);
  }
};

const sendTokenResponse = async (user, statusCode, res) => {
  const xcsrf_token = nanoid();
  const token = await user.getSignedJwtToken(xcsrf_token);

  const jwtOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "None",
  };

  const csrfTokenOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
    sameSite: "Strict",
  };

  res
    .status(statusCode)
    .cookie("token", token, jwtOption)
    .cookie("csrf_id", xcsrf_token, csrfTokenOption)
    .json({ success: true, token, xcsrf_token, user });
};
