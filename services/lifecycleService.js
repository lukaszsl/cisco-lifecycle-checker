const repository = require("../repositories/mockRepository");

// Retrieve lifecycle information for a given device PID
function getLifecycleInfo(pid, installedVersion) {
    // Normalize user input to match file naming convention (trim spaces, uppercase)
    const normalizedPid = pid.trim().toUpperCase();
    // Fetch EoX and software data from repository (data layer)
    const eoxData = repository.getEoxData(normalizedPid);
    const softwareData = repository.getSoftwareData(normalizedPid);
    
    // Handle case where device is not found in mock data
    if (!eoxData) {
        return { error: "Device not found" };
    }

    // Combine lifecycle and software data into a single response object
    return {
        ...eoxData,
        installed_version: installedVersion || null,
        suggested_release: softwareData?.suggested_release || null
    };
}

module.exports = { getLifecycleInfo };