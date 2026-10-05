import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_icon_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_pages_blocks_icon_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'react', 'react-router', 'typescript');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'react', 'react-router', 'typescript');
  CREATE TYPE "public"."enum_projects_blocks_icon_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_projects_blocks_icon_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'react', 'react-router', 'typescript');
  CREATE TYPE "public"."enum__projects_v_blocks_icon_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum__projects_v_blocks_icon_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'react', 'react-router', 'typescript');
  CREATE TYPE "public"."enum_articles_blocks_icon_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_articles_blocks_icon_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'react', 'react-router', 'typescript');
  CREATE TYPE "public"."enum__articles_v_blocks_icon_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum__articles_v_blocks_icon_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'react', 'react-router', 'typescript');
  CREATE TYPE "public"."enum_templates_blocks_icon_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_templates_blocks_icon_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'react', 'react-router', 'typescript');
  CREATE TYPE "public"."enum_maintenance_blocks_icon_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_maintenance_blocks_icon_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'react', 'react-router', 'typescript');
  CREATE TYPE "public"."enum_not_found_blocks_icon_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_not_found_blocks_icon_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'react', 'react-router', 'typescript');
  CREATE TYPE "public"."enum_error_page_blocks_icon_variant" AS ENUM('default', 'primary', 'secondary', 'disabled');
  CREATE TYPE "public"."enum_error_page_blocks_icon_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'react', 'react-router', 'typescript');
  ALTER TYPE "public"."enum_pages_blocks_button_icon" ADD VALUE 'react' BEFORE 'none';
  ALTER TYPE "public"."enum_pages_blocks_button_icon" ADD VALUE 'react-router' BEFORE 'none';
  ALTER TYPE "public"."enum_pages_blocks_button_icon" ADD VALUE 'typescript' BEFORE 'none';
  ALTER TYPE "public"."enum__pages_v_blocks_button_icon" ADD VALUE 'react' BEFORE 'none';
  ALTER TYPE "public"."enum__pages_v_blocks_button_icon" ADD VALUE 'react-router' BEFORE 'none';
  ALTER TYPE "public"."enum__pages_v_blocks_button_icon" ADD VALUE 'typescript' BEFORE 'none';
  ALTER TYPE "public"."enum_projects_blocks_button_icon" ADD VALUE 'react' BEFORE 'none';
  ALTER TYPE "public"."enum_projects_blocks_button_icon" ADD VALUE 'react-router' BEFORE 'none';
  ALTER TYPE "public"."enum_projects_blocks_button_icon" ADD VALUE 'typescript' BEFORE 'none';
  ALTER TYPE "public"."enum__projects_v_blocks_button_icon" ADD VALUE 'react' BEFORE 'none';
  ALTER TYPE "public"."enum__projects_v_blocks_button_icon" ADD VALUE 'react-router' BEFORE 'none';
  ALTER TYPE "public"."enum__projects_v_blocks_button_icon" ADD VALUE 'typescript' BEFORE 'none';
  ALTER TYPE "public"."enum_articles_blocks_button_icon" ADD VALUE 'react' BEFORE 'none';
  ALTER TYPE "public"."enum_articles_blocks_button_icon" ADD VALUE 'react-router' BEFORE 'none';
  ALTER TYPE "public"."enum_articles_blocks_button_icon" ADD VALUE 'typescript' BEFORE 'none';
  ALTER TYPE "public"."enum__articles_v_blocks_button_icon" ADD VALUE 'react' BEFORE 'none';
  ALTER TYPE "public"."enum__articles_v_blocks_button_icon" ADD VALUE 'react-router' BEFORE 'none';
  ALTER TYPE "public"."enum__articles_v_blocks_button_icon" ADD VALUE 'typescript' BEFORE 'none';
  ALTER TYPE "public"."enum_menu_items_icon" ADD VALUE 'react';
  ALTER TYPE "public"."enum_menu_items_icon" ADD VALUE 'react-router';
  ALTER TYPE "public"."enum_menu_items_icon" ADD VALUE 'typescript';
  ALTER TYPE "public"."enum_templates_blocks_button_icon" ADD VALUE 'react' BEFORE 'none';
  ALTER TYPE "public"."enum_templates_blocks_button_icon" ADD VALUE 'react-router' BEFORE 'none';
  ALTER TYPE "public"."enum_templates_blocks_button_icon" ADD VALUE 'typescript' BEFORE 'none';
  ALTER TYPE "public"."enum_maintenance_blocks_button_icon" ADD VALUE 'react' BEFORE 'none';
  ALTER TYPE "public"."enum_maintenance_blocks_button_icon" ADD VALUE 'react-router' BEFORE 'none';
  ALTER TYPE "public"."enum_maintenance_blocks_button_icon" ADD VALUE 'typescript' BEFORE 'none';
  ALTER TYPE "public"."enum_not_found_blocks_button_icon" ADD VALUE 'react' BEFORE 'none';
  ALTER TYPE "public"."enum_not_found_blocks_button_icon" ADD VALUE 'react-router' BEFORE 'none';
  ALTER TYPE "public"."enum_not_found_blocks_button_icon" ADD VALUE 'typescript' BEFORE 'none';
  ALTER TYPE "public"."enum_error_page_blocks_button_icon" ADD VALUE 'react' BEFORE 'none';
  ALTER TYPE "public"."enum_error_page_blocks_button_icon" ADD VALUE 'react-router' BEFORE 'none';
  ALTER TYPE "public"."enum_error_page_blocks_button_icon" ADD VALUE 'typescript' BEFORE 'none';
  CREATE TABLE "pages_blocks_icon" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_icon_variant" DEFAULT 'default',
  	"icon" "enum_pages_blocks_icon_icon",
  	"title" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_icon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_icon_variant" DEFAULT 'default',
  	"icon" "enum__pages_v_blocks_icon_icon",
  	"title" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_icon" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_projects_blocks_icon_variant" DEFAULT 'default',
  	"icon" "enum_projects_blocks_icon_icon",
  	"title" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_icon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__projects_v_blocks_icon_variant" DEFAULT 'default',
  	"icon" "enum__projects_v_blocks_icon_icon",
  	"title" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_icon" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_articles_blocks_icon_variant" DEFAULT 'default',
  	"icon" "enum_articles_blocks_icon_icon",
  	"title" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_icon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__articles_v_blocks_icon_variant" DEFAULT 'default',
  	"icon" "enum__articles_v_blocks_icon_icon",
  	"title" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_icon" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_templates_blocks_icon_variant" DEFAULT 'default' NOT NULL,
  	"icon" "enum_templates_blocks_icon_icon" NOT NULL,
  	"title" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "maintenance_blocks_icon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_maintenance_blocks_icon_variant" DEFAULT 'default' NOT NULL,
  	"icon" "enum_maintenance_blocks_icon_icon" NOT NULL,
  	"title" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "maintenance_blocks_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "not_found_blocks_icon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_not_found_blocks_icon_variant" DEFAULT 'default' NOT NULL,
  	"icon" "enum_not_found_blocks_icon_icon" NOT NULL,
  	"title" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "not_found_blocks_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "error_page_blocks_icon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_error_page_blocks_icon_variant" DEFAULT 'default' NOT NULL,
  	"icon" "enum_error_page_blocks_icon_icon" NOT NULL,
  	"title" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "error_page_blocks_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_icon" ADD CONSTRAINT "pages_blocks_icon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icons" ADD CONSTRAINT "pages_blocks_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon" ADD CONSTRAINT "_pages_v_blocks_icon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icons" ADD CONSTRAINT "_pages_v_blocks_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_icon" ADD CONSTRAINT "projects_blocks_icon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_icons" ADD CONSTRAINT "projects_blocks_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_icon" ADD CONSTRAINT "_projects_v_blocks_icon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_icons" ADD CONSTRAINT "_projects_v_blocks_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_icon" ADD CONSTRAINT "articles_blocks_icon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_icons" ADD CONSTRAINT "articles_blocks_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_icon" ADD CONSTRAINT "_articles_v_blocks_icon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_icons" ADD CONSTRAINT "_articles_v_blocks_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_icon" ADD CONSTRAINT "templates_blocks_icon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_icons" ADD CONSTRAINT "templates_blocks_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "maintenance_blocks_icon" ADD CONSTRAINT "maintenance_blocks_icon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."maintenance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "maintenance_blocks_icons" ADD CONSTRAINT "maintenance_blocks_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."maintenance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_blocks_icon" ADD CONSTRAINT "not_found_blocks_icon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_blocks_icons" ADD CONSTRAINT "not_found_blocks_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_blocks_icon" ADD CONSTRAINT "error_page_blocks_icon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."error_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_blocks_icons" ADD CONSTRAINT "error_page_blocks_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."error_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_icon_order_idx" ON "pages_blocks_icon" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_parent_id_idx" ON "pages_blocks_icon" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_path_idx" ON "pages_blocks_icon" USING btree ("_path");
  CREATE INDEX "pages_blocks_icons_order_idx" ON "pages_blocks_icons" USING btree ("_order");
  CREATE INDEX "pages_blocks_icons_parent_id_idx" ON "pages_blocks_icons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icons_path_idx" ON "pages_blocks_icons" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_icon_order_idx" ON "_pages_v_blocks_icon" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_icon_parent_id_idx" ON "_pages_v_blocks_icon" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_icon_path_idx" ON "_pages_v_blocks_icon" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_icons_order_idx" ON "_pages_v_blocks_icons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_icons_parent_id_idx" ON "_pages_v_blocks_icons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_icons_path_idx" ON "_pages_v_blocks_icons" USING btree ("_path");
  CREATE INDEX "projects_blocks_icon_order_idx" ON "projects_blocks_icon" USING btree ("_order");
  CREATE INDEX "projects_blocks_icon_parent_id_idx" ON "projects_blocks_icon" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_icon_path_idx" ON "projects_blocks_icon" USING btree ("_path");
  CREATE INDEX "projects_blocks_icons_order_idx" ON "projects_blocks_icons" USING btree ("_order");
  CREATE INDEX "projects_blocks_icons_parent_id_idx" ON "projects_blocks_icons" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_icons_path_idx" ON "projects_blocks_icons" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_icon_order_idx" ON "_projects_v_blocks_icon" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_icon_parent_id_idx" ON "_projects_v_blocks_icon" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_icon_path_idx" ON "_projects_v_blocks_icon" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_icons_order_idx" ON "_projects_v_blocks_icons" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_icons_parent_id_idx" ON "_projects_v_blocks_icons" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_icons_path_idx" ON "_projects_v_blocks_icons" USING btree ("_path");
  CREATE INDEX "articles_blocks_icon_order_idx" ON "articles_blocks_icon" USING btree ("_order");
  CREATE INDEX "articles_blocks_icon_parent_id_idx" ON "articles_blocks_icon" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_icon_path_idx" ON "articles_blocks_icon" USING btree ("_path");
  CREATE INDEX "articles_blocks_icons_order_idx" ON "articles_blocks_icons" USING btree ("_order");
  CREATE INDEX "articles_blocks_icons_parent_id_idx" ON "articles_blocks_icons" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_icons_path_idx" ON "articles_blocks_icons" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_icon_order_idx" ON "_articles_v_blocks_icon" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_icon_parent_id_idx" ON "_articles_v_blocks_icon" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_icon_path_idx" ON "_articles_v_blocks_icon" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_icons_order_idx" ON "_articles_v_blocks_icons" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_icons_parent_id_idx" ON "_articles_v_blocks_icons" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_icons_path_idx" ON "_articles_v_blocks_icons" USING btree ("_path");
  CREATE INDEX "templates_blocks_icon_order_idx" ON "templates_blocks_icon" USING btree ("_order");
  CREATE INDEX "templates_blocks_icon_parent_id_idx" ON "templates_blocks_icon" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_icon_path_idx" ON "templates_blocks_icon" USING btree ("_path");
  CREATE INDEX "templates_blocks_icons_order_idx" ON "templates_blocks_icons" USING btree ("_order");
  CREATE INDEX "templates_blocks_icons_parent_id_idx" ON "templates_blocks_icons" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_icons_path_idx" ON "templates_blocks_icons" USING btree ("_path");
  CREATE INDEX "maintenance_blocks_icon_order_idx" ON "maintenance_blocks_icon" USING btree ("_order");
  CREATE INDEX "maintenance_blocks_icon_parent_id_idx" ON "maintenance_blocks_icon" USING btree ("_parent_id");
  CREATE INDEX "maintenance_blocks_icon_path_idx" ON "maintenance_blocks_icon" USING btree ("_path");
  CREATE INDEX "maintenance_blocks_icons_order_idx" ON "maintenance_blocks_icons" USING btree ("_order");
  CREATE INDEX "maintenance_blocks_icons_parent_id_idx" ON "maintenance_blocks_icons" USING btree ("_parent_id");
  CREATE INDEX "maintenance_blocks_icons_path_idx" ON "maintenance_blocks_icons" USING btree ("_path");
  CREATE INDEX "not_found_blocks_icon_order_idx" ON "not_found_blocks_icon" USING btree ("_order");
  CREATE INDEX "not_found_blocks_icon_parent_id_idx" ON "not_found_blocks_icon" USING btree ("_parent_id");
  CREATE INDEX "not_found_blocks_icon_path_idx" ON "not_found_blocks_icon" USING btree ("_path");
  CREATE INDEX "not_found_blocks_icons_order_idx" ON "not_found_blocks_icons" USING btree ("_order");
  CREATE INDEX "not_found_blocks_icons_parent_id_idx" ON "not_found_blocks_icons" USING btree ("_parent_id");
  CREATE INDEX "not_found_blocks_icons_path_idx" ON "not_found_blocks_icons" USING btree ("_path");
  CREATE INDEX "error_page_blocks_icon_order_idx" ON "error_page_blocks_icon" USING btree ("_order");
  CREATE INDEX "error_page_blocks_icon_parent_id_idx" ON "error_page_blocks_icon" USING btree ("_parent_id");
  CREATE INDEX "error_page_blocks_icon_path_idx" ON "error_page_blocks_icon" USING btree ("_path");
  CREATE INDEX "error_page_blocks_icons_order_idx" ON "error_page_blocks_icons" USING btree ("_order");
  CREATE INDEX "error_page_blocks_icons_parent_id_idx" ON "error_page_blocks_icons" USING btree ("_parent_id");
  CREATE INDEX "error_page_blocks_icons_path_idx" ON "error_page_blocks_icons" USING btree ("_path");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_icon" CASCADE;
  DROP TABLE "pages_blocks_icons" CASCADE;
  DROP TABLE "_pages_v_blocks_icon" CASCADE;
  DROP TABLE "_pages_v_blocks_icons" CASCADE;
  DROP TABLE "projects_blocks_icon" CASCADE;
  DROP TABLE "projects_blocks_icons" CASCADE;
  DROP TABLE "_projects_v_blocks_icon" CASCADE;
  DROP TABLE "_projects_v_blocks_icons" CASCADE;
  DROP TABLE "articles_blocks_icon" CASCADE;
  DROP TABLE "articles_blocks_icons" CASCADE;
  DROP TABLE "_articles_v_blocks_icon" CASCADE;
  DROP TABLE "_articles_v_blocks_icons" CASCADE;
  DROP TABLE "templates_blocks_icon" CASCADE;
  DROP TABLE "templates_blocks_icons" CASCADE;
  DROP TABLE "maintenance_blocks_icon" CASCADE;
  DROP TABLE "maintenance_blocks_icons" CASCADE;
  DROP TABLE "not_found_blocks_icon" CASCADE;
  DROP TABLE "not_found_blocks_icons" CASCADE;
  DROP TABLE "error_page_blocks_icon" CASCADE;
  DROP TABLE "error_page_blocks_icons" CASCADE;
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum_pages_blocks_button_icon";
  CREATE TYPE "public"."enum_pages_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::"public"."enum_pages_blocks_button_icon";
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_button_icon" USING "icon"::"public"."enum_pages_blocks_button_icon";
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum__pages_v_blocks_button_icon";
  CREATE TYPE "public"."enum__pages_v_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::"public"."enum__pages_v_blocks_button_icon";
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__pages_v_blocks_button_icon" USING "icon"::"public"."enum__pages_v_blocks_button_icon";
  ALTER TABLE "projects_blocks_button" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "projects_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum_projects_blocks_button_icon";
  CREATE TYPE "public"."enum_projects_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  ALTER TABLE "projects_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::"public"."enum_projects_blocks_button_icon";
  ALTER TABLE "projects_blocks_button" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_projects_blocks_button_icon" USING "icon"::"public"."enum_projects_blocks_button_icon";
  ALTER TABLE "_projects_v_blocks_button" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_projects_v_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum__projects_v_blocks_button_icon";
  CREATE TYPE "public"."enum__projects_v_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  ALTER TABLE "_projects_v_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::"public"."enum__projects_v_blocks_button_icon";
  ALTER TABLE "_projects_v_blocks_button" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__projects_v_blocks_button_icon" USING "icon"::"public"."enum__projects_v_blocks_button_icon";
  ALTER TABLE "articles_blocks_button" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "articles_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum_articles_blocks_button_icon";
  CREATE TYPE "public"."enum_articles_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  ALTER TABLE "articles_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::"public"."enum_articles_blocks_button_icon";
  ALTER TABLE "articles_blocks_button" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_articles_blocks_button_icon" USING "icon"::"public"."enum_articles_blocks_button_icon";
  ALTER TABLE "_articles_v_blocks_button" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_articles_v_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum__articles_v_blocks_button_icon";
  CREATE TYPE "public"."enum__articles_v_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  ALTER TABLE "_articles_v_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::"public"."enum__articles_v_blocks_button_icon";
  ALTER TABLE "_articles_v_blocks_button" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__articles_v_blocks_button_icon" USING "icon"::"public"."enum__articles_v_blocks_button_icon";
  ALTER TABLE "menu_items" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_menu_items_icon";
  CREATE TYPE "public"."enum_menu_items_icon" AS ENUM('linkedin', 'github', 'logo', 'chevron-right', 'arrow-up-right');
  ALTER TABLE "menu_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_menu_items_icon" USING "icon"::"public"."enum_menu_items_icon";
  ALTER TABLE "templates_blocks_button" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "templates_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum_templates_blocks_button_icon";
  CREATE TYPE "public"."enum_templates_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  ALTER TABLE "templates_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::"public"."enum_templates_blocks_button_icon";
  ALTER TABLE "templates_blocks_button" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_templates_blocks_button_icon" USING "icon"::"public"."enum_templates_blocks_button_icon";
  ALTER TABLE "maintenance_blocks_button" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "maintenance_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum_maintenance_blocks_button_icon";
  CREATE TYPE "public"."enum_maintenance_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  ALTER TABLE "maintenance_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::"public"."enum_maintenance_blocks_button_icon";
  ALTER TABLE "maintenance_blocks_button" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_maintenance_blocks_button_icon" USING "icon"::"public"."enum_maintenance_blocks_button_icon";
  ALTER TABLE "not_found_blocks_button" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "not_found_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum_not_found_blocks_button_icon";
  CREATE TYPE "public"."enum_not_found_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  ALTER TABLE "not_found_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::"public"."enum_not_found_blocks_button_icon";
  ALTER TABLE "not_found_blocks_button" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_not_found_blocks_button_icon" USING "icon"::"public"."enum_not_found_blocks_button_icon";
  ALTER TABLE "error_page_blocks_button" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "error_page_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum_error_page_blocks_button_icon";
  CREATE TYPE "public"."enum_error_page_blocks_button_icon" AS ENUM('linkedin', 'github', 'chevron-right', 'arrow-up-right', 'none');
  ALTER TABLE "error_page_blocks_button" ALTER COLUMN "icon" SET DEFAULT 'none'::"public"."enum_error_page_blocks_button_icon";
  ALTER TABLE "error_page_blocks_button" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_error_page_blocks_button_icon" USING "icon"::"public"."enum_error_page_blocks_button_icon";
  DROP TYPE "public"."enum_pages_blocks_icon_variant";
  DROP TYPE "public"."enum_pages_blocks_icon_icon";
  DROP TYPE "public"."enum__pages_v_blocks_icon_variant";
  DROP TYPE "public"."enum__pages_v_blocks_icon_icon";
  DROP TYPE "public"."enum_projects_blocks_icon_variant";
  DROP TYPE "public"."enum_projects_blocks_icon_icon";
  DROP TYPE "public"."enum__projects_v_blocks_icon_variant";
  DROP TYPE "public"."enum__projects_v_blocks_icon_icon";
  DROP TYPE "public"."enum_articles_blocks_icon_variant";
  DROP TYPE "public"."enum_articles_blocks_icon_icon";
  DROP TYPE "public"."enum__articles_v_blocks_icon_variant";
  DROP TYPE "public"."enum__articles_v_blocks_icon_icon";
  DROP TYPE "public"."enum_templates_blocks_icon_variant";
  DROP TYPE "public"."enum_templates_blocks_icon_icon";
  DROP TYPE "public"."enum_maintenance_blocks_icon_variant";
  DROP TYPE "public"."enum_maintenance_blocks_icon_icon";
  DROP TYPE "public"."enum_not_found_blocks_icon_variant";
  DROP TYPE "public"."enum_not_found_blocks_icon_icon";
  DROP TYPE "public"."enum_error_page_blocks_icon_variant";
  DROP TYPE "public"."enum_error_page_blocks_icon_icon";`);
}
