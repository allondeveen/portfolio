import { vars } from "@allondeveen-portfolio/design-system";
import { styleVariants } from "@vanilla-extract/css";

export const labelClassName = styleVariants({
  default: {
    backgroundColor: vars.colors.textPrimary,
    color: vars.colors.background,
  },
  primary: {
    backgroundColor: vars.colors.primary,
    color: vars.colors.textPrimary,
  },
  secondary: {
    backgroundColor: vars.colors.textSecondary,
    color: vars.colors.background,
  },
  disabled: {
    backgroundColor: vars.colors.textDisabled,
    color: vars.colors.textPrimary,
  },
});
