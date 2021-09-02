const router = require("express").Router();

const {
  getTodos,
  newTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todos");

router.route("/:id").put(updateTodo).delete(deleteTodo);

router.route("/").get(getTodos).post(newTodo);

module.exports = router;
