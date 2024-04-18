const express = require("express");
const interviews = express.Router({ mergeParams: true });
const {
  getInterviewsByUserEmail,
  // getOneInterviewByUser,
  // createInterview,
  getAllInterviews
} = require("../queries/interviews");

// const { getOneUser } = require("../queries/users");

interviews.post("/", async (req, res) => {
  console.log(req.body)
  const { email } = req.body;
  console.log("$$$$$$$$$$$$$",email, "$$$$$$$$$$$$$$$$")
  try {
    const interviewsByUser = await getInterviewsByUserEmail(email);
    console.log(interviewsByUser)
    res.json(interviewsByUser);
  } catch (error) {
    console.log(error)
    res.json(error);
  }
});

interviews.get("/", async (req, res) => {
  try {
    const interviews = await getAllInterviews()
    console
    res.json(interviews)
  } catch (error) {
    res.json(error)
  }
})

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
