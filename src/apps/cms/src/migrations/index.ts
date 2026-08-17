import * as migration_20260817_185021_setup_base_payload from "./20260817_185021_setup_base_payload";
import * as migration_20260817_185329_add_pages_collection from "./20260817_185329_add_pages_collection";

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
];
