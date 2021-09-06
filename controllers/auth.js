const User = require("../models/Users");
const { nanoid } = require("nanoid");

const { check, validationResult } = require("express-validator");
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

    const xcsrf_token = nanoid();

    const token = await user.getSignedJwtToken(xcsrf_token);

    res.status(200).json({ message: "success", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
