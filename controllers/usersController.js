const express = require("express");
const { addUser, getUserByUID, updateUser } = require("../queries/users");

const users = express.Router();

users.post("/", async (req, res) => {
  try {
      const { uid, email, displayName, role } = req.body;
      const newUser = await addUser({ uid, email, displayName, role });
      res.status(201).json(newUser);
  } catch (error) {
      console.error('Error in adding new user:', error.message);
      res.status(500).json({ error: 'Error adding user', message: error.message });
  }
});

users.get("/:uid", async (req, res) => {
  try {
      const { uid } = req.params;
      const user = await getUserByUID(uid);
      res.json(user);
  } catch (error) {
      console.error('Error in fetching user:', error.message);
      if (error.message.includes('No data returned')) {
          res.status(404).json({ error: 'User not found' });
      } else {
          res.status(500).json({ error: 'Error fetching user', message: error.message });
      }
  }
});

users.put("/:uid", async (req, res) => {
  try {
      const { uid } = req.params;
      const updates = req.body;
      const updatedUser = await updateUser(uid, updates);
      res.json(updatedUser);
  } catch (error) {
      console.error('Error in updating user:', error.message);
      res.status(500).json({ error: 'Error updating user', message: error.message });
  }
});

module.exports = users;
