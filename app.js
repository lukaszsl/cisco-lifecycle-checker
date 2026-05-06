/* =========================
   INITIAL EXPRESS CONFIG
========================= */

import "dotenv/config";

import express from "express";
import apiRoutes from "./routes/apiRoutes.js";
import webRoutes from "./routes/webRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the template engine for rendering views
app.set("view engine", "ejs");

// Serve static assets from the public folder
app.use(express.static("public"));

// Parse URL-encoded form data so submitted form fields are available in req.body
app.use(express.urlencoded({ extended: true }));


/* =========================
   ROUTES
========================= */

app.use("/", webRoutes);
app.use("/api", apiRoutes);


/* =========================
   EXPRESS SERVER
========================= */

// Start the Express server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});