import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

import { build as viteBuild } from "vite";

import type { RenderedMaintenancePage } from "./page.ts";
import type { MaintenanceContent } from "@allondeveen-portfolio/maintenance-content/website/data";

type RendererModule = {
  renderMaintenancePage(content: MaintenanceContent): Omit<RenderedMaintenancePage, "css">;
};

const appRoot = fileURLToPath(new URL("../", import.meta.url));
const renderConfig = fileURLToPath(new URL("../vite.render.config.ts", import.meta.url));
const renderModule = fileURLToPath(new URL("../.generated/render/render.js", import.meta.url));
const renderAssetsDirectory = new URL("../.generated/render/assets/", import.meta.url);

async function readStylesheet() {
  const stylesheetNames = (await readdir(renderAssetsDirectory))
    .filter((name) => name.endsWith(".css"))
    .sort();

  if (stylesheetNames.length === 0) {
    throw new Error("The maintenance SSR build did not emit a stylesheet");
  }

  return (
    await Promise.all(
      stylesheetNames.map((name) => readFile(new URL(name, renderAssetsDirectory), "utf8")),
    )
  ).join("\n");
}

export async function compileRenderer() {
  await viteBuild({
    root: appRoot,
    configFile: renderConfig,
  });

  const css = await readStylesheet();

  if (css.includes("</style")) {
    throw new Error("The maintenance SSR stylesheet cannot safely be embedded in HTML");
  }

  return {
    css,
    async render(content: MaintenanceContent): Promise<RenderedMaintenancePage> {
      const moduleUrl = `${pathToFileURL(renderModule).href}?version=${Date.now()}`;
      const renderer = (await import(moduleUrl)) as RendererModule;
      const page = renderer.renderMaintenancePage(content);

      if (typeof page.bodyClass !== "string" || typeof page.html !== "string") {
        throw new Error("The maintenance SSR renderer returned invalid output");
      }

      return { ...page, css };
    },
  };
}
