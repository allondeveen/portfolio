import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_label_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum__pages_v_blocks_label_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_projects_blocks_label_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum__projects_v_blocks_label_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_articles_blocks_label_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum__articles_v_blocks_label_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_templates_blocks_label_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_maintenance_blocks_label_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_not_found_blocks_label_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_error_page_blocks_label_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TABLE "pages_blocks_label" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_label_variant" DEFAULT 'default',
  	"text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_label" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_label_variant" DEFAULT 'default',
  	"text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_label" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_projects_blocks_label_variant" DEFAULT 'default',
  	"text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_label" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__projects_v_blocks_label_variant" DEFAULT 'default',
  	"text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_label" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_articles_blocks_label_variant" DEFAULT 'default',
  	"text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_label" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__articles_v_blocks_label_variant" DEFAULT 'default',
  	"text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_label" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_templates_blocks_label_variant" DEFAULT 'default' NOT NULL,
  	"text" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "maintenance_blocks_label" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_maintenance_blocks_label_variant" DEFAULT 'default' NOT NULL,
  	"text" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "not_found_blocks_label" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_not_found_blocks_label_variant" DEFAULT 'default' NOT NULL,
  	"text" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "error_page_blocks_label" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_error_page_blocks_label_variant" DEFAULT 'default' NOT NULL,
  	"text" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_label" ADD CONSTRAINT "pages_blocks_label_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_label" ADD CONSTRAINT "_pages_v_blocks_label_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_label" ADD CONSTRAINT "projects_blocks_label_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_label" ADD CONSTRAINT "_projects_v_blocks_label_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_label" ADD CONSTRAINT "articles_blocks_label_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_label" ADD CONSTRAINT "_articles_v_blocks_label_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_label" ADD CONSTRAINT "templates_blocks_label_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "maintenance_blocks_label" ADD CONSTRAINT "maintenance_blocks_label_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."maintenance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_blocks_label" ADD CONSTRAINT "not_found_blocks_label_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_blocks_label" ADD CONSTRAINT "error_page_blocks_label_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."error_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_label_order_idx" ON "pages_blocks_label" USING btree ("_order");
  CREATE INDEX "pages_blocks_label_parent_id_idx" ON "pages_blocks_label" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_label_path_idx" ON "pages_blocks_label" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_label_order_idx" ON "_pages_v_blocks_label" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_label_parent_id_idx" ON "_pages_v_blocks_label" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_label_path_idx" ON "_pages_v_blocks_label" USING btree ("_path");
  CREATE INDEX "projects_blocks_label_order_idx" ON "projects_blocks_label" USING btree ("_order");
  CREATE INDEX "projects_blocks_label_parent_id_idx" ON "projects_blocks_label" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_label_path_idx" ON "projects_blocks_label" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_label_order_idx" ON "_projects_v_blocks_label" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_label_parent_id_idx" ON "_projects_v_blocks_label" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_label_path_idx" ON "_projects_v_blocks_label" USING btree ("_path");
  CREATE INDEX "articles_blocks_label_order_idx" ON "articles_blocks_label" USING btree ("_order");
  CREATE INDEX "articles_blocks_label_parent_id_idx" ON "articles_blocks_label" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_label_path_idx" ON "articles_blocks_label" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_label_order_idx" ON "_articles_v_blocks_label" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_label_parent_id_idx" ON "_articles_v_blocks_label" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_label_path_idx" ON "_articles_v_blocks_label" USING btree ("_path");
  CREATE INDEX "templates_blocks_label_order_idx" ON "templates_blocks_label" USING btree ("_order");
  CREATE INDEX "templates_blocks_label_parent_id_idx" ON "templates_blocks_label" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_label_path_idx" ON "templates_blocks_label" USING btree ("_path");
  CREATE INDEX "maintenance_blocks_label_order_idx" ON "maintenance_blocks_label" USING btree ("_order");
  CREATE INDEX "maintenance_blocks_label_parent_id_idx" ON "maintenance_blocks_label" USING btree ("_parent_id");
  CREATE INDEX "maintenance_blocks_label_path_idx" ON "maintenance_blocks_label" USING btree ("_path");
  CREATE INDEX "not_found_blocks_label_order_idx" ON "not_found_blocks_label" USING btree ("_order");
  CREATE INDEX "not_found_blocks_label_parent_id_idx" ON "not_found_blocks_label" USING btree ("_parent_id");
  CREATE INDEX "not_found_blocks_label_path_idx" ON "not_found_blocks_label" USING btree ("_path");
  CREATE INDEX "error_page_blocks_label_order_idx" ON "error_page_blocks_label" USING btree ("_order");
  CREATE INDEX "error_page_blocks_label_parent_id_idx" ON "error_page_blocks_label" USING btree ("_parent_id");
  CREATE INDEX "error_page_blocks_label_path_idx" ON "error_page_blocks_label" USING btree ("_path");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_label" CASCADE;
  DROP TABLE "_pages_v_blocks_label" CASCADE;
  DROP TABLE "projects_blocks_label" CASCADE;
  DROP TABLE "_projects_v_blocks_label" CASCADE;
  DROP TABLE "articles_blocks_label" CASCADE;
  DROP TABLE "_articles_v_blocks_label" CASCADE;
  DROP TABLE "templates_blocks_label" CASCADE;
  DROP TABLE "maintenance_blocks_label" CASCADE;
  DROP TABLE "not_found_blocks_label" CASCADE;
  DROP TABLE "error_page_blocks_label" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_label_variant";
  DROP TYPE "public"."enum__pages_v_blocks_label_variant";
  DROP TYPE "public"."enum_projects_blocks_label_variant";
  DROP TYPE "public"."enum__projects_v_blocks_label_variant";
  DROP TYPE "public"."enum_articles_blocks_label_variant";
  DROP TYPE "public"."enum__articles_v_blocks_label_variant";
  DROP TYPE "public"."enum_templates_blocks_label_variant";
  DROP TYPE "public"."enum_maintenance_blocks_label_variant";
  DROP TYPE "public"."enum_not_found_blocks_label_variant";
  DROP TYPE "public"."enum_error_page_blocks_label_variant";`);
}
