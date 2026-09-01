import { fileURLToPath } from "node:url";

import { createServer, type Plugin, type ViteDevServer } from "vite";

import { watchAssets } from "./assets.ts";
import { createMaintenanceContentSource } from "./content.ts";
import { injectMaintenancePage } from "./page.ts";
import { compileRenderer } from "./renderer.ts";

import type { RenderedMaintenancePage } from "./page.ts";
import type { MaintenanceContent } from "@allondeveen-portfolio/maintenance-content/website/data";

const rebuildPath = "/__maintenance/rebuild";
const rebuildDelayMs = 100;
const appRoot = fileURLToPath(new URL("../", import.meta.url));
const clientConfig = fileURLToPath(new URL("../vite.config.ts", import.meta.url));

const assetsWatcher = watchAssets();
const contentSource = await createMaintenanceContentSource();
let content = await contentSource.load({ waitForCMS: true });
let renderer = await compileRenderer();
let viteServer: ViteDevServer | undefined;
let styleBuild: Promise<void> | undefined;
let contentBuild: Promise<void> | undefined;
let contentBuildTimer: NodeJS.Timeout | undefined;
let lastContentError: string | undefined;

async function renderPage(currentContent: MaintenanceContent): Promise<RenderedMaintenancePage> {
  if (!viteServer) {
    throw new Error("The Vite development server is not ready");
  }

  const renderModule = (await viteServer.ssrLoadModule("/src/render.tsx")) as {
    renderMaintenancePage(value: MaintenanceContent): Omit<RenderedMaintenancePage, "css">;
  };

  return {
    ...renderModule.renderMaintenancePage(currentContent),
    css: renderer.css,
  };
}

async function rebuildStyles() {
  styleBuild ??= compileRenderer()
    .then((nextRenderer) => {
      renderer = nextRenderer;
    })
    .finally(() => {
      styleBuild = undefined;
    });

  await styleBuild;
}

async function rebuildContent() {
  contentBuild ??= contentSource
    .load()
    .then((nextContent) => {
      content = nextContent;
      server.ws.send({ type: "full-reload" });
      console.log("Maintenance content changed; rebuilt the page and reloaded connected browsers.");

      if (lastContentError) {
        console.log("The local CMS connection recovered.");
        lastContentError = undefined;
      }
    })
    .catch((error: unknown) => {
      const message = error instanceof Error ? error.message : String(error);

      if (message !== lastContentError) {
        console.warn(`Unable to rebuild maintenance content: ${message}`);
        lastContentError = message;
      }
    })
    .finally(() => {
      contentBuild = undefined;
    });

  await contentBuild;
}

const rebuildPlugin: Plugin = {
  name: "maintenance-development-rebuild",
  enforce: "pre",
  configureServer(server) {
    server.middlewares.use((request, response, next) => {
      const pathname = new URL(request.url ?? "/", "http://localhost").pathname;

      if (request.method !== "POST" || pathname !== rebuildPath) {
        next();
        return;
      }

      request.resume();
      response.statusCode = 202;
      response.end();

      if (contentBuildTimer) {
        clearTimeout(contentBuildTimer);
      }

      contentBuildTimer = setTimeout(() => {
        contentBuildTimer = undefined;
        void rebuildContent();
      }, rebuildDelayMs);
    });
  },
};

const pagePlugin: Plugin = {
  name: "maintenance-development-page",
  enforce: "post",
  configureServer(server) {
    viteServer = server;
  },
  async transformIndexHtml(document) {
    return injectMaintenancePage(document, await renderPage(content), content);
  },
  async handleHotUpdate(context) {
    if (
      context.file.includes("/.generated/") ||
      context.file.includes("/dist/") ||
      !/\.(css|css\.ts|tsx)$/.test(context.file)
    ) {
      return;
    }

    await rebuildStyles();
    context.server.ws.send({ type: "full-reload" });
    return [];
  },
};

const server = await createServer({
  root: appRoot,
  configFile: clientConfig,
  plugins: [rebuildPlugin, pagePlugin],
});

await server.listen();
server.printUrls();

let resolveDone: (() => void) | undefined;
const done = new Promise<void>((resolve) => {
  resolveDone = resolve;
});

async function close() {
  if (contentBuildTimer) {
    clearTimeout(contentBuildTimer);
  }

  assetsWatcher.close();
  await server.close();
  await contentSource.close();
  resolveDone?.();
}

process.once("SIGINT", close);
process.once("SIGTERM", close);

await done;
