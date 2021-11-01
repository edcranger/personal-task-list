const router = require("express").Router();

const { protect } = require("../middleware/auth");

const {
  getUsersTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task");

//Include other resource routers
const taskColumnRouter = require("../routes/taskColumn");
const contributorsRouter = require("../routes/contributors");

//import router for task-column so that taskId can be used to that route
router.use("/:taskId/task-column", taskColumnRouter);

router.use("/:taskId/contributors", contributorsRouter);

router.route("/:taskId").put(protect, updateTask).delete(protect, deleteTask);

router.route("/").get(protect, getUsersTasks).post(protect, createTask);

module.exports = router;
