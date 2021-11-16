const { Schema, model } = require("mongoose");

const ContributorSchema = new Schema({
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  taskOwner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please enter task owner"],
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: "Task",
  },
  contributor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Must include coontributor ID."],
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined", "retired"],
    default: "pending",
  },
  dateInvited: {
    type: Date,
    default: Date.now,
  },
  dateAccepted: {
    type: Date,
  },
  dateDeclined: {
    type: Date,
  },
  dateRetired: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Contributor", ContributorSchema);
