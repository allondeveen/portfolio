import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "templates_blocks_container" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "maintenance_blocks_container" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "templates_blocks_container" ADD CONSTRAINT "templates_blocks_container_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "maintenance_blocks_container" ADD CONSTRAINT "maintenance_blocks_container_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."maintenance"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "templates_blocks_container_order_idx" ON "templates_blocks_container" USING btree ("_order");
  CREATE INDEX "templates_blocks_container_parent_id_idx" ON "templates_blocks_container" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_container_path_idx" ON "templates_blocks_container" USING btree ("_path");
  CREATE INDEX "maintenance_blocks_container_order_idx" ON "maintenance_blocks_container" USING btree ("_order");
  CREATE INDEX "maintenance_blocks_container_parent_id_idx" ON "maintenance_blocks_container" USING btree ("_parent_id");
  CREATE INDEX "maintenance_blocks_container_path_idx" ON "maintenance_blocks_container" USING btree ("_path");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "templates_blocks_container" CASCADE;
  DROP TABLE "maintenance_blocks_container" CASCADE;`);
}
