const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tasks",
    required: true,
  },
  title: {
    type: String,
    maxLength: [30, "Content cannot be more than 30 characters."],
  },
  content: {
    type: String,
    maxLength: [500, "Content cannot be more than 500 characters."],
  },
  status: {
    type: String,
    enum: ["pending", "inprogress ", "completed"],
    default: "pending",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
