const router = require("express").Router({ mergeParams: true });
const { check } = require("express-validator");
const { protect } = require("../middleware/auth");

const {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todos");

router.route("/:todoId").put(protect, updateTodo).delete(protect, deleteTodo);

router
  .route("/")
  .get(protect, getTodos)
  .post(
    protect,
    [
      check("title", "Please enter a title.").not().isEmpty(),
      check("content", "Please enter a content.").not().isEmpty(),
    ],

    createTodo
  );

module.exports = router;
