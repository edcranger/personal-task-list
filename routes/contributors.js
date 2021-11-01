const router = require("express").Router({ mergeParams: true });
const { check } = require("express-validator");

const {
  addContributor,
  cancelAddContributor,
  getInvites,
  acceptInvite,
  declineInvite,
  getAssignedTasks,
} = require("../controllers/contributors");

//middleware
const { protect } = require("../middleware/auth");
const { gateKeeper } = require("../middleware/gatekeeper");

router.route("/:contributorId").delete(protect, cancelAddContributor);

router.route("/:contributorId/accept-invite").put(protect, acceptInvite);

router.route("/:contributorId/decline-invite").put(protect, declineInvite);

router.route("/getInvites").get(protect, getInvites);

router.route("/getAssignedTasks").get(protect, getAssignedTasks);

router
  .route("/")
  .post(
    [check("contributorId", "Please add a contributor").not().isEmpty()],
    protect,
    gateKeeper("taskId"),
    addContributor
  );

module.exports = router;
