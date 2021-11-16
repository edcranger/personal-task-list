const router = require("express").Router({ mergeParams: true });

//controllers
const {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");

//middlewares
const { protect } = require("../middleware/auth");

router
  .route("/:commentId")
  .put(protect, updateComment)
  .delete(protect, deleteComment);

router.route("/").get(protect, getAllComments).post(protect, createComment);

module.exports = router;
