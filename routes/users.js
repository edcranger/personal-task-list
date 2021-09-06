const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const { register } = require("../controllers/users");

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
