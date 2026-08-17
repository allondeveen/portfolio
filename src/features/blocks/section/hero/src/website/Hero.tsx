import clsx from "clsx";

import "./Hero.css";

import type { Hero } from "./data";
import type { PropsWithChildren } from "react";

export type HeroComponentProps = PropsWithChildren<Hero>;

export function HeroComponent({ kind, children }: HeroComponentProps) {
  return (
    <article className={clsx(kind, "container", "center", "vertical")}>
      <div className={`${kind}__content`}>{children}</div>
    </article>
  );
}
