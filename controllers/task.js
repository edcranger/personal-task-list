const Tasks = require("../models/Tasks");
const ErrorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");

//@route    GET api/tasks
//@desc     Get all todos in the database
//@access   Private
exports.getUsersTasks = async (req, res, next) => {
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
    next(err);
  }
};

//@route    POST api/todos
//@desc     Post a todo
//@access   Private
exports.createTask = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
    const { taskTitle, description, taskType } = req.body;
    console.log(req.body);
    let task = await Tasks.findOne({ taskTitle });

    if (task)
      return next(new ErrorResponse(`Task name is already been used.`, 400));

    task = await Tasks.create({
      taskTitle,
      description,
      taskType: taskType,
      user: req.user._id,
    });

    res.status(200).json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

//@route    Update api/todos
//@desc     Update a todo
//@access   Private
exports.updateTask = async (req, res, next) => {
  const taskId = req.params.taskId;

  try {
    let task = await Tasks.findById(taskId);

    if (!task)
      return next(
        new ErrorResponse(`Cannot find task with ID of ${taskId}.`, 404)
      );

    /*     if (task.user.toString() !== req.user._id.toString())
      return res.status(401).json({
        success: false,
        message: "You are not allowed to Update this todo.",
      }); */

    todo = await Tasks.findByIdAndUpdate(taskId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

//@route    DELETE api/tasks/:taskId
//@desc     Delete a Task
//@access   Private
exports.deleteTask = async (req, res, next) => {
  const taskId = req.params.taskId;

  try {
    const task = await Tasks.findById(taskId);

    if (!task)
      return next(
        new ErrorResponse(`Cannot find task with ID of ${taskId}.`, 404)
      );

    if (task.user.toString() !== req.user._id.toString())
      return next(
        new ErrorResponse(
          `You are not allowed to delete this task with ID of ${taskId}.`,
          401
        )
      );

    await task.remove();

    res.status(200).json({ success: true, task: [] });
  } catch (err) {
    next(err);
  }
};
