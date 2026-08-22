import clsx from "clsx";

import type { Grid } from "./data";
import type { PropsWithChildren } from "react";

import "./style.css";

export type GridBlockProps = PropsWithChildren<Grid>;

export function GridBlock({ kind, children, verticalAlign }: GridBlockProps) {
  let classes = [kind, "cluster"];
  if (verticalAlign) {
    classes = [...classes, "vertically-centered"];
  }
  return <div className={clsx(...classes)}>{children}</div>;
}
