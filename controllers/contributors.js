const Contributors = require("../models/Contributors");
const ObjectId = require("mongoose").Types.ObjectId;
const User = require("../models/Users");
const Tasks = require("../models/Tasks");
const { validationResult } = require("express-validator");
const ErrorResponse = require("../utils/errorResponse");

//@route    POST api/tasks/:taskId/contributors
//@desc     Delete a Task
//@access   Private
exports.addContributor = async (req, res, next) => {
  const taskId = req.params.taskId;
  const { contributorId } = req.body;

  const userId = req.user._id;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const task = await Tasks.findById(taskId);

    const alreadyInvited = await Contributors.findOne({
      task: taskId,
      contributor: contributorId,
    });

    if (alreadyInvited) {
      if (alreadyInvited.status === "pending")
        return next(
          new ErrorResponse(`Member already has a pending invite.`, 400)
        );

      if (alreadyInvited.status === "accepted")
        return next(
          new ErrorResponse(`"Member is already a contributor.`, 400)
        );
    }

    const contributor = await Contributors.create({
      addedBy: userId,
      taskOwner: task.user,
      task: taskId,
      contributor: contributorId,
    });

    res.status(200).json({ success: true, contributor });
  } catch (err) {
    next(err);
  }
};

//@route    DELETE api/contributors/contributorId
//@desc     Cancel a contributor add
//@access   Private
exports.cancelAddContributor = async (req, res, next) => {
  const contributorId = req.params.contributorId;
  const userId = req.user._id;

  try {
    const contributor = await Contributors.findById(contributorId);

    if (!contributor)
      return next(
        new ErrorResponse(
          `No contributor with id of ${contributorId} found.`,
          400
        )
      );

    if (
      contributor.addedBy.toString() !== userId.toString() ||
      contributor.taskOwner.toString() !== userId.toString()
    )
      return next(
        new ErrorResponse(`You are not allowed to cancel the invite.`, 401)
      );

    await contributor.remove();

    res.status(200).json({ success: true, contributor: [] });
  } catch (err) {
    next(err);
  }
};

//@route    GET api/contributors/getInvites
//@desc     get all task invites of user
//@access   Private
exports.getInvites = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const contributor = await Contributors.find({
      contributor: userId,
    })
      .populate([
        { path: "addedBy", select: "full_name" },
        {
          path: "task",
          select: "taskTitle status",
        },
      ])
      .sort("-createdAt");

    res
      .status(200)
      .json({ success: true, invites: contributor, count: contributor.length });
  } catch (err) {
    next(err);
  }
};

//@route    Put api/contributors/:contributorId/accept-invite
//@desc     Accept a task invite
//@access   Private
exports.acceptInvite = async (req, res, next) => {
  const userId = req.user._id;
  const contributorId = req.params.contributorId;

  try {
    let contributor = await Contributors.findById(contributorId);

    if (!contributor)
      return next(
        new ErrorResponse(
          `No contributor with id of ${contributorId} found.`,
          400
        )
      );

    if (contributor.contributor.toString() !== userId.toString())
      return next(
        new ErrorResponse(`You are not allowed to accept this invite.`, 401)
      );

    contributor = await Contributors.findByIdAndUpdate(
      contributorId,
      { status: "accepted", dateAccepted: Date.now() },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ success: true, invites: contributor, count: contributor.length });
  } catch (err) {
    next(err);
  }
};

//@route    Put api/contributors/:contributorId/accept-invite
//@desc     Accept a task invite
//@access   Private
exports.declineInvite = async (req, res, next) => {
  const userId = req.user._id;
  const contributorId = req.params.contributorId;

  try {
    let contributor = await Contributors.findById(contributorId);

    if (!contributor)
      return next(
        new ErrorResponse(
          `No contributor with id of ${contributorId} found.`,
          400
        )
      );

    if (contributor.contributor.toString() !== userId.toString())
      return next(
        new ErrorResponse(`You are not allowed to decline this invite.`, 401)
      );

    contributor = await Contributors.findByIdAndUpdate(
      contributorId,
      { status: "declined", dateDeclined: Date.now() },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ success: true, invites: contributor, count: contributor.length });
  } catch (err) {
    next(err);
  }
};

//@route    GET api/contributors/getInvites
//@desc     get all task invites of user
//@access   Private
exports.getAssignedTasks = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const contributor = await Contributors.find({
      contributor: userId,
      status: "accepted",
    }).populate("task");

    res.status(200).json({
      success: true,
      assignedTasks: contributor,
      count: contributor.length,
    });
  } catch (err) {
    next(err);
  }
};

//@route    GET api/contributors/getInvites
//@desc     get all task invites of user
//@access   Private
exports.searchContributor = async (req, res, next) => {
  const { taskId, contributorId } = req.params;

  let users = [];

  try {
    const task = await Tasks.findById(taskId);

    if (!ObjectId.isValid(contributorId)) {
      users = await User.find({
        full_name: { $regex: contributorId, $options: "i" },
      }).populate("assignedTasks");
    } else {
      users = await User.find({ _id: contributorId }).populate("assignedTasks");
    }

    const newUser = users
      .map((user) => {
        return {
          _id: user._id,
          full_name: user.full_name,
          status: user.assignedTasks.find(
            (task) => task.task.toString() === taskId
          )
            ? user.assignedTasks.find((task) => task.task.toString() === taskId)
                .status
            : "not invited",
        };
      })
      .filter((user) => user._id.toString() !== task.user.toString());

    res.status(200).json({
      success: true,
      users: newUser,
    });
  } catch (err) {
    next(err);
  }
};

/* exports.getAcceptedNotication = async () => {
  const userId = req.user._id;

  try {
    const contributor = await Contributors.find({
      addedBy: userId,
      status: "accepted",
    })
      .populate([
        { path: "addedBy", select: "full_name" },
        {
          path: "task",
          select: "taskTitle status",
        },
      ])
      .sort("-dateAccepted");

    res
      .status(200)
      .json({ success: true, invites: contributor, count: contributor.length });
  } catch (err) {
    next(err);
  }
};
 */
