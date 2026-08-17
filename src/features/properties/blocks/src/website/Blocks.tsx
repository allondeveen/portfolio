import { HeadingComponent } from "@allondeveen-portfolio/heading-block/website";
import { HeroComponent } from "@allondeveen-portfolio/hero-block/website";
import { RichTextComponent } from "@allondeveen-portfolio/rich-text-block/website";

import type { Block } from "./data";
import type { JSX } from "react";

export function BlockComponent(block: Block): JSX.Element {
  switch (block.kind) {
    case "heading":
      return <HeadingComponent {...block} />;
    case "richText":
      return <RichTextComponent {...block} />;
    case "hero":
      return <HeroComponent {...block} renderBlocks={BlockComponent} />;
    default:
      return <></>;
  }
}

export type BlocksComponentProps = {
  blocks: Block[];
};
export function BlocksComponent({ blocks }: BlocksComponentProps) {
  return (
    <>
      {blocks.map((block) => (
        <BlockComponent key={block.id} {...block} />
      ))}
    </>
  );
}
