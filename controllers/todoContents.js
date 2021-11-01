const TodoContents = require("../models/TodoContents");
const Todos = require("../models/Todos");

//@route    POST /api/todo/:todoId/todo-contents
//@desc     Get a all contents of todo
//@access   Private
exports.getTodoContents = async (req, res, next) => {
  const todoId = req.params.todoId;
  try {
    const contents = await TodoContents.find({
      todo: todoId,
    });

    if (!contents)
      return res
        .status(404)
        .json({ success: false, message: "No content found for this todo." });

    res.status(200).json({ success: true, contents, count: contents.length });
  } catch (err) {
    console.log(err);
  }
};

//@route    POST /api/todo/:todoId/todo-contents
//@desc     create a content of a todo
//@access   Private
exports.createTodoContent = async (req, res, next) => {
  const todoId = req.params.todoId;
  let { photos, description } = req.body;

  let photo = req.files;

  if (photo) {
    photos = photo.map((e) => {
      return { photo: e.path };
    });

    req.body.photos = photos;
  }

  if (!photos && !description) {
    return res.status(400).json({
      success: false,
      message: "Please add a description and/or a photo",
    });
  }

  try {
    const todo = await Todos.findById(todoId);

    const contents = await TodoContents.create({
      todo: todoId,
      task: todo.task,
      user: req.user._id,
      ...req.body,
    });

    res.status(200).json({ success: true, contents });
  } catch (err) {
    console.log(err);
  }
};

//@route    PUT /api/todo-contents/:todoContentId
//@desc     update a single todo content
//@access   Private
exports.updateTodoContent = async (req, res, next) => {
  const todoContentId = req.params.todoContentId;

  try {
    let todoContent = await TodoContents.findById(todoContentId);

    if (!todoContent)
      return res.status(401).json({
        success: false,
        message: "Content cannot be found.",
      });

    if (todoContent.user.toString() !== req.user._id.toString())
      return res.status(401).json({
        success: false,
        message: "You are not allowed to Update this content.",
      });

    todoContent = await TodoContents.findByIdAndUpdate(
      todoContentId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ success: true, todoContent });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Failed to update new Content." });
  }
};

//@route    PUT /api/todo-contents/:todoContentId
//@desc     Delete a todo
//@access   Private
exports.deleteTodoContent = async (req, res) => {
  const todoContentId = req.params.todoContentId;

  try {
    const todoContent = await TodoContents.findById(todoContentId);

    if (!todoContent)
      return res.status(401).json({
        success: false,
        message: "Content cannot be found.",
      });

    if (todoContent.user.toString() !== req.user._id.toString())
      return res.status(401).json({
        success: false,
        message: "You are not allowed to delete this content.",
      });

    await todoContent.remove();

    res.status(200).json({ success: true, todo: [] });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Failed to delete this content." });
  }
};

//@route    PUT /api/todo-contents/:todoContentId/addcomment
//@desc     add a single todo comment
//@access   Private
exports.addContentComment = async (req, res, next) => {
  const todoContentId = req.params.todoContentId;

  try {
    let todoContent = await TodoContents.findById(todoContentId);

    if (!todoContent)
      return res.status(401).json({
        success: false,
        message: "Content cannot be found.",
      });

    if (todoContent.user.toString() !== req.user._id.toString())
      return res.status(401).json({
        success: false,
        message: "You are not allowed to Update this content.",
      });

    todoContent = await todoContent.addComment(req.body);

    res.status(200).json({ success: true, todoContent });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Failed to add content comment." });
  }
};

//@route    PUT /api/todo-contents/:todoContentId/updatecomment
//@desc     update a single todo comment
//@access   Private
exports.updateContentComment = async (req, res, next) => {
  const todoContentId = req.params.todoContentId;

  const { commentId } = req.body;

  try {
    let todoContent = await TodoContents.findById(todoContentId);

    if (!todoContent)
      return res.status(401).json({
        success: false,
        message: "Content cannot be found.",
      });

    if (todoContent.user.toString() !== req.user._id.toString())
      return res.status(401).json({
        success: false,
        message: "You are not allowed to Update this content.",
      });

    const comment = todoContent.comments.find(
      (com) => com._id.toString() === commentId.toString()
    );

    if (!comment) {
      return res.status(401).json({
        success: false,
        message: `Comment with id of ${commentId} cannot be found.`,
      });
    }

    todoContent = await todoContent.updateComment(req.body);

    res.status(200).json({ success: true, todoContent });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Failed to add content comment." });
  }
};

//@route    PUT /api/todo-contents/:todoContentId/deletecomment
//@desc     Delete a single todo content comment
//@body     must pass req.body.commentId
//@access   Private
exports.deleteContentComment = async (req, res, next) => {
  const todoContentId = req.params.todoContentId;

  try {
    let todoContent = await TodoContents.findById(todoContentId);

    if (!todoContent)
      return res.status(401).json({
        success: false,
        message: "Content cannot be found.",
      });

    if (todoContent.user.toString() !== req.user._id.toString())
      return res.status(401).json({
        success: false,
        message: "You are not allowed to delete this content comment.",
      });

    const comment = todoContent.comments.find(
      (com) => com._id.toString() === req.body.commentId.toString()
    );

    if (!comment) {
      return res.status(401).json({
        success: false,
        message: `Comment with id of ${req.body.commentId} cannot be found.`,
      });
    }

    todoContent = await todoContent.deleteComment(req.body.commentId);

    res.status(200).json({ success: true, todoContent });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Failed to delete content comment." });
  }
};

//@route    PUT /api/todo-contents/:todoContentId/addphoto
//@desc     Add a single Photo in content
//@body     must pass req.files
//@access   Private
exports.addContentPhoto = async (req, res, next) => {
  const todoContentId = req.params.todoContentId;

  let { photos } = req.body;

  let photo = req.files;

  photos = photo.map((e) => {
    return { photo: e.path };
  });

  req.body.photos = photos;

  if (!photos) {
    return res.status(400).json({
      success: false,
      message: "Please add a description and/or a photo",
    });
  }

  try {
    let todoContent = await TodoContents.findById(todoContentId);

    if (!todoContent)
      return res.status(401).json({
        success: false,
        message: "Content cannot be found.",
      });

    if (todoContent.user.toString() !== req.user._id.toString())
      return res.status(401).json({
        success: false,
        message: "You are not allowed to add a content photo.",
      });

    todoContent = await todoContent.addPhotos(req.body.photos);

    res.status(200).json({ success: true, todoContent });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Failed to add content photo." });
  }
};

//@route    PUT /api/todo-contents/:todoContentId/deletephoto
//@desc     delete a single Photo in content
//@body     must pass req.photoId
//@access   Private
exports.deleteContentPhoto = async (req, res, next) => {
  const todoContentId = req.params.todoContentId;

  let { photoId } = req.body;

  try {
    let todoContent = await TodoContents.findById(todoContentId);

    if (!todoContent)
      return res.status(401).json({
        success: false,
        message: "Content cannot be found.",
      });

    if (todoContent.user.toString() !== req.user._id.toString())
      return res.status(401).json({
        success: false,
        message: "You are not allowed to delete a content photo.",
      });

    const photo = todoContent.photos.find(
      (photo) => photo._id.toString() === photoId.toString()
    );

    if (!photo) {
      return res.status(401).json({
        success: false,
        message: `Photo with id of ${photoId} cannot be found.`,
      });
    }

    todoContent = await todoContent.deletePhoto(photoId);

    res.status(200).json({ success: true, todoContent });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Failed to delete content photo." });
  }
};
