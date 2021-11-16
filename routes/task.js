const router = require("express").Router();
const { check } = require("express-validator");
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

router
  .route("/")
  .get(protect, getUsersTasks)
  .post(
    [
      check("taskTitle", "Please add a title.").not().isEmpty(),
      check("description", "Please add a description.").not().isEmpty(),
      check("category", "Please add a description.").not().isEmpty(),
      check("taskType", "Please add a type.").not().isEmpty(),
    ],
    protect,
    createTask
  );

module.exports = router;
