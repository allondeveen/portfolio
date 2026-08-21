import clsx from "clsx";

import type { Grid } from "./data";
import type { PropsWithChildren } from "react";

import "./style.css";

export type GridBlockProps = PropsWithChildren<Grid>;

export function GridBlock({ kind, children }: GridBlockProps) {
  return <div className={clsx(kind, "cluster")}>{children}</div>;
}
