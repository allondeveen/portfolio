import clsx from "clsx";

import "./style.css";

import type { TextSection } from "./data";
import type { PropsWithChildren } from "react";

export type TextSectionComponentProps = PropsWithChildren<TextSection>;

export function TextSectionComponent({ children }: TextSectionComponentProps) {
  return <section className={clsx("block", "text-section", "container")}>{children}</section>;
}
