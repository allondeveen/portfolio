import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-d1-sqlite";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`clients\` (
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
  await db.run(sql`CREATE UNIQUE INDEX \`clients_slug_idx\` ON \`clients\` (\`slug\`);`);
  await db.run(sql`CREATE INDEX \`clients_updated_at_idx\` ON \`clients\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`clients_created_at_idx\` ON \`clients\` (\`created_at\`);`);
  await db.run(
    sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`clients_id\` text REFERENCES clients(id);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_clients_id_idx\` ON \`payload_locked_documents_rels\` (\`clients_id\`);`,
  );
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`clients\`;`);
  await db.run(sql`PRAGMA foreign_keys=OFF;`);
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text,
  	\`projects_id\` text,
  	\`articles_id\` text,
  	\`topics_id\` text,
  	\`series_id\` text,
  	\`menu_id\` text,
  	\`templates_id\` text,
  	\`users_id\` integer,
  	\`media_id\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`articles_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`topics_id\`) REFERENCES \`topics\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`series_id\`) REFERENCES \`series\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`menu_id\`) REFERENCES \`menu\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`templates_id\`) REFERENCES \`templates\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "pages_id", "projects_id", "articles_id", "topics_id", "series_id", "menu_id", "templates_id", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "pages_id", "projects_id", "articles_id", "topics_id", "series_id", "menu_id", "templates_id", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`,
  );
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`);
  await db.run(
    sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`,
  );
  await db.run(sql`PRAGMA foreign_keys=ON;`);
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_articles_id_idx\` ON \`payload_locked_documents_rels\` (\`articles_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_topics_id_idx\` ON \`payload_locked_documents_rels\` (\`topics_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_series_id_idx\` ON \`payload_locked_documents_rels\` (\`series_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_menu_id_idx\` ON \`payload_locked_documents_rels\` (\`menu_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_templates_id_idx\` ON \`payload_locked_documents_rels\` (\`templates_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`,
  );
}
