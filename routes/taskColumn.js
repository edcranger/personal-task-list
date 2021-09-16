const router = require("express").Router({ mergeParams: true });
const { check } = require("express-validator");
const { protect } = require("../middleware/auth");

const {
  adminGetTaskColumns,
  getTaskColumns,
  createTaskColumn,
  deleteTaskColumns,
  updateTaskColumn,
} = require("../controllers/taskColumn");

const todosRouter = require("./todos");

router.use("/:taskColumnId/todos", todosRouter);

router
  .route("/:taskColumnId")
  .put(protect, updateTaskColumn)
  .delete(protect, deleteTaskColumns);

router.route("/admin-allColumns").get(protect, adminGetTaskColumns);

router
  .route("/")
  .get(protect, getTaskColumns)
  .post(
    protect,
    [check("columnName", "Please enter a title.").not().isEmpty()],
    createTaskColumn
  );

module.exports = router;
