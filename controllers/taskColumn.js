const TaskColumns = require("../models/TaskColumns");
const ErrorResponse = require("../utils/errorResponse");

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
    next(err);
  }
};

//@route    GET api/task-columns
//@desc     Get all taskColumn of the in the database
//@access   Private
exports.getTaskColumns = async (req, res, next) => {
  console.log("taskColumns run");
  const { taskId } = req.params;
  try {
    const taskColumns = await TaskColumns.find({
      task: taskId,
    }).populate("todos");

    res
      .status(200)
      .json({ success: true, count: taskColumns.length, taskColumns });
  } catch (err) {
    next(err);
  }
};

//@route    POST /api/tasks/taskId/task-column
//@desc     create a taskColumn
//@access   Private
exports.createTaskColumn = async (req, res, next) => {
  const taskId = req.params.taskId;
  const userId = req.user;
  const { columnName } = req.body;

  if (!columnName || columnName === " ")
    return next(new ErrorResponse(`Please enter a column name.`, 400));

  try {
    let taskColumn = await TaskColumns.findOne({ columnName });

    if (taskColumn)
      return next(new ErrorResponse("Column name is already been used.", 400));

    taskColumn = await TaskColumns.create({
      user: userId,
      task: taskId,
      columnName,
    });

    await taskColumn.populate("todos");

    res.status(200).json({ success: true, taskColumn });
  } catch (err) {
    next(err);
  }
};

//@route    DELETE /api/tasks/taskColumnId/task-column
//@desc     Delete a task-columns
//@access   Private
exports.deleteTaskColumns = async (req, res, next) => {
  const userId = req.user._id;
  const taskColumnId = req.params.taskColumnId;

  try {
    const taskColumn = await TaskColumns.findById(taskColumnId);

    if (!taskColumn)
      return next(
        new ErrorResponse(
          `Column name with id of ${taskColumnId} cannot be found.`,
          404
        )
      );

    if (taskColumn.user.toString() !== userId.toString())
      return next(
        new ErrorResponse("You are not allowed to delete this column.", 401)
      );

    await taskColumn.remove();

    res.status(200).json({ success: true, taskColumn: [] });
  } catch (err) {
    next(err);
  }
};

//@route    Update /api/task-column/taskColumnId
//@desc     Update a todo
//@access   Private
exports.updateTaskColumn = async (req, res, next) => {
  const userId = req.user._id;
  const taskColumnId = req.params.taskColumnId;

  try {
    let taskColumn = await TaskColumns.findById(taskColumnId);

    if (!taskColumn)
      return next(
        new ErrorResponse(
          `Column name with id of ${taskColumnId} cannot be found.`,
          404
        )
      );

    if (taskColumn.user.toString() !== userId.toString())
      return next(
        new ErrorResponse("You are not allowed to update this column.", 401)
      );

    taskColumn = await TaskColumns.findByIdAndUpdate(taskColumnId, req.body, {
      new: true,
      runValidators: true,
    });

    await taskColumn.populate("todos");

    res.status(200).json({ success: true, taskColumn });
  } catch (err) {
    next(err);
  }
};
