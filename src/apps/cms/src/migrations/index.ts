import * as migration_20260907_183154_migrate_to_postgres from "./20260907_183154_migrate_to_postgres";

export const migrations = [
  {
    up: migration_20260907_183154_migrate_to_postgres.up,
    down: migration_20260907_183154_migrate_to_postgres.down,
    name: "20260907_183154_migrate_to_postgres",
  },
];
