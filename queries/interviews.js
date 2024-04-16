const db = require("../db/dbConfig");

const getInterviewsByUserId = async (userId) => {
  try {
    const events = await db.any(
      "SELECT * FROM events WHERE invitee_id = $1 OR inviter_id = $1",
      [userId]
    );
    return events;
  } catch (error) {
    console.error('Error fetching events by user ID:', error);
    throw error;
  }
};

const getAllInterviews = async () => {
  try {
    const events = await db.any("SELECT * FROM events");
    return events;
  } catch (error) {
    console.error('Error fetching all events:', error);
    throw error;
  }
};

// const getOneInterviewByUser = async (userId, id) => {
//   try {
//     const interview = await db.one(
//       "SELECT * FROM interviews WHERE users.id = $1 AND interviews.id = $2",
//       [userId, id]
//     );
//     return interview;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const createInterview = async (adminId, intervieweeId) => {
//   try {
//     const newInterview = await db.one(
//       `INSERT INTO interviews (admin_id, interviewee_id) VALUES ($1, $2) RETURNING *`,
//       [adminId, intervieweeId]
//     );
//     return newInterview;
//   } catch (error) {
//     console.error(error);
//   }
// };

module.exports = {
  getInterviewsByUserId,
  getAllInterviews
};
