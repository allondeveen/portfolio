import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_error_page_blocks_heading_variant" AS ENUM('default', 'muted', 'primary');
  CREATE TABLE "error_page_blocks_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" numeric DEFAULT 2 NOT NULL,
  	"heading_text" jsonb NOT NULL,
  	"variant" "enum_error_page_blocks_heading_variant" DEFAULT 'default' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "error_page_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "error_page_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "error_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "error_page_blocks_heading" ADD CONSTRAINT "error_page_blocks_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."error_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_blocks_rich_text" ADD CONSTRAINT "error_page_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."error_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_blocks_hero" ADD CONSTRAINT "error_page_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."error_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "error_page_blocks_heading_order_idx" ON "error_page_blocks_heading" USING btree ("_order");
  CREATE INDEX "error_page_blocks_heading_parent_id_idx" ON "error_page_blocks_heading" USING btree ("_parent_id");
  CREATE INDEX "error_page_blocks_heading_path_idx" ON "error_page_blocks_heading" USING btree ("_path");
  CREATE INDEX "error_page_blocks_rich_text_order_idx" ON "error_page_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "error_page_blocks_rich_text_parent_id_idx" ON "error_page_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "error_page_blocks_rich_text_path_idx" ON "error_page_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "error_page_blocks_hero_order_idx" ON "error_page_blocks_hero" USING btree ("_order");
  CREATE INDEX "error_page_blocks_hero_parent_id_idx" ON "error_page_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "error_page_blocks_hero_path_idx" ON "error_page_blocks_hero" USING btree ("_path");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "error_page_blocks_heading" CASCADE;
  DROP TABLE "error_page_blocks_rich_text" CASCADE;
  DROP TABLE "error_page_blocks_hero" CASCADE;
  DROP TABLE "error_page" CASCADE;
  DROP TYPE "public"."enum_error_page_blocks_heading_variant";`);
}
