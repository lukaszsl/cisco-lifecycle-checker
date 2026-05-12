import deviceRepository from "../repositories/deviceRepository.js";
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

// Retrieve all saved inventory devices
async function getDevices() {
    const devices = await deviceRepository.getDevices();

    return devices.map((device) => ({
        ...device,
        created_at: formatTimestamp(device.created_at)
    }));
}

// Retrieve one saved inventory device by ID
async function getDeviceById(id) {
    return deviceRepository.getDeviceById(id);
}

export default { addDevice, getDevices, getDeviceById };