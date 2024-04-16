const db = require("../db/dbConfig");

const addUser = async (userData) => {
  try {
      const { uid, email, displayName, role, photoURL } = userData;
      return await db.one(
          `INSERT INTO users (uid, email, display_name, role, photo_url)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING *`,
          [uid, email, displayName, role, photoURL]
      );
  } catch (error) {
      console.error('Error adding user:', error);
      throw error;
  }
};


const getUserByUID = async (uid) => {
  try {
      return await db.one(
          "SELECT * FROM users WHERE uid = $1",
          [uid]
      );
  } catch (error) {
      console.error('Error fetching user by UID:', error);
      throw error;
  }
};

const updateUser = async (uid, updates) => {
  try {
      const { email, displayName, role } = updates;
      return await db.one(
          "UPDATE users SET email = $1, display_name = $2, role = $3 WHERE uid = $4 RETURNING *",
          [email, displayName, role, uid]
      );
  } catch (error) {
      console.error('Error updating user:', error);
      throw error;
  }
};

module.exports = {
  addUser,
  getUserByUID,
  updateUser
};