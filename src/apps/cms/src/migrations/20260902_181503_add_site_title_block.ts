import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-d1-sqlite";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`templates_blocks_site_title\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`templates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`templates_blocks_site_title_order_idx\` ON \`templates_blocks_site_title\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_site_title_parent_id_idx\` ON \`templates_blocks_site_title\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`templates_blocks_site_title_path_idx\` ON \`templates_blocks_site_title\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`maintenance_blocks_site_title\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`maintenance\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_site_title_order_idx\` ON \`maintenance_blocks_site_title\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_site_title_parent_id_idx\` ON \`maintenance_blocks_site_title\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`maintenance_blocks_site_title_path_idx\` ON \`maintenance_blocks_site_title\` (\`_path\`);`,
  );
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`templates_blocks_site_title\`;`);
  await db.run(sql`DROP TABLE \`maintenance_blocks_site_title\`;`);
}
