const router = require("express").Router({ mergeParams: true });
const { check } = require("express-validator");

//middleware
const { protect } = require("../middleware/auth");
const { gateKeeper } = require("../middleware/gatekeeper");

//mount contontrollers
const {
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo,
  dragdropUpdate,
  getSingleTodo,
} = require("../controllers/todos");

//mount 3rd party routes
const todoContentRoutes = require("./todoContents");

//merged routes
router.use("/:todoId/todo-contents", todoContentRoutes);

//main routes
router.route("/dragdrop").put(dragdropUpdate);

router
  .route("/:todoId")
  .get(protect, getSingleTodo)
  .put(protect, gateKeeper("todoId"), updateTodo)
  .delete(protect, gateKeeper("todoId"), deleteTodo);

router
  .route("/")
  .get(protect, gateKeeper("taskColumnId"), getTodo)
  .post(
    [check("title", "Please enter a title.").not().isEmpty()],
    protect,
    gateKeeper("taskColumnId"),
    createTodo
  );

module.exports = router;
