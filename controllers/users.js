//@route    POST api/users
//@desc     Post Register a user
//@access   Private
exports.register = async (req, res) => {
  try {
    res.send("user created");
  } catch (err) {
    console.log(err);
  }
};
