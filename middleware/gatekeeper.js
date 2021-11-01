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
        task = await Tasks.findById(taskId);
      } else if (type === "taskColumnId") {
        task = await TaskColumns.findById(taskColumnId);
      } else if (type === "todoId") {
        task = await Todos.findById(todoId);
      } else if (type === "todoContentId") {
        task = await TodoContents.findById(todoContentId);
      } else {
        task = null;
      }

      if (!task)
        return res.status(401).json({
          success: false,
          message: "Failed to access this route, please verify access.",
        });

      const contributor = await Contributors.findOne({
        task,
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
