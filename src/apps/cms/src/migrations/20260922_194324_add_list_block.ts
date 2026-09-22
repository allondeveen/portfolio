import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_list_enumeration_type" AS ENUM('ordered', 'unordered');
  CREATE TYPE "public"."enum_pages_blocks_list_enumeration_list_style_type" AS ENUM('default', 'disc', 'circle', 'square', 'decimal-leading-zero', 'lower-alpha', 'upper-alpha', 'hebrew', 'lower-roman', 'upper-roman', 'none', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_list_enumeration_type" AS ENUM('ordered', 'unordered');
  CREATE TYPE "public"."enum__pages_v_blocks_list_enumeration_list_style_type" AS ENUM('default', 'disc', 'circle', 'square', 'decimal-leading-zero', 'lower-alpha', 'upper-alpha', 'hebrew', 'lower-roman', 'upper-roman', 'none', 'image');
  CREATE TYPE "public"."enum_projects_blocks_list_enumeration_type" AS ENUM('ordered', 'unordered');
  CREATE TYPE "public"."enum_projects_blocks_list_enumeration_list_style_type" AS ENUM('default', 'disc', 'circle', 'square', 'decimal-leading-zero', 'lower-alpha', 'upper-alpha', 'hebrew', 'lower-roman', 'upper-roman', 'none', 'image');
  CREATE TYPE "public"."enum__projects_v_blocks_list_enumeration_type" AS ENUM('ordered', 'unordered');
  CREATE TYPE "public"."enum__projects_v_blocks_list_enumeration_list_style_type" AS ENUM('default', 'disc', 'circle', 'square', 'decimal-leading-zero', 'lower-alpha', 'upper-alpha', 'hebrew', 'lower-roman', 'upper-roman', 'none', 'image');
  CREATE TYPE "public"."enum_articles_blocks_list_enumeration_type" AS ENUM('ordered', 'unordered');
  CREATE TYPE "public"."enum_articles_blocks_list_enumeration_list_style_type" AS ENUM('default', 'disc', 'circle', 'square', 'decimal-leading-zero', 'lower-alpha', 'upper-alpha', 'hebrew', 'lower-roman', 'upper-roman', 'none', 'image');
  CREATE TYPE "public"."enum__articles_v_blocks_list_enumeration_type" AS ENUM('ordered', 'unordered');
  CREATE TYPE "public"."enum__articles_v_blocks_list_enumeration_list_style_type" AS ENUM('default', 'disc', 'circle', 'square', 'decimal-leading-zero', 'lower-alpha', 'upper-alpha', 'hebrew', 'lower-roman', 'upper-roman', 'none', 'image');
  CREATE TYPE "public"."enum_templates_blocks_list_enumeration_type" AS ENUM('ordered', 'unordered');
  CREATE TYPE "public"."enum_templates_blocks_list_enumeration_list_style_type" AS ENUM('default', 'disc', 'circle', 'square', 'decimal-leading-zero', 'lower-alpha', 'upper-alpha', 'hebrew', 'lower-roman', 'upper-roman', 'none', 'image');
  CREATE TYPE "public"."enum_maintenance_blocks_list_enumeration_type" AS ENUM('ordered', 'unordered');
  CREATE TYPE "public"."enum_maintenance_blocks_list_enumeration_list_style_type" AS ENUM('default', 'disc', 'circle', 'square', 'decimal-leading-zero', 'lower-alpha', 'upper-alpha', 'hebrew', 'lower-roman', 'upper-roman', 'none', 'image');
  CREATE TYPE "public"."enum_not_found_blocks_list_enumeration_type" AS ENUM('ordered', 'unordered');
  CREATE TYPE "public"."enum_not_found_blocks_list_enumeration_list_style_type" AS ENUM('default', 'disc', 'circle', 'square', 'decimal-leading-zero', 'lower-alpha', 'upper-alpha', 'hebrew', 'lower-roman', 'upper-roman', 'none', 'image');
  CREATE TYPE "public"."enum_error_page_blocks_list_enumeration_type" AS ENUM('ordered', 'unordered');
  CREATE TYPE "public"."enum_error_page_blocks_list_enumeration_list_style_type" AS ENUM('default', 'disc', 'circle', 'square', 'decimal-leading-zero', 'lower-alpha', 'upper-alpha', 'hebrew', 'lower-roman', 'upper-roman', 'none', 'image');
  CREATE TABLE "pages_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" jsonb,
  	"image_id" varchar,
  	"order" numeric
  );
  
  CREATE TABLE "pages_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enumeration_type" "enum_pages_blocks_list_enumeration_type",
  	"enumeration_list_style_type" "enum_pages_blocks_list_enumeration_list_style_type" DEFAULT 'default',
  	"enumeration_default_image_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" jsonb,
  	"image_id" varchar,
  	"order" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enumeration_type" "enum__pages_v_blocks_list_enumeration_type",
  	"enumeration_list_style_type" "enum__pages_v_blocks_list_enumeration_list_style_type" DEFAULT 'default',
  	"enumeration_default_image_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" jsonb,
  	"image_id" varchar,
  	"order" numeric
  );
  
  CREATE TABLE "projects_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enumeration_type" "enum_projects_blocks_list_enumeration_type",
  	"enumeration_list_style_type" "enum_projects_blocks_list_enumeration_list_style_type" DEFAULT 'default',
  	"enumeration_default_image_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" jsonb,
  	"image_id" varchar,
  	"order" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enumeration_type" "enum__projects_v_blocks_list_enumeration_type",
  	"enumeration_list_style_type" "enum__projects_v_blocks_list_enumeration_list_style_type" DEFAULT 'default',
  	"enumeration_default_image_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" jsonb,
  	"image_id" varchar,
  	"order" numeric
  );
  
  CREATE TABLE "articles_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enumeration_type" "enum_articles_blocks_list_enumeration_type",
  	"enumeration_list_style_type" "enum_articles_blocks_list_enumeration_list_style_type" DEFAULT 'default',
  	"enumeration_default_image_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" jsonb,
  	"image_id" varchar,
  	"order" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enumeration_type" "enum__articles_v_blocks_list_enumeration_type",
  	"enumeration_list_style_type" "enum__articles_v_blocks_list_enumeration_list_style_type" DEFAULT 'default',
  	"enumeration_default_image_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" jsonb NOT NULL,
  	"image_id" varchar,
  	"order" numeric
  );
  
  CREATE TABLE "templates_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enumeration_type" "enum_templates_blocks_list_enumeration_type" NOT NULL,
  	"enumeration_list_style_type" "enum_templates_blocks_list_enumeration_list_style_type" DEFAULT 'default' NOT NULL,
  	"enumeration_default_image_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "maintenance_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" jsonb NOT NULL,
  	"image_id" varchar,
  	"order" numeric
  );
  
  CREATE TABLE "maintenance_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enumeration_type" "enum_maintenance_blocks_list_enumeration_type" NOT NULL,
  	"enumeration_list_style_type" "enum_maintenance_blocks_list_enumeration_list_style_type" DEFAULT 'default' NOT NULL,
  	"enumeration_default_image_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "not_found_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" jsonb NOT NULL,
  	"image_id" varchar,
  	"order" numeric
  );
  
  CREATE TABLE "not_found_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enumeration_type" "enum_not_found_blocks_list_enumeration_type" NOT NULL,
  	"enumeration_list_style_type" "enum_not_found_blocks_list_enumeration_list_style_type" DEFAULT 'default' NOT NULL,
  	"enumeration_default_image_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "error_page_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" jsonb NOT NULL,
  	"image_id" varchar,
  	"order" numeric
  );
  
  CREATE TABLE "error_page_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enumeration_type" "enum_error_page_blocks_list_enumeration_type" NOT NULL,
  	"enumeration_list_style_type" "enum_error_page_blocks_list_enumeration_list_style_type" DEFAULT 'default' NOT NULL,
  	"enumeration_default_image_id" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_list_items" ADD CONSTRAINT "pages_blocks_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_items" ADD CONSTRAINT "pages_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list" ADD CONSTRAINT "pages_blocks_list_enumeration_default_image_id_media_id_fk" FOREIGN KEY ("enumeration_default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_list" ADD CONSTRAINT "pages_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_items" ADD CONSTRAINT "_pages_v_blocks_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_items" ADD CONSTRAINT "_pages_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list" ADD CONSTRAINT "_pages_v_blocks_list_enumeration_default_image_id_media_id_fk" FOREIGN KEY ("enumeration_default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list" ADD CONSTRAINT "_pages_v_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_list_items" ADD CONSTRAINT "projects_blocks_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_list_items" ADD CONSTRAINT "projects_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_list" ADD CONSTRAINT "projects_blocks_list_enumeration_default_image_id_media_id_fk" FOREIGN KEY ("enumeration_default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_list" ADD CONSTRAINT "projects_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_list_items" ADD CONSTRAINT "_projects_v_blocks_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_list_items" ADD CONSTRAINT "_projects_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_list" ADD CONSTRAINT "_projects_v_blocks_list_enumeration_default_image_id_media_id_fk" FOREIGN KEY ("enumeration_default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_list" ADD CONSTRAINT "_projects_v_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_list_items" ADD CONSTRAINT "articles_blocks_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_list_items" ADD CONSTRAINT "articles_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_list" ADD CONSTRAINT "articles_blocks_list_enumeration_default_image_id_media_id_fk" FOREIGN KEY ("enumeration_default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_list" ADD CONSTRAINT "articles_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_list_items" ADD CONSTRAINT "_articles_v_blocks_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_list_items" ADD CONSTRAINT "_articles_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_list" ADD CONSTRAINT "_articles_v_blocks_list_enumeration_default_image_id_media_id_fk" FOREIGN KEY ("enumeration_default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_list" ADD CONSTRAINT "_articles_v_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_list_items" ADD CONSTRAINT "templates_blocks_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_list_items" ADD CONSTRAINT "templates_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_list" ADD CONSTRAINT "templates_blocks_list_enumeration_default_image_id_media_id_fk" FOREIGN KEY ("enumeration_default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_list" ADD CONSTRAINT "templates_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "maintenance_blocks_list_items" ADD CONSTRAINT "maintenance_blocks_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "maintenance_blocks_list_items" ADD CONSTRAINT "maintenance_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."maintenance_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "maintenance_blocks_list" ADD CONSTRAINT "maintenance_blocks_list_enumeration_default_image_id_media_id_fk" FOREIGN KEY ("enumeration_default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "maintenance_blocks_list" ADD CONSTRAINT "maintenance_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."maintenance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_blocks_list_items" ADD CONSTRAINT "not_found_blocks_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "not_found_blocks_list_items" ADD CONSTRAINT "not_found_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_blocks_list" ADD CONSTRAINT "not_found_blocks_list_enumeration_default_image_id_media_id_fk" FOREIGN KEY ("enumeration_default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "not_found_blocks_list" ADD CONSTRAINT "not_found_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_blocks_list_items" ADD CONSTRAINT "error_page_blocks_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "error_page_blocks_list_items" ADD CONSTRAINT "error_page_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."error_page_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_blocks_list" ADD CONSTRAINT "error_page_blocks_list_enumeration_default_image_id_media_id_fk" FOREIGN KEY ("enumeration_default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "error_page_blocks_list" ADD CONSTRAINT "error_page_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."error_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_list_items_order_idx" ON "pages_blocks_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_items_parent_id_idx" ON "pages_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_items_image_idx" ON "pages_blocks_list_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_list_order_idx" ON "pages_blocks_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_parent_id_idx" ON "pages_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_path_idx" ON "pages_blocks_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_list_enumeration_enumeration_default_image_idx" ON "pages_blocks_list" USING btree ("enumeration_default_image_id");
  CREATE INDEX "_pages_v_blocks_list_items_order_idx" ON "_pages_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_list_items_parent_id_idx" ON "_pages_v_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_list_items_image_idx" ON "_pages_v_blocks_list_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_list_order_idx" ON "_pages_v_blocks_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_list_parent_id_idx" ON "_pages_v_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_list_path_idx" ON "_pages_v_blocks_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_list_enumeration_enumeration_default_ima_idx" ON "_pages_v_blocks_list" USING btree ("enumeration_default_image_id");
  CREATE INDEX "projects_blocks_list_items_order_idx" ON "projects_blocks_list_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_list_items_parent_id_idx" ON "projects_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_list_items_image_idx" ON "projects_blocks_list_items" USING btree ("image_id");
  CREATE INDEX "projects_blocks_list_order_idx" ON "projects_blocks_list" USING btree ("_order");
  CREATE INDEX "projects_blocks_list_parent_id_idx" ON "projects_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_list_path_idx" ON "projects_blocks_list" USING btree ("_path");
  CREATE INDEX "projects_blocks_list_enumeration_enumeration_default_ima_idx" ON "projects_blocks_list" USING btree ("enumeration_default_image_id");
  CREATE INDEX "_projects_v_blocks_list_items_order_idx" ON "_projects_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_list_items_parent_id_idx" ON "_projects_v_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_list_items_image_idx" ON "_projects_v_blocks_list_items" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_list_order_idx" ON "_projects_v_blocks_list" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_list_parent_id_idx" ON "_projects_v_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_list_path_idx" ON "_projects_v_blocks_list" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_list_enumeration_enumeration_default__idx" ON "_projects_v_blocks_list" USING btree ("enumeration_default_image_id");
  CREATE INDEX "articles_blocks_list_items_order_idx" ON "articles_blocks_list_items" USING btree ("_order");
  CREATE INDEX "articles_blocks_list_items_parent_id_idx" ON "articles_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_list_items_image_idx" ON "articles_blocks_list_items" USING btree ("image_id");
  CREATE INDEX "articles_blocks_list_order_idx" ON "articles_blocks_list" USING btree ("_order");
  CREATE INDEX "articles_blocks_list_parent_id_idx" ON "articles_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_list_path_idx" ON "articles_blocks_list" USING btree ("_path");
  CREATE INDEX "articles_blocks_list_enumeration_enumeration_default_ima_idx" ON "articles_blocks_list" USING btree ("enumeration_default_image_id");
  CREATE INDEX "_articles_v_blocks_list_items_order_idx" ON "_articles_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_list_items_parent_id_idx" ON "_articles_v_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_list_items_image_idx" ON "_articles_v_blocks_list_items" USING btree ("image_id");
  CREATE INDEX "_articles_v_blocks_list_order_idx" ON "_articles_v_blocks_list" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_list_parent_id_idx" ON "_articles_v_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_list_path_idx" ON "_articles_v_blocks_list" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_list_enumeration_enumeration_default__idx" ON "_articles_v_blocks_list" USING btree ("enumeration_default_image_id");
  CREATE INDEX "templates_blocks_list_items_order_idx" ON "templates_blocks_list_items" USING btree ("_order");
  CREATE INDEX "templates_blocks_list_items_parent_id_idx" ON "templates_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_list_items_image_idx" ON "templates_blocks_list_items" USING btree ("image_id");
  CREATE INDEX "templates_blocks_list_order_idx" ON "templates_blocks_list" USING btree ("_order");
  CREATE INDEX "templates_blocks_list_parent_id_idx" ON "templates_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_list_path_idx" ON "templates_blocks_list" USING btree ("_path");
  CREATE INDEX "templates_blocks_list_enumeration_enumeration_default_im_idx" ON "templates_blocks_list" USING btree ("enumeration_default_image_id");
  CREATE INDEX "maintenance_blocks_list_items_order_idx" ON "maintenance_blocks_list_items" USING btree ("_order");
  CREATE INDEX "maintenance_blocks_list_items_parent_id_idx" ON "maintenance_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "maintenance_blocks_list_items_image_idx" ON "maintenance_blocks_list_items" USING btree ("image_id");
  CREATE INDEX "maintenance_blocks_list_order_idx" ON "maintenance_blocks_list" USING btree ("_order");
  CREATE INDEX "maintenance_blocks_list_parent_id_idx" ON "maintenance_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "maintenance_blocks_list_path_idx" ON "maintenance_blocks_list" USING btree ("_path");
  CREATE INDEX "maintenance_blocks_list_enumeration_enumeration_default__idx" ON "maintenance_blocks_list" USING btree ("enumeration_default_image_id");
  CREATE INDEX "not_found_blocks_list_items_order_idx" ON "not_found_blocks_list_items" USING btree ("_order");
  CREATE INDEX "not_found_blocks_list_items_parent_id_idx" ON "not_found_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "not_found_blocks_list_items_image_idx" ON "not_found_blocks_list_items" USING btree ("image_id");
  CREATE INDEX "not_found_blocks_list_order_idx" ON "not_found_blocks_list" USING btree ("_order");
  CREATE INDEX "not_found_blocks_list_parent_id_idx" ON "not_found_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "not_found_blocks_list_path_idx" ON "not_found_blocks_list" USING btree ("_path");
  CREATE INDEX "not_found_blocks_list_enumeration_enumeration_default_im_idx" ON "not_found_blocks_list" USING btree ("enumeration_default_image_id");
  CREATE INDEX "error_page_blocks_list_items_order_idx" ON "error_page_blocks_list_items" USING btree ("_order");
  CREATE INDEX "error_page_blocks_list_items_parent_id_idx" ON "error_page_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "error_page_blocks_list_items_image_idx" ON "error_page_blocks_list_items" USING btree ("image_id");
  CREATE INDEX "error_page_blocks_list_order_idx" ON "error_page_blocks_list" USING btree ("_order");
  CREATE INDEX "error_page_blocks_list_parent_id_idx" ON "error_page_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "error_page_blocks_list_path_idx" ON "error_page_blocks_list" USING btree ("_path");
  CREATE INDEX "error_page_blocks_list_enumeration_enumeration_default_i_idx" ON "error_page_blocks_list" USING btree ("enumeration_default_image_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_list_items" CASCADE;
  DROP TABLE "pages_blocks_list" CASCADE;
  DROP TABLE "_pages_v_blocks_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_list" CASCADE;
  DROP TABLE "projects_blocks_list_items" CASCADE;
  DROP TABLE "projects_blocks_list" CASCADE;
  DROP TABLE "_projects_v_blocks_list_items" CASCADE;
  DROP TABLE "_projects_v_blocks_list" CASCADE;
  DROP TABLE "articles_blocks_list_items" CASCADE;
  DROP TABLE "articles_blocks_list" CASCADE;
  DROP TABLE "_articles_v_blocks_list_items" CASCADE;
  DROP TABLE "_articles_v_blocks_list" CASCADE;
  DROP TABLE "templates_blocks_list_items" CASCADE;
  DROP TABLE "templates_blocks_list" CASCADE;
  DROP TABLE "maintenance_blocks_list_items" CASCADE;
  DROP TABLE "maintenance_blocks_list" CASCADE;
  DROP TABLE "not_found_blocks_list_items" CASCADE;
  DROP TABLE "not_found_blocks_list" CASCADE;
  DROP TABLE "error_page_blocks_list_items" CASCADE;
  DROP TABLE "error_page_blocks_list" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_list_enumeration_type";
  DROP TYPE "public"."enum_pages_blocks_list_enumeration_list_style_type";
  DROP TYPE "public"."enum__pages_v_blocks_list_enumeration_type";
  DROP TYPE "public"."enum__pages_v_blocks_list_enumeration_list_style_type";
  DROP TYPE "public"."enum_projects_blocks_list_enumeration_type";
  DROP TYPE "public"."enum_projects_blocks_list_enumeration_list_style_type";
  DROP TYPE "public"."enum__projects_v_blocks_list_enumeration_type";
  DROP TYPE "public"."enum__projects_v_blocks_list_enumeration_list_style_type";
  DROP TYPE "public"."enum_articles_blocks_list_enumeration_type";
  DROP TYPE "public"."enum_articles_blocks_list_enumeration_list_style_type";
  DROP TYPE "public"."enum__articles_v_blocks_list_enumeration_type";
  DROP TYPE "public"."enum__articles_v_blocks_list_enumeration_list_style_type";
  DROP TYPE "public"."enum_templates_blocks_list_enumeration_type";
  DROP TYPE "public"."enum_templates_blocks_list_enumeration_list_style_type";
  DROP TYPE "public"."enum_maintenance_blocks_list_enumeration_type";
  DROP TYPE "public"."enum_maintenance_blocks_list_enumeration_list_style_type";
  DROP TYPE "public"."enum_not_found_blocks_list_enumeration_type";
  DROP TYPE "public"."enum_not_found_blocks_list_enumeration_list_style_type";
  DROP TYPE "public"."enum_error_page_blocks_list_enumeration_type";
  DROP TYPE "public"."enum_error_page_blocks_list_enumeration_list_style_type";`);
}
