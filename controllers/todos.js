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

//@route    GET api/todos
//@desc     Get all todos in the database
//@access   Private
exports.getTodo = async (req, res) => {
  try {
    const todo = await Todos.find({ user: req.user });

    res.status(200).json({ success: true, count: todo.length, todo });
  } catch (err) {
    console.log(err);
  }
};

//@route    POST api/todos
//@desc     Post a todo
//@access   Private
exports.createTodo = async (req, res) => {
  const task = req.params.taskId;
  const userId = req.user;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content } = req.body;

  /*   if (!title || !content)
    return res
      .status(400)
      .json({ success: false, message: "Please complete all fields" }); */

  try {
    let todo = await Todos.findOne({ title });

    if (todo)
      return res
        .status(400)
        .json({ success: false, message: "Todo title is already been used." });

    todo = await Todos.create({
      user: userId,
      task,
      title,
      content,
    });

    res.status(200).json({ success: true, todo });
  } catch (err) {
    console.log(err);
  }
};

//@route    DELETE api/todos
//@desc     Delete a todo
//@access   Private
exports.deleteTodo = async (req, res) => {
  const userId = req.user;
  const todoId = req.params.todoId;

  try {
    const todo = await Todos.findById(todoId);

    if (!todo)
      return res.status(401).json({
        success: false,
        message: "Todo cannot be found.",
      });

    if (todo.user.toString() !== userId)
      return res.status(401).json({
        success: false,
        message: "You are not allowed to delete this todo.",
      });

    await todo.remove();

    res.status(200).json({ success: true, todo: [] });
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
};
