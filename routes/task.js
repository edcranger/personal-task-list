const router = require("express").Router();

const { protect } = require("../middleware/auth");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task");

//Include other resource routers
const todosRouter = require("./todos");

router.use("/:taskId/todos", todosRouter);

router.route("/:taskId").put(protect, updateTask).delete(protect, deleteTask);

router.route("/").get(getTasks).post(createTask);

module.exports = router;
