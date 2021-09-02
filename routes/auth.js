const router = require("express").Router();

const { login, getUser } = require("../controllers/auth");

router.route("/").get(getUser).post(login);

module.exports = router;
