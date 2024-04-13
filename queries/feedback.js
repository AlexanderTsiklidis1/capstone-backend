const db = require("../db/dbConfig");

const getGradesByInterviewee = async (interviewee) => {
  try {
    const grades = await db.any(
      "SELECT * FROM grades WHERE interviewee_name = $1",
      interviewee
    );
    return grades;
  } catch (error) {
    console.error(error);
  }
};

const addGrade = async (gradeData) => {
  try {
    const {
      interviewee_name,
      admin_name,
      prompt_1_id,
      prompt_1_grade,
      prompt_1_notes,
      prompt_2_id,
      prompt_2_grade,
      prompt_2_notes,
      prompt_3_id,
      prompt_3_grade,
      prompt_3_notes,
      prompt_4_id,
      prompt_4_grade,
      prompt_4_notes,
      prompt_5_id,
      prompt_5_grade,
      prompt_5_notes,
      prompt_6_id,
      prompt_6_grade,
      prompt_6_notes,
      prompt_7_id,
      prompt_7_grade,
      prompt_7_notes,
      prompt_8_id,
      prompt_8_grade,
      prompt_8_notes,
      total_grade,
    } = gradeData;
    const grade = await db.one(
      `INSERT INTO grades (
        interview_id, interviewee_id, admin_id, 
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
        $1, $2, $3, 
        $4, $5, $6,
        $7, $8, $9,
        $10, $11, $12,
        $13, $14, $15,
        $16, $17, $18,
        $19, $20, $21,
        $22, $23, $24,
        $25, $26, $27,
        $28, $29, $30,
        $31
      ) RETURNING *`,
      [
        interviewee_name,
        admin_name,
        prompt_1_id,
        prompt_1_grade,
        prompt_1_notes,
        prompt_2_id,
        prompt_2_grade,
        prompt_2_notes,
        prompt_3_id,
        prompt_3_grade,
        prompt_3_notes,
        prompt_4_id,
        prompt_4_grade,
        prompt_4_notes,
        prompt_5_id,
        prompt_5_grade,
        prompt_5_notes,
        prompt_6_id,
        prompt_6_grade,
        prompt_6_notes,
        prompt_7_id,
        prompt_7_grade,
        prompt_7_notes,
        prompt_8_id,
        prompt_8_grade,
        prompt_8_notes,
        total_grade,
      ]
    );
    return grade;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getGradesByInterviewee,
};
