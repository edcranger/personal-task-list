const e = require("express");
const mongoose = require("mongoose");

const TodoContentSchema = mongoose.Schema({
  todo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo",
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
  },
  photos: [{ photo: { type: String } }],
  comments: [
    {
      comment: {
        type: String,
      },
      reaction: {
        type: Number,
      },
    },
  ],
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

TodoContentSchema.methods.addComment = async function (newComment) {
  const commentsCopy = [...this.comments, newComment];

  this.comments = commentsCopy;

  return await this.save();
};

TodoContentSchema.methods.updateComment = async function (payload) {
  const { commentId, comment } = payload;

  const commentsCopy = [...this.comments];

  const newCommentsCopy = commentsCopy.map((com) =>
    com._id.toString() === commentId.toString()
      ? { _id: com._id, comment }
      : com
  );

  this.comments = newCommentsCopy;

  return await this.save();
};

TodoContentSchema.methods.deleteComment = async function (commentId) {
  const commentsCopy = [
    ...this.comments.filter(
      (comment) => comment._id.toString() !== commentId.toString()
    ),
  ];

  this.comments = commentsCopy;

  return await this.save();
};

TodoContentSchema.methods.addPhotos = async function (newPhotos) {
  const photosCopy = [...this.photos, ...newPhotos];

  this.photos = photosCopy;

  return await this.save();
};

TodoContentSchema.methods.deletePhoto = async function (photoId) {
  const photosCopy = [
    ...this.photos.filter(
      (photo) => photo._id.toString() !== photoId.toString()
    ),
  ];

  this.photos = photosCopy;

  return await this.save();
};

module.exports = mongoose.model("Todo-Content", TodoContentSchema);
