import express from "express";
import lifecycleService from "../services/lifecycleService.js";

// Web routes for rendering lifecycle views
const router = express.Router();

// Render the home page with the device check form
router.get("/", (req, res) => {
    res.render("index");
});

// Handle submitted lifecycle check and render result view
router.post("/check", async (req, res) => {
    const { pid, version } = req.body;

    console.log(`[WEB] Lifecycle check submitted for PID: ${pid || "missing"}`);

    const result = await lifecycleService.getLifecycleInfo(pid, version);

    if (result.error) {
        console.warn(`[WEB] Lifecycle check failed: ${result.error}`);
    } else {
        console.log(`[WEB] Lifecycle check completed for PID: ${result.pid}`);
    }

    res.render("result", { result });
});

// Render page with previously saved lifecycle checks
router.get("/history", async (req, res) => {
    console.log("[WEB] Lifecycle history page requested");

    const history = await lifecycleService.getCheckHistory();

    res.render("history", { history });
});

export default router;