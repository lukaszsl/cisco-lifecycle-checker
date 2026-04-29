const repository = require("../repositories/mockRepository");

// Retrieve lifecycle information for a given device PID
function getLifecycleInfo(pid) {
    // Normalize user input to match file naming convention (trim spaces, uppercase)
    const normalizedPid = pid.trim().toUpperCase();
    // Fetch EoX data from repository (data layer)
    const eoxData = repository.getEoxData(normalizedPid);
    
    // Handle case where device is not found in mock data
    if (!eoxData) {
        return { error: "Device not found" };
    }

    // Return lifecycle data (will be extended with more logic later)
    return eoxData;
}

module.exports = { getLifecycleInfo };