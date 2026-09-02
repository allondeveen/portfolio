import { GridBlock } from "@allondeveen-portfolio/grid-block/website";
import { GridItemBlock } from "@allondeveen-portfolio/grid-item-block/website";
import { HeadingComponent } from "@allondeveen-portfolio/heading-block/website";
import { HeroComponent } from "@allondeveen-portfolio/hero-block/website";
import { Image } from "@allondeveen-portfolio/image-block/website";
import { Menu } from "@allondeveen-portfolio/menu-block/website";
import { RichTextComponent } from "@allondeveen-portfolio/rich-text-block/website";
import { SiteTitle } from "@allondeveen-portfolio/site-title-block/website";
import { StackBlock } from "@allondeveen-portfolio/stack-block/website";

import type { Block } from "./data";
import type { JSX } from "react";

export function BlockComponent(block: Block): JSX.Element {
  switch (block.kind) {
    case "heading":
      return <HeadingComponent {...block} />;
    case "richText":
      return <RichTextComponent {...block} />;
    case "hero":
      return (
        <HeroComponent {...block}>
          <BlocksComponent blocks={block.blocks} />
        </HeroComponent>
      );
    case "grid-item":
      return (
        <GridItemBlock {...block}>
          <BlocksComponent blocks={block.blocks} />
        </GridItemBlock>
      );
    case "grid":
      return (
        <GridBlock {...block}>
          <BlocksComponent blocks={block.blocks} />
        </GridBlock>
      );
    case "stack":
      return (
        <StackBlock {...block}>
          <BlocksComponent blocks={block.blocks} />
        </StackBlock>
      );
    case "menu":
      return <Menu {...block} />;
    case "image":
      return <Image {...block} />;
    case "siteTitle":
      return <SiteTitle {...block} />;
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
