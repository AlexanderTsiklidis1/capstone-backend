const db = require("../db/dbConfig.js");

const saveEvent = async (event) => {
  const { id, password, email, name, user_email, user_name, start_time, meeting_link } = event;
  try {
    const result = await db.one(
      "INSERT INTO events (meeting_Id, password, invitee_email, invitee_name, inviter_email, inviter_name, start_time, meeting_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [id, password, email, name, user_email, user_name, start_time, meeting_link]
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  saveEvent,
};