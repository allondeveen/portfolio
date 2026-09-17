import * as migration_20260907_183154_migrate_to_postgres from "./20260907_183154_migrate_to_postgres";
import * as migration_20260909_011804_add_redirects from "./20260909_011804_add_redirects";
import * as migration_20260909_171534_add_forms from "./20260909_171534_add_forms";
import * as migration_20260914_171738_add_not_found from "./20260914_171738_add_not_found";
import * as migration_20260914_202036_add_error_page_content from "./20260914_202036_add_error_page_content";
import * as migration_20260915_222952_add_container_block from "./20260915_222952_add_container_block";
import * as migration_20260916_010147_add_group_block from "./20260916_010147_add_group_block";
import * as migration_20260917_071554_add_text_section_block from "./20260917_071554_add_text_section_block";
import * as migration_20260917_085846_add_variant_prop_to_hero from "./20260917_085846_add_variant_prop_to_hero";
import * as migration_20260917_110122_add_quote_block from "./20260917_110122_add_quote_block";

export const migrations = [
  {
    up: migration_20260907_183154_migrate_to_postgres.up,
    down: migration_20260907_183154_migrate_to_postgres.down,
    name: "20260907_183154_migrate_to_postgres",
  },
  {
    up: migration_20260909_011804_add_redirects.up,
    down: migration_20260909_011804_add_redirects.down,
    name: "20260909_011804_add_redirects",
  },
  {
    up: migration_20260909_171534_add_forms.up,
    down: migration_20260909_171534_add_forms.down,
    name: "20260909_171534_add_forms",
  },
  {
    up: migration_20260914_171738_add_not_found.up,
    down: migration_20260914_171738_add_not_found.down,
    name: "20260914_171738_add_not_found",
  },
  {
    up: migration_20260914_202036_add_error_page_content.up,
    down: migration_20260914_202036_add_error_page_content.down,
    name: "20260914_202036_add_error_page_content",
  },
  {
    up: migration_20260915_222952_add_container_block.up,
    down: migration_20260915_222952_add_container_block.down,
    name: "20260915_222952_add_container_block",
  },
  {
    up: migration_20260916_010147_add_group_block.up,
    down: migration_20260916_010147_add_group_block.down,
    name: "20260916_010147_add_group_block",
  },
  {
    up: migration_20260917_071554_add_text_section_block.up,
    down: migration_20260917_071554_add_text_section_block.down,
    name: "20260917_071554_add_text_section_block",
  },
  {
    up: migration_20260917_085846_add_variant_prop_to_hero.up,
    down: migration_20260917_085846_add_variant_prop_to_hero.down,
    name: "20260917_085846_add_variant_prop_to_hero",
  },
  {
    up: migration_20260917_110122_add_quote_block.up,
    down: migration_20260917_110122_add_quote_block.down,
    name: "20260917_110122_add_quote_block",
  },
];
