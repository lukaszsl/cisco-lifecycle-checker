const repository = require("../repositories/mockRepository");

// Compare two dot-separated version strings numerically
function compareVersions(installedVersion, suggestedRelease) {
    const installedParts = installedVersion.split(".").map(Number);
    const suggestedParts = suggestedRelease.split(".").map(Number);

    const maxLength = Math.max(installedParts.length, suggestedParts.length);

    for (let i = 0; i < maxLength; i++) {
        const installedPart = installedParts[i] || 0;
        const suggestedPart = suggestedParts[i] || 0;

        if (installedPart < suggestedPart) return -1;
        if (installedPart > suggestedPart) return 1;
    }

    return 0;
}

// Compare installed version with suggested release and return simple status
function evaluateVersionStatus(installedVersion, suggestedRelease) {
    if (!installedVersion || !suggestedRelease) return "UNKNOWN";
    
    const comparison = compareVersions(installedVersion, suggestedRelease);

    if (comparison === 0) return "UP TO DATE";
    if (comparison < 0) return "OUTDATED";

    return "NEWER THAN SUGGESTED";
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