const router = require("express").Router();

const { protect } = require("../middleware/auth");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task");

//Include other resource routers
const taskColumnRouter = require("../routes/taskColumn");

//import router for task-column so that taskId can be used to that route
router.use("/:taskId/task-column", taskColumnRouter);

router.route("/:taskId").put(protect, updateTask).delete(protect, deleteTask);

router.route("/").get(getTasks).post(createTask);

module.exports = router;
