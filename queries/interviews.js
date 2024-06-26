const db = require("../db/dbConfig");

const getInterviewsByUserEmail = async (email) => {
  try {
    console.log("Querying events for email:", email);
    const events = await db.any(
      "SELECT * FROM events WHERE invitee_email = $1 OR inviter_email = $1",
      [email]
    );
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return []; // Return empty array in case of error for consistent function output
  }
};




const getAllInterviews = async () => {
  try {
    const interviews = await db.any("SELECT * FROM events");
    return interviews
  } catch (error) {
    console.error(error)
  }
}

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
  getInterviewsByUserEmail,
  // getOneInterviewByUser,
  // createInterview,
  getAllInterviews
};
