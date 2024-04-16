const express = require("express");
const feedback = express.Router({ mergeParams: true });

const { getGradesByInterviewee, addGrade } = require("../queries/feedback");

feedback.get("/", async (req, res) => {
    console.log(req.body)
    const interviewee_name = req.body.interviewee_name;
    console.log(interviewee_name, "$$$$$$$$$$$$$$$$")
    try {
        const feedbackByUser = await getGradesByInterviewee(interviewee_name);
        console.log(feedbackByUser)
        res.json(feedbackByUser)
    } catch (error) {
        res.json(error)
    }
});

feedback.post("/", async (req, res) => {
    try {
        const newGrade = await addGrade(req.body);
        res.json(newGrade);
    } catch (error) {
        res.json(error);
    }
});

module.exports = feedback;