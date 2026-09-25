import { vars } from "@allondeveen-portfolio/design-system";
import { style, styleVariants } from "@vanilla-extract/css";

const buttonTransform = style({
  transition: "background-color 0.2s ease-in-out, border-color  0.2s ease-in-out",
});

export const buttonVariants = styleVariants({
  default: [
    {
      borderColor: vars.colors.textPrimary,
      backgroundColor: vars.colors.textPrimary,
      color: vars.colors.background,
      selectors: {
        '&:is(a[href], button):not(:disabled):not([aria-disabled="true"]):hover': {
          backgroundColor: vars.colors.background,
          color: vars.colors.textPrimary,
        },
      },
    },
    buttonTransform,
  ],
  primary: [
    {
      borderColor: vars.colors.primary,
      backgroundColor: vars.colors.primary,
      color: vars.colors.textPrimary,
      selectors: {
        '&:is(a[href], button):not(:disabled):not([aria-disabled="true"]):hover': {
          backgroundColor: vars.colors.background,
          color: vars.colors.primary,
        },
      },
    },
    buttonTransform,
  ],
  secondary: [
    {
      borderColor: vars.colors.textSecondary,
      backgroundColor: vars.colors.textSecondary,
      color: vars.colors.background,
      selectors: {
        '&:is(a[href], button):not(:disabled):not([aria-disabled="true"]):hover': {
          backgroundColor: vars.colors.background,
          color: vars.colors.textSecondary,
        },
      },
    },
    buttonTransform,
  ],
  disabled: [
    {
      borderColor: vars.colors.textDisabled,
      backgroundColor: vars.colors.textDisabled,
      color: vars.colors.textPrimary,
      selectors: {
        '&:is(a[href], button):not(:disabled):not([aria-disabled="true"]):hover': {
          backgroundColor: vars.colors.background,
          color: vars.colors.textDisabled,
        },
      },
    },
    buttonTransform,
  ],
});
