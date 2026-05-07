import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db;

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
    }

    return db;
}

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
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
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

export default { saveCheck };