import clsx from "clsx";

import "./style.css";

import type { Hero } from "./data";
import type { PropsWithChildren } from "react";

export type HeroComponentProps = PropsWithChildren<Hero>;

export function HeroComponent({ kind, children }: HeroComponentProps) {
  return (
    <header className={clsx("block", kind, "center", "vertical")}>
      <div className={clsx(`${kind}__content`, "container")}>{children}</div>
    </header>
  );
}
