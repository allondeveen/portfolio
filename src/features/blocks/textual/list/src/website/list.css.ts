import { styleVariants } from "@vanilla-extract/css";

export const listStyleClassName = styleVariants({
  disc: {
    listStyleType: "disc",
  },
  circle: {
    listStyleType: "circle",
  },
  square: {
    listStyleType: "square",
  },
  "decimal-leading-zero": {
    listStyleType: "decimal-leading-zero",
  },
  "lower-alpha": {
    listStyleType: "lower-alpha",
  },
  "upper-alpha": {
    listStyleType: "upper-alpha",
  },
  hebrew: {
    listStyleType: "hebrew",
  },
  "lower-roman": {
    listStyleType: "lower-roman",
  },
  "upper-roman": {
    listStyleType: "upper-roman",
  },
  none: {
    listStyleType: "none",
  },
});
