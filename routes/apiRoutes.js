import express from "express";
import lifecycleService from "../services/lifecycleService.js";

// API routes for lifecycle lookup and JSON responses
const router = express.Router();

// Return lifecycle/software result as JSON for API clients
// - 400: validation errors (missing or invalid PID)
// - 404: valid request but device not found
// - 200: successful response with lifecycle data
router.get("/lifecycle", async (req, res) => {
    const { pid, version } = req.query;

    console.log(`[API] Lifecycle check requested for PID: ${pid || "missing"}`);

    const result = await lifecycleService.getLifecycleInfo(pid, version);
    
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

// Return saved lifecycle check history as JSON
router.get("/history", async (req, res) => {
    console.log("[API] Lifecycle history requested");

    const history = await lifecycleService.getCheckHistory();

    return res.json(history);
});

export default router;