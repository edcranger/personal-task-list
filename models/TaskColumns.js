const { Schema, model } = require("mongoose");

const TaskColumnSchema = new Schema(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: [true],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    columnName: {
      type: String,
      required: [true, "Please enter a task column name"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
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

module.exports = model("Task-Column", TaskColumnSchema);
