const Tasks = require("../models/Tasks");
const TaskColumns = require("../models/TaskColumns");
const Todos = require("../models/Todos");
const TodoContents = require("../models/TodoContents");
const Contributors = require("../models/Contributors");

exports.gateKeeper = (type) => {
  return async (req, res, next) => {
    const { taskId, taskColumnId, todoId, todoContentId } = req.params;
    const userId = req.user._id;

    try {
      let task = null;

      if (type === "taskId") {
        console.log("taskId");
        const res = await Tasks.findById(taskId);
        task = res;
      } else if (type === "taskColumnId") {
        console.log("taskColumnId");
        const res = await TaskColumns.findById(taskColumnId).populate({
          path: "task",
          select: "user",
        });
        task = res.task;
      } else if (type === "todoId") {
        console.log("todoId");
        const res = await Todos.findById(todoId).populate({
          path: "task",
          select: "user",
        });

        task = res.task;
      } else if (type === "todoContentId") {
        console.log("todoContentId");
        const res = await TodoContents.findById(todoContentId).populate({
          path: "task",
          select: "user",
        });
        task = res.task;
      } else {
        task = null;
      }

      if (!task)
        return res.status(401).json({
          success: false,
          message: "Failed to access this route, please verify access.",
        });
      const contributor = await Contributors.findOne({
        task: task._id,
        contributor: userId,
        status: "accepted",
      });

      if (task.user.toString() !== userId.toString() && !contributor)
        return res.status(401).json({
          success: false,
          message: "You dont have access to this route.",
        });

      next();
    } catch (err) {
      console.log(err);
    }
  };
};
