import { isHydrationEnabled } from "./config";

import type { MaintenanceContent } from "@allondeveen-portfolio/maintenance-content/website/data";
import type { Plugin } from "vite";

const HYDRATION_ENTRY = '\n    <script type="module" src="/src/main.tsx"></script>';

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
  if (!enabled) {
    return document.replace(HYDRATION_ENTRY, "");
  }
  const contentTemplate = `<template id="maintenance-content">${serializeContent(content)}</template>`;

  return document.replace("</head>", `${contentTemplate}\n    </head>`);
}

export function createHydrationPlugin(getContent: () => MaintenanceContent): Plugin {
  const enabled = isHydrationEnabled();
  console.log(enabled);
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
