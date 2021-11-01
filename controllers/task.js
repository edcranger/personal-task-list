const Tasks = require("../models/Tasks");

//@route    GET api/tasks
//@desc     Get all todos in the database
//@access   Private
exports.getUsersTasks = async (req, res) => {
  try {
    const task = await Tasks.find({ user: req.user._id }).populate([
      { path: "task-columns" },
      {
        path: "contributors",
        select: "contributor",
        match: { status: "accepted" },
      },
    ]);

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
    const { taskTitle, description, taskType } = req.body;
    console.log(req.body);
    let task = await Tasks.findOne({ taskTitle });
    if (task)
      return res
        .status(400)
        .json({ success: false, message: "Task name is already been used." });

    task = await Tasks.create({
      taskTitle,
      description,
      taskType: taskType.toLowerCase(),
      user: req.user._id,
    });

    res.status(200).json({ success: true, task });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Something's wrong with creating a task.",
    });
  }
};

//@route    Update api/todos
//@desc     Update a todo
//@access   Private
exports.updateTask = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    let task = await Tasks.findById(taskId);

    if (!task)
      return res.status(401).json({
        success: false,
        message: "Task cannot be found.",
      });

    if (task.user.toString() !== req.user._id.toString())
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

//@route    DELETE api/tasks/:taskId
//@desc     Delete a Task
//@access   Private
exports.deleteTask = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const task = await Tasks.findById(taskId);

    if (!task)
      return res.status(401).json({
        success: false,
        message: "Todo cannot be found.",
      });

    if (task.user.toString() !== req.user._id.toString())
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
