import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_button_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_pages_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  CREATE TYPE "public"."enum_pages_blocks_button_location_externality" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_button_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum__pages_v_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_button_location_externality" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_projects_blocks_button_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_projects_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  CREATE TYPE "public"."enum_projects_blocks_button_location_externality" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__projects_v_blocks_button_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum__projects_v_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  CREATE TYPE "public"."enum__projects_v_blocks_button_location_externality" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_articles_blocks_button_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_articles_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  CREATE TYPE "public"."enum_articles_blocks_button_location_externality" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__articles_v_blocks_button_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum__articles_v_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  CREATE TYPE "public"."enum__articles_v_blocks_button_location_externality" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_templates_blocks_button_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_templates_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  CREATE TYPE "public"."enum_templates_blocks_button_location_externality" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_maintenance_blocks_button_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_maintenance_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  CREATE TYPE "public"."enum_maintenance_blocks_button_location_externality" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_not_found_blocks_button_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_not_found_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  CREATE TYPE "public"."enum_not_found_blocks_button_location_externality" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_error_page_blocks_button_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_error_page_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  CREATE TYPE "public"."enum_error_page_blocks_button_location_externality" AS ENUM('internal', 'external');
  ALTER TYPE "public"."enum_menu_items_icon" ADD VALUE 'chevron-right';
  ALTER TYPE "public"."enum_menu_items_icon" ADD VALUE 'arrow-up-right';
  CREATE TABLE "pages_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_button_variant" DEFAULT 'default',
  	"icon" "enum_pages_blocks_button_icon" DEFAULT 'none',
  	"location_externality" "enum_pages_blocks_button_location_externality" DEFAULT 'internal',
  	"location_external" varchar,
  	"label" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" varchar NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" varchar,
  	"projects_id" varchar,
  	"articles_id" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_button_variant" DEFAULT 'default',
  	"icon" "enum__pages_v_blocks_button_icon" DEFAULT 'none',
  	"location_externality" "enum__pages_v_blocks_button_location_externality" DEFAULT 'internal',
  	"location_external" varchar,
  	"label" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" varchar,
  	"projects_id" varchar,
  	"articles_id" varchar
  );
  
  CREATE TABLE "projects_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_projects_blocks_button_variant" DEFAULT 'default',
  	"icon" "enum_projects_blocks_button_icon" DEFAULT 'none',
  	"location_externality" "enum_projects_blocks_button_location_externality" DEFAULT 'internal',
  	"location_external" varchar,
  	"label" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__projects_v_blocks_button_variant" DEFAULT 'default',
  	"icon" "enum__projects_v_blocks_button_icon" DEFAULT 'none',
  	"location_externality" "enum__projects_v_blocks_button_location_externality" DEFAULT 'internal',
  	"location_external" varchar,
  	"label" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_articles_blocks_button_variant" DEFAULT 'default',
  	"icon" "enum_articles_blocks_button_icon" DEFAULT 'none',
  	"location_externality" "enum_articles_blocks_button_location_externality" DEFAULT 'internal',
  	"location_external" varchar,
  	"label" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__articles_v_blocks_button_variant" DEFAULT 'default',
  	"icon" "enum__articles_v_blocks_button_icon" DEFAULT 'none',
  	"location_externality" "enum__articles_v_blocks_button_location_externality" DEFAULT 'internal',
  	"location_external" varchar,
  	"label" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_templates_blocks_button_variant" DEFAULT 'default' NOT NULL,
  	"icon" "enum_templates_blocks_button_icon" DEFAULT 'none' NOT NULL,
  	"location_externality" "enum_templates_blocks_button_location_externality" DEFAULT 'internal' NOT NULL,
  	"location_external" varchar,
  	"label" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" varchar NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" varchar,
  	"projects_id" varchar,
  	"articles_id" varchar
  );
  
  CREATE TABLE "maintenance_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_maintenance_blocks_button_variant" DEFAULT 'default' NOT NULL,
  	"icon" "enum_maintenance_blocks_button_icon" DEFAULT 'none' NOT NULL,
  	"location_externality" "enum_maintenance_blocks_button_location_externality" DEFAULT 'internal' NOT NULL,
  	"location_external" varchar,
  	"label" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "maintenance_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" varchar,
  	"projects_id" varchar,
  	"articles_id" varchar
  );
  
  CREATE TABLE "not_found_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_not_found_blocks_button_variant" DEFAULT 'default' NOT NULL,
  	"icon" "enum_not_found_blocks_button_icon" DEFAULT 'none' NOT NULL,
  	"location_externality" "enum_not_found_blocks_button_location_externality" DEFAULT 'internal' NOT NULL,
  	"location_external" varchar,
  	"label" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "not_found_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" varchar,
  	"projects_id" varchar,
  	"articles_id" varchar
  );
  
  CREATE TABLE "error_page_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_error_page_blocks_button_variant" DEFAULT 'default' NOT NULL,
  	"icon" "enum_error_page_blocks_button_icon" DEFAULT 'none' NOT NULL,
  	"location_externality" "enum_error_page_blocks_button_location_externality" DEFAULT 'internal' NOT NULL,
  	"location_external" varchar,
  	"label" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "error_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" varchar,
  	"projects_id" varchar,
  	"articles_id" varchar
  );
  
  ALTER TABLE "projects_rels" ADD COLUMN "pages_id" varchar;
  ALTER TABLE "projects_rels" ADD COLUMN "projects_id" varchar;
  ALTER TABLE "projects_rels" ADD COLUMN "articles_id" varchar;
  ALTER TABLE "_projects_v_rels" ADD COLUMN "pages_id" varchar;
  ALTER TABLE "_projects_v_rels" ADD COLUMN "projects_id" varchar;
  ALTER TABLE "_projects_v_rels" ADD COLUMN "articles_id" varchar;
  ALTER TABLE "articles_rels" ADD COLUMN "pages_id" varchar;
  ALTER TABLE "articles_rels" ADD COLUMN "projects_id" varchar;
  ALTER TABLE "articles_rels" ADD COLUMN "articles_id" varchar;
  ALTER TABLE "_articles_v_rels" ADD COLUMN "pages_id" varchar;
  ALTER TABLE "_articles_v_rels" ADD COLUMN "projects_id" varchar;
  ALTER TABLE "_articles_v_rels" ADD COLUMN "articles_id" varchar;
  ALTER TABLE "pages_blocks_button" ADD CONSTRAINT "pages_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button" ADD CONSTRAINT "_pages_v_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_button" ADD CONSTRAINT "projects_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_button" ADD CONSTRAINT "_projects_v_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_button" ADD CONSTRAINT "articles_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_button" ADD CONSTRAINT "_articles_v_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_button" ADD CONSTRAINT "templates_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_rels" ADD CONSTRAINT "templates_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_rels" ADD CONSTRAINT "templates_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_rels" ADD CONSTRAINT "templates_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_rels" ADD CONSTRAINT "templates_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "maintenance_blocks_button" ADD CONSTRAINT "maintenance_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."maintenance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "maintenance_rels" ADD CONSTRAINT "maintenance_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."maintenance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "maintenance_rels" ADD CONSTRAINT "maintenance_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "maintenance_rels" ADD CONSTRAINT "maintenance_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "maintenance_rels" ADD CONSTRAINT "maintenance_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_blocks_button" ADD CONSTRAINT "not_found_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_rels" ADD CONSTRAINT "not_found_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_rels" ADD CONSTRAINT "not_found_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_rels" ADD CONSTRAINT "not_found_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_rels" ADD CONSTRAINT "not_found_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_blocks_button" ADD CONSTRAINT "error_page_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."error_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_rels" ADD CONSTRAINT "error_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."error_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_rels" ADD CONSTRAINT "error_page_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_rels" ADD CONSTRAINT "error_page_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_rels" ADD CONSTRAINT "error_page_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_button_order_idx" ON "pages_blocks_button" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_parent_id_idx" ON "pages_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_path_idx" ON "pages_blocks_button" USING btree ("_path");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_projects_id_idx" ON "pages_rels" USING btree ("projects_id");
  CREATE INDEX "pages_rels_articles_id_idx" ON "pages_rels" USING btree ("articles_id");
  CREATE INDEX "_pages_v_blocks_button_order_idx" ON "_pages_v_blocks_button" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_button_parent_id_idx" ON "_pages_v_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_path_idx" ON "_pages_v_blocks_button" USING btree ("_path");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_projects_id_idx" ON "_pages_v_rels" USING btree ("projects_id");
  CREATE INDEX "_pages_v_rels_articles_id_idx" ON "_pages_v_rels" USING btree ("articles_id");
  CREATE INDEX "projects_blocks_button_order_idx" ON "projects_blocks_button" USING btree ("_order");
  CREATE INDEX "projects_blocks_button_parent_id_idx" ON "projects_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_button_path_idx" ON "projects_blocks_button" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_button_order_idx" ON "_projects_v_blocks_button" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_button_parent_id_idx" ON "_projects_v_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_button_path_idx" ON "_projects_v_blocks_button" USING btree ("_path");
  CREATE INDEX "articles_blocks_button_order_idx" ON "articles_blocks_button" USING btree ("_order");
  CREATE INDEX "articles_blocks_button_parent_id_idx" ON "articles_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_button_path_idx" ON "articles_blocks_button" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_button_order_idx" ON "_articles_v_blocks_button" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_button_parent_id_idx" ON "_articles_v_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_button_path_idx" ON "_articles_v_blocks_button" USING btree ("_path");
  CREATE INDEX "templates_blocks_button_order_idx" ON "templates_blocks_button" USING btree ("_order");
  CREATE INDEX "templates_blocks_button_parent_id_idx" ON "templates_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_button_path_idx" ON "templates_blocks_button" USING btree ("_path");
  CREATE INDEX "templates_rels_order_idx" ON "templates_rels" USING btree ("order");
  CREATE INDEX "templates_rels_parent_idx" ON "templates_rels" USING btree ("parent_id");
  CREATE INDEX "templates_rels_path_idx" ON "templates_rels" USING btree ("path");
  CREATE INDEX "templates_rels_pages_id_idx" ON "templates_rels" USING btree ("pages_id");
  CREATE INDEX "templates_rels_projects_id_idx" ON "templates_rels" USING btree ("projects_id");
  CREATE INDEX "templates_rels_articles_id_idx" ON "templates_rels" USING btree ("articles_id");
  CREATE INDEX "maintenance_blocks_button_order_idx" ON "maintenance_blocks_button" USING btree ("_order");
  CREATE INDEX "maintenance_blocks_button_parent_id_idx" ON "maintenance_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "maintenance_blocks_button_path_idx" ON "maintenance_blocks_button" USING btree ("_path");
  CREATE INDEX "maintenance_rels_order_idx" ON "maintenance_rels" USING btree ("order");
  CREATE INDEX "maintenance_rels_parent_idx" ON "maintenance_rels" USING btree ("parent_id");
  CREATE INDEX "maintenance_rels_path_idx" ON "maintenance_rels" USING btree ("path");
  CREATE INDEX "maintenance_rels_pages_id_idx" ON "maintenance_rels" USING btree ("pages_id");
  CREATE INDEX "maintenance_rels_projects_id_idx" ON "maintenance_rels" USING btree ("projects_id");
  CREATE INDEX "maintenance_rels_articles_id_idx" ON "maintenance_rels" USING btree ("articles_id");
  CREATE INDEX "not_found_blocks_button_order_idx" ON "not_found_blocks_button" USING btree ("_order");
  CREATE INDEX "not_found_blocks_button_parent_id_idx" ON "not_found_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "not_found_blocks_button_path_idx" ON "not_found_blocks_button" USING btree ("_path");
  CREATE INDEX "not_found_rels_order_idx" ON "not_found_rels" USING btree ("order");
  CREATE INDEX "not_found_rels_parent_idx" ON "not_found_rels" USING btree ("parent_id");
  CREATE INDEX "not_found_rels_path_idx" ON "not_found_rels" USING btree ("path");
  CREATE INDEX "not_found_rels_pages_id_idx" ON "not_found_rels" USING btree ("pages_id");
  CREATE INDEX "not_found_rels_projects_id_idx" ON "not_found_rels" USING btree ("projects_id");
  CREATE INDEX "not_found_rels_articles_id_idx" ON "not_found_rels" USING btree ("articles_id");
  CREATE INDEX "error_page_blocks_button_order_idx" ON "error_page_blocks_button" USING btree ("_order");
  CREATE INDEX "error_page_blocks_button_parent_id_idx" ON "error_page_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "error_page_blocks_button_path_idx" ON "error_page_blocks_button" USING btree ("_path");
  CREATE INDEX "error_page_rels_order_idx" ON "error_page_rels" USING btree ("order");
  CREATE INDEX "error_page_rels_parent_idx" ON "error_page_rels" USING btree ("parent_id");
  CREATE INDEX "error_page_rels_path_idx" ON "error_page_rels" USING btree ("path");
  CREATE INDEX "error_page_rels_pages_id_idx" ON "error_page_rels" USING btree ("pages_id");
  CREATE INDEX "error_page_rels_projects_id_idx" ON "error_page_rels" USING btree ("projects_id");
  CREATE INDEX "error_page_rels_articles_id_idx" ON "error_page_rels" USING btree ("articles_id");
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_rels_pages_id_idx" ON "projects_rels" USING btree ("pages_id");
  CREATE INDEX "projects_rels_projects_id_idx" ON "projects_rels" USING btree ("projects_id");
  CREATE INDEX "projects_rels_articles_id_idx" ON "projects_rels" USING btree ("articles_id");
  CREATE INDEX "_projects_v_rels_pages_id_idx" ON "_projects_v_rels" USING btree ("pages_id");
  CREATE INDEX "_projects_v_rels_projects_id_idx" ON "_projects_v_rels" USING btree ("projects_id");
  CREATE INDEX "_projects_v_rels_articles_id_idx" ON "_projects_v_rels" USING btree ("articles_id");
  CREATE INDEX "articles_rels_pages_id_idx" ON "articles_rels" USING btree ("pages_id");
  CREATE INDEX "articles_rels_projects_id_idx" ON "articles_rels" USING btree ("projects_id");
  CREATE INDEX "articles_rels_articles_id_idx" ON "articles_rels" USING btree ("articles_id");
  CREATE INDEX "_articles_v_rels_pages_id_idx" ON "_articles_v_rels" USING btree ("pages_id");
  CREATE INDEX "_articles_v_rels_projects_id_idx" ON "_articles_v_rels" USING btree ("projects_id");
  CREATE INDEX "_articles_v_rels_articles_id_idx" ON "_articles_v_rels" USING btree ("articles_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articles_blocks_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articles_v_blocks_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "templates_blocks_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "templates_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "maintenance_blocks_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "maintenance_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "not_found_blocks_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "not_found_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "error_page_blocks_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "error_page_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_button" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_button" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "projects_blocks_button" CASCADE;
  DROP TABLE "_projects_v_blocks_button" CASCADE;
  DROP TABLE "articles_blocks_button" CASCADE;
  DROP TABLE "_articles_v_blocks_button" CASCADE;
  DROP TABLE "templates_blocks_button" CASCADE;
  DROP TABLE "templates_rels" CASCADE;
  DROP TABLE "maintenance_blocks_button" CASCADE;
  DROP TABLE "maintenance_rels" CASCADE;
  DROP TABLE "not_found_blocks_button" CASCADE;
  DROP TABLE "not_found_rels" CASCADE;
  DROP TABLE "error_page_blocks_button" CASCADE;
  DROP TABLE "error_page_rels" CASCADE;
  ALTER TABLE "projects_rels" DROP CONSTRAINT "projects_rels_pages_fk";
  
  ALTER TABLE "projects_rels" DROP CONSTRAINT "projects_rels_projects_fk";
  
  ALTER TABLE "projects_rels" DROP CONSTRAINT "projects_rels_articles_fk";
  
  ALTER TABLE "_projects_v_rels" DROP CONSTRAINT "_projects_v_rels_pages_fk";
  
  ALTER TABLE "_projects_v_rels" DROP CONSTRAINT "_projects_v_rels_projects_fk";
  
  ALTER TABLE "_projects_v_rels" DROP CONSTRAINT "_projects_v_rels_articles_fk";
  
  ALTER TABLE "articles_rels" DROP CONSTRAINT "articles_rels_pages_fk";
  
  ALTER TABLE "articles_rels" DROP CONSTRAINT "articles_rels_projects_fk";
  
  ALTER TABLE "articles_rels" DROP CONSTRAINT "articles_rels_articles_fk";
  
  ALTER TABLE "_articles_v_rels" DROP CONSTRAINT "_articles_v_rels_pages_fk";
  
  ALTER TABLE "_articles_v_rels" DROP CONSTRAINT "_articles_v_rels_projects_fk";
  
  ALTER TABLE "_articles_v_rels" DROP CONSTRAINT "_articles_v_rels_articles_fk";
  
  ALTER TABLE "menu_items" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_menu_items_icon";
  CREATE TYPE "public"."enum_menu_items_icon" AS ENUM('linkedin', 'github', 'logo');
  ALTER TABLE "menu_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_menu_items_icon" USING "icon"::"public"."enum_menu_items_icon";
  DROP INDEX "projects_rels_pages_id_idx";
  DROP INDEX "projects_rels_projects_id_idx";
  DROP INDEX "projects_rels_articles_id_idx";
  DROP INDEX "_projects_v_rels_pages_id_idx";
  DROP INDEX "_projects_v_rels_projects_id_idx";
  DROP INDEX "_projects_v_rels_articles_id_idx";
  DROP INDEX "articles_rels_pages_id_idx";
  DROP INDEX "articles_rels_projects_id_idx";
  DROP INDEX "articles_rels_articles_id_idx";
  DROP INDEX "_articles_v_rels_pages_id_idx";
  DROP INDEX "_articles_v_rels_projects_id_idx";
  DROP INDEX "_articles_v_rels_articles_id_idx";
  ALTER TABLE "projects_rels" DROP COLUMN "pages_id";
  ALTER TABLE "projects_rels" DROP COLUMN "projects_id";
  ALTER TABLE "projects_rels" DROP COLUMN "articles_id";
  ALTER TABLE "_projects_v_rels" DROP COLUMN "pages_id";
  ALTER TABLE "_projects_v_rels" DROP COLUMN "projects_id";
  ALTER TABLE "_projects_v_rels" DROP COLUMN "articles_id";
  ALTER TABLE "articles_rels" DROP COLUMN "pages_id";
  ALTER TABLE "articles_rels" DROP COLUMN "projects_id";
  ALTER TABLE "articles_rels" DROP COLUMN "articles_id";
  ALTER TABLE "_articles_v_rels" DROP COLUMN "pages_id";
  ALTER TABLE "_articles_v_rels" DROP COLUMN "projects_id";
  ALTER TABLE "_articles_v_rels" DROP COLUMN "articles_id";
  DROP TYPE "public"."enum_pages_blocks_button_variant";
  DROP TYPE "public"."enum_pages_blocks_button_icon";
  DROP TYPE "public"."enum_pages_blocks_button_location_externality";
  DROP TYPE "public"."enum__pages_v_blocks_button_variant";
  DROP TYPE "public"."enum__pages_v_blocks_button_icon";
  DROP TYPE "public"."enum__pages_v_blocks_button_location_externality";
  DROP TYPE "public"."enum_projects_blocks_button_variant";
  DROP TYPE "public"."enum_projects_blocks_button_icon";
  DROP TYPE "public"."enum_projects_blocks_button_location_externality";
  DROP TYPE "public"."enum__projects_v_blocks_button_variant";
  DROP TYPE "public"."enum__projects_v_blocks_button_icon";
  DROP TYPE "public"."enum__projects_v_blocks_button_location_externality";
  DROP TYPE "public"."enum_articles_blocks_button_variant";
  DROP TYPE "public"."enum_articles_blocks_button_icon";
  DROP TYPE "public"."enum_articles_blocks_button_location_externality";
  DROP TYPE "public"."enum__articles_v_blocks_button_variant";
  DROP TYPE "public"."enum__articles_v_blocks_button_icon";
  DROP TYPE "public"."enum__articles_v_blocks_button_location_externality";
  DROP TYPE "public"."enum_templates_blocks_button_variant";
  DROP TYPE "public"."enum_templates_blocks_button_icon";
  DROP TYPE "public"."enum_templates_blocks_button_location_externality";
  DROP TYPE "public"."enum_maintenance_blocks_button_variant";
  DROP TYPE "public"."enum_maintenance_blocks_button_icon";
  DROP TYPE "public"."enum_maintenance_blocks_button_location_externality";
  DROP TYPE "public"."enum_not_found_blocks_button_variant";
  DROP TYPE "public"."enum_not_found_blocks_button_icon";
  DROP TYPE "public"."enum_not_found_blocks_button_location_externality";
  DROP TYPE "public"."enum_error_page_blocks_button_variant";
  DROP TYPE "public"."enum_error_page_blocks_button_icon";
  DROP TYPE "public"."enum_error_page_blocks_button_location_externality";`);
}
