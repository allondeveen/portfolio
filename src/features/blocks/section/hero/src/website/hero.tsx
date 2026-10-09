import { backgroundVariants } from "@allondeveen-portfolio/background-variant-property/website";
import clsx from "clsx";

import "./style.css";

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
        variant !== "default" ? backgroundVariants[variant] : "",
      )}
    >
      <div className={clsx(`${kind}__content`, "container")}>{children}</div>
    </header>
  );
}
