const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    taskType: {
      type: String,
      enum: ["personal", "group"],
      required: [true, "Please add a task type"],
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

//cascade delete task column, todo and todo contents
TaskSchema.pre("remove", async function (next) {
  await this.model("Task-Column").deleteMany({ task: this._id });
  await this.model("Todo").deleteMany({ task: this._id });
  await this.model("Todo-Content").deleteMany({ task: this._id });
  await this.model("Contributor").deleteMany({ task: this._id });
  next();
});

//reverse populate with virtuals
TaskSchema.virtual("task-columns", {
  ref: "Task-Column",
  localField: "_id",
  foreignField: "task",
  justOne: false,
});

TaskSchema.virtual("contributors", {
  ref: "Contributor",
  localField: "_id",
  foreignField: "task",
  justOne: false,
});

module.exports = mongoose.model("Task", TaskSchema);
