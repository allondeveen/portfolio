import type { Field } from "payload";

export const syncSlugFromName: Field = {
  name: "syncSlugFromName",
  type: "ui",
  admin: {
    components: {
      Field: {
        path: "@allondeveen-portfolio/topics/components/syncSlugFromName",
        exportName: "SyncSlugFromName",
      },
    },
  },
};
