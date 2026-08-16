import clsx from "clsx";

import "./Hero.css";

import type { Hero } from "./data";
import type { JSX } from "react";

export type HeroComponentProps = Hero & {
  renderBlocks(block: Hero["blocks"][number]): JSX.Element;
};

export function HeroComponent({ kind, blocks, renderBlocks }: HeroComponentProps) {
  return (
    <article className={kind}>
      <div className={clsx(`${kind}__content`, "container", "center", "vertical")}>
        <div className={`${kind}__inner-content`}>{blocks.map(renderBlocks)}</div>
      </div>
    </article>
  );
}
