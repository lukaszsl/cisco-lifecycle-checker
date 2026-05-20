import deviceRepository from "../repositories/deviceRepository.js";
import historyRepository from "../repositories/historyRepository.js";
import { formatTimestamp } from "../utils/dateUtils.js";

// Validate required device inventory fields
function validateDevice(device) {
    if (!device.hostname || !device.hostname.trim()) {
        return "Hostname is required";
    }

    if (!device.pid || !device.pid.trim()) {
        return "PID is required";
    }

    return null;
}

// Validate and persist a new device in inventory
async function addDevice(device) {
    const validationError = validateDevice(device);

    if (validationError) return { error: validationError };

    await deviceRepository.createDevice({
        hostname: device.hostname.trim(),
        pid: device.pid.trim().toUpperCase(),
        vendor: device.vendor?.trim() || "Cisco",
        location: device.location?.trim() || null,
        current_version: device.current_version?.trim() || null
    });

    return { success: true };
}

// Retrieve all saved inventory devices with latest lifecycle status
async function getDevices() {
    const devices = await deviceRepository.getDevices();
    const enrichedDevices = [];

    for (const device of devices) {
        const latestCheck = await historyRepository.getLatestCheckByPid(device.pid);

        enrichedDevices.push({
            ...device,
            created_at: formatTimestamp(device.created_at),
            latest_status: latestCheck?.version_status || "NEVER CHECKED",
            last_checked: latestCheck
                ? formatTimestamp(latestCheck.chacked_at)
                : null
        });
    }

    return enrichedDevices
}

// Retrieve one saved inventory device by ID
async function getDeviceById(id) {
    return deviceRepository.getDeviceById(id);
}

export default { addDevice, getDevices, getDeviceById };