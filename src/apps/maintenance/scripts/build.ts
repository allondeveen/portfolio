import { fileURLToPath } from "node:url";

import { createBuilder } from "vite";

import { copyAssets } from "./assets.ts";
import { createMaintenanceContentSource } from "./content.ts";
import { createBuildPagePlugin } from "./page.ts";
import { compileRenderer } from "./renderer.ts";

const appRoot = fileURLToPath(new URL("../", import.meta.url));
const clientConfig = fileURLToPath(new URL("../vite.config.ts", import.meta.url));

copyAssets();

const contentSource = await createMaintenanceContentSource();
try {
  const content = await contentSource.load({ waitForCMS: true });
  console.log(`Maintenance content retrieved from ${contentSource.description}.`);

  const renderer = await compileRenderer();
  const page = await renderer.render(content);

  const builder = await createBuilder({
    root: appRoot,
    configFile: clientConfig,
    plugins: [createBuildPagePlugin(page, content)],
  });
  await builder.buildApp();
} finally {
  await contentSource.close();
}

console.log("Maintenance page prerendered with embedded content and styling.");
