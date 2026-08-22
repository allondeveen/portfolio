import clsx from "clsx";

import { gridItemSizes } from "./gridItem.css";

import type { GridItem } from "./data";
import type { PropsWithChildren } from "react";

export type GridItemBlockProps = PropsWithChildren<GridItem>;

function validateSize(size: number): size is 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 {
  if (size >= 1 && size <= 12) {
    return true;
  }
  return false;
}

export function GridItemBlock({ kind, children, size }: GridItemBlockProps) {
  const validatedSize = validateSize(size);
  let sizeStyle = "";
  if (validatedSize) {
    sizeStyle = gridItemSizes[size];
  }
  return <div className={clsx(kind, sizeStyle)}>{children}</div>;
}
