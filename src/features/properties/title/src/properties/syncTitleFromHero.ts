import type { Field } from "payload";

export const syncTitleFromHero: Field = {
  name: "syncTitleFromHero",
  type: "ui",
  admin: {
    components: {
      Field: {
        path: "@allondeveen-portfolio/sync-hero-metadata/syncTitleFromHero",
        exportName: "SyncTitleFromHero",
      },
    },
  },
};
