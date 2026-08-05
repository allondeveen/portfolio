import { globalStyle } from "@vanilla-extract/css";

import { vars } from "../themes/theme.css";

globalStyle("body", {
  background: vars.colors.background,
  color: vars.colors.textPrimary,
});
