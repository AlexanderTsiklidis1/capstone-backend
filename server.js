require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

const PORT = 9000;
const app = express();
const API_KEY = process.env.VIDEOSDK_API_KEY;
const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;

console.log(API_KEY, SECRET_KEY)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//
app.get("/get-token", async (req, res) => {
  console.log("Token acquired")
  const fetch = await import("node-fetch");

  const options = { expiresIn: "1000m", algorithm: "HS256" };

  const payload = {
    apikey: API_KEY,
    permissions: ["allow_join", "allow_mod"], // also accepts "ask_join"
  };

  const token = jwt.sign(payload, SECRET_KEY, options);
  res.json({ token });
});

//
app.post("/create", async (req, res) => {
  const { token, region } = req.body;
  const fetch = await import("node-fetch");

  const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings`;
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({ region }),
  };

  try {
    const response = await fetch.default(url, options);
    const result = await response.json();

    // Extract the meeting ID from the response
    const { meetingId } = result;

    // Redirect the user to a new page with the meeting ID in the URL
    res.redirect(`/meeting/${meetingId}`);
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(500).json({ error: "Failed to create meeting" });
  }
});


//
app.post("/validate-meeting/:meetingId", async (req, res) => {
  const token = req.body.token;
  const meetingId = req.params.meetingId;

  const fetch = await import("node-fetch");
  const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings/${meetingId}`;
  const options = {
    method: "POST",
    headers: { Authorization: token },
  };

  try {
    const response = await fetch.default(url, options);
    const result = await response.json();
    res.json(result); // result will contain meetingId
  } catch (error) {
    console.error("Error validating meeting:", error);
    res.status(500).json({ error: "Failed to validate meeting" });
  }
});

//
app.listen(PORT, () => {
  console.log(`API server listening at http://localhost:${PORT}`);
});



// require("dotenv").config();
// const PORT = process.env.PORT;


// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });