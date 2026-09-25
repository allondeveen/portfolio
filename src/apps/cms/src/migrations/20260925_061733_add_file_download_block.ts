import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_file_download_style" AS ENUM('link', 'button');
  CREATE TYPE "public"."enum_pages_blocks_file_download_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum__pages_v_blocks_file_download_style" AS ENUM('link', 'button');
  CREATE TYPE "public"."enum__pages_v_blocks_file_download_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_projects_blocks_file_download_style" AS ENUM('link', 'button');
  CREATE TYPE "public"."enum_projects_blocks_file_download_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum__projects_v_blocks_file_download_style" AS ENUM('link', 'button');
  CREATE TYPE "public"."enum__projects_v_blocks_file_download_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_articles_blocks_file_download_style" AS ENUM('link', 'button');
  CREATE TYPE "public"."enum_articles_blocks_file_download_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum__articles_v_blocks_file_download_style" AS ENUM('link', 'button');
  CREATE TYPE "public"."enum__articles_v_blocks_file_download_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_templates_blocks_file_download_style" AS ENUM('link', 'button');
  CREATE TYPE "public"."enum_templates_blocks_file_download_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_maintenance_blocks_file_download_style" AS ENUM('link', 'button');
  CREATE TYPE "public"."enum_maintenance_blocks_file_download_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_not_found_blocks_file_download_style" AS ENUM('link', 'button');
  CREATE TYPE "public"."enum_not_found_blocks_file_download_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_error_page_blocks_file_download_style" AS ENUM('link', 'button');
  CREATE TYPE "public"."enum_error_page_blocks_file_download_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TABLE "pages_blocks_file_download" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_file_download_style" DEFAULT 'link',
  	"variant" "enum_pages_blocks_file_download_variant" DEFAULT 'default',
  	"label" jsonb,
  	"download_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_file_download" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__pages_v_blocks_file_download_style" DEFAULT 'link',
  	"variant" "enum__pages_v_blocks_file_download_variant" DEFAULT 'default',
  	"label" jsonb,
  	"download_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_file_download" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_projects_blocks_file_download_style" DEFAULT 'link',
  	"variant" "enum_projects_blocks_file_download_variant" DEFAULT 'default',
  	"label" jsonb,
  	"download_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_file_download" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__projects_v_blocks_file_download_style" DEFAULT 'link',
  	"variant" "enum__projects_v_blocks_file_download_variant" DEFAULT 'default',
  	"label" jsonb,
  	"download_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_file_download" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_articles_blocks_file_download_style" DEFAULT 'link',
  	"variant" "enum_articles_blocks_file_download_variant" DEFAULT 'default',
  	"label" jsonb,
  	"download_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_file_download" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__articles_v_blocks_file_download_style" DEFAULT 'link',
  	"variant" "enum__articles_v_blocks_file_download_variant" DEFAULT 'default',
  	"label" jsonb,
  	"download_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_file_download" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_templates_blocks_file_download_style" DEFAULT 'link' NOT NULL,
  	"variant" "enum_templates_blocks_file_download_variant" DEFAULT 'default',
  	"label" jsonb,
  	"download_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "maintenance_blocks_file_download" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_maintenance_blocks_file_download_style" DEFAULT 'link' NOT NULL,
  	"variant" "enum_maintenance_blocks_file_download_variant" DEFAULT 'default',
  	"label" jsonb,
  	"download_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "not_found_blocks_file_download" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_not_found_blocks_file_download_style" DEFAULT 'link' NOT NULL,
  	"variant" "enum_not_found_blocks_file_download_variant" DEFAULT 'default',
  	"label" jsonb,
  	"download_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "error_page_blocks_file_download" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_error_page_blocks_file_download_style" DEFAULT 'link' NOT NULL,
  	"variant" "enum_error_page_blocks_file_download_variant" DEFAULT 'default',
  	"label" jsonb,
  	"download_id" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_file_download" ADD CONSTRAINT "pages_blocks_file_download_download_id_media_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_file_download" ADD CONSTRAINT "pages_blocks_file_download_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_file_download" ADD CONSTRAINT "_pages_v_blocks_file_download_download_id_media_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_file_download" ADD CONSTRAINT "_pages_v_blocks_file_download_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_file_download" ADD CONSTRAINT "projects_blocks_file_download_download_id_media_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_file_download" ADD CONSTRAINT "projects_blocks_file_download_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_file_download" ADD CONSTRAINT "_projects_v_blocks_file_download_download_id_media_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_file_download" ADD CONSTRAINT "_projects_v_blocks_file_download_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_file_download" ADD CONSTRAINT "articles_blocks_file_download_download_id_media_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_file_download" ADD CONSTRAINT "articles_blocks_file_download_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_file_download" ADD CONSTRAINT "_articles_v_blocks_file_download_download_id_media_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_file_download" ADD CONSTRAINT "_articles_v_blocks_file_download_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_file_download" ADD CONSTRAINT "templates_blocks_file_download_download_id_media_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_file_download" ADD CONSTRAINT "templates_blocks_file_download_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "maintenance_blocks_file_download" ADD CONSTRAINT "maintenance_blocks_file_download_download_id_media_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "maintenance_blocks_file_download" ADD CONSTRAINT "maintenance_blocks_file_download_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."maintenance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_blocks_file_download" ADD CONSTRAINT "not_found_blocks_file_download_download_id_media_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "not_found_blocks_file_download" ADD CONSTRAINT "not_found_blocks_file_download_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_blocks_file_download" ADD CONSTRAINT "error_page_blocks_file_download_download_id_media_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "error_page_blocks_file_download" ADD CONSTRAINT "error_page_blocks_file_download_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."error_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_file_download_order_idx" ON "pages_blocks_file_download" USING btree ("_order");
  CREATE INDEX "pages_blocks_file_download_parent_id_idx" ON "pages_blocks_file_download" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_file_download_path_idx" ON "pages_blocks_file_download" USING btree ("_path");
  CREATE INDEX "pages_blocks_file_download_download_idx" ON "pages_blocks_file_download" USING btree ("download_id");
  CREATE INDEX "_pages_v_blocks_file_download_order_idx" ON "_pages_v_blocks_file_download" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_file_download_parent_id_idx" ON "_pages_v_blocks_file_download" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_file_download_path_idx" ON "_pages_v_blocks_file_download" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_file_download_download_idx" ON "_pages_v_blocks_file_download" USING btree ("download_id");
  CREATE INDEX "projects_blocks_file_download_order_idx" ON "projects_blocks_file_download" USING btree ("_order");
  CREATE INDEX "projects_blocks_file_download_parent_id_idx" ON "projects_blocks_file_download" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_file_download_path_idx" ON "projects_blocks_file_download" USING btree ("_path");
  CREATE INDEX "projects_blocks_file_download_download_idx" ON "projects_blocks_file_download" USING btree ("download_id");
  CREATE INDEX "_projects_v_blocks_file_download_order_idx" ON "_projects_v_blocks_file_download" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_file_download_parent_id_idx" ON "_projects_v_blocks_file_download" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_file_download_path_idx" ON "_projects_v_blocks_file_download" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_file_download_download_idx" ON "_projects_v_blocks_file_download" USING btree ("download_id");
  CREATE INDEX "articles_blocks_file_download_order_idx" ON "articles_blocks_file_download" USING btree ("_order");
  CREATE INDEX "articles_blocks_file_download_parent_id_idx" ON "articles_blocks_file_download" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_file_download_path_idx" ON "articles_blocks_file_download" USING btree ("_path");
  CREATE INDEX "articles_blocks_file_download_download_idx" ON "articles_blocks_file_download" USING btree ("download_id");
  CREATE INDEX "_articles_v_blocks_file_download_order_idx" ON "_articles_v_blocks_file_download" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_file_download_parent_id_idx" ON "_articles_v_blocks_file_download" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_file_download_path_idx" ON "_articles_v_blocks_file_download" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_file_download_download_idx" ON "_articles_v_blocks_file_download" USING btree ("download_id");
  CREATE INDEX "templates_blocks_file_download_order_idx" ON "templates_blocks_file_download" USING btree ("_order");
  CREATE INDEX "templates_blocks_file_download_parent_id_idx" ON "templates_blocks_file_download" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_file_download_path_idx" ON "templates_blocks_file_download" USING btree ("_path");
  CREATE INDEX "templates_blocks_file_download_download_idx" ON "templates_blocks_file_download" USING btree ("download_id");
  CREATE INDEX "maintenance_blocks_file_download_order_idx" ON "maintenance_blocks_file_download" USING btree ("_order");
  CREATE INDEX "maintenance_blocks_file_download_parent_id_idx" ON "maintenance_blocks_file_download" USING btree ("_parent_id");
  CREATE INDEX "maintenance_blocks_file_download_path_idx" ON "maintenance_blocks_file_download" USING btree ("_path");
  CREATE INDEX "maintenance_blocks_file_download_download_idx" ON "maintenance_blocks_file_download" USING btree ("download_id");
  CREATE INDEX "not_found_blocks_file_download_order_idx" ON "not_found_blocks_file_download" USING btree ("_order");
  CREATE INDEX "not_found_blocks_file_download_parent_id_idx" ON "not_found_blocks_file_download" USING btree ("_parent_id");
  CREATE INDEX "not_found_blocks_file_download_path_idx" ON "not_found_blocks_file_download" USING btree ("_path");
  CREATE INDEX "not_found_blocks_file_download_download_idx" ON "not_found_blocks_file_download" USING btree ("download_id");
  CREATE INDEX "error_page_blocks_file_download_order_idx" ON "error_page_blocks_file_download" USING btree ("_order");
  CREATE INDEX "error_page_blocks_file_download_parent_id_idx" ON "error_page_blocks_file_download" USING btree ("_parent_id");
  CREATE INDEX "error_page_blocks_file_download_path_idx" ON "error_page_blocks_file_download" USING btree ("_path");
  CREATE INDEX "error_page_blocks_file_download_download_idx" ON "error_page_blocks_file_download" USING btree ("download_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_file_download" CASCADE;
  DROP TABLE "_pages_v_blocks_file_download" CASCADE;
  DROP TABLE "projects_blocks_file_download" CASCADE;
  DROP TABLE "_projects_v_blocks_file_download" CASCADE;
  DROP TABLE "articles_blocks_file_download" CASCADE;
  DROP TABLE "_articles_v_blocks_file_download" CASCADE;
  DROP TABLE "templates_blocks_file_download" CASCADE;
  DROP TABLE "maintenance_blocks_file_download" CASCADE;
  DROP TABLE "not_found_blocks_file_download" CASCADE;
  DROP TABLE "error_page_blocks_file_download" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_file_download_style";
  DROP TYPE "public"."enum_pages_blocks_file_download_variant";
  DROP TYPE "public"."enum__pages_v_blocks_file_download_style";
  DROP TYPE "public"."enum__pages_v_blocks_file_download_variant";
  DROP TYPE "public"."enum_projects_blocks_file_download_style";
  DROP TYPE "public"."enum_projects_blocks_file_download_variant";
  DROP TYPE "public"."enum__projects_v_blocks_file_download_style";
  DROP TYPE "public"."enum__projects_v_blocks_file_download_variant";
  DROP TYPE "public"."enum_articles_blocks_file_download_style";
  DROP TYPE "public"."enum_articles_blocks_file_download_variant";
  DROP TYPE "public"."enum__articles_v_blocks_file_download_style";
  DROP TYPE "public"."enum__articles_v_blocks_file_download_variant";
  DROP TYPE "public"."enum_templates_blocks_file_download_style";
  DROP TYPE "public"."enum_templates_blocks_file_download_variant";
  DROP TYPE "public"."enum_maintenance_blocks_file_download_style";
  DROP TYPE "public"."enum_maintenance_blocks_file_download_variant";
  DROP TYPE "public"."enum_not_found_blocks_file_download_style";
  DROP TYPE "public"."enum_not_found_blocks_file_download_variant";
  DROP TYPE "public"."enum_error_page_blocks_file_download_style";
  DROP TYPE "public"."enum_error_page_blocks_file_download_variant";`);
}
