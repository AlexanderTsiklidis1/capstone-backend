const express = require("express");
const notifications = express.Router({ mergeParams: true });
const {
  getAllNotifications,
  getOneNotification,
} = require("../queries/notifications");
const { getOneUser } = require("../queries/users");

notifications.get("/", async (req, res) => {
  const { userId } = req.params;
  try {
    const notificationsByUser = await getAllNotifications(userId);
    res.json(notificationsByUser);
  } catch (error) {
    res.json(error);
  }
});

notifications.get("/notificationId", async (req, res) => {
  const { userId, notificationId } = req.params;
  try {
    const oneNotificationByUser = await getOneNotification(
      userId,
      notificationId
    );
    res.json(oneNotificationByUser);
  } catch (error) {
    res.json(error);
  }
});

module.exports = notifications;