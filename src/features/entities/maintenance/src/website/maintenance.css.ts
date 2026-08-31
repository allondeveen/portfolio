import { vars } from "@allondeveen-portfolio/design-system";
import { globalStyle } from "@vanilla-extract/css";

globalStyle(".maintenance-page__content p.rich-text", {
  color: vars.colors.textSecondary,
});

globalStyle(".maintenance-page__content nav.maintenance ul li a:active", {
  color: vars.colors.textDisabled,
});

globalStyle(".maintenance-page__content nav.maintenance ul li a:active svg", {
  fill: vars.colors.textDisabled,
});
