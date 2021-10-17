const mongoose = require("mongoose");
const Todos = require("../models/Todos");
const { validationResult } = require("express-validator");
const { SchemaTypeOptions } = require("mongoose");

//@route    GET api/todos
//@desc     Get all todos in the database
//@access   Private
exports.getTodos = async (req, res) => {
  try {
    const todo = await Todos.find();

    res.status(200).json({ success: true, count: todo.length, todo });
  } catch (err) {
    console.log(err);
  }
};

//@route    GET /api/task-column/taskColumnId/todos
//@desc     Get all todos in the database
//@access   Private
exports.getTodo = async (req, res) => {
  const taskColumnId = req.params.taskColumnId;

  try {
    const todo = await Todos.find({
      user: req.user._id,
      taskColumn: taskColumnId,
    });

    res.status(200).json({ success: true, count: todo.length, todo });
  } catch (err) {
    console.log(err);
  }
};

//@route    POST /api/task-column/taskColumnId/todos
//@desc     Post a todo
//@access   Private
exports.createTodo = async (req, res) => {
  const taskColumnId = req.params.taskColumnId;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, columnIndex, task } = req.body;

  try {
    let todo = await Todos.findOne({ title, user: req.user._id });

    if (todo)
      return res
        .status(400)
        .json({ success: false, message: "Todo title is already been used." });

    todo = await Todos.create({
      user: req.user._id,
      taskColumn: taskColumnId,
      task,
      title,
      content,
      columnIndex,
    });

    res.status(200).json({ success: true, todo });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Failed to create new todo" });
  }
};

//@route    DELETE api/todos/todoId
//@desc     Delete a todo
//@access   Private
exports.deleteTodo = async (req, res) => {
  const todoId = req.params.todoId;

  try {
    const todo = await Todos.findById(todoId);

    if (!todo)
      return res.status(401).json({
        success: false,
        message: "Todo cannot be found.",
      });

    if (todo.user.toString() !== req.user._id.toString())
      return res.status(401).json({
        success: false,
        message: "You are not allowed to delete this todo.",
      });

    await todo.remove();

    res.status(200).json({ success: true, todo: [] });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Failed to delete new todo" });
  }
};

//@route    Update api/todos
//@desc     Update a todo
//@access   Private
exports.updateTodo = async (req, res) => {
  const userId = req.user;
  const todoId = req.params.todoId;

  try {
    let todo = await Todos.findById(todoId);

    if (!todo)
      return res.status(401).json({
        success: false,
        message: "Todo cannot be found.",
      });

    if (todo.user.toString() !== userId)
      return res.status(401).json({
        success: false,
        message: "You are not allowed to Update this todo.",
      });

    todo = await Todos.findByIdAndUpdate(todoId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, todo });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Failed to update new todo" });
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
    res
      .status(400)
      .json({ success: false, message: "Failed to do bulk update" });
  }
};
