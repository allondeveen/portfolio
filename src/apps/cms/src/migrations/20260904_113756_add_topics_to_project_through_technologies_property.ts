import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-d1-sqlite";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`projects_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text NOT NULL,
  	\`path\` text NOT NULL,
  	\`topics_id\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`topics_id\`) REFERENCES \`topics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(sql`CREATE INDEX \`projects_rels_order_idx\` ON \`projects_rels\` (\`order\`);`);
  await db.run(
    sql`CREATE INDEX \`projects_rels_parent_idx\` ON \`projects_rels\` (\`parent_id\`);`,
  );
  await db.run(sql`CREATE INDEX \`projects_rels_path_idx\` ON \`projects_rels\` (\`path\`);`);
  await db.run(
    sql`CREATE INDEX \`projects_rels_topics_id_idx\` ON \`projects_rels\` (\`topics_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`_projects_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`topics_id\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`topics_id\`) REFERENCES \`topics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_projects_v_rels_order_idx\` ON \`_projects_v_rels\` (\`order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_rels_parent_idx\` ON \`_projects_v_rels\` (\`parent_id\`);`,
  );
  await db.run(sql`CREATE INDEX \`_projects_v_rels_path_idx\` ON \`_projects_v_rels\` (\`path\`);`);
  await db.run(
    sql`CREATE INDEX \`_projects_v_rels_topics_id_idx\` ON \`_projects_v_rels\` (\`topics_id\`);`,
  );
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`projects_rels\`;`);
  await db.run(sql`DROP TABLE \`_projects_v_rels\`;`);
}
