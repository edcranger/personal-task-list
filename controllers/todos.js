//@route    GET api/todos
//@desc     Get all todos in the database
//@access   Private
exports.getTodos = async (req, res) => {
  try {
    res.send("all todos showns.");
  } catch (err) {
    console.log(err);
  }
};

//@route    POST api/todos
//@desc     Post a todo
//@access   Private
exports.newTodo = async (req, res) => {
  try {
    res.send("created a todo");
  } catch (err) {
    console.log(err);
  }
};

//@route    DELETE api/todos
//@desc     Delete a todo
//@access   Private
exports.deleteTodo = async (req, res) => {
  try {
    res.send("Todo deleted");
  } catch (err) {
    console.log(err);
  }
};

//@route    Update api/todos
//@desc     Update a todo
//@access   Private
exports.updateTodo = async (req, res) => {
  try {
    res.send("Todo updated");
  } catch (err) {
    console.log(err);
  }
};
