const express = require("express");
const { saveEvent } = require("../queries/calendly");
const calendlyWebhook = express.Router();

calendlyWebhook.post("/", async (req, res) => {
  const data = req.body;
  const date = new Date
  console.log(`calendly webhook was hit now ${date}`)
  

  // Check if the necessary data is present
  if (!data.payload || !data.payload.scheduled_event || !data.payload.scheduled_event.location?.data) {
    // If the necessary data is not present, log and return immediately
    console.error("Missing data in payload");
    return res.status(400).json({ error: "Missing data in payload" });
  }
  const { id, password } = data.payload.scheduled_event.location.data;
  const { email, name } = data.payload || {}; // Assuming invitee details are directly under payload
  const user_email = data.payload.scheduled_event.event_memberships[0]?.user_email;
  const user_name = data.payload.scheduled_event.event_memberships[0]?.user_name;
  const start_time = data.payload.scheduled_event.start_time;
  const meeting_link = data.payload.scheduled_event.location.join_url;
  
  const eventDetails = {
    meeting_link,
    id,
    password,
    email,
    name,
    user_email,
    user_name,
    start_time,
    meeting_link
  };

  try {
    const savedEvent = await saveEvent(eventDetails);
    console.log("Event saved successfully:", savedEvent);
    return res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error saving Calendly event:", error);
    return res.status(500).json({ error: "Failed to save Calendly event" });
  }
});

module.exports = calendlyWebhook;
