const router = require("express").Router({ mergeParams: true });
const { check } = require("express-validator");
const { protect } = require("../middleware/auth");

const {
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo,
  dragdropUpdate,
} = require("../controllers/todos");

router.route("/dragdrop").put(dragdropUpdate);

router.route("/:todoId").put(protect, updateTodo).delete(protect, deleteTodo);

router
  .route("/")
  .get(protect, getTodo)
  .post(
    protect,
    [check("title", "Please enter a title.").not().isEmpty()],

    createTodo
  );

module.exports = router;
