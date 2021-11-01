const mongoose = require("mongoose");

const ContributorSchema = mongoose.Schema({
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  taskOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please enter task owner"],
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
  contributor: {
    type: mongoose.Schema.Types.ObjectId,
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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contributor", ContributorSchema);
