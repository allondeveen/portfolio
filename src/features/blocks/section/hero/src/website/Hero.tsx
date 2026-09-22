import clsx from "clsx";

import "./style.css";

import { heroVariants } from "./hero.css";

import type { Hero } from "./data";
import type { PropsWithChildren } from "react";

export type HeroComponentProps = PropsWithChildren<Hero>;

export function HeroComponent({ kind, children, variant }: HeroComponentProps) {
  return (
    <header
      className={clsx(
        "block",
        kind,
        "center",
        "vertical",
        variant !== "default" ? heroVariants[variant] : "",
      )}
    >
      <div className={clsx(`${kind}__content`, "container")}>{children}</div>
    </header>
  );
}
