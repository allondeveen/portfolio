import { load } from "cheerio";

import type { Plugin } from "vite";

export type RenderedMaintenancePage = {
  bodyClass: string;
  css: string;
  html: string;
};

export function injectMaintenancePage(document: string, page: RenderedMaintenancePage) {
  const dom = load(document);

  if (!/^[A-Za-z0-9_ -]+$/.test(page.bodyClass)) {
    throw new Error("The maintenance renderer returned an invalid body class");
  }

  if (page.css.includes("</style")) {
    throw new Error("The maintenance stylesheet cannot safely be embedded in HTML");
  }

  const root = dom("#root");
  const head = dom("head");
  if (root.length !== 1 || head.length !== 1) {
    throw new Error("The maintenance HTML template does not contain its render targets");
  }

  const pageStyleElement = `<style data-maintenance-ssr>${page.css}</style>`;
  head.append(pageStyleElement);
  dom("body").addClass(page.bodyClass);
  root.html(page.html);

  return dom.html();
}

export function createBuildPagePlugin(page: RenderedMaintenancePage): Plugin {
  return {
    name: "maintenance-build-page",
    enforce: "post",
    transformIndexHtml(document) {
      return injectMaintenancePage(document, page);
    },
  };
}
