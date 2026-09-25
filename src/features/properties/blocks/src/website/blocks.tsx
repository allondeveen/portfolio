import { ContainerBlock } from "@allondeveen-portfolio/container-block/website";
import { Copyright } from "@allondeveen-portfolio/copyright-block/website";
import { EmbeddedVideo } from "@allondeveen-portfolio/embedded-video-block/website";
import { FileDownloadComponent } from "@allondeveen-portfolio/file-download-block/website";
import { GridBlock } from "@allondeveen-portfolio/grid-block/website";
import { GridItemBlock } from "@allondeveen-portfolio/grid-item-block/website";
import { GroupBlock } from "@allondeveen-portfolio/group-block/website";
import { HeadingComponent } from "@allondeveen-portfolio/heading-block/website";
import { HeroComponent } from "@allondeveen-portfolio/hero-block/website";
import { Image } from "@allondeveen-portfolio/image-block/website";
import { LabelComponent } from "@allondeveen-portfolio/label-block/website";
import { ListComponent } from "@allondeveen-portfolio/list-block/website";
import { Menu } from "@allondeveen-portfolio/menu-block/website";
import { QuoteComponent } from "@allondeveen-portfolio/quote-block/website";
import { RichTextComponent } from "@allondeveen-portfolio/rich-text-block/website";
import { SiteTitle } from "@allondeveen-portfolio/site-title-block/website";
import { StackBlock } from "@allondeveen-portfolio/stack-block/website";
import { TextSectionComponent } from "@allondeveen-portfolio/text-section-block/website";

import type { Block } from "./data";
import type { JSX } from "react";

export function BlockComponent({ block, blocks }: Block): JSX.Element {
  switch (block.kind) {
    case "container":
      return (
        <ContainerBlock {...block}>
          <BlocksComponent blocks={blocks} />
        </ContainerBlock>
      );
    case "copyright":
      return <Copyright {...block} />;
    case "embeddedVideo":
      return <EmbeddedVideo {...block} />;
    case "fileDownload":
      return <FileDownloadComponent {...block} />;
    case "grid":
      return (
        <GridBlock {...block}>
          <BlocksComponent blocks={blocks} />
        </GridBlock>
      );
    case "grid-item":
      return (
        <GridItemBlock {...block}>
          <BlocksComponent blocks={blocks} />
        </GridItemBlock>
      );
    case "group":
      return (
        <GroupBlock {...block}>
          <BlocksComponent blocks={blocks} />
        </GroupBlock>
      );
    case "heading":
      return <HeadingComponent {...block} />;
    case "hero":
      return (
        <HeroComponent {...block}>
          <BlocksComponent blocks={blocks} />
        </HeroComponent>
      );
    case "image":
      return <Image {...block} />;
    case "label":
      return <LabelComponent {...block} />;
    case "list":
      return <ListComponent {...block} />;
    case "menu":
      return <Menu {...block} />;
    case "quote":
      return <QuoteComponent {...block} />;
    case "richText":
      return <RichTextComponent {...block} />;
    case "siteTitle":
      return <SiteTitle {...block} />;
    case "stack":
      return (
        <StackBlock {...block}>
          <BlocksComponent blocks={blocks} />
        </StackBlock>
      );
    case "textSection":
      return (
        <TextSectionComponent {...block}>
          <BlocksComponent blocks={blocks} />
        </TextSectionComponent>
      );
    default:
      return <></>;
  }
}

export type BlocksComponentProps = {
  blocks: Block[] | undefined;
};
export function BlocksComponent({ blocks }: BlocksComponentProps) {
  return (
    <>
      {blocks?.map(({ block, blocks }) => (
        <BlockComponent key={block.id} block={block} blocks={blocks} />
      ))}
    </>
  );
}
