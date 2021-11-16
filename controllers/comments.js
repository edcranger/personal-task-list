const Comments = require("../models/Comments");
const ErrorResponse = require("../utils/errorResponse");

//@route    GET api/todo-contents/:todoContentId/comments
//@desc     Get all comments of a todo content
//@access   Private
exports.getAllComments = async (req, res, next) => {
  const todoContentId = req.params.todoContentId;
  try {
    const comments = await Comments.find({ todoContent: todoContentId }).sort(
      "-createdAt"
    );

    res.status(200).json({ success: true, comments, count: comments.length });
  } catch (err) {
    next(err);
  }
};

//@route    POST  api/todo-contents/:todoContentId/comments
//@desc     Create a comment
//@access   Private
exports.createComment = async (req, res, next) => {
  const todoContentId = req.params.todoContentId;
  const userId = req.user._id;

  try {
    const comment = await Comments.create({
      author: userId,
      todoContent: todoContentId,
      content: req.body.content,
    });
    res.status(201).json({ success: true, comment });
  } catch (err) {
    next(err);
  }
};

//@route    PUT  api/comments/:commentId
//@desc     Update a comment
//@access   Private

exports.updateComment = async (req, res, next) => {
  const commentId = req.params.commentId;
  const userId = req.user._id;

  try {
    let comment = await Comments.findById(commentId);

    if (!comment)
      return next(
        new ErrorResponse(
          `Comment with ID of ${commentId} cannot be found.`,
          404
        )
      );

    if (comment.author.toString() !== userId.toString())
      return next(
        new ErrorResponse(`You are now allowed to update this comment.`, 401)
      );

    comment = await Comments.findByIdAndUpdate(
      commentId,
      { content: req.body.content, updatedAt: Date.now() },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(201).json({ success: true, comment });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  const commentId = req.params.commentId;
  const userId = req.user._id;

  try {
    const comment = await Comments.findById(commentId);

    if (!comment)
      return next(
        new ErrorResponse(
          `Comment with ID of ${commentId} cannot be found.`,
          404
        )
      );

    if (comment.author.toString() !== userId.toString())
      return next(
        new ErrorResponse(`You are now allowed to update this comment.`, 401)
      );

    await comment.remove();

    res.status(200).json({ success: true, comment: [] });
  } catch (err) {
    next(err);
  }
};
