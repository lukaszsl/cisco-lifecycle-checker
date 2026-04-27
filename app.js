/* --------------------------

   INITIAL EXPRESS CONFIG  

-------------------------- */
require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// set EJS as template engine

app.set("view engine", "ejs");

// basic route

app.get("/", (req, res) => {
  res.send("Cisco Lifecycle Checker - running");
});

// start server

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});