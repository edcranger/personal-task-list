const Tasks = require("../models/Tasks");

//@route    GET api/todos
//@desc     Get all todos in the database
//@access   Private
exports.getTasks = async (req, res) => {
  try {
    const task = await Tasks.find().populate("task-columns");

    res.status(200).json({ success: true, task, count: task.length });
  } catch (err) {
    console.log(err);
  }
};

//@route    POST api/todos
//@desc     Post a todo
//@access   Private
exports.createTask = async (req, res) => {
  try {
    const { taskTitle, description, user } = req.body;
    let task = await Tasks.findOne({ taskTitle });

    if (task)
      return res
        .status(400)
        .json({ success: false, message: "Task name is already been used." });

    task = await Tasks.create({
      taskTitle,
      description,
      user,
    });
    res.status(200).json({ success: true, task });
  } catch (err) {
    console.log(err);
  }
};

//@route    DELETE api/todos
//@desc     Delete a todo
//@access   Private
exports.deleteTask = async (req, res) => {
  try {
    res.send("Todo deleted");
  } catch (err) {
    console.log(err);
  }
};

//@route    Update api/todos
//@desc     Update a todo
//@access   Private
exports.updateTask = async (req, res) => {
  const userId = req.user;
  const taskId = req.params.taskId;

  try {
    let task = await Tasks.findById(taskId);

    if (!task)
      return res.status(401).json({
        success: false,
        message: "Task cannot be found.",
      });

    if (task.user.toString() !== userId)
      return res.status(401).json({
        success: false,
        message: "You are not allowed to Update this todo.",
      });

    todo = await Tasks.findByIdAndUpdate(taskId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, task });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteTask = async (req, res) => {
  const userId = req.user;
  const taskId = req.params.taskId;

  try {
    const task = await Todos.findById(taskId);

    if (!todo)
      return res.status(401).json({
        success: false,
        message: "Todo cannot be found.",
      });

    if (task.user.toString() !== userId)
      return res.status(401).json({
        success: false,
        message: "You are not allowed to delete this todo.",
      });

    await task.remove();

    res.status(200).json({ success: true, task: [] });
  } catch (err) {
    console.log(err);
  }
};
