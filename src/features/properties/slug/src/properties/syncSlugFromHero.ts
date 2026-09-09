import type { Field } from "payload";

export const syncSlugFromHero: Field = {
  name: "syncSlugFromHero",
  type: "ui",
  admin: {
    components: {
      Field: {
        path: "@allondeveen-portfolio/sync-hero-metadata/syncSlugFromHero",
        exportName: "SyncSlugFromHero",
      },
    },
  },
};
