/* --------------------------

   INITIAL EXPRESS CONFIG  

-------------------------- */
require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// set EJS as template engine

app.set("view engine", "ejs");

// // parse URL-encoded form data so submitted form fields are available in req.body

app.use(express.urlencoded({ extended: true }));

// basic route

app.get("/", (req, res) => {
  res.render("index");
});

// handle submitted device check form and read user input from req.body

app.post("/check", (req, res) => {
    console.log(req.body); // TODO: Remove in the final stage
    res.send(`You entered PID: ${req.body.pid}`);
});

// start server

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});