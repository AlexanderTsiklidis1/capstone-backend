const express = require("express");
const interviews = express.Router({ mergeParams: true });
const {
  getInterviewsByUser,
  getOneInterviewByUser,
} = require("../queries/interviews");

const { getOneUser } = require("../queries/users");

interviews.get("/", async (req, res) => {
  const { userId } = req.params;
  try {
    const interviewsByUser = await getInterviewsByUser(userId);
    res.json(interviewsByUser);
  } catch (error) {
    res.json(error);
  }
});

interviews.get("/:interviewId", async (req, res) => {
  const { userId, interviewId } = req.params;
  try {
    const user = await getOneUser(userId);
    const interviewByUser = await getOneInterviewByUser(userId, interviewId);
    if (user && interviewByUser) {
      res.json(interviewByUser);
    } else {
      res.status(404).json({ message: "User or Interview not found." });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = interviews;
