const db = require("../db/dbConfig.js");

const saveEvent = async (event) => {
  const { zoomMeetingId, zoomPassword, ...otherEventDetails } = event;
  try {
    const result = await db.one(
      "INSERT INTO events (zoom_meeting_id, zoom_password, other_event_details) VALUES ($1, $2, $3) RETURNING *",
      [zoomMeetingId, zoomPassword, JSON.stringify(otherEventDetails)]
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  saveEvent,
};