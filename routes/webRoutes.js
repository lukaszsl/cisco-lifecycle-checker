const express = require("express");
const lifecycleService = require("../services/lifecycleService");

// Web routes for rendering lifecycle views
const router = express.Router();

// Render the home page with the device check form
router.get("/", (req, res) => {
    res.render("index");
});

// Handle submitted device check form and render lifecycle/software result
router.post("/check", (req, res) => {
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

module.exports = router;