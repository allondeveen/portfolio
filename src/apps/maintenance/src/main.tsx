import { darkTheme } from "@allondeveen-portfolio/design-system";
import "@allondeveen-portfolio/design-system/index.css";
import "@allondeveen-portfolio/design-system/global.css";
import { MaintenancePage } from "@allondeveen-portfolio/maintenance-content/website";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import type { MaintenanceContent } from "@allondeveen-portfolio/maintenance-content/website/data";

const contentTemplate = document.querySelector<HTMLTemplateElement>("#maintenance-content");

if (!contentTemplate) {
  throw new Error("The embedded maintenance content is missing");
}

const content = JSON.parse(contentTemplate.content.textContent ?? "") as MaintenanceContent;
contentTemplate.remove();

document.body.classList.add(darkTheme);

const root = document.getElementById("root");

if (!root) {
  throw new Error("The maintenance page root element is missing");
}

hydrateRoot(
  root,
  <StrictMode>
    <MaintenancePage {...content} />
  </StrictMode>,
);
