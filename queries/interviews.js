const db = require("../db/dbConfig");

const getInterviewsByUserEmail = async (userEmail) => {
  try {
    console.log("***********", userEmail, "************")
    const interviews = await db.any(
      "SELECT * FROM events WHERE invitee_email = $1",
      userEmail
    );
    return interviews;
  } catch (error) {
    console.error(error);
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
