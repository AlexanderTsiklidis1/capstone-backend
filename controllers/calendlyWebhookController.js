const express = require("express");
const { saveEvent } = require("../queries/calendly");
const calendlyWebhook = express.Router();

calendlyWebhook.post("/", async (req, res) => {
  const data = req.body;
  console.log(data,"$$$$$$$$$$$$$$")
  const joinUrl = data.scheduled_event.location.join_url;
  const zoomMeetingId = joinUrl.split('/j/')[1].split('?')[0];
  const zoomPassword = new URLSearchParams(joinUrl.split('?')[1]).get('pwd');

  const eventDetails = {
    zoomMeetingId,
    zoomPassword,
    ...data // Include other data as needed
  };

  try {
    const savedEvent = await saveEvent(eventDetails);
    console.log(savedEvent,"$$$$$$$$$$$$$$")
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error saving Calendly event:", error);
    res.status(500).json({ error: "Failed to save Calendly event" });
  }
});

module.exports = calendlyWebhook;
