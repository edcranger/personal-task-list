const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  todoContent: {
    type: Schema.Types.ObjectId,
    ref: "Todo-Content",
  },
  content: {
    type: String,
    required: [true, "Please add a comment"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = model("Comment", CommentSchema);
