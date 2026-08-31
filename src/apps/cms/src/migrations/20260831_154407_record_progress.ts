import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-d1-sqlite";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`templates_blocks_stack\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`templates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`templates_blocks_stack_order_idx\` ON \`templates_blocks_stack\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_stack_parent_id_idx\` ON \`templates_blocks_stack\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_stack_path_idx\` ON \`templates_blocks_stack\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`templates_blocks_menu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`menu_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`menu_id\`) REFERENCES \`menu\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`templates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`templates_blocks_menu_order_idx\` ON \`templates_blocks_menu\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_menu_parent_id_idx\` ON \`templates_blocks_menu\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_menu_path_idx\` ON \`templates_blocks_menu\` (\`_path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_menu_menu_idx\` ON \`templates_blocks_menu\` (\`menu_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`templates_blocks_grid_item\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` numeric DEFAULT 1 NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`templates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`templates_blocks_grid_item_order_idx\` ON \`templates_blocks_grid_item\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_grid_item_parent_id_idx\` ON \`templates_blocks_grid_item\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_grid_item_path_idx\` ON \`templates_blocks_grid_item\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`templates_blocks_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`vertical_align\` integer DEFAULT false,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`templates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`templates_blocks_grid_order_idx\` ON \`templates_blocks_grid\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_grid_parent_id_idx\` ON \`templates_blocks_grid\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_grid_path_idx\` ON \`templates_blocks_grid\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`templates_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`templates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`templates_blocks_image_order_idx\` ON \`templates_blocks_image\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_image_parent_id_idx\` ON \`templates_blocks_image\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_image_path_idx\` ON \`templates_blocks_image\` (\`_path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_image_image_idx\` ON \`templates_blocks_image\` (\`image_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`maintenance_blocks_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` numeric DEFAULT 2 NOT NULL,
  	\`heading_text\` text NOT NULL,
  	\`variant\` text DEFAULT 'default' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`maintenance\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_heading_order_idx\` ON \`maintenance_blocks_heading\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_heading_parent_id_idx\` ON \`maintenance_blocks_heading\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_heading_path_idx\` ON \`maintenance_blocks_heading\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`maintenance_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`maintenance\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_rich_text_order_idx\` ON \`maintenance_blocks_rich_text\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_rich_text_parent_id_idx\` ON \`maintenance_blocks_rich_text\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_rich_text_path_idx\` ON \`maintenance_blocks_rich_text\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`maintenance_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`maintenance\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_hero_order_idx\` ON \`maintenance_blocks_hero\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_hero_parent_id_idx\` ON \`maintenance_blocks_hero\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_hero_path_idx\` ON \`maintenance_blocks_hero\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`maintenance_blocks_stack\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`maintenance\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_stack_order_idx\` ON \`maintenance_blocks_stack\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_stack_parent_id_idx\` ON \`maintenance_blocks_stack\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_stack_path_idx\` ON \`maintenance_blocks_stack\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`maintenance_blocks_menu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`menu_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`menu_id\`) REFERENCES \`menu\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`maintenance\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_menu_order_idx\` ON \`maintenance_blocks_menu\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_menu_parent_id_idx\` ON \`maintenance_blocks_menu\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_menu_path_idx\` ON \`maintenance_blocks_menu\` (\`_path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_menu_menu_idx\` ON \`maintenance_blocks_menu\` (\`menu_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`maintenance_blocks_grid_item\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` numeric DEFAULT 1 NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`maintenance\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_grid_item_order_idx\` ON \`maintenance_blocks_grid_item\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_grid_item_parent_id_idx\` ON \`maintenance_blocks_grid_item\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_grid_item_path_idx\` ON \`maintenance_blocks_grid_item\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`maintenance_blocks_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`vertical_align\` integer DEFAULT false,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`maintenance\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_grid_order_idx\` ON \`maintenance_blocks_grid\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_grid_parent_id_idx\` ON \`maintenance_blocks_grid\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_grid_path_idx\` ON \`maintenance_blocks_grid\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`maintenance_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`maintenance\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_image_order_idx\` ON \`maintenance_blocks_image\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_image_parent_id_idx\` ON \`maintenance_blocks_image\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_image_path_idx\` ON \`maintenance_blocks_image\` (\`_path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_image_image_idx\` ON \`maintenance_blocks_image\` (\`image_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`maintenance\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `);
  await db.run(sql`PRAGMA foreign_keys=OFF;`);
  await db.run(sql`CREATE TABLE \`__new_media\` (
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`alt\` text NOT NULL,
  	\`type\` text DEFAULT 'image' NOT NULL,
  	\`prefix\` text,
  	\`caption\` text,
  	\`credits\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_media\`("id", "name", "alt", "type", "prefix", "caption", "credits", "updated_at", "created_at", "url", "thumbnail_u_r_l", "filename", "mime_type", "filesize", "width", "height") SELECT "id", "name", "alt", "type", "prefix", "caption", "credits", "updated_at", "created_at", "url", "thumbnail_u_r_l", "filename", "mime_type", "filesize", "width", "height" FROM \`media\`;`,
  );
  await db.run(sql`DROP TABLE \`media\`;`);
  await db.run(sql`ALTER TABLE \`__new_media\` RENAME TO \`media\`;`);
  await db.run(sql`PRAGMA foreign_keys=ON;`);
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`);
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`);
  await db.run(sql`CREATE TABLE \`__new_pages\` (
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`parent_id\` text,
  	\`slug\` text DEFAULT '',
  	\`title\` text DEFAULT '',
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_pages\`("id", "parent_id", "slug", "title", "meta_title", "meta_description", "meta_image_id", "updated_at", "created_at", "_status") SELECT "id", "parent_id", "slug", "title", "meta_title", "meta_description", "meta_image_id", "updated_at", "created_at", "_status" FROM \`pages\`;`,
  );
  await db.run(sql`DROP TABLE \`pages\`;`);
  await db.run(sql`ALTER TABLE \`__new_pages\` RENAME TO \`pages\`;`);
  await db.run(sql`CREATE INDEX \`pages_parent_idx\` ON \`pages\` (\`parent_id\`);`);
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`);
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`);
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`);
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`);
  await db.run(sql`CREATE TABLE \`__new__pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` text,
  	\`version_parent_id\` text,
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
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new__pages_v\`("id", "parent_id", "version_parent_id", "version_slug", "version_title", "version_meta_title", "version_meta_description", "version_meta_image_id", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "latest") SELECT "id", "parent_id", "version_parent_id", "version_slug", "version_title", "version_meta_title", "version_meta_description", "version_meta_image_id", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "latest" FROM \`_pages_v\`;`,
  );
  await db.run(sql`DROP TABLE \`_pages_v\`;`);
  await db.run(sql`ALTER TABLE \`__new__pages_v\` RENAME TO \`_pages_v\`;`);
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`);
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_parent_idx\` ON \`_pages_v\` (\`version_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_meta_version_meta_image_idx\` ON \`_pages_v\` (\`version_meta_image_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`,
  );
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`);
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`);
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
  await db.run(sql`ALTER TABLE \`menu_items\` ADD \`icon\` text;`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`templates_blocks_stack\`;`);
  await db.run(sql`DROP TABLE \`templates_blocks_menu\`;`);
  await db.run(sql`DROP TABLE \`templates_blocks_grid_item\`;`);
  await db.run(sql`DROP TABLE \`templates_blocks_grid\`;`);
  await db.run(sql`DROP TABLE \`templates_blocks_image\`;`);
  await db.run(sql`DROP TABLE \`maintenance_blocks_heading\`;`);
  await db.run(sql`DROP TABLE \`maintenance_blocks_rich_text\`;`);
  await db.run(sql`DROP TABLE \`maintenance_blocks_hero\`;`);
  await db.run(sql`DROP TABLE \`maintenance_blocks_stack\`;`);
  await db.run(sql`DROP TABLE \`maintenance_blocks_menu\`;`);
  await db.run(sql`DROP TABLE \`maintenance_blocks_grid_item\`;`);
  await db.run(sql`DROP TABLE \`maintenance_blocks_grid\`;`);
  await db.run(sql`DROP TABLE \`maintenance_blocks_image\`;`);
  await db.run(sql`DROP TABLE \`maintenance\`;`);
  await db.run(sql`PRAGMA foreign_keys=OFF;`);
  await db.run(sql`CREATE TABLE \`__new_pages\` (
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`parent_id\` text,
  	\`slug\` text DEFAULT '',
  	\`title\` text DEFAULT '',
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_pages\`("id", "parent_id", "slug", "title", "meta_title", "meta_description", "meta_image_id", "updated_at", "created_at", "_status") SELECT "id", "parent_id", "slug", "title", "meta_title", "meta_description", "meta_image_id", "updated_at", "created_at", "_status" FROM \`pages\`;`,
  );
  await db.run(sql`DROP TABLE \`pages\`;`);
  await db.run(sql`ALTER TABLE \`__new_pages\` RENAME TO \`pages\`;`);
  await db.run(sql`PRAGMA foreign_keys=ON;`);
  await db.run(sql`CREATE INDEX \`pages_parent_idx\` ON \`pages\` (\`parent_id\`);`);
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`);
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`);
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`);
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`);
  await db.run(sql`CREATE TABLE \`__new__pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` text,
  	\`version_parent_id\` text,
  	\`version_slug\` text DEFAULT '',
  	\`version_title\` text DEFAULT '',
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new__pages_v\`("id", "parent_id", "version_parent_id", "version_slug", "version_title", "version_meta_title", "version_meta_description", "version_meta_image_id", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "latest") SELECT "id", "parent_id", "version_parent_id", "version_slug", "version_title", "version_meta_title", "version_meta_description", "version_meta_image_id", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "latest" FROM \`_pages_v\`;`,
  );
  await db.run(sql`DROP TABLE \`_pages_v\`;`);
  await db.run(sql`ALTER TABLE \`__new__pages_v\` RENAME TO \`_pages_v\`;`);
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`);
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_parent_idx\` ON \`_pages_v\` (\`version_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_meta_version_meta_image_idx\` ON \`_pages_v\` (\`version_meta_image_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`,
  );
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`);
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`);
  await db.run(sql`CREATE TABLE \`__new_media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_media\`("id", "alt", "updated_at", "created_at", "url", "thumbnail_u_r_l", "filename", "mime_type", "filesize", "width", "height") SELECT "id", "alt", "updated_at", "created_at", "url", "thumbnail_u_r_l", "filename", "mime_type", "filesize", "width", "height" FROM \`media\`;`,
  );
  await db.run(sql`DROP TABLE \`media\`;`);
  await db.run(sql`ALTER TABLE \`__new_media\` RENAME TO \`media\`;`);
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`);
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`);
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`pages_id\` text,
  	\`menu_id\` text,
  	\`templates_id\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`menu_id\`) REFERENCES \`menu\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`templates_id\`) REFERENCES \`templates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "pages_id", "menu_id", "templates_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "pages_id", "menu_id", "templates_id" FROM \`payload_locked_documents_rels\`;`,
  );
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`);
  await db.run(
    sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`,
  );
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
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_templates_id_idx\` ON \`payload_locked_documents_rels\` (\`templates_id\`);`,
  );
  await db.run(sql`ALTER TABLE \`menu_items\` DROP COLUMN \`icon\`;`);
}
