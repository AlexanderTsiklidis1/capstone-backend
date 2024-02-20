const cors = require("cors");
const express = require("express");
const app = express();



app.use(cors());
app.use(express.json());


app.get("/", (req, response) => {
    response.send("Welcome");
});

//need to import variable for variable controller 
//and then use to built endpoint on website 

app.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found" });
});

module.exports = app;