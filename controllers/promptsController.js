const express = require("express");
const prompts = express.Router({ mergeParams: true });
const { getAllPrompts, getOnePrompt } = require("../queries/prompts");

prompts.get("/", async (req, res) => {
  try {
    const allPrompts = await getAllPrompts();
    res.json(allPrompts);
  } catch (error) {
    res.json(error);
  }
});

prompts.get("/:promptId", async (req, res) => {
  const { id } = req.params;
  try {
    const onePrompt = await getOnePrompt(id);
    res.json(onePrompt);
  } catch (error) {
    res.json(error);
  }
});

module.exports = prompts;
