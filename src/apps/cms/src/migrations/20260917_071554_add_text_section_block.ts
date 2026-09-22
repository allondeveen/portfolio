import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"menu_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_site_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_grid_item" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" numeric DEFAULT 1,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"vertical_align" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"menu_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_site_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_grid_item" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" numeric DEFAULT 1,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"vertical_align" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"menu_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_site_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_grid_item" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" numeric DEFAULT 1,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"vertical_align" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"menu_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_site_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_grid_item" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" numeric DEFAULT 1,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"vertical_align" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"menu_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_site_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_grid_item" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" numeric DEFAULT 1,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"vertical_align" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"menu_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_site_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_grid_item" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" numeric DEFAULT 1,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"vertical_align" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "maintenance_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "not_found_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "not_found_blocks_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "not_found_blocks_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"menu_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "not_found_blocks_site_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "not_found_blocks_grid_item" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" numeric DEFAULT 1 NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "not_found_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"vertical_align" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "not_found_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "error_page_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "error_page_blocks_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "error_page_blocks_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"menu_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "error_page_blocks_site_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "error_page_blocks_grid_item" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" numeric DEFAULT 1 NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "error_page_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"vertical_align" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "error_page_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stack" ADD CONSTRAINT "pages_blocks_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu" ADD CONSTRAINT "pages_blocks_menu_menu_id_menu_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menu"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu" ADD CONSTRAINT "pages_blocks_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_site_title" ADD CONSTRAINT "pages_blocks_site_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_grid_item" ADD CONSTRAINT "pages_blocks_grid_item_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_grid" ADD CONSTRAINT "pages_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_section" ADD CONSTRAINT "pages_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image" ADD CONSTRAINT "_pages_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image" ADD CONSTRAINT "_pages_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stack" ADD CONSTRAINT "_pages_v_blocks_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu" ADD CONSTRAINT "_pages_v_blocks_menu_menu_id_menu_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menu"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu" ADD CONSTRAINT "_pages_v_blocks_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_site_title" ADD CONSTRAINT "_pages_v_blocks_site_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_grid_item" ADD CONSTRAINT "_pages_v_blocks_grid_item_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_grid" ADD CONSTRAINT "_pages_v_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_section" ADD CONSTRAINT "_pages_v_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_image" ADD CONSTRAINT "projects_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_image" ADD CONSTRAINT "projects_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stack" ADD CONSTRAINT "projects_blocks_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_menu" ADD CONSTRAINT "projects_blocks_menu_menu_id_menu_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menu"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_menu" ADD CONSTRAINT "projects_blocks_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_site_title" ADD CONSTRAINT "projects_blocks_site_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_grid_item" ADD CONSTRAINT "projects_blocks_grid_item_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_grid" ADD CONSTRAINT "projects_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_text_section" ADD CONSTRAINT "projects_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_image" ADD CONSTRAINT "_projects_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_image" ADD CONSTRAINT "_projects_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stack" ADD CONSTRAINT "_projects_v_blocks_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_menu" ADD CONSTRAINT "_projects_v_blocks_menu_menu_id_menu_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menu"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_menu" ADD CONSTRAINT "_projects_v_blocks_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_site_title" ADD CONSTRAINT "_projects_v_blocks_site_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_grid_item" ADD CONSTRAINT "_projects_v_blocks_grid_item_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_grid" ADD CONSTRAINT "_projects_v_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_text_section" ADD CONSTRAINT "_projects_v_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_image" ADD CONSTRAINT "articles_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_image" ADD CONSTRAINT "articles_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_stack" ADD CONSTRAINT "articles_blocks_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_menu" ADD CONSTRAINT "articles_blocks_menu_menu_id_menu_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menu"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_menu" ADD CONSTRAINT "articles_blocks_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_site_title" ADD CONSTRAINT "articles_blocks_site_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_grid_item" ADD CONSTRAINT "articles_blocks_grid_item_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_grid" ADD CONSTRAINT "articles_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_text_section" ADD CONSTRAINT "articles_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_image" ADD CONSTRAINT "_articles_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_image" ADD CONSTRAINT "_articles_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_stack" ADD CONSTRAINT "_articles_v_blocks_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_menu" ADD CONSTRAINT "_articles_v_blocks_menu_menu_id_menu_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menu"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_menu" ADD CONSTRAINT "_articles_v_blocks_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_site_title" ADD CONSTRAINT "_articles_v_blocks_site_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_grid_item" ADD CONSTRAINT "_articles_v_blocks_grid_item_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_grid" ADD CONSTRAINT "_articles_v_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_text_section" ADD CONSTRAINT "_articles_v_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_text_section" ADD CONSTRAINT "templates_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "maintenance_blocks_text_section" ADD CONSTRAINT "maintenance_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."maintenance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_blocks_image" ADD CONSTRAINT "not_found_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "not_found_blocks_image" ADD CONSTRAINT "not_found_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_blocks_stack" ADD CONSTRAINT "not_found_blocks_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_blocks_menu" ADD CONSTRAINT "not_found_blocks_menu_menu_id_menu_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menu"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "not_found_blocks_menu" ADD CONSTRAINT "not_found_blocks_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_blocks_site_title" ADD CONSTRAINT "not_found_blocks_site_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_blocks_grid_item" ADD CONSTRAINT "not_found_blocks_grid_item_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_blocks_grid" ADD CONSTRAINT "not_found_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_blocks_text_section" ADD CONSTRAINT "not_found_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_blocks_image" ADD CONSTRAINT "error_page_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "error_page_blocks_image" ADD CONSTRAINT "error_page_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."error_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_blocks_stack" ADD CONSTRAINT "error_page_blocks_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."error_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_blocks_menu" ADD CONSTRAINT "error_page_blocks_menu_menu_id_menu_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menu"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "error_page_blocks_menu" ADD CONSTRAINT "error_page_blocks_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."error_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_blocks_site_title" ADD CONSTRAINT "error_page_blocks_site_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."error_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_blocks_grid_item" ADD CONSTRAINT "error_page_blocks_grid_item_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."error_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_blocks_grid" ADD CONSTRAINT "error_page_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."error_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_blocks_text_section" ADD CONSTRAINT "error_page_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."error_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_image_order_idx" ON "pages_blocks_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_parent_id_idx" ON "pages_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_path_idx" ON "pages_blocks_image" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_image_idx" ON "pages_blocks_image" USING btree ("image_id");
  CREATE INDEX "pages_blocks_stack_order_idx" ON "pages_blocks_stack" USING btree ("_order");
  CREATE INDEX "pages_blocks_stack_parent_id_idx" ON "pages_blocks_stack" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stack_path_idx" ON "pages_blocks_stack" USING btree ("_path");
  CREATE INDEX "pages_blocks_menu_order_idx" ON "pages_blocks_menu" USING btree ("_order");
  CREATE INDEX "pages_blocks_menu_parent_id_idx" ON "pages_blocks_menu" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_menu_path_idx" ON "pages_blocks_menu" USING btree ("_path");
  CREATE INDEX "pages_blocks_menu_menu_idx" ON "pages_blocks_menu" USING btree ("menu_id");
  CREATE INDEX "pages_blocks_site_title_order_idx" ON "pages_blocks_site_title" USING btree ("_order");
  CREATE INDEX "pages_blocks_site_title_parent_id_idx" ON "pages_blocks_site_title" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_site_title_path_idx" ON "pages_blocks_site_title" USING btree ("_path");
  CREATE INDEX "pages_blocks_grid_item_order_idx" ON "pages_blocks_grid_item" USING btree ("_order");
  CREATE INDEX "pages_blocks_grid_item_parent_id_idx" ON "pages_blocks_grid_item" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_grid_item_path_idx" ON "pages_blocks_grid_item" USING btree ("_path");
  CREATE INDEX "pages_blocks_grid_order_idx" ON "pages_blocks_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_grid_parent_id_idx" ON "pages_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_grid_path_idx" ON "pages_blocks_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_text_section_order_idx" ON "pages_blocks_text_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_section_parent_id_idx" ON "pages_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_section_path_idx" ON "pages_blocks_text_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_order_idx" ON "_pages_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_parent_id_idx" ON "_pages_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_path_idx" ON "_pages_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_image_idx" ON "_pages_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_stack_order_idx" ON "_pages_v_blocks_stack" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stack_parent_id_idx" ON "_pages_v_blocks_stack" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stack_path_idx" ON "_pages_v_blocks_stack" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_menu_order_idx" ON "_pages_v_blocks_menu" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_menu_parent_id_idx" ON "_pages_v_blocks_menu" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_path_idx" ON "_pages_v_blocks_menu" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_menu_menu_idx" ON "_pages_v_blocks_menu" USING btree ("menu_id");
  CREATE INDEX "_pages_v_blocks_site_title_order_idx" ON "_pages_v_blocks_site_title" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_site_title_parent_id_idx" ON "_pages_v_blocks_site_title" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_site_title_path_idx" ON "_pages_v_blocks_site_title" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_grid_item_order_idx" ON "_pages_v_blocks_grid_item" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_grid_item_parent_id_idx" ON "_pages_v_blocks_grid_item" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_grid_item_path_idx" ON "_pages_v_blocks_grid_item" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_grid_order_idx" ON "_pages_v_blocks_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_grid_parent_id_idx" ON "_pages_v_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_grid_path_idx" ON "_pages_v_blocks_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_text_section_order_idx" ON "_pages_v_blocks_text_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_section_parent_id_idx" ON "_pages_v_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_section_path_idx" ON "_pages_v_blocks_text_section" USING btree ("_path");
  CREATE INDEX "projects_blocks_image_order_idx" ON "projects_blocks_image" USING btree ("_order");
  CREATE INDEX "projects_blocks_image_parent_id_idx" ON "projects_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_image_path_idx" ON "projects_blocks_image" USING btree ("_path");
  CREATE INDEX "projects_blocks_image_image_idx" ON "projects_blocks_image" USING btree ("image_id");
  CREATE INDEX "projects_blocks_stack_order_idx" ON "projects_blocks_stack" USING btree ("_order");
  CREATE INDEX "projects_blocks_stack_parent_id_idx" ON "projects_blocks_stack" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stack_path_idx" ON "projects_blocks_stack" USING btree ("_path");
  CREATE INDEX "projects_blocks_menu_order_idx" ON "projects_blocks_menu" USING btree ("_order");
  CREATE INDEX "projects_blocks_menu_parent_id_idx" ON "projects_blocks_menu" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_menu_path_idx" ON "projects_blocks_menu" USING btree ("_path");
  CREATE INDEX "projects_blocks_menu_menu_idx" ON "projects_blocks_menu" USING btree ("menu_id");
  CREATE INDEX "projects_blocks_site_title_order_idx" ON "projects_blocks_site_title" USING btree ("_order");
  CREATE INDEX "projects_blocks_site_title_parent_id_idx" ON "projects_blocks_site_title" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_site_title_path_idx" ON "projects_blocks_site_title" USING btree ("_path");
  CREATE INDEX "projects_blocks_grid_item_order_idx" ON "projects_blocks_grid_item" USING btree ("_order");
  CREATE INDEX "projects_blocks_grid_item_parent_id_idx" ON "projects_blocks_grid_item" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_grid_item_path_idx" ON "projects_blocks_grid_item" USING btree ("_path");
  CREATE INDEX "projects_blocks_grid_order_idx" ON "projects_blocks_grid" USING btree ("_order");
  CREATE INDEX "projects_blocks_grid_parent_id_idx" ON "projects_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_grid_path_idx" ON "projects_blocks_grid" USING btree ("_path");
  CREATE INDEX "projects_blocks_text_section_order_idx" ON "projects_blocks_text_section" USING btree ("_order");
  CREATE INDEX "projects_blocks_text_section_parent_id_idx" ON "projects_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_text_section_path_idx" ON "projects_blocks_text_section" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_image_order_idx" ON "_projects_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_image_parent_id_idx" ON "_projects_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_image_path_idx" ON "_projects_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_image_image_idx" ON "_projects_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_stack_order_idx" ON "_projects_v_blocks_stack" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_stack_parent_id_idx" ON "_projects_v_blocks_stack" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_stack_path_idx" ON "_projects_v_blocks_stack" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_menu_order_idx" ON "_projects_v_blocks_menu" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_menu_parent_id_idx" ON "_projects_v_blocks_menu" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_menu_path_idx" ON "_projects_v_blocks_menu" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_menu_menu_idx" ON "_projects_v_blocks_menu" USING btree ("menu_id");
  CREATE INDEX "_projects_v_blocks_site_title_order_idx" ON "_projects_v_blocks_site_title" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_site_title_parent_id_idx" ON "_projects_v_blocks_site_title" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_site_title_path_idx" ON "_projects_v_blocks_site_title" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_grid_item_order_idx" ON "_projects_v_blocks_grid_item" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_grid_item_parent_id_idx" ON "_projects_v_blocks_grid_item" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_grid_item_path_idx" ON "_projects_v_blocks_grid_item" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_grid_order_idx" ON "_projects_v_blocks_grid" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_grid_parent_id_idx" ON "_projects_v_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_grid_path_idx" ON "_projects_v_blocks_grid" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_text_section_order_idx" ON "_projects_v_blocks_text_section" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_text_section_parent_id_idx" ON "_projects_v_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_text_section_path_idx" ON "_projects_v_blocks_text_section" USING btree ("_path");
  CREATE INDEX "articles_blocks_image_order_idx" ON "articles_blocks_image" USING btree ("_order");
  CREATE INDEX "articles_blocks_image_parent_id_idx" ON "articles_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_image_path_idx" ON "articles_blocks_image" USING btree ("_path");
  CREATE INDEX "articles_blocks_image_image_idx" ON "articles_blocks_image" USING btree ("image_id");
  CREATE INDEX "articles_blocks_stack_order_idx" ON "articles_blocks_stack" USING btree ("_order");
  CREATE INDEX "articles_blocks_stack_parent_id_idx" ON "articles_blocks_stack" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_stack_path_idx" ON "articles_blocks_stack" USING btree ("_path");
  CREATE INDEX "articles_blocks_menu_order_idx" ON "articles_blocks_menu" USING btree ("_order");
  CREATE INDEX "articles_blocks_menu_parent_id_idx" ON "articles_blocks_menu" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_menu_path_idx" ON "articles_blocks_menu" USING btree ("_path");
  CREATE INDEX "articles_blocks_menu_menu_idx" ON "articles_blocks_menu" USING btree ("menu_id");
  CREATE INDEX "articles_blocks_site_title_order_idx" ON "articles_blocks_site_title" USING btree ("_order");
  CREATE INDEX "articles_blocks_site_title_parent_id_idx" ON "articles_blocks_site_title" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_site_title_path_idx" ON "articles_blocks_site_title" USING btree ("_path");
  CREATE INDEX "articles_blocks_grid_item_order_idx" ON "articles_blocks_grid_item" USING btree ("_order");
  CREATE INDEX "articles_blocks_grid_item_parent_id_idx" ON "articles_blocks_grid_item" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_grid_item_path_idx" ON "articles_blocks_grid_item" USING btree ("_path");
  CREATE INDEX "articles_blocks_grid_order_idx" ON "articles_blocks_grid" USING btree ("_order");
  CREATE INDEX "articles_blocks_grid_parent_id_idx" ON "articles_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_grid_path_idx" ON "articles_blocks_grid" USING btree ("_path");
  CREATE INDEX "articles_blocks_text_section_order_idx" ON "articles_blocks_text_section" USING btree ("_order");
  CREATE INDEX "articles_blocks_text_section_parent_id_idx" ON "articles_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_text_section_path_idx" ON "articles_blocks_text_section" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_image_order_idx" ON "_articles_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_image_parent_id_idx" ON "_articles_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_image_path_idx" ON "_articles_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_image_image_idx" ON "_articles_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_articles_v_blocks_stack_order_idx" ON "_articles_v_blocks_stack" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_stack_parent_id_idx" ON "_articles_v_blocks_stack" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_stack_path_idx" ON "_articles_v_blocks_stack" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_menu_order_idx" ON "_articles_v_blocks_menu" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_menu_parent_id_idx" ON "_articles_v_blocks_menu" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_menu_path_idx" ON "_articles_v_blocks_menu" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_menu_menu_idx" ON "_articles_v_blocks_menu" USING btree ("menu_id");
  CREATE INDEX "_articles_v_blocks_site_title_order_idx" ON "_articles_v_blocks_site_title" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_site_title_parent_id_idx" ON "_articles_v_blocks_site_title" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_site_title_path_idx" ON "_articles_v_blocks_site_title" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_grid_item_order_idx" ON "_articles_v_blocks_grid_item" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_grid_item_parent_id_idx" ON "_articles_v_blocks_grid_item" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_grid_item_path_idx" ON "_articles_v_blocks_grid_item" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_grid_order_idx" ON "_articles_v_blocks_grid" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_grid_parent_id_idx" ON "_articles_v_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_grid_path_idx" ON "_articles_v_blocks_grid" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_text_section_order_idx" ON "_articles_v_blocks_text_section" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_text_section_parent_id_idx" ON "_articles_v_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_text_section_path_idx" ON "_articles_v_blocks_text_section" USING btree ("_path");
  CREATE INDEX "templates_blocks_text_section_order_idx" ON "templates_blocks_text_section" USING btree ("_order");
  CREATE INDEX "templates_blocks_text_section_parent_id_idx" ON "templates_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_text_section_path_idx" ON "templates_blocks_text_section" USING btree ("_path");
  CREATE INDEX "maintenance_blocks_text_section_order_idx" ON "maintenance_blocks_text_section" USING btree ("_order");
  CREATE INDEX "maintenance_blocks_text_section_parent_id_idx" ON "maintenance_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "maintenance_blocks_text_section_path_idx" ON "maintenance_blocks_text_section" USING btree ("_path");
  CREATE INDEX "not_found_blocks_image_order_idx" ON "not_found_blocks_image" USING btree ("_order");
  CREATE INDEX "not_found_blocks_image_parent_id_idx" ON "not_found_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "not_found_blocks_image_path_idx" ON "not_found_blocks_image" USING btree ("_path");
  CREATE INDEX "not_found_blocks_image_image_idx" ON "not_found_blocks_image" USING btree ("image_id");
  CREATE INDEX "not_found_blocks_stack_order_idx" ON "not_found_blocks_stack" USING btree ("_order");
  CREATE INDEX "not_found_blocks_stack_parent_id_idx" ON "not_found_blocks_stack" USING btree ("_parent_id");
  CREATE INDEX "not_found_blocks_stack_path_idx" ON "not_found_blocks_stack" USING btree ("_path");
  CREATE INDEX "not_found_blocks_menu_order_idx" ON "not_found_blocks_menu" USING btree ("_order");
  CREATE INDEX "not_found_blocks_menu_parent_id_idx" ON "not_found_blocks_menu" USING btree ("_parent_id");
  CREATE INDEX "not_found_blocks_menu_path_idx" ON "not_found_blocks_menu" USING btree ("_path");
  CREATE INDEX "not_found_blocks_menu_menu_idx" ON "not_found_blocks_menu" USING btree ("menu_id");
  CREATE INDEX "not_found_blocks_site_title_order_idx" ON "not_found_blocks_site_title" USING btree ("_order");
  CREATE INDEX "not_found_blocks_site_title_parent_id_idx" ON "not_found_blocks_site_title" USING btree ("_parent_id");
  CREATE INDEX "not_found_blocks_site_title_path_idx" ON "not_found_blocks_site_title" USING btree ("_path");
  CREATE INDEX "not_found_blocks_grid_item_order_idx" ON "not_found_blocks_grid_item" USING btree ("_order");
  CREATE INDEX "not_found_blocks_grid_item_parent_id_idx" ON "not_found_blocks_grid_item" USING btree ("_parent_id");
  CREATE INDEX "not_found_blocks_grid_item_path_idx" ON "not_found_blocks_grid_item" USING btree ("_path");
  CREATE INDEX "not_found_blocks_grid_order_idx" ON "not_found_blocks_grid" USING btree ("_order");
  CREATE INDEX "not_found_blocks_grid_parent_id_idx" ON "not_found_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "not_found_blocks_grid_path_idx" ON "not_found_blocks_grid" USING btree ("_path");
  CREATE INDEX "not_found_blocks_text_section_order_idx" ON "not_found_blocks_text_section" USING btree ("_order");
  CREATE INDEX "not_found_blocks_text_section_parent_id_idx" ON "not_found_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "not_found_blocks_text_section_path_idx" ON "not_found_blocks_text_section" USING btree ("_path");
  CREATE INDEX "error_page_blocks_image_order_idx" ON "error_page_blocks_image" USING btree ("_order");
  CREATE INDEX "error_page_blocks_image_parent_id_idx" ON "error_page_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "error_page_blocks_image_path_idx" ON "error_page_blocks_image" USING btree ("_path");
  CREATE INDEX "error_page_blocks_image_image_idx" ON "error_page_blocks_image" USING btree ("image_id");
  CREATE INDEX "error_page_blocks_stack_order_idx" ON "error_page_blocks_stack" USING btree ("_order");
  CREATE INDEX "error_page_blocks_stack_parent_id_idx" ON "error_page_blocks_stack" USING btree ("_parent_id");
  CREATE INDEX "error_page_blocks_stack_path_idx" ON "error_page_blocks_stack" USING btree ("_path");
  CREATE INDEX "error_page_blocks_menu_order_idx" ON "error_page_blocks_menu" USING btree ("_order");
  CREATE INDEX "error_page_blocks_menu_parent_id_idx" ON "error_page_blocks_menu" USING btree ("_parent_id");
  CREATE INDEX "error_page_blocks_menu_path_idx" ON "error_page_blocks_menu" USING btree ("_path");
  CREATE INDEX "error_page_blocks_menu_menu_idx" ON "error_page_blocks_menu" USING btree ("menu_id");
  CREATE INDEX "error_page_blocks_site_title_order_idx" ON "error_page_blocks_site_title" USING btree ("_order");
  CREATE INDEX "error_page_blocks_site_title_parent_id_idx" ON "error_page_blocks_site_title" USING btree ("_parent_id");
  CREATE INDEX "error_page_blocks_site_title_path_idx" ON "error_page_blocks_site_title" USING btree ("_path");
  CREATE INDEX "error_page_blocks_grid_item_order_idx" ON "error_page_blocks_grid_item" USING btree ("_order");
  CREATE INDEX "error_page_blocks_grid_item_parent_id_idx" ON "error_page_blocks_grid_item" USING btree ("_parent_id");
  CREATE INDEX "error_page_blocks_grid_item_path_idx" ON "error_page_blocks_grid_item" USING btree ("_path");
  CREATE INDEX "error_page_blocks_grid_order_idx" ON "error_page_blocks_grid" USING btree ("_order");
  CREATE INDEX "error_page_blocks_grid_parent_id_idx" ON "error_page_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "error_page_blocks_grid_path_idx" ON "error_page_blocks_grid" USING btree ("_path");
  CREATE INDEX "error_page_blocks_text_section_order_idx" ON "error_page_blocks_text_section" USING btree ("_order");
  CREATE INDEX "error_page_blocks_text_section_parent_id_idx" ON "error_page_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "error_page_blocks_text_section_path_idx" ON "error_page_blocks_text_section" USING btree ("_path");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_image" CASCADE;
  DROP TABLE "pages_blocks_stack" CASCADE;
  DROP TABLE "pages_blocks_menu" CASCADE;
  DROP TABLE "pages_blocks_site_title" CASCADE;
  DROP TABLE "pages_blocks_grid_item" CASCADE;
  DROP TABLE "pages_blocks_grid" CASCADE;
  DROP TABLE "pages_blocks_text_section" CASCADE;
  DROP TABLE "_pages_v_blocks_image" CASCADE;
  DROP TABLE "_pages_v_blocks_stack" CASCADE;
  DROP TABLE "_pages_v_blocks_menu" CASCADE;
  DROP TABLE "_pages_v_blocks_site_title" CASCADE;
  DROP TABLE "_pages_v_blocks_grid_item" CASCADE;
  DROP TABLE "_pages_v_blocks_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_text_section" CASCADE;
  DROP TABLE "projects_blocks_image" CASCADE;
  DROP TABLE "projects_blocks_stack" CASCADE;
  DROP TABLE "projects_blocks_menu" CASCADE;
  DROP TABLE "projects_blocks_site_title" CASCADE;
  DROP TABLE "projects_blocks_grid_item" CASCADE;
  DROP TABLE "projects_blocks_grid" CASCADE;
  DROP TABLE "projects_blocks_text_section" CASCADE;
  DROP TABLE "_projects_v_blocks_image" CASCADE;
  DROP TABLE "_projects_v_blocks_stack" CASCADE;
  DROP TABLE "_projects_v_blocks_menu" CASCADE;
  DROP TABLE "_projects_v_blocks_site_title" CASCADE;
  DROP TABLE "_projects_v_blocks_grid_item" CASCADE;
  DROP TABLE "_projects_v_blocks_grid" CASCADE;
  DROP TABLE "_projects_v_blocks_text_section" CASCADE;
  DROP TABLE "articles_blocks_image" CASCADE;
  DROP TABLE "articles_blocks_stack" CASCADE;
  DROP TABLE "articles_blocks_menu" CASCADE;
  DROP TABLE "articles_blocks_site_title" CASCADE;
  DROP TABLE "articles_blocks_grid_item" CASCADE;
  DROP TABLE "articles_blocks_grid" CASCADE;
  DROP TABLE "articles_blocks_text_section" CASCADE;
  DROP TABLE "_articles_v_blocks_image" CASCADE;
  DROP TABLE "_articles_v_blocks_stack" CASCADE;
  DROP TABLE "_articles_v_blocks_menu" CASCADE;
  DROP TABLE "_articles_v_blocks_site_title" CASCADE;
  DROP TABLE "_articles_v_blocks_grid_item" CASCADE;
  DROP TABLE "_articles_v_blocks_grid" CASCADE;
  DROP TABLE "_articles_v_blocks_text_section" CASCADE;
  DROP TABLE "templates_blocks_text_section" CASCADE;
  DROP TABLE "maintenance_blocks_text_section" CASCADE;
  DROP TABLE "not_found_blocks_image" CASCADE;
  DROP TABLE "not_found_blocks_stack" CASCADE;
  DROP TABLE "not_found_blocks_menu" CASCADE;
  DROP TABLE "not_found_blocks_site_title" CASCADE;
  DROP TABLE "not_found_blocks_grid_item" CASCADE;
  DROP TABLE "not_found_blocks_grid" CASCADE;
  DROP TABLE "not_found_blocks_text_section" CASCADE;
  DROP TABLE "error_page_blocks_image" CASCADE;
  DROP TABLE "error_page_blocks_stack" CASCADE;
  DROP TABLE "error_page_blocks_menu" CASCADE;
  DROP TABLE "error_page_blocks_site_title" CASCADE;
  DROP TABLE "error_page_blocks_grid_item" CASCADE;
  DROP TABLE "error_page_blocks_grid" CASCADE;
  DROP TABLE "error_page_blocks_text_section" CASCADE;`);
}
