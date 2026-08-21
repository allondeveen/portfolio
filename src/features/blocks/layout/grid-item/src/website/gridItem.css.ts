import { type ComplexStyleRule, styleVariants } from "@vanilla-extract/css";

const totalColumns = 12;
const gap = "1rem";

const columns = Array.from({ length: totalColumns }, (_, i) => i + 1);

export const gridItemSizes = styleVariants(
  columns.reduce(
    (acc, span) => {
      const styles: ComplexStyleRule = {
        // (span / 12 * 100%) - (GAP * (12 - span) / 12)
        flex: `0 0 calc((${span} / ${totalColumns} * 100%) - (${gap} * (${totalColumns} - ${span}) / ${totalColumns}))`,
      };
      acc[span] = styles;
      return acc;
    },
    {} as Record<number, ComplexStyleRule>,
  ),
);
