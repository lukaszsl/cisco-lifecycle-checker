import repository from "../repositories/mockRepository.js";
import historyRepository from "../repositories/historyRepository.js";

// Default number of lifecycle history records returned when no limit is provided
const DEFAULT_HISTORY_LIMIT = 5;

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

// Validate PID input before using it for mock data lookup
function validatePid(pid) {
    if (!pid || !pid.trim()) return "PID is required";

    const normalizedPid = pid.trim().toUpperCase();

    if (!/^[A-Z0-9-]+$/.test(normalizedPid)) {
        return "PID can only contain letters, numbers, and hyphens";
    }

    return null;
}

// Build lifecycle result, evaluate software status, and persist successful checks
async function getLifecycleInfo(pid, installedVersion) {
    const validationError = validatePid(pid);

    if (validationError) return { error: validationError };

    const normalizedPid = pid.trim().toUpperCase();

    const eoxData = repository.getEoxData(normalizedPid);
    const softwareData = repository.getSoftwareData(normalizedPid);

    if (!eoxData) {
        return { error: "Device not found" };
    }

    const cleanInstalledVersion = installedVersion?.trim() || null;
    const suggestedRelease = softwareData?.suggested_release || null;
    const versionStatus = evaluateVersionStatus(cleanInstalledVersion, suggestedRelease);
    
    const result = {
        ...eoxData,
        installed_version: cleanInstalledVersion,
        suggested_release: suggestedRelease,
        version_status: versionStatus
    };

    await historyRepository.saveCheck(result);

    return result;
}

async function getCheckHistory(limit=DEFAULT_HISTORY_LIMIT) {
    return historyRepository.getHistory(limit);
}

export default { getLifecycleInfo, getCheckHistory };