import { vars } from "@allondeveen-portfolio/design-system";
import { styleVariants } from "@vanilla-extract/css";

export const heroVariants = styleVariants({
  elevated: {
    backgroundColor: vars.colors.backgroundElevated,
  },
  overlay: {
    backgroundColor: vars.colors.backgroundOverlay,
  },
});
