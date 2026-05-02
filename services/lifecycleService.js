const repository = require("../repositories/mockRepository");

// Compare installed version with suggested release and return simple status
function evaluateVersionStatus(installedVersion, suggestedRelease) {
    if (!installedVersion || !suggestedRelease) return "UNKNOWN";
    if (installedVersion === suggestedRelease) return "UP TO DATE";
    return "OUTDATED"; 
}

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

    // Prepare clean values for response and evaluation
    const cleanInstalledVersion = installedVersion || null;
    const suggestedRelease = softwareData?.suggested_release || null;
    const versionStatus = evaluateVersionStatus(cleanInstalledVersion, suggestedRelease);
    
    // Combine lifecycle, software, and evaluation data into one response object
    return {
        ...eoxData,
        installed_version: cleanInstalledVersion,
        suggested_release: suggestedRelease,
        version_status: versionStatus
    };
}

module.exports = { getLifecycleInfo };