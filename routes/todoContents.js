const router = require("express").Router({ mergeParams: true });

//middlewares
const { protect } = require("../middleware/auth");
const { gateKeeper } = require("../middleware/gatekeeper");

//mount controllers
const {
  getTodoContents,
  createTodoContent,
  updateTodoContent,
  deleteTodoContent,
  addContentComment,
  deleteContentComment,
  addContentPhoto,
  deleteContentPhoto,
  updateContentComment,
} = require("../controllers/todoContents");

router.route("/:todoContentId/deletephoto").put(protect, deleteContentPhoto);

router.route("/:todoContentId/addphoto").put(protect, addContentPhoto);

router.route("/:todoContentId/addcomment").put(protect, addContentComment);

router
  .route("/:todoContentId/updatecomment")
  .put(protect, updateContentComment);

router
  .route("/:todoContentId/deletecomment")
  .put(protect, deleteContentComment);

router
  .route("/:todoContentId")
  .put(protect, gateKeeper("todoContentId"), updateTodoContent)
  .delete(protect, gateKeeper("todoContentId"), deleteTodoContent);

router
  .route("/")
  .get(protect, gateKeeper("todoId"), getTodoContents)
  .post(protect, gateKeeper("todoId"), createTodoContent);

module.exports = router;
