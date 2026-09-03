import * as migration_20260817_185021_setup_base_payload from "./20260817_185021_setup_base_payload";
import * as migration_20260817_185329_add_pages_collection from "./20260817_185329_add_pages_collection";
import * as migration_20260817_185408_add_menu_collection from "./20260817_185408_add_menu_collection";
import * as migration_20260817_191327_add_templates_collection from "./20260817_191327_add_templates_collection";
import * as migration_20260831_154407_record_progress from "./20260831_154407_record_progress";
import * as migration_20260902_151326_add_site_settings from "./20260902_151326_add_site_settings";
import * as migration_20260902_181503_add_site_title_block from "./20260902_181503_add_site_title_block";
import * as migration_20260903_205023_add_copyright_block from "./20260903_205023_add_copyright_block";

export const migrations = [
  {
    up: migration_20260817_185021_setup_base_payload.up,
    down: migration_20260817_185021_setup_base_payload.down,
    name: "20260817_185021_setup_base_payload",
  },
  {
    up: migration_20260817_185329_add_pages_collection.up,
    down: migration_20260817_185329_add_pages_collection.down,
    name: "20260817_185329_add_pages_collection",
  },
  {
    up: migration_20260817_185408_add_menu_collection.up,
    down: migration_20260817_185408_add_menu_collection.down,
    name: "20260817_185408_add_menu_collection",
  },
  {
    up: migration_20260817_191327_add_templates_collection.up,
    down: migration_20260817_191327_add_templates_collection.down,
    name: "20260817_191327_add_templates_collection",
  },
  {
    up: migration_20260831_154407_record_progress.up,
    down: migration_20260831_154407_record_progress.down,
    name: "20260831_154407_record_progress",
  },
  {
    up: migration_20260902_151326_add_site_settings.up,
    down: migration_20260902_151326_add_site_settings.down,
    name: "20260902_151326_add_site_settings",
  },
  {
    up: migration_20260902_181503_add_site_title_block.up,
    down: migration_20260902_181503_add_site_title_block.down,
    name: "20260902_181503_add_site_title_block",
  },
  {
    up: migration_20260903_205023_add_copyright_block.up,
    down: migration_20260903_205023_add_copyright_block.down,
    name: "20260903_205023_add_copyright_block",
  },
];
