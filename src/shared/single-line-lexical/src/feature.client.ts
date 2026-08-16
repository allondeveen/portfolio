"use client";

import { createClientFeature } from "@payloadcms/richtext-lexical/client";

import { SingleLinePlugin } from "./plugin";

export const SingleLineFeatureClient = createClientFeature({
  plugins: [
    {
      Component: SingleLinePlugin,
      position: "normal",
    },
  ],
});
