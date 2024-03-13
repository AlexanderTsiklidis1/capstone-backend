const db = require("../db/dbConfig.js");

const getAllPrompts = async () => {
  try {
    const allPrompts = await db.any("SELECT * FROM prompts");
    return allPrompts;
  } catch (error) {
    console.error(error);
  }
};

const getOnePrompt = async (id) => {
  try {
    const onePrompt = await db.one("SELECT * FROM prompts WHERE id = $1", id);
    return onePrompt;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllPrompts,
  getOnePrompt,
};
