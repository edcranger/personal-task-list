const router = require("express").Router();
const { check } = require("express-validator");
const { protect } = require("../middleware/auth");

//controllers
const {
  register,
  login,
  getUser,
  searchUser,
} = require("../controllers/users");

router
  .route("/login")
  .post(
    [
      check("email", "PLease include a valid email").isEmail(),
      check("password", "Password is required").exists(),
    ],
    login
  );

router.route("/getme").get(protect, getUser);

router.route("/search/:userId").get(protect, searchUser);

router
  .route("/")
  .post(
    [
      check("full_name", "Please add name").not().isEmpty(),
      check("email", "Please Include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 }),
    ],
    register
  );

module.exports = router;
