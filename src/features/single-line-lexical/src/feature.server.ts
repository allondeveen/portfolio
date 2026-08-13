import { createServerFeature } from "@payloadcms/richtext-lexical";

export const SingleLineFeature = createServerFeature({
  feature: {
    ClientFeature: {
      path: "@allondeveen-portfolio/single-line-lexical/client",
      exportName: "SingleLineFeatureClient",
    },
  },
  key: "singleLine",
});
