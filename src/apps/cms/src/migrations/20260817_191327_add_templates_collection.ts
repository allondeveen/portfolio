import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-d1-sqlite";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`templates_blocks_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` numeric DEFAULT 2 NOT NULL,
  	\`heading_text\` text NOT NULL,
  	\`variant\` text DEFAULT 'default' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`templates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`templates_blocks_heading_order_idx\` ON \`templates_blocks_heading\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_heading_parent_id_idx\` ON \`templates_blocks_heading\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_heading_path_idx\` ON \`templates_blocks_heading\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`templates_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`templates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`templates_blocks_rich_text_order_idx\` ON \`templates_blocks_rich_text\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_rich_text_parent_id_idx\` ON \`templates_blocks_rich_text\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_rich_text_path_idx\` ON \`templates_blocks_rich_text\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`templates_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`templates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`templates_blocks_hero_order_idx\` ON \`templates_blocks_hero\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_hero_parent_id_idx\` ON \`templates_blocks_hero\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_hero_path_idx\` ON \`templates_blocks_hero\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`templates\` (
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`location\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`templates_location_idx\` ON \`templates\` (\`location\`);`,
  );
  await db.run(sql`CREATE INDEX \`templates_updated_at_idx\` ON \`templates\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`templates_created_at_idx\` ON \`templates\` (\`created_at\`);`);
  await db.run(
    sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`templates_id\` text REFERENCES templates(id);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_templates_id_idx\` ON \`payload_locked_documents_rels\` (\`templates_id\`);`,
  );
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`templates_blocks_heading\`;`);
  await db.run(sql`DROP TABLE \`templates_blocks_rich_text\`;`);
  await db.run(sql`DROP TABLE \`templates_blocks_hero\`;`);
  await db.run(sql`DROP TABLE \`templates\`;`);
  await db.run(sql`PRAGMA foreign_keys=OFF;`);
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`pages_id\` text,
  	\`menu_id\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`menu_id\`) REFERENCES \`menu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "pages_id", "menu_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "pages_id", "menu_id" FROM \`payload_locked_documents_rels\`;`,
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
    sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_menu_id_idx\` ON \`payload_locked_documents_rels\` (\`menu_id\`);`,
  );
}
