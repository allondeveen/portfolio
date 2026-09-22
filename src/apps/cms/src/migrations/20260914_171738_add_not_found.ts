import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_not_found_blocks_heading_variant" AS ENUM('default', 'muted', 'primary');
  CREATE TABLE "not_found_blocks_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" numeric DEFAULT 2 NOT NULL,
  	"heading_text" jsonb NOT NULL,
  	"variant" "enum_not_found_blocks_heading_variant" DEFAULT 'default' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "not_found_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "not_found_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "not_found" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "not_found_blocks_heading" ADD CONSTRAINT "not_found_blocks_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_blocks_rich_text" ADD CONSTRAINT "not_found_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_blocks_hero" ADD CONSTRAINT "not_found_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "not_found_blocks_heading_order_idx" ON "not_found_blocks_heading" USING btree ("_order");
  CREATE INDEX "not_found_blocks_heading_parent_id_idx" ON "not_found_blocks_heading" USING btree ("_parent_id");
  CREATE INDEX "not_found_blocks_heading_path_idx" ON "not_found_blocks_heading" USING btree ("_path");
  CREATE INDEX "not_found_blocks_rich_text_order_idx" ON "not_found_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "not_found_blocks_rich_text_parent_id_idx" ON "not_found_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "not_found_blocks_rich_text_path_idx" ON "not_found_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "not_found_blocks_hero_order_idx" ON "not_found_blocks_hero" USING btree ("_order");
  CREATE INDEX "not_found_blocks_hero_parent_id_idx" ON "not_found_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "not_found_blocks_hero_path_idx" ON "not_found_blocks_hero" USING btree ("_path");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "not_found_blocks_heading" CASCADE;
  DROP TABLE "not_found_blocks_rich_text" CASCADE;
  DROP TABLE "not_found_blocks_hero" CASCADE;
  DROP TABLE "not_found" CASCADE;
  DROP TYPE "public"."enum_not_found_blocks_heading_variant";`);
}
