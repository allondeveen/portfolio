import { vars } from "@allondeveen-portfolio/design-system";
import { globalStyle, style } from "@vanilla-extract/css";

export const codeContentClassName = style({
  backgroundColor: vars.colors.backgroundElevated,
});

export const codeContentBodyClassName = style({
  backgroundColor: vars.colors.backgroundOverlay,
});

export const copyCodeButtonClassName = style({
  backgroundColor: vars.colors.background,
  color: vars.colors.textPrimary,
  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.textPrimary,
      color: vars.colors.background,
    },
    "&:active": {
      backgroundColor: vars.colors.primary,
      color: vars.colors.background,
    },
  },
});

export const fileNameButtonClassName = style({
  backgroundColor: vars.colors.backgroundElevated,
  color: vars.colors.textPrimary,
  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.textPrimary,
      color: vars.colors.background,
    },
    "&:active, &.active": {
      backgroundColor: vars.colors.backgroundOverlay,
      color: vars.colors.textPrimary,
    },
  },
});

globalStyle(".code .code--content .code--content__body pre code .line .line-number", {
  backgroundColor: vars.colors.backgroundElevated,
});
