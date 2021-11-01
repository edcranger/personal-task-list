const Contributors = require("../models/Contributors");
const Tasks = require("../models/Tasks");
const { validationResult } = require("express-validator");

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
    /* 
    let contributor = await Contributors.findOne({
      task: taskId,
      contributor: userId,
      status: "accepted",
    }); */

    //need to fix: if the contributor  already had accepted the task then retrun not to create
    /* 
    if (task.user.toString() !== userId.toString() && !contributor)
      return res.status(401).json({
        success: false,
        message: "You are not allowed to add a contributor.",
      }); */

    //find if
    const alreadyInvited = await Contributors.findOne({
      task: taskId,
      contributor: contributorId,
    });

    if (alreadyInvited) {
      if (alreadyInvited.status === "pending")
        return res.status(400).json({
          success: false,
          message: "Member already has a pending invite.",
        });

      if (alreadyInvited.status === "accepted")
        return res.status(400).json({
          success: false,
          message: "Member is already a contributor.",
        });
    }

    const contributor = await Contributors.create({
      addedBy: userId,
      taskOwner: task.user,
      task: taskId,
      contributor: contributorId,
    });

    res.status(200).json({ success: true, contributor });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Failed to add contributor" });
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

    if (!contributor) {
      return res.status(401).json({
        success: false,
        message: `No contributor with id of ${contributorId} found.`,
      });
    }

    if (
      contributor.addedBy.toString() !== userId.toString() ||
      contributor.taskOwner.toString() !== userId.toString()
    ) {
      return res.status(401).json({
        success: false,
        message: "You are not allowed to remove.",
      });
    }

    await contributor.remove();

    res.status(200).json({ success: true, contributor: [] });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to remove.",
    });
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
      status: "pending",
    }).populate("task");

    res
      .status(200)
      .json({ success: true, invites: contributor, count: contributor.length });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to cancel contributor invite.",
    });
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

    if (!contributor) {
      return res.status(400).json({
        success: false,
        message: `No invite with ID of ${contributorId} found.`,
      });
    }

    if (contributor.contributor.toString() !== userId.toString()) {
      return res.status(400).json({
        success: false,
        message: `You are not allowed to accept this invite.`,
      });
    }

    contributor = await Contributors.findByIdAndUpdate(
      contributorId,
      { status: "accepted", dateAccepted: Date.now() },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ success: true, invites: contributor, count: contributor.length });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to accept contributor invite.",
    });
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

    if (!contributor) {
      return res.status(400).json({
        success: false,
        message: `No invite with ID of ${contributorId} found.`,
      });
    }

    if (contributor.contributor.toString() !== userId.toString()) {
      return res.status(400).json({
        success: false,
        message: `You are not allowed to decline this invite.`,
      });
    }

    contributor = await Contributors.findByIdAndUpdate(
      contributorId,
      { status: "declined", dateDeclined: Date.now() },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ success: true, invites: contributor, count: contributor.length });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to decline contributor invite.",
    });
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
    res.status(400).json({
      success: false,
      message: "Failed to get all assigned tasks.",
    });
  }
};
