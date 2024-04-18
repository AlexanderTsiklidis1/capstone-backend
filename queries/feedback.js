const db = require("../db/dbConfig");

const getFeedbackById = async (id) => {
  try {
    const feedbackDetails = await db.one(
      "SELECT * FROM grades WHERE id = $1",
      id
    );
    console.log('Feedback Details:', feedbackDetails);
    return feedbackDetails;
  } catch (error) {
    console.error('Error fetching feedback details:', error);
    throw error;
  }
};

const getGradesByInterviewee = async (user) => {
  try {
    console.log('Interviewee:', user);
    const grades = await db.any(
      "SELECT * FROM grades WHERE interviewee_name = $1",
      user
    );
    console.log('Grades:', grades);
    return grades;
  } catch (error) {
    console.error(error);
  }
};


const addGrade = async (gradeData) => {
  try {
    // Calculate total grade based on the sum of prompt_X_grade fields
    const totalGrade = (
      gradeData.prompt_1_grade +
      gradeData.prompt_2_grade +
      gradeData.prompt_3_grade +
      gradeData.prompt_4_grade +
      gradeData.prompt_5_grade +
      gradeData.prompt_6_grade +
      gradeData.prompt_7_grade +
      gradeData.prompt_8_grade
    );

    const {
      interviewee_name,
      admin_name,
      prompt_1_id, prompt_1_grade, prompt_1_notes,
      prompt_2_id, prompt_2_grade, prompt_2_notes,
      prompt_3_id, prompt_3_grade, prompt_3_notes,
      prompt_4_id, prompt_4_grade, prompt_4_notes,
      prompt_5_id, prompt_5_grade, prompt_5_notes,
      prompt_6_id, prompt_6_grade, prompt_6_notes,
      prompt_7_id, prompt_7_grade, prompt_7_notes,
      prompt_8_id, prompt_8_grade, prompt_8_notes,
    } = gradeData;

    const grade = await db.one(
      `INSERT INTO grades (
        interviewee_name, admin_name, 
        prompt_1_id, prompt_1_grade, prompt_1_notes,
        prompt_2_id, prompt_2_grade, prompt_2_notes,
        prompt_3_id, prompt_3_grade, prompt_3_notes,
        prompt_4_id, prompt_4_grade, prompt_4_notes,
        prompt_5_id, prompt_5_grade, prompt_5_notes,
        prompt_6_id, prompt_6_grade, prompt_6_notes,
        prompt_7_id, prompt_7_grade, prompt_7_notes,
        prompt_8_id, prompt_8_grade, prompt_8_notes,
        total_grade
      ) VALUES (
        $1, $2, 
        $3, $4, $5,
        $6, $7, $8,
        $9, $10, $11,
        $12, $13, $14,
        $15, $16, $17,
        $18, $19, $20,
        $21, $22, $23,
        $24, $25, $26,
        $27
      ) RETURNING *`,
      [
        interviewee_name, admin_name,
        prompt_1_id, prompt_1_grade, prompt_1_notes,
        prompt_2_id, prompt_2_grade, prompt_2_notes,
        prompt_3_id, prompt_3_grade, prompt_3_notes,
        prompt_4_id, prompt_4_grade, prompt_4_notes,
        prompt_5_id, prompt_5_grade, prompt_5_notes,
        prompt_6_id, prompt_6_grade, prompt_6_notes,
        prompt_7_id, prompt_7_grade, prompt_7_notes,
        prompt_8_id, prompt_8_grade, prompt_8_notes,
        totalGrade  // Include total_grade value in the INSERT query
      ]
    );
    return grade;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getFeedbackById,
  getGradesByInterviewee,
  addGrade
};
