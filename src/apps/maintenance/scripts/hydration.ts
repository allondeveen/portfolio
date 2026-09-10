import { load } from "cheerio";

import { isHydrationEnabled } from "./config";

import type { MaintenanceContent } from "@allondeveen-portfolio/maintenance-content/website/data";
import type { Plugin } from "vite";

function serializeContent(content: MaintenanceContent) {
  return JSON.stringify(content)
    .replaceAll("&", "\\u0026")
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e");
}

function injectMaintenanceHydrationContent(
  enabled: boolean,
  document: string,
  content: MaintenanceContent,
) {
  const dom = load(document);
  if (!enabled) {
    dom(`script[type="module"][src="/src/main.tsx"]`).remove();
    return dom.html();
  }
  const contentTemplate = `<template id="maintenance-content">${serializeContent(content)}</template>`;
  dom("head").append(contentTemplate);

  return dom.html();
}

export function createHydrationPlugin(getContent: () => MaintenanceContent): Plugin {
  const enabled = isHydrationEnabled();
  return {
    name: "maintenance-hydration",
    transformIndexHtml: {
      order: "pre",
      handler(document) {
        return injectMaintenanceHydrationContent(enabled, document, getContent());
      },
    },
  };
}
