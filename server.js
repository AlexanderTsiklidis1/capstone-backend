require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const PORT = 9000;
const app = express();

console.log(process.env.VIDEOSDK_API_KEY, process.env.VIDEOSDK_SECRET_KEY);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//
app.get("/get-token", (req, res) => {

  console.log("Token acquired")

  const jwt = require("jsonwebtoken");

  const options = { expiresIn: "1000m", algorithm: "HS256" };

  const payload = {
    apikey: process.env.VIDEOSDK_API_KEY,
    permissions: ["allow_join", "allow_mod"], // also accepts "ask_join"
  };

  const token = jwt.sign(payload, process.env.VIDEOSDK_SECRET_KEY, options);
  res.json({ token });
});

//
app.post("/create", (req, res) => {
  const { token, region } = req.body;
  const fetch = require("node-fetch");
  const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings`;
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({ region }),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => res.json(result)) // result will contain meetingId
    .catch((error) => console.error("error", error));
});

//
app.post("/validate-meeting/:meetingId", (req, res) => {
  const token = req.body.token;
  const meetingId = req.params.meetingId;

  const fetch = require("node-fetch");
  const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings/${meetingId}`;

  const options = {
    method: "POST",
    headers: { Authorization: token },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => res.json(result)) // result will contain meetingId
    .catch((error) => console.error("error", error));
});

//
app.listen(PORT, () => {
  console.log(`API server listening at http://localhost:${PORT}`);
});
