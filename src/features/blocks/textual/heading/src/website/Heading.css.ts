import { vars } from "@allondeveen-portfolio/design-system";
import { styleVariants } from "@vanilla-extract/css";

export const headingVariant = styleVariants({
  default: {
    color: vars.colors.textPrimary,
  },
  muted: {
    color: vars.colors.textDisabled,
  },
  primary: {
    color: vars.colors.primary,
  },
});
