const { Schema, model } = require("mongoose");

const TaskSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    taskTitle: {
      type: String,
      maxLength: [30, "Content cannot be more than 30 characters."],
      required: [true, "Please enter a task title."],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please enter a description."],
      maxLength: [500, "Description cannot be more than 500 characters."],
    },
    status: {
      type: String,
      enum: ["pending", "inprogress ", "completed"],
      default: "pending",
    },
    category: {
      type: String,
      required: [true, "Please enter a category."],
      maxLength: [15, "category name cannot be more than 15 characters."],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    taskType: {
      type: String,
      enum: ["personal", "group"],
      required: [true, "Please add a task type"],
      lowercase: true,
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

module.exports = model("Task", TaskSchema);
