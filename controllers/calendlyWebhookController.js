const express = require("express");
const { saveEvent } = require("../queries/calendly");
const calendlyWebhook = express.Router();

calendlyWebhook.post("/", async (req, res) => {
  const data = req.body;
  if(data.payload.scheduled_event?.location?.data) {
  console.log(data,"$$$$$$$$$$$$$$")
  //if we have data, we want to save the data! so if we dont have data, do nothing!
  res.send(data)
}
  const { id , password } = data.payload.scheduled_event.location.data
  const {email, name} = data.payload
  const {user_email, user_name} = data.payload.scheduled_event.event_memberships[0];
  const start_time = data.payload.scheduled_event.start_time
 
  
  

  const eventDetails = {
    id,
    password,
    email,
    name,
    user_email,
    user_name,
    start_time
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
