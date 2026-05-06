import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read and parse JSON mock data from a specific mock data category
function readMockData(category, pid) {
    try {
        // Build absolute path to the JSON file
        const filePath = path.join(__dirname, "../mock_data", category, `${pid}.json`);

        // Read file content as string
        const data = fs.readFileSync(filePath, "utf-8");

        // Convert JSON string to JavaScript object
        return JSON.parse(data);
    } catch (err) {
        // Return null if file does not exist or parsing fails
        console.error(`Error reading ${category} data: `, err.message);
        return null;
    }
}

// Retrieve EoX (End-of-Life) data for a given PID
function getEoxData(pid) {
    return readMockData("eox", pid);
}

// Retrieve suggested software data for a given PID
function getSoftwareData(pid) {
    return readMockData("software", pid);
}

export default { getEoxData, getSoftwareData };