const { validationResult } = require("express-validator");
const User = require("../models/Users");
const { nanoid } = require("nanoid");
const ObjectId = require("mongoose").Types.ObjectId;
const ErrorResponse = require("../utils/errorResponse");

//@route    GET api/users
//@desc     Get logged in  user
//@access   Private
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

//@route    POST api/users
//@desc     POST logged in  user
//@access   Private
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
    let user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorResponse("Invalid credentials", 401));

    const passwordMatch = await user.isPasswordMatch(password);

    if (!passwordMatch)
      return next(new ErrorResponse(`Password does not match.`, 401));

    user.password = null;

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

//@route    POST api/users
//@desc     Post Register a user
//@access   Private
exports.register = async (req, res, next) => {
  const { full_name, email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email });

    if (user)
      return next(new ErrorResponse(`Email address already used.`, 400));

    user = await User.create({
      full_name,
      email,
      password,
    });

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

//@route    POST api/users/search
//@desc     POST search for users
//@access   Private
exports.searchUser = async (req, res, next) => {
  const userId = req.params.userId;
  let user;

  try {
    !ObjectId.isValid(userId)
      ? (user = await User.find({
          full_name: { $regex: userId, $options: "i" },
        }))
      : (user = await User.find({ _id: userId }));

    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

const sendTokenResponse = async (user, statusCode, res) => {
  user.password = null;
  const xcsrf_token = nanoid();
  const token = await user.getSignedJwtToken(xcsrf_token);

  const jwtOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
    sameSite: "None",
    secure: process.env.NODE_ENV === "server" ? false : true,
  };

  const csrfTokenOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "server" ? false : true,
  };

  res
    .status(statusCode)
    .cookie("token", token, jwtOption)
    .cookie("csrf_id", xcsrf_token, csrfTokenOption)
    .json({ success: true, token, xcsrf_token, user });
};
