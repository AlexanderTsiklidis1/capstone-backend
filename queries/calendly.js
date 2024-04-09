const db = require("../db/dbConfig.js");

const saveEvent = async (event) => {
  const { id, password, email, name, user_email, user_name, start_time } = event;
  try {
    const result = await db.one(
      "INSERT INTO events (meeting_Id, password, invitee_email, invitee_name, inviter_email, inviter_name, start_time) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [id, password, email, name, user_email, user_name, start_time]
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  saveEvent,
};