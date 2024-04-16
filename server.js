require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');




const PORT = 9000;
const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(bodyParser.json());

const usersController = require("./controllers/usersController");
app.use("/users", usersController)

const interviewsController = require("./controllers/interviewsController");
app.use("/interviews", interviewsController)

const feedbackController = require("./controllers/feedbackController")
app.use("/feedback", feedbackController)

const calendlyWebhookController = require("./controllers/calendlyWebhookController");
app.use("/", calendlyWebhookController);


const promptsController = require("./controllers/promptsController");
app.use("/prompts", promptsController)


const zoomAuthEndpoint = require("./controllers/zoomAuthEndpointController")
app.use('/zoom-signature', zoomAuthEndpoint);


//
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//
app.get("/get-token", (req, res) => {
  // Generate authToken using API key and secret key
  const authToken = generateAuthToken();

  res.json({ authToken });
});

app.get('/events/:calendlyEventId', async (req, res) => {
  const { calendlyEventId } = req.params;
  try {
      const interviewDetails = await db.one('SELECT * FROM events WHERE calendly_event_id = $1', calendlyEventId);
      res.json(interviewDetails);
  } catch (error) {
      console.error('Error fetching interview details:', error);
      res.status(404).send('Interview not found');
  }
});

//
app.listen(PORT, () => {
  console.log(`API server listening at http://localhost:${PORT}`);
});


app.post('/zoom-signature', (req, res) => {

});
