import { darkTheme } from "@allondeveen-portfolio/design-system";
import "@allondeveen-portfolio/design-system/index.css";
import "@allondeveen-portfolio/design-system/global.css";
import { MaintenancePage } from "@allondeveen-portfolio/maintenance-content/website";
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";

import type { MaintenanceContent } from "@allondeveen-portfolio/maintenance-content/website/data";

export function renderMaintenancePage(content: MaintenanceContent) {
  return {
    bodyClass: darkTheme,
    html: renderToString(
      <StrictMode>
        <MaintenancePage {...content} />
      </StrictMode>,
    ),
  };
}
