const { Schema, model } = require("mongoose");

const TodoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  taskColumn: {
    type: Schema.Types.ObjectId,
    ref: "Task-Column",
    required: true,
  },
  title: {
    type: String,
    maxLength: [30, "Todo title cannot be more than 30 characters."],
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
  columnIndex: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Todo", TodoSchema);
