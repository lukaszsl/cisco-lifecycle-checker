import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Shared SQLite database connection
let db;

// Initialize SQLite database and create tables if needed
async function getDb() {
    if (!db) {
        db = await open({
            filename: "./database/checks.db",
            driver: sqlite3.Database
        });

        await db.exec(`
            CREATE TABLE IF NOT EXISTS checks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pid TEXT NOT NULL,
                product_name TEXT,
                lifecycle_status TEXT,
                end_of_sale TEXT,
                end_of_support TEXT,
                installed_version TEXT,
                suggested_release TEXT,
                version_status TEXT,
                checked_at TEXT NOT NULL
            )
        `);

        await db.exec(`
            CREATE TABLE IF NOT EXISTS devices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                hostname TEXT NOT NULL,
                pid TEXT NOT NULL,
                vendor TEXT DEFAULT 'Cisco',
                location TEXT,
                current_version TEXT,
                created_at TEXT NOT NULL
            )
        `);
    }

    return db;
}

// Persist a successful lifecycle check in SQLite
async function saveCheck(result) {
    const database = await getDb();

    await database.run(`
        INSERT INTO checks (
            pid,
            product_name,
            lifecycle_status,
            end_of_sale,
            end_of_support,
            installed_version,
            suggested_release,
            version_status,
            checked_at
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            result.pid,
            result.product_name,
            result.lifecycle_status,
            result.end_of_sale,
            result.end_of_support,
            result.installed_version,
            result.suggested_release,
            result.version_status,
            new Date().toISOString()
        ]
    );
}

// Retrieve previously saved lifecycle checks ordered by newest first
async function getHistory(limit) {
    const database = await getDb();

    return database.all(`
        SELECT *
        FROM checks
        ORDER BY checked_at DESC
        LIMIT ?
    `, [limit]);
}

export { getDb };
export default { saveCheck, getHistory };