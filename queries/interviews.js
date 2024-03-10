const db = require("../db/dbConfig");

const getInterviewsByUser = async (userId) => {
  try {
    const interviews = await db.any(
      "SELECT * FROM interviews WHERE users.id = $1",
      userId
    );
    return interviews;
  } catch (error) {
    console.error(error);
  }
};

const getOneInterviewByUser = async (userId, id) => {
  try {
    const interview = await db.one(
      "SELECT * FROM interviews WHERE users.id = $1 AND interviews.id = $2",
      [userId, id]
    );
    return interview;
  } catch (error) {
    console.error(error);
  }
};

const createInterview = async (adminId, intervieweeId) => {
  try {
    const newInterview = await db.one(
      `INSERT INTO interviews (admin_id, interviewee_id) VALUES ($1, $2) RETURNING *`,
      [adminId, intervieweeId]
    );
    return newInterview;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getInterviewsByUser,
  getOneInterviewByUser,
  createInterview,
};
