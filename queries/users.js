const db = require("../db/dbConfig");

const getOneUser = async (id) => {
  try {
    const oneUser = await db.one("SELECT * FROM users WHERE $id=$1", id);
    return oneUser;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
    getOneUser
}