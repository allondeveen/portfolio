import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('default', 'elevated', 'overlay');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('default', 'elevated', 'overlay');
  CREATE TYPE "public"."enum_projects_blocks_hero_variant" AS ENUM('default', 'elevated', 'overlay');
  CREATE TYPE "public"."enum__projects_v_blocks_hero_variant" AS ENUM('default', 'elevated', 'overlay');
  CREATE TYPE "public"."enum_articles_blocks_hero_variant" AS ENUM('default', 'elevated', 'overlay');
  CREATE TYPE "public"."enum__articles_v_blocks_hero_variant" AS ENUM('default', 'elevated', 'overlay');
  CREATE TYPE "public"."enum_templates_blocks_hero_variant" AS ENUM('default', 'elevated', 'overlay');
  CREATE TYPE "public"."enum_maintenance_blocks_hero_variant" AS ENUM('default', 'elevated', 'overlay');
  CREATE TYPE "public"."enum_not_found_blocks_hero_variant" AS ENUM('default', 'elevated', 'overlay');
  CREATE TYPE "public"."enum_error_page_blocks_hero_variant" AS ENUM('default', 'elevated', 'overlay');
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "variant" "enum_pages_blocks_hero_variant" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "variant" "enum__pages_v_blocks_hero_variant" DEFAULT 'default';
  ALTER TABLE "projects_blocks_hero" ADD COLUMN "variant" "enum_projects_blocks_hero_variant" DEFAULT 'default';
  ALTER TABLE "_projects_v_blocks_hero" ADD COLUMN "variant" "enum__projects_v_blocks_hero_variant" DEFAULT 'default';
  ALTER TABLE "articles_blocks_hero" ADD COLUMN "variant" "enum_articles_blocks_hero_variant" DEFAULT 'default';
  ALTER TABLE "_articles_v_blocks_hero" ADD COLUMN "variant" "enum__articles_v_blocks_hero_variant" DEFAULT 'default';
  ALTER TABLE "templates_blocks_hero" ADD COLUMN "variant" "enum_templates_blocks_hero_variant" DEFAULT 'default';
  ALTER TABLE "maintenance_blocks_hero" ADD COLUMN "variant" "enum_maintenance_blocks_hero_variant" DEFAULT 'default';
  ALTER TABLE "not_found_blocks_hero" ADD COLUMN "variant" "enum_not_found_blocks_hero_variant" DEFAULT 'default';
  ALTER TABLE "error_page_blocks_hero" ADD COLUMN "variant" "enum_error_page_blocks_hero_variant" DEFAULT 'default';`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" DROP COLUMN "variant";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "variant";
  ALTER TABLE "projects_blocks_hero" DROP COLUMN "variant";
  ALTER TABLE "_projects_v_blocks_hero" DROP COLUMN "variant";
  ALTER TABLE "articles_blocks_hero" DROP COLUMN "variant";
  ALTER TABLE "_articles_v_blocks_hero" DROP COLUMN "variant";
  ALTER TABLE "templates_blocks_hero" DROP COLUMN "variant";
  ALTER TABLE "maintenance_blocks_hero" DROP COLUMN "variant";
  ALTER TABLE "not_found_blocks_hero" DROP COLUMN "variant";
  ALTER TABLE "error_page_blocks_hero" DROP COLUMN "variant";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "public"."enum_projects_blocks_hero_variant";
  DROP TYPE "public"."enum__projects_v_blocks_hero_variant";
  DROP TYPE "public"."enum_articles_blocks_hero_variant";
  DROP TYPE "public"."enum__articles_v_blocks_hero_variant";
  DROP TYPE "public"."enum_templates_blocks_hero_variant";
  DROP TYPE "public"."enum_maintenance_blocks_hero_variant";
  DROP TYPE "public"."enum_not_found_blocks_hero_variant";
  DROP TYPE "public"."enum_error_page_blocks_hero_variant";`);
}
