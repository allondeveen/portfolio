import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_story_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  CREATE TYPE "public"."enum_pages_blocks_story_mobile_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  CREATE TYPE "public"."enum__pages_v_blocks_story_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  CREATE TYPE "public"."enum__pages_v_blocks_story_mobile_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  CREATE TYPE "public"."enum_projects_blocks_story_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  CREATE TYPE "public"."enum_projects_blocks_story_mobile_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  CREATE TYPE "public"."enum__projects_v_blocks_story_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  CREATE TYPE "public"."enum__projects_v_blocks_story_mobile_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  CREATE TYPE "public"."enum_articles_blocks_story_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  CREATE TYPE "public"."enum_articles_blocks_story_mobile_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  CREATE TYPE "public"."enum__articles_v_blocks_story_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  CREATE TYPE "public"."enum__articles_v_blocks_story_mobile_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  CREATE TYPE "public"."enum_templates_blocks_story_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  CREATE TYPE "public"."enum_templates_blocks_story_mobile_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  CREATE TYPE "public"."enum_maintenance_blocks_story_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  CREATE TYPE "public"."enum_maintenance_blocks_story_mobile_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  CREATE TYPE "public"."enum_not_found_blocks_story_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  CREATE TYPE "public"."enum_not_found_blocks_story_mobile_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  CREATE TYPE "public"."enum_error_page_blocks_story_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  CREATE TYPE "public"."enum_error_page_blocks_story_mobile_column_distribution" AS ENUM('1/1', '1/2', '1/3');
  ALTER TABLE "pages_blocks_story" ADD COLUMN "column_distribution" "enum_pages_blocks_story_column_distribution" DEFAULT '1/1';
  ALTER TABLE "pages_blocks_story" ADD COLUMN "mobile_column_distribution" "enum_pages_blocks_story_mobile_column_distribution" DEFAULT '1/1';
  ALTER TABLE "_pages_v_blocks_story" ADD COLUMN "column_distribution" "enum__pages_v_blocks_story_column_distribution" DEFAULT '1/1';
  ALTER TABLE "_pages_v_blocks_story" ADD COLUMN "mobile_column_distribution" "enum__pages_v_blocks_story_mobile_column_distribution" DEFAULT '1/1';
  ALTER TABLE "projects_blocks_story" ADD COLUMN "column_distribution" "enum_projects_blocks_story_column_distribution" DEFAULT '1/1';
  ALTER TABLE "projects_blocks_story" ADD COLUMN "mobile_column_distribution" "enum_projects_blocks_story_mobile_column_distribution" DEFAULT '1/1';
  ALTER TABLE "_projects_v_blocks_story" ADD COLUMN "column_distribution" "enum__projects_v_blocks_story_column_distribution" DEFAULT '1/1';
  ALTER TABLE "_projects_v_blocks_story" ADD COLUMN "mobile_column_distribution" "enum__projects_v_blocks_story_mobile_column_distribution" DEFAULT '1/1';
  ALTER TABLE "articles_blocks_story" ADD COLUMN "column_distribution" "enum_articles_blocks_story_column_distribution" DEFAULT '1/1';
  ALTER TABLE "articles_blocks_story" ADD COLUMN "mobile_column_distribution" "enum_articles_blocks_story_mobile_column_distribution" DEFAULT '1/1';
  ALTER TABLE "_articles_v_blocks_story" ADD COLUMN "column_distribution" "enum__articles_v_blocks_story_column_distribution" DEFAULT '1/1';
  ALTER TABLE "_articles_v_blocks_story" ADD COLUMN "mobile_column_distribution" "enum__articles_v_blocks_story_mobile_column_distribution" DEFAULT '1/1';
  ALTER TABLE "templates_blocks_story" ADD COLUMN "column_distribution" "enum_templates_blocks_story_column_distribution" DEFAULT '1/1';
  ALTER TABLE "templates_blocks_story" ADD COLUMN "mobile_column_distribution" "enum_templates_blocks_story_mobile_column_distribution" DEFAULT '1/1';
  ALTER TABLE "maintenance_blocks_story" ADD COLUMN "column_distribution" "enum_maintenance_blocks_story_column_distribution" DEFAULT '1/1';
  ALTER TABLE "maintenance_blocks_story" ADD COLUMN "mobile_column_distribution" "enum_maintenance_blocks_story_mobile_column_distribution" DEFAULT '1/1';
  ALTER TABLE "not_found_blocks_story" ADD COLUMN "column_distribution" "enum_not_found_blocks_story_column_distribution" DEFAULT '1/1';
  ALTER TABLE "not_found_blocks_story" ADD COLUMN "mobile_column_distribution" "enum_not_found_blocks_story_mobile_column_distribution" DEFAULT '1/1';
  ALTER TABLE "error_page_blocks_story" ADD COLUMN "column_distribution" "enum_error_page_blocks_story_column_distribution" DEFAULT '1/1';
  ALTER TABLE "error_page_blocks_story" ADD COLUMN "mobile_column_distribution" "enum_error_page_blocks_story_mobile_column_distribution" DEFAULT '1/1';`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_story" DROP COLUMN "column_distribution";
  ALTER TABLE "pages_blocks_story" DROP COLUMN "mobile_column_distribution";
  ALTER TABLE "_pages_v_blocks_story" DROP COLUMN "column_distribution";
  ALTER TABLE "_pages_v_blocks_story" DROP COLUMN "mobile_column_distribution";
  ALTER TABLE "projects_blocks_story" DROP COLUMN "column_distribution";
  ALTER TABLE "projects_blocks_story" DROP COLUMN "mobile_column_distribution";
  ALTER TABLE "_projects_v_blocks_story" DROP COLUMN "column_distribution";
  ALTER TABLE "_projects_v_blocks_story" DROP COLUMN "mobile_column_distribution";
  ALTER TABLE "articles_blocks_story" DROP COLUMN "column_distribution";
  ALTER TABLE "articles_blocks_story" DROP COLUMN "mobile_column_distribution";
  ALTER TABLE "_articles_v_blocks_story" DROP COLUMN "column_distribution";
  ALTER TABLE "_articles_v_blocks_story" DROP COLUMN "mobile_column_distribution";
  ALTER TABLE "templates_blocks_story" DROP COLUMN "column_distribution";
  ALTER TABLE "templates_blocks_story" DROP COLUMN "mobile_column_distribution";
  ALTER TABLE "maintenance_blocks_story" DROP COLUMN "column_distribution";
  ALTER TABLE "maintenance_blocks_story" DROP COLUMN "mobile_column_distribution";
  ALTER TABLE "not_found_blocks_story" DROP COLUMN "column_distribution";
  ALTER TABLE "not_found_blocks_story" DROP COLUMN "mobile_column_distribution";
  ALTER TABLE "error_page_blocks_story" DROP COLUMN "column_distribution";
  ALTER TABLE "error_page_blocks_story" DROP COLUMN "mobile_column_distribution";
  DROP TYPE "public"."enum_pages_blocks_story_column_distribution";
  DROP TYPE "public"."enum_pages_blocks_story_mobile_column_distribution";
  DROP TYPE "public"."enum__pages_v_blocks_story_column_distribution";
  DROP TYPE "public"."enum__pages_v_blocks_story_mobile_column_distribution";
  DROP TYPE "public"."enum_projects_blocks_story_column_distribution";
  DROP TYPE "public"."enum_projects_blocks_story_mobile_column_distribution";
  DROP TYPE "public"."enum__projects_v_blocks_story_column_distribution";
  DROP TYPE "public"."enum__projects_v_blocks_story_mobile_column_distribution";
  DROP TYPE "public"."enum_articles_blocks_story_column_distribution";
  DROP TYPE "public"."enum_articles_blocks_story_mobile_column_distribution";
  DROP TYPE "public"."enum__articles_v_blocks_story_column_distribution";
  DROP TYPE "public"."enum__articles_v_blocks_story_mobile_column_distribution";
  DROP TYPE "public"."enum_templates_blocks_story_column_distribution";
  DROP TYPE "public"."enum_templates_blocks_story_mobile_column_distribution";
  DROP TYPE "public"."enum_maintenance_blocks_story_column_distribution";
  DROP TYPE "public"."enum_maintenance_blocks_story_mobile_column_distribution";
  DROP TYPE "public"."enum_not_found_blocks_story_column_distribution";
  DROP TYPE "public"."enum_not_found_blocks_story_mobile_column_distribution";
  DROP TYPE "public"."enum_error_page_blocks_story_column_distribution";
  DROP TYPE "public"."enum_error_page_blocks_story_mobile_column_distribution";`);
}
