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

// Serve static assets from the public folder
app.use(express.static("public"));

// Parse URL-encoded form data so submitted form fields are available in req.body
app.use(express.urlencoded({ extended: true }));


/* =========================
   HTTP ENDPOINTS
========================= */

// Render the home page with the device check form
app.get("/", (req, res) => {
	res.render("index");
});

// Handle submitted device check form and render lifecycle/software result
app.post("/check", (req, res) => {
    const { pid, version } = req.body;

	console.log(`[WEB] Lifecycle check submitted for PID: ${pid || "missing"}`);

    const result = lifecycleService.getLifecycleInfo(pid, version);

	if (result.error) {
		console.warn(`[WEB] Lifecycle check failed: ${result.error}`);
	} else {
		console.log(`[WEB] Lifecycle check completed for PID: ${result.pid}`);
	}

    res.render("result", { result });
});


/* =========================
   API ENDPOINTS
========================= */

// Return lifecycle/software result as JSON for API clients
// - 400: validation errors (missing or invalid PID)
// - 404: valid request but device not found
// - 200: successful response with lifecycle data
app.get("/api/lifecycle", (req, res) => {
	const { pid, version } = req.query;

	console.log(`[API] Lifecycle check requested for PID: ${pid || "missing"}`);

	const result = lifecycleService.getLifecycleInfo(pid, version);
	
	if (result.error) {
		console.warn(`[API] Lifecycle check failed: ${result.error}`);

		if (result.error === "PID is required" || result.error.includes("PID can only")) {
			return res.status(400).json(result);
		}

		return res.status(404).json(result);
	}

	console.log(`[API] Lifecycle check completed for PID: ${result.pid}`);

	return res.json(result);
});


/* =========================
   EXPRESS SERVER
========================= */

// Start the Express server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});