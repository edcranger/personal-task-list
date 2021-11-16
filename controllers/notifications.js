const Notifications = require("../models/Notifications");

//@route    GET api/notifications
//@desc     Get all Notifications of user
//@access   Private
exports.getAllNotificationsByUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const notifications = await Notifications.find({ receiver: userId })
      .populate([
        { path: "sender", select: "full_name" },
        {
          path: "contributor",
          select: "task status",
          populate: { path: "task", select: "taskTitle" },
        },
      ])
      .sort("-createdAt");

    res
      .status(200)
      .json({ success: true, notifications, count: notifications.length });
  } catch (err) {
    next(err);
  }
};

//@route    POST api/notifications
//@desc     Get all Notifications of user
//@access   Private
exports.createNotification = async (req, res, next) => {
  const userId = req.user._id;
  const { type, receiver } = req.body;
  try {
    const notification = await Notifications.create({
      type,
      sender: userId,
      receiver,
      ...req.body,
    });

    res.status(200).json({ success: true, notification });
  } catch (err) {
    next(err);
  }
};

//@route    PUT api/contributors/interactions
//@desc     Update interactions
//@access   Private
exports.interactions = async (req, res, next) => {
  const userId = req.user._id;
  const { type, _id } = req.body;
  let notifications;
  try {
    if (type === "see-all") {
      notifications = await Notifications.updateMany(
        {
          receiver: userId,
          isSeen: false,
        },
        { isSeen: true }
      );
    }

    if (type === "read") {
      notifications = await Notifications.findOneAndUpdate(
        { receiver: userId, _id },
        { isread: true }
      );
    }

    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};
