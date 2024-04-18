const express = require("express");
const feedback = express.Router({ mergeParams: true });

const { getGradesByInterviewee, addGrade, getFeedbackById } = require("../queries/feedback");


feedback.get("/details/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const details = await getFeedbackById(id);
        res.json(details);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch feedback details.' });
    }
});

feedback.get('/prompts', async (req, res) => {
    const ids = req.query.ids.split(',');
    try {
      const query = 'SELECT * FROM prompts WHERE id IN ($1:csv)';
      const prompts = await db.any(query, [ids]);
      res.json(prompts);
    } catch (error) {
      console.error('Failed to fetch prompts:', error);
      res.status(500).json({ error: 'Failed to fetch prompts.' });
    }
  });
  

  feedback.post("/", async (req, res) => {
    try {
        // Add the new grade
        const newGrade = await addGrade(req.body);
        console.log('New Grade:', newGrade);

        // Retrieve all grades for the interviewee to confirm addition
        const feedbackByUser = await getGradesByInterviewee(req.body.interviewee_name);
        console.log('Feedback for User:', feedbackByUser);
        res.json(feedbackByUser);
    } catch (error) {
        console.error('Error in POST /feedback:', error);
        res.status(500).json({ error: 'Failed to process feedback.' });
    }
});

module.exports = feedback;