const db = require("../db/dbConfig.js");

const getAllNotifications = async (userId) => {
  try {
    const allNotifications = await db.any(
      "SELECT * FROM notifications WHERE notifications.user_id = $1",
      userId
    );
    return allNotifications;
  } catch (error) {
    console.error(error);
  }
};

const getOneNotification = async (userId, id) => {
  try {
    const notification = await db.one(
      "SELECT * FROM notifications JOIN users ON users.id = notifications.user_id WHERE users.id = $1 AND notifications.user_id = $2",
      [userId, id]
    );
    return notification;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllNotifications,
  getOneNotification,
};
