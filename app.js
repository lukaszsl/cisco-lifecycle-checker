/* --------------------------

   INITIAL EXPRESS CONFIG  

-------------------------- */

const express = require("express");
const app = express();

// set EJS as template engine

app.set("view engine", "ejs");

// basic route

app.get("/", (req, res) => {

  res.send("Cisco Lifecycle Checker - running");

});

// start server

app.listen(3000, () => {

  console.log("Server running on http://localhost:3000");

});