import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-d1-sqlite";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`projects_blocks_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` numeric DEFAULT 2,
  	\`heading_text\` text,
  	\`variant\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`projects_blocks_heading_order_idx\` ON \`projects_blocks_heading\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`projects_blocks_heading_parent_id_idx\` ON \`projects_blocks_heading\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`projects_blocks_heading_path_idx\` ON \`projects_blocks_heading\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`projects_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`projects_blocks_rich_text_order_idx\` ON \`projects_blocks_rich_text\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`projects_blocks_rich_text_parent_id_idx\` ON \`projects_blocks_rich_text\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`projects_blocks_rich_text_path_idx\` ON \`projects_blocks_rich_text\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`projects_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`projects_blocks_hero_order_idx\` ON \`projects_blocks_hero\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`projects_blocks_hero_parent_id_idx\` ON \`projects_blocks_hero\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`projects_blocks_hero_path_idx\` ON \`projects_blocks_hero\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`projects\` (
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`slug\` text DEFAULT '',
  	\`title\` text DEFAULT '',
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(sql`CREATE UNIQUE INDEX \`projects_slug_idx\` ON \`projects\` (\`slug\`);`);
  await db.run(
    sql`CREATE INDEX \`projects_meta_meta_image_idx\` ON \`projects\` (\`meta_image_id\`);`,
  );
  await db.run(sql`CREATE INDEX \`projects_updated_at_idx\` ON \`projects\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`);
  await db.run(sql`CREATE INDEX \`projects__status_idx\` ON \`projects\` (\`_status\`);`);
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` numeric DEFAULT 2,
  	\`heading_text\` text,
  	\`variant\` text DEFAULT 'default',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_projects_v_blocks_heading_order_idx\` ON \`_projects_v_blocks_heading\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_blocks_heading_parent_id_idx\` ON \`_projects_v_blocks_heading\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_blocks_heading_path_idx\` ON \`_projects_v_blocks_heading\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_projects_v_blocks_rich_text_order_idx\` ON \`_projects_v_blocks_rich_text\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_blocks_rich_text_parent_id_idx\` ON \`_projects_v_blocks_rich_text\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_blocks_rich_text_path_idx\` ON \`_projects_v_blocks_rich_text\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`_projects_v_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_projects_v_blocks_hero_order_idx\` ON \`_projects_v_blocks_hero\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_blocks_hero_parent_id_idx\` ON \`_projects_v_blocks_hero\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_blocks_hero_path_idx\` ON \`_projects_v_blocks_hero\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`_projects_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` text,
  	\`version_slug\` text DEFAULT '',
  	\`version_title\` text DEFAULT '',
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(sql`CREATE INDEX \`_projects_v_parent_idx\` ON \`_projects_v\` (\`parent_id\`);`);
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_version_slug_idx\` ON \`_projects_v\` (\`version_slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_meta_version_meta_image_idx\` ON \`_projects_v\` (\`version_meta_image_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_version_updated_at_idx\` ON \`_projects_v\` (\`version_updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_version_created_at_idx\` ON \`_projects_v\` (\`version_created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_version__status_idx\` ON \`_projects_v\` (\`version__status\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_created_at_idx\` ON \`_projects_v\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_updated_at_idx\` ON \`_projects_v\` (\`updated_at\`);`,
  );
  await db.run(sql`CREATE INDEX \`_projects_v_latest_idx\` ON \`_projects_v\` (\`latest\`);`);
  await db.run(
    sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`projects_id\` text REFERENCES projects(id);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`,
  );
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`projects_blocks_heading\`;`);
  await db.run(sql`DROP TABLE \`projects_blocks_rich_text\`;`);
  await db.run(sql`DROP TABLE \`projects_blocks_hero\`;`);
  await db.run(sql`DROP TABLE \`projects\`;`);
  await db.run(sql`DROP TABLE \`_projects_v_blocks_heading\`;`);
  await db.run(sql`DROP TABLE \`_projects_v_blocks_rich_text\`;`);
  await db.run(sql`DROP TABLE \`_projects_v_blocks_hero\`;`);
  await db.run(sql`DROP TABLE \`_projects_v\`;`);
  await db.run(sql`PRAGMA foreign_keys=OFF;`);
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text,
  	\`menu_id\` text,
  	\`templates_id\` text,
  	\`users_id\` integer,
  	\`media_id\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`menu_id\`) REFERENCES \`menu\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`templates_id\`) REFERENCES \`templates\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "pages_id", "menu_id", "templates_id", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "pages_id", "menu_id", "templates_id", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`,
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
