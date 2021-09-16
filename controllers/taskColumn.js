const TaskColumns = require("../models/TaskColumns");

const { validationResult } = require("express-validator");

//@route    GET api/task-columns
//@desc     Get all taskColumn in the database
//@access   Private
exports.adminGetTaskColumns = async (req, res, next) => {
  try {
    const taskColumn = await TaskColumns.find();

    res
      .status(200)
      .json({ success: true, count: taskColumn.length, taskColumn });
  } catch (err) {
    console.log(err);
  }
};

//@route    GET api/task-columns
//@desc     Get all taskColumn of the in the database
//@access   Private
exports.getTaskColumns = async (req, res) => {
  const { taskId } = req.params;
  try {
    const taskColumn = await TaskColumns.find({ user: req.user, task: taskId });

    console.log(taskColumn);

    res
      .status(200)
      .json({ success: true, count: taskColumn.length, taskColumn });
  } catch (err) {
    console.log(err);
  }
};

//@route    POST api/task-columns
//@desc     create a taskColumn
//@access   Private
exports.createTaskColumn = async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.user;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { columnName } = req.body;

  try {
    let taskColumn = await TaskColumns.findOne({ columnName });

    if (taskColumn)
      return res.status(400).json({
        success: false,
        message: "Task column name is already been used.",
      });

    taskColumn = await TaskColumns.create({
      user: userId,
      task: taskId,
      columnName,
    });

    res.status(200).json({ success: true, taskColumn });
  } catch (err) {
    console.log(err);
  }
};

//@route    DELETE api/task-columns
//@desc     Delete a task-columns
//@access   Private
exports.deleteTaskColumns = async (req, res) => {
  const userId = req.user;
  const taskColumnId = req.params.taskColumnId;

  try {
    const taskColumn = await TaskColumns.findById(taskColumnId);

    if (!taskColumn)
      return res.status(401).json({
        success: false,
        message: "task column cannot be found.",
      });

    if (taskColumn.user.toString() !== userId)
      return res.status(401).json({
        success: false,
        message: "You are not allowed to delete this todo.",
      });

    await taskColumn.remove();

    res.status(200).json({ success: true, taskColumn: [] });
  } catch (err) {
    console.log(err);
  }
};

//@route    Update api/todos
//@desc     Update a todo
//@access   Private
exports.updateTaskColumn = async (req, res) => {
  const userId = req.user;
  const taskColumnId = req.params.taskColumnId;

  try {
    let taskColumn = await TaskColumns.findById(taskColumnId);

    if (!taskColumn)
      return res.status(401).json({
        success: false,
        message: "Task column cannot be found.",
      });

    if (taskColumn.user.toString() !== userId)
      return res.status(401).json({
        success: false,
        message: "You are not allowed to Update this todo.",
      });

    taskColumn = await TaskColumns.findByIdAndUpdate(taskColumnId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, taskColumn });
  } catch (err) {
    console.log(err);
  }
};
