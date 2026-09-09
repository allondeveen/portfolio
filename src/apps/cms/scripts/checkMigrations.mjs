import { readdir } from "node:fs/promises";
import path from "node:path";
import pg from "pg";

const migrationsDir = path.resolve("src/migrations");

const files = await readdir(migrationsDir);

const localMigrations = files
  .filter((file) => /^\d+_.+\.ts$/.test(file))
  .map((file) => file.replace(/\.ts$/, ""));

const client = new pg.Client({
  connectionString: process.env.DATABASE_CONNECTIONSTRING,
});

try {
  await client.connect();

  let ranMigrations = new Set();

  try {
    const result = await client.query('SELECT name FROM "payload_migrations"');

    ranMigrations = new Set(result.rows.map(({ name }) => name));
  } catch (error) {
    if (error.code !== "42P01") {
      throw error;
    }

    // Fresh database: Payload hasn't created the migrations table yet.
  }

  const pending = localMigrations.filter((migration) => !ranMigrations.has(migration));

  if (pending.length > 0) {
    console.log("Pending migrations:");

    pending.forEach((migration) => {
      console.log(`- ${migration}`);
    });

    process.exitCode = 1;
  } else {
    console.log("Database is up to date.");
    process.exitCode = 0;
  }
} finally {
  await client.end();
}
