import { getDb } from "./historyRepository.js";

// Create a new device in inventory
async function createDevice(device) {
    const database = await getDb();

    await database.run(
        `
        INSERT INTO devices (
            hostname,
            pid,
            vendor,
            location,
            current_version,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
            device.hostname,
            device.pid,
            device.vendor || "Cisco",
            device.location || null,
            device.current_version || null,
            new Date().toISOString()
        ]
    );
}

// Retrieve all saved devices ordered by newest first
async function getDevices() {
    const database = await getDb();

    return database.all(`
        SELECT *
        FROM devices
        ORDER BY created_at DESC
    `);
}

// Retrieve a single device from inventory by ID
async function getDeviceById(id) {
    const database = await getDb();

    return database.get(`
        SELECT *
        FROM devices
        WHERE id = ?
    `, [id]);
}

export default { createDevice, getDevices, getDeviceById };