import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { allBlocks } from "@allondeveen-portfolio/blocks-property/all";
import { getDescription, getTitle } from "@allondeveen-portfolio/blocks-property/cms";
import { media } from "@allondeveen-portfolio/media/config";
import { menu } from "@allondeveen-portfolio/menu/config";
import { pages } from "@allondeveen-portfolio/pages/config";
import { onInit } from "@allondeveen-portfolio/seed/config";
import {
  singleLineAdminSettings,
  SingleLineFeature,
} from "@allondeveen-portfolio/single-line-lexical";
import { templates } from "@allondeveen-portfolio/templates/config";
import { CloudflareContext, getCloudflareContext } from "@opennextjs/cloudflare";
import { sqliteD1Adapter } from "@payloadcms/db-d1-sqlite";
import { seoPlugin } from "@payloadcms/plugin-seo";
import {
  BoldFeature,
  FixedToolbarFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
} from "@payloadcms/richtext-lexical";
import { r2Storage } from "@payloadcms/storage-r2";
import { buildConfig } from "payload";
import { GetPlatformProxyOptions } from "wrangler";

import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const realpath = (value: string) => {
  try {
    return fs.existsSync(value) ? fs.realpathSync(value) : undefined;
  } catch {
    return undefined;
  }
};

const isCLI = process.argv.some((value) => {
  const resolved = realpath(value);
  if (!resolved) return false;
  return (
    resolved.endsWith(path.join("payload", "bin.js")) ||
    resolved.endsWith(path.join("next", "dist", "bin", "next"))
  );
});
const isProduction = process.env.NODE_ENV === "production";

const createLog =
  (level: string, fn: typeof console.log) => (objOrMsg: object | string, msg?: string) => {
    if (typeof objOrMsg === "string") {
      fn(JSON.stringify({ level, msg: objOrMsg }));
    } else {
      fn(JSON.stringify({ level, ...objOrMsg, msg: msg ?? (objOrMsg as { msg?: string }).msg }));
    }
  };

const cloudflareLogger = {
  level: process.env.PAYLOAD_LOG_LEVEL || "info",
  trace: createLog("trace", console.debug),
  debug: createLog("debug", console.debug),
  info: createLog("info", console.log),
  warn: createLog("warn", console.warn),
  error: createLog("error", console.error),
  fatal: createLog("fatal", console.error),
  silent: () => {},
  // eslint-disable-next-line
} as any; // Use PayloadLogger type when it's exported

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true });

export default buildConfig({
  graphQL: {
    disable: true,
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      icons: [
        {
          rel: "icon",
          type: "image/svg+xml",
          url: "/favicon.svg",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          url: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          url: "/favicon-32x32.png",
        },
        {
          rel: "manifest",
          url: "/site.webmanifest",
        },
        {
          rel: "apple-touch-icon",
          url: "/apple-touch-icon.png",
        },
      ],
    },
  },
  blocks: allBlocks,
  collections: [
    // collections
    pages,

    // taxonomy

    // supporting
    menu,
    templates,
    Users,
    media,

    // fixed template

    // globals
  ],
  editor: lexicalEditor({
    admin: {
      ...singleLineAdminSettings,
    },
    features: () => [
      LinkFeature({
        fields: ({ defaultFields }) => [...defaultFields],
      }),
      BoldFeature(),
      ItalicFeature(),
      InlineCodeFeature(),
      InlineToolbarFeature(),
      FixedToolbarFeature(),
      SingleLineFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteD1Adapter({
    binding: cloudflare.env.D1,
  }),
  logger: isProduction ? cloudflareLogger : undefined,
  plugins: [
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: {
        media: true,
      },
      alwaysInsertFields: true,
    }),
    seoPlugin({
      collections: ["pages"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) => getTitle(doc),
      generateDescription: ({ doc }) => getDescription(doc),
      generateURL: ({ doc }) => `${cloudflare.env.FRONTEND_URL}${doc.slug}`,
    }),
  ],
  onInit: isProduction ? () => {} : onInit(cloudflare.env.SEED_EMAIL, cloudflare.env.SEED_PASS),
});

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${"__wrangler".replaceAll("_", "")}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: isProduction,
        persist: {
          path: "../../../.wrangler/state/v3",
        },
      } satisfies GetPlatformProxyOptions),
  );
}
