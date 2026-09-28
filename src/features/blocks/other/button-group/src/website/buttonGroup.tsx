import clsx from "clsx";

import type { ButtonGroup } from "./data";
import type { PropsWithChildren } from "react";

import "./style.css";

export type ButtonGroupBlockProps = PropsWithChildren<ButtonGroup>;

export function ButtonGroupBlock({ children }: ButtonGroupBlockProps) {
  return <div className={clsx("button-group")}>{children}</div>;
}
