const router = require("express").Router();

const { register } = require("../controllers/users");

router.route("/").post(register);

module.exports = router;
