import { vars } from "@allondeveen-portfolio/design-system";
import { globalStyle } from "@vanilla-extract/css";

globalStyle(".grid-item:first-child .rich-text a", {
  color: vars.colors.textPrimary,
});
