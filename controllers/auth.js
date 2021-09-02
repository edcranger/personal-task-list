//@route    GET api/users
//@desc     Get logged in  user
//@access   Private
exports.getUser = async (req, res) => {
  try {
    res.send("Get current user");
  } catch (err) {
    console.log(err);
  }
};

//@route    POST api/users
//@desc     POST logged in  user
//@access   Private
exports.login = async (req, res) => {
  try {
    res.send("Logged in user");
  } catch (err) {
    console.log(err);
  }
};
