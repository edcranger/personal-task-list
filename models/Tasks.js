const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    taskTitle: {
      type: String,
      maxLength: [30, "Content cannot be more than 30 characters."],
      unique: true,
    },
    description: {
      type: String,
      maxLength: [500, "Description cannot be more than 500 characters."],
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//reverse populate with virtuals
TaskSchema.virtual("todos", {
  ref: "Todo",
  localField: "_id",
  foreignField: "task",
  justOne: false,
});

module.exports = mongoose.model("Task", TaskSchema);
