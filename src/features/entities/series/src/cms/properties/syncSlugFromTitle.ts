import type { Field } from "payload";

export const syncSlugFromTitle: Field = {
  name: "syncSlugFromTitle",
  type: "ui",
  admin: {
    components: {
      Field: {
        path: "@allondeveen-portfolio/series/components/syncSlugFromTitle",
        exportName: "SyncSlugFromTitle",
      },
    },
  },
};
