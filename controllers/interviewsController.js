const express = require("express");
const interviews = express.Router({ mergeParams: true });
const {
  getInterviewsByUserId,
  // getOneInterviewByUser,
  // createInterview,
  getAllInterviews,
} = require("../queries/interviews");

// const { getOneUser } = require("../queries/users");



interviews.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const events = await getInterviewsByUserId(userId);
    res.json(events);
  } catch (error) {
    console.log('Error getting events for user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



interviews.get("/", async (req, res) => {
  try {
    const interviews = await getAllInterviews();
    res.json(interviews);
  } catch (error) {
    res.json(error);
  }
});

// interviews.get("/:interviewId", async (req, res) => {
//   const { userId, interviewId } = req.params;
//   try {
//     const user = await getOneUser(userId);
//     const interviewByUser = await getOneInterviewByUserEmail(userId, interviewId);
//     if (user && interviewByUser) {
//       res.json(interviewByUser);
//     } else {
//       res.status(404).json({ message: "User or Interview not found." });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

// interviews.post("/", async (req, res) => {
//   const { adminId, intervieweeId } = req.body;
//   try {
//     const newInterview = await createInterview(adminId, intervieweeId);
//     res.json(newInterview);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to create interview" });
//   }
// });

module.exports = interviews;
