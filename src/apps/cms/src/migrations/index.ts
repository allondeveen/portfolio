import * as migration_20260817_185021_setup_base_payload from "./20260817_185021_setup_base_payload";

export const migrations = [
  {
    up: migration_20260817_185021_setup_base_payload.up,
    down: migration_20260817_185021_setup_base_payload.down,
    name: "20260817_185021_setup_base_payload",
  },
];
