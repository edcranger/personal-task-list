const { model, Schema } = require("mongoose");

const NotificationSchema = new Schema({
  type: {
    type: String,
    required: [true, "Notification Type is required"],
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  content: {
    type: String,
  },
  isread: {
    type: Boolean,
    default: false,
  },
  isSeen: {
    type: Boolean,
    default: false,
  },
  contributor: {
    type: Schema.Types.ObjectId,
    ref: "Contributor",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Notification", NotificationSchema);
