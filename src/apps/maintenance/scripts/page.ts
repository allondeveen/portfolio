import type { MaintenanceContent } from "@allondeveen-portfolio/maintenance-content/website/data";
import type { Plugin } from "vite";

export type RenderedMaintenancePage = {
  bodyClass: string;
  css: string;
  html: string;
};

const ROOT = '<body id="root"></body>';

function serializeContent(content: MaintenanceContent) {
  return JSON.stringify(content)
    .replaceAll("&", "\\u0026")
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e");
}

export function injectMaintenancePage(
  document: string,
  page: RenderedMaintenancePage,
  content: MaintenanceContent,
) {
  if (!/^[A-Za-z0-9_ -]+$/.test(page.bodyClass)) {
    throw new Error("The maintenance renderer returned an invalid body class");
  }

  if (page.css.includes("</style")) {
    throw new Error("The maintenance stylesheet cannot safely be embedded in HTML");
  }

  if (!document.includes(ROOT) || !document.includes("</head>")) {
    throw new Error("The maintenance HTML template does not contain its render targets");
  }

  const contentTemplate = `<template id="maintenance-content">${serializeContent(content)}</template>`;

  return document
    .replace(
      "</head>",
      `<style data-maintenance-ssr>${page.css}</style>
      ${contentTemplate}
    </head>`,
    )
    .replace(ROOT, `<body class="${page.bodyClass}" id="root">${page.html}</body>`);
}

export function createBuildPagePlugin(
  page: RenderedMaintenancePage,
  content: MaintenanceContent,
): Plugin {
  return {
    name: "maintenance-build-page",
    enforce: "post",
    transformIndexHtml(document) {
      return injectMaintenancePage(document, page, content);
    },
  };
}
