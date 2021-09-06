const { check, validationResult } = require("express-validator");
const { protect } = require("../middleware/auth");
const router = require("express").Router();

const { login, getUser } = require("../controllers/auth");

router
  .route("/")
  .get(protect, getUser)
  .post(
    [
      check("email", "PLease include a valid email").isEmail(),
      check("password", "Password is required").exists(),
    ],
    login
  );

module.exports = router;
