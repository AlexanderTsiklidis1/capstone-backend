const express = require("express");
const { getOneUser } = require("../queries/users");

const users = express.Router();

users.get("/:id", async (req, res) => {
  const { id } = req.params;
  const oneUser = await getOneUser(id);
  if (oneUser) {
    res.json(oneUser);
  } else {
    res.status(404).json({ error: "User not found." });
  }
});

module.exports = users;
