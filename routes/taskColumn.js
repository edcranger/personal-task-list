const router = require("express").Router({ mergeParams: true });
const { check } = require("express-validator");
const { protect } = require("../middleware/auth");
const { gateKeeper } = require("../middleware/gatekeeper");

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
  .put(protect, gateKeeper("taskColumnId"), updateTaskColumn)
  .delete(protect, gateKeeper("taskColumnId"), deleteTaskColumns);

router.route("/admin-allColumns").get(protect, adminGetTaskColumns);

router
  .route("/")
  .get(protect, gateKeeper("taskId"), getTaskColumns)
  .post(
    [check("columnName", "Please enter a title.").not().isEmpty()],
    protect,
    gateKeeper("taskId"),
    createTaskColumn
  );

module.exports = router;
