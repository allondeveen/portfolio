import * as migration_20260907_183154_migrate_to_postgres from "./20260907_183154_migrate_to_postgres";
import * as migration_20260909_011804_add_redirects from "./20260909_011804_add_redirects";
import * as migration_20260909_171534_add_forms from "./20260909_171534_add_forms";

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
];
