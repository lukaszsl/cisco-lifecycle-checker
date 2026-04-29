const fs = require("fs");
const path = require("path");

// Retrieve EoX (End-of-Life) data for a given PID from local mock JSON files
function getEoxData(pid) {
    try {
        // Build absolute path to the JSON file (safe across OS)
        const filePath = path.join(__dirname, "../mock_data/eox", `${pid}.json`);

        // Read file content as string
        const data = fs.readFileSync(filePath, "utf-8");

        // Convert JSON string to JavaScript object
        return JSON.parse(data);
    } catch (err) {
        // Return null if file does not exist or parsing fails
        console.error("Error reading EoX data: ", err.message);
        return null;
    }
}

module.exports = { getEoxData };