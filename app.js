/* =========================
   INITIAL EXPRESS CONFIG
========================= */

require("dotenv").config();

const express = require("express");
const lifecycleService = require("./services/lifecycleService");

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the template engine for rendering views
app.set("view engine", "ejs");

// Parse URL-encoded form data so submitted form fields are available in req.body
app.use(express.urlencoded({ extended: true }));

// Render the home page with the device check form
app.get("/", (req, res) => {
  res.render("index");
});

// Handle submitted device check form and return lifecycle data for the given PID
app.post("/check", (req, res) => {
    const { pid } = req.body;
    const result = lifecycleService.getLifecycleInfo(pid);

    res.render("result", { result });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});