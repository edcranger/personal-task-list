const mongoose = require("mongoose");

const TaskColumnSchema = mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: [true],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    columnName: {
      type: String,
      required: [true, "Please enter a task column name"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

TaskColumnSchema.virtual("todos", {
  ref: "Todo",
  localField: "_id",
  foreignField: "taskColumn",
  justOne: false,
});

module.exports = mongoose.model("Task-Column", TaskColumnSchema);
