import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_embedded_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cover_image_id" varchar,
  	"video_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_embedded_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_image_id" varchar,
  	"video_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_embedded_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cover_image_id" varchar,
  	"video_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_embedded_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_image_id" varchar,
  	"video_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_embedded_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cover_image_id" varchar,
  	"video_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_embedded_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_image_id" varchar,
  	"video_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_embedded_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cover_image_id" varchar,
  	"video_url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "maintenance_blocks_embedded_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cover_image_id" varchar,
  	"video_url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "not_found_blocks_embedded_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cover_image_id" varchar,
  	"video_url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "error_page_blocks_embedded_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cover_image_id" varchar,
  	"video_url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_embedded_video" ADD CONSTRAINT "pages_blocks_embedded_video_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_embedded_video" ADD CONSTRAINT "pages_blocks_embedded_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_embedded_video" ADD CONSTRAINT "_pages_v_blocks_embedded_video_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_embedded_video" ADD CONSTRAINT "_pages_v_blocks_embedded_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_embedded_video" ADD CONSTRAINT "projects_blocks_embedded_video_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_embedded_video" ADD CONSTRAINT "projects_blocks_embedded_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_embedded_video" ADD CONSTRAINT "_projects_v_blocks_embedded_video_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_embedded_video" ADD CONSTRAINT "_projects_v_blocks_embedded_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_embedded_video" ADD CONSTRAINT "articles_blocks_embedded_video_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_embedded_video" ADD CONSTRAINT "articles_blocks_embedded_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_embedded_video" ADD CONSTRAINT "_articles_v_blocks_embedded_video_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_embedded_video" ADD CONSTRAINT "_articles_v_blocks_embedded_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_embedded_video" ADD CONSTRAINT "templates_blocks_embedded_video_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_embedded_video" ADD CONSTRAINT "templates_blocks_embedded_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "maintenance_blocks_embedded_video" ADD CONSTRAINT "maintenance_blocks_embedded_video_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "maintenance_blocks_embedded_video" ADD CONSTRAINT "maintenance_blocks_embedded_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."maintenance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_blocks_embedded_video" ADD CONSTRAINT "not_found_blocks_embedded_video_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "not_found_blocks_embedded_video" ADD CONSTRAINT "not_found_blocks_embedded_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "error_page_blocks_embedded_video" ADD CONSTRAINT "error_page_blocks_embedded_video_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "error_page_blocks_embedded_video" ADD CONSTRAINT "error_page_blocks_embedded_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."error_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_embedded_video_order_idx" ON "pages_blocks_embedded_video" USING btree ("_order");
  CREATE INDEX "pages_blocks_embedded_video_parent_id_idx" ON "pages_blocks_embedded_video" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_embedded_video_path_idx" ON "pages_blocks_embedded_video" USING btree ("_path");
  CREATE INDEX "pages_blocks_embedded_video_cover_image_idx" ON "pages_blocks_embedded_video" USING btree ("cover_image_id");
  CREATE INDEX "_pages_v_blocks_embedded_video_order_idx" ON "_pages_v_blocks_embedded_video" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_embedded_video_parent_id_idx" ON "_pages_v_blocks_embedded_video" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_embedded_video_path_idx" ON "_pages_v_blocks_embedded_video" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_embedded_video_cover_image_idx" ON "_pages_v_blocks_embedded_video" USING btree ("cover_image_id");
  CREATE INDEX "projects_blocks_embedded_video_order_idx" ON "projects_blocks_embedded_video" USING btree ("_order");
  CREATE INDEX "projects_blocks_embedded_video_parent_id_idx" ON "projects_blocks_embedded_video" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_embedded_video_path_idx" ON "projects_blocks_embedded_video" USING btree ("_path");
  CREATE INDEX "projects_blocks_embedded_video_cover_image_idx" ON "projects_blocks_embedded_video" USING btree ("cover_image_id");
  CREATE INDEX "_projects_v_blocks_embedded_video_order_idx" ON "_projects_v_blocks_embedded_video" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_embedded_video_parent_id_idx" ON "_projects_v_blocks_embedded_video" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_embedded_video_path_idx" ON "_projects_v_blocks_embedded_video" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_embedded_video_cover_image_idx" ON "_projects_v_blocks_embedded_video" USING btree ("cover_image_id");
  CREATE INDEX "articles_blocks_embedded_video_order_idx" ON "articles_blocks_embedded_video" USING btree ("_order");
  CREATE INDEX "articles_blocks_embedded_video_parent_id_idx" ON "articles_blocks_embedded_video" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_embedded_video_path_idx" ON "articles_blocks_embedded_video" USING btree ("_path");
  CREATE INDEX "articles_blocks_embedded_video_cover_image_idx" ON "articles_blocks_embedded_video" USING btree ("cover_image_id");
  CREATE INDEX "_articles_v_blocks_embedded_video_order_idx" ON "_articles_v_blocks_embedded_video" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_embedded_video_parent_id_idx" ON "_articles_v_blocks_embedded_video" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_embedded_video_path_idx" ON "_articles_v_blocks_embedded_video" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_embedded_video_cover_image_idx" ON "_articles_v_blocks_embedded_video" USING btree ("cover_image_id");
  CREATE INDEX "templates_blocks_embedded_video_order_idx" ON "templates_blocks_embedded_video" USING btree ("_order");
  CREATE INDEX "templates_blocks_embedded_video_parent_id_idx" ON "templates_blocks_embedded_video" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_embedded_video_path_idx" ON "templates_blocks_embedded_video" USING btree ("_path");
  CREATE INDEX "templates_blocks_embedded_video_cover_image_idx" ON "templates_blocks_embedded_video" USING btree ("cover_image_id");
  CREATE INDEX "maintenance_blocks_embedded_video_order_idx" ON "maintenance_blocks_embedded_video" USING btree ("_order");
  CREATE INDEX "maintenance_blocks_embedded_video_parent_id_idx" ON "maintenance_blocks_embedded_video" USING btree ("_parent_id");
  CREATE INDEX "maintenance_blocks_embedded_video_path_idx" ON "maintenance_blocks_embedded_video" USING btree ("_path");
  CREATE INDEX "maintenance_blocks_embedded_video_cover_image_idx" ON "maintenance_blocks_embedded_video" USING btree ("cover_image_id");
  CREATE INDEX "not_found_blocks_embedded_video_order_idx" ON "not_found_blocks_embedded_video" USING btree ("_order");
  CREATE INDEX "not_found_blocks_embedded_video_parent_id_idx" ON "not_found_blocks_embedded_video" USING btree ("_parent_id");
  CREATE INDEX "not_found_blocks_embedded_video_path_idx" ON "not_found_blocks_embedded_video" USING btree ("_path");
  CREATE INDEX "not_found_blocks_embedded_video_cover_image_idx" ON "not_found_blocks_embedded_video" USING btree ("cover_image_id");
  CREATE INDEX "error_page_blocks_embedded_video_order_idx" ON "error_page_blocks_embedded_video" USING btree ("_order");
  CREATE INDEX "error_page_blocks_embedded_video_parent_id_idx" ON "error_page_blocks_embedded_video" USING btree ("_parent_id");
  CREATE INDEX "error_page_blocks_embedded_video_path_idx" ON "error_page_blocks_embedded_video" USING btree ("_path");
  CREATE INDEX "error_page_blocks_embedded_video_cover_image_idx" ON "error_page_blocks_embedded_video" USING btree ("cover_image_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_embedded_video" CASCADE;
  DROP TABLE "_pages_v_blocks_embedded_video" CASCADE;
  DROP TABLE "projects_blocks_embedded_video" CASCADE;
  DROP TABLE "_projects_v_blocks_embedded_video" CASCADE;
  DROP TABLE "articles_blocks_embedded_video" CASCADE;
  DROP TABLE "_articles_v_blocks_embedded_video" CASCADE;
  DROP TABLE "templates_blocks_embedded_video" CASCADE;
  DROP TABLE "maintenance_blocks_embedded_video" CASCADE;
  DROP TABLE "not_found_blocks_embedded_video" CASCADE;
  DROP TABLE "error_page_blocks_embedded_video" CASCADE;`);
}
