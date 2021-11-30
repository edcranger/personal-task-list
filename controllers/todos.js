const Todos = require("../models/Todos");
const ErrorResponse = require(`../utils/errorResponse`);
const { validationResult } = require("express-validator");

//@route    GET api/todos
//@desc     Get all todos in the database
//@access   Private
exports.getTodos = async (req, res, next) => {
  try {
    const todo = await Todos.find();

    res.status(200).json({ success: true, count: todo.length, todo });
  } catch (err) {
    next(err);
  }
};

//@route    GET /api/task-column/taskColumnId/todos
//@desc     Get all todos in the database
//@access   Private
exports.getTodo = async (req, res, next) => {
  const taskColumnId = req.params.taskColumnId;

  try {
    const todo = await Todos.find({
      user: req.user._id,
      taskColumn: taskColumnId,
    });

    res.status(200).json({ success: true, count: todo.length, todo });
  } catch (err) {
    next(err);
  }
};

exports.getSingleTodo = async (req, res, next) => {
  try {
    const todoId = req.params.todoId;

    const todo = await Todos.findById(todoId);

    if (!todo)
      return next(
        new ErrorResponse(`todo with ID of ${todoId} cannot be found`, 404)
      );

    res.status(200).json({ success: true, todo });
  } catch (err) {
    next(err);
  }
};

//@route    POST /api/task-column/taskColumnId/todos
//@desc     Post a todo
//@access   Private
exports.createTodo = async (req, res, next) => {
  const taskColumnId = req.params.taskColumnId;
  const { title, content, columnIndex, task } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ErrorResponse(errors.array(), 400));
  }

  try {
    const todo = await Todos.create({
      user: req.user._id,
      taskColumn: taskColumnId,
      task,
      title,
      content,
      columnIndex,
    });

    res.status(201).json({ success: true, todo });
  } catch (err) {
    next(err);
  }
};

//@route    DELETE api/todos/todoId
//@desc     Delete a todo
//@access   Private
exports.deleteTodo = async (req, res, next) => {
  const todoId = req.params.todoId;

  try {
    const todo = await Todos.findById(todoId);

    if (!todo)
      return next(
        new ErrorResponse(`todo with ID of ${todoId} cannot be found`, 404)
      );

    if (todo.user.toString() !== req.user._id.toString())
      return next(
        new ErrorResponse(
          `You are not allowed to delete this todo with ID of ${todoId}.`,
          401
        )
      );

    await todo.remove();

    res.status(200).json({ success: true, todo: [] });
  } catch (err) {
    next(err);
  }
};

//@route    Update api/todos
//@desc     Update a todo
//@access   Private
exports.updateTodo = async (req, res, next) => {
  const userId = req.user;
  const todoId = req.params.todoId;

  try {
    let todo = await Todos.findById(todoId);

    if (!todo)
      return next(
        new ErrorResponse(`todo with ID of ${todoId} cannot be found`, 404)
      );

    /*     if (todo.user.toString() !== userId)
      return res.status(401).json({
        success: false,
        message: "You are not allowed to Update this todo.",
      }); */

    todo = await Todos.findByIdAndUpdate(todoId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, todo });
  } catch (err) {
    next(err);
  }
};

//@route    Update api/todos
//@desc     Update a todo
//@access   Private
exports.dragdropUpdate = async (req, res, next) => {
  try {
    let list = [];
    const items = req.body;
    items.forEach((item) => {
      item.todos.forEach((todo) => {
        list.push({
          updateOne: {
            filter: { _id: todo._id },
            update: {
              taskColumn: todo.taskColumn,
              columnIndex: todo.columnIndex,
            },
          },
        });
      });
    });

    const updated = await Todos.bulkWrite(list);

    res.status(200).json({ success: true, updated: updated.nModified });
  } catch (err) {
    next(err);
  }
};
