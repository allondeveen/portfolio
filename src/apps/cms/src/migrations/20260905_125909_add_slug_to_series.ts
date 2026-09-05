import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-d1-sqlite";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`series\` ADD \`slug\` text NOT NULL;`);
  await db.run(sql`CREATE UNIQUE INDEX \`series_slug_idx\` ON \`series\` (\`slug\`);`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`series_slug_idx\`;`);
  await db.run(sql`ALTER TABLE \`series\` DROP COLUMN \`slug\`;`);
}
