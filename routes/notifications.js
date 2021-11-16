const router = require("express").Router();

const {
  getAllNotificationsByUser,
  createNotification,
  interactions,
} = require("../controllers/notifications");

const { protect } = require("../middleware/auth");

router.route(`/interactions`).put(protect, interactions);

router
  .route("/")
  .get(protect, getAllNotificationsByUser)
  .post(protect, createNotification);

module.exports = router;
