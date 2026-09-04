import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-d1-sqlite";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`_topics_v\`;`);
  await db.run(sql`PRAGMA foreign_keys=OFF;`);
  await db.run(sql`CREATE TABLE \`__new_topics\` (
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`parent_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`topics\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_topics\`("id", "name", "slug", "parent_id", "updated_at", "created_at") SELECT "id", "name", "slug", "parent_id", "updated_at", "created_at" FROM \`topics\`;`,
  );
  await db.run(sql`DROP TABLE \`topics\`;`);
  await db.run(sql`ALTER TABLE \`__new_topics\` RENAME TO \`topics\`;`);
  await db.run(sql`PRAGMA foreign_keys=ON;`);
  await db.run(sql`CREATE UNIQUE INDEX \`topics_slug_idx\` ON \`topics\` (\`slug\`);`);
  await db.run(sql`CREATE INDEX \`topics_parent_idx\` ON \`topics\` (\`parent_id\`);`);
  await db.run(sql`CREATE INDEX \`topics_updated_at_idx\` ON \`topics\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`topics_created_at_idx\` ON \`topics\` (\`created_at\`);`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`_topics_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` text,
  	\`version_name\` text,
  	\`version_slug\` text,
  	\`version_parent_id\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`topics\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parent_id\`) REFERENCES \`topics\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(sql`CREATE INDEX \`_topics_v_parent_idx\` ON \`_topics_v\` (\`parent_id\`);`);
  await db.run(
    sql`CREATE INDEX \`_topics_v_version_version_slug_idx\` ON \`_topics_v\` (\`version_slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_topics_v_version_version_parent_idx\` ON \`_topics_v\` (\`version_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_topics_v_version_version_updated_at_idx\` ON \`_topics_v\` (\`version_updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_topics_v_version_version_created_at_idx\` ON \`_topics_v\` (\`version_created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_topics_v_version_version__status_idx\` ON \`_topics_v\` (\`version__status\`);`,
  );
  await db.run(sql`CREATE INDEX \`_topics_v_created_at_idx\` ON \`_topics_v\` (\`created_at\`);`);
  await db.run(sql`CREATE INDEX \`_topics_v_updated_at_idx\` ON \`_topics_v\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`_topics_v_latest_idx\` ON \`_topics_v\` (\`latest\`);`);
  await db.run(sql`PRAGMA foreign_keys=OFF;`);
  await db.run(sql`CREATE TABLE \`__new_topics\` (
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`slug\` text,
  	\`parent_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`topics\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_topics\`("id", "name", "slug", "parent_id", "updated_at", "created_at", "_status") SELECT "id", "name", "slug", "parent_id", "updated_at", "created_at", "_status" FROM \`topics\`;`,
  );
  await db.run(sql`DROP TABLE \`topics\`;`);
  await db.run(sql`ALTER TABLE \`__new_topics\` RENAME TO \`topics\`;`);
  await db.run(sql`PRAGMA foreign_keys=ON;`);
  await db.run(sql`CREATE UNIQUE INDEX \`topics_slug_idx\` ON \`topics\` (\`slug\`);`);
  await db.run(sql`CREATE INDEX \`topics_parent_idx\` ON \`topics\` (\`parent_id\`);`);
  await db.run(sql`CREATE INDEX \`topics_updated_at_idx\` ON \`topics\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`topics_created_at_idx\` ON \`topics\` (\`created_at\`);`);
  await db.run(sql`CREATE INDEX \`topics__status_idx\` ON \`topics\` (\`_status\`);`);
}
