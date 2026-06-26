const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config();

async function runMigrations() {
  console.log("[INFO] Starting Semsar database migration process...");

  const connection = await mysql.createConnection({
    uri: process.env.uri,
    multipleStatements: true,
  });

  try {
    const migrationsDir = path.join(__dirname);

    const files = fs.readdirSync(migrationsDir).sort();

    for (const file of files) {
      if (file.endsWith(".sql")) {
        console.log(`[PROCESS] Executing migration file: ${file}`);
        const filePath = path.join(migrationsDir, file);
        const sqlQuery = fs.readFileSync(filePath, "utf8");
        await connection.query(sqlQuery);
        console.log(`[SUCCESS] Tables created successfully from: ${file}`);
      }
    }
    console.log("[INFO] Database migration completed successfully.");
  } catch (error) {
    console.error(`[ERROR] Migration failed: ${error.message}`);
  } finally {
    await connection.end();
    process.exit();
  }
}

runMigrations();
