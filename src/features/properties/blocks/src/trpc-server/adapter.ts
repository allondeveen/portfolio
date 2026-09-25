import { mapContainer } from "@allondeveen-portfolio/container-block/trpc-server";
import { mapCopyright } from "@allondeveen-portfolio/copyright-block/trpc-server";
import { mapEmbeddedVideo } from "@allondeveen-portfolio/embedded-video-block/trpc-server";
import { mapFileDownload } from "@allondeveen-portfolio/file-download-block/trpc-server";
import { mapGrid } from "@allondeveen-portfolio/grid-block/trpc-server";
import { mapGridItem } from "@allondeveen-portfolio/grid-item-block/trpc-server";
import { mapGroup } from "@allondeveen-portfolio/group-block/trpc-server";
import { mapHeading } from "@allondeveen-portfolio/heading-block/trpc-server";
import { mapHero } from "@allondeveen-portfolio/hero-block/trpc-server";
import { mapImage } from "@allondeveen-portfolio/image-block/trpc-server";
import { mapLabel } from "@allondeveen-portfolio/label-block/trpc-server";
import { mapList } from "@allondeveen-portfolio/list-block/trpc-server";
import { mapMenu } from "@allondeveen-portfolio/menu-block/trpc-server";
import { mapQuote } from "@allondeveen-portfolio/quote-block/trpc-server";
import { mapRichText } from "@allondeveen-portfolio/rich-text-block/trpc-server";
import {
  mapSiteTitle,
  type SiteTitleAdapterOptions,
} from "@allondeveen-portfolio/site-title-block/trpc-server";
import { mapStack } from "@allondeveen-portfolio/stack-block/trpc-server";
import { mapTextSection } from "@allondeveen-portfolio/text-section-block/trpc-server";

import type { Block as CMSBlock } from "../cms";
import type { Block } from "../website/data";
import type { MappingContext } from "@allondeveen-portfolio/adapter/trpc-server";

export type MapBlockOptions = {
  siteTitle: SiteTitleAdapterOptions;
};

export function mapBlock(options: MapBlockOptions) {
  const { siteTitle } = options;
  return async (block: CMSBlock, context: MappingContext): Promise<Block> => {
    switch (block.blockType) {
      case "container":
        return {
          block: await mapContainer(block, context),
          blocks: await Promise.all(block.blocks.map((block) => mapBlock(options)(block, context))),
        };
      case "copyright":
        return {
          block: await mapCopyright(siteTitle)(block, context),
        };
      case "embeddedVideo":
        return {
          block: await mapEmbeddedVideo(block, context),
        };
      case "fileDownload":
        return {
          block: await mapFileDownload(block, context),
        };
      case "grid":
        return {
          block: await mapGrid(block, context),
          blocks: await Promise.all(block.blocks.map((block) => mapBlock(options)(block, context))),
        };
      case "grid-item":
        return {
          block: await mapGridItem(block, context),
          blocks: await Promise.all(block.blocks.map((block) => mapBlock(options)(block, context))),
        };
      case "group":
        return {
          block: await mapGroup(block, context),
          blocks: await Promise.all(block.blocks.map((block) => mapBlock(options)(block, context))),
        };
      case "heading":
        return {
          block: await mapHeading(block, context),
        };
      case "hero":
        return {
          block: await mapHero(block, context),
          blocks: await Promise.all(block.blocks.map((block) => mapBlock(options)(block, context))),
        };
      case "image":
        return {
          block: await mapImage(block, context),
        };
      case "label":
        return {
          block: await mapLabel(block, context),
        };
      case "list":
        return {
          block: await mapList(block, context),
        };
      case "menu":
        return {
          block: await mapMenu(block, context),
        };
      case "quote":
        return {
          block: await mapQuote(block, context),
        };
      case "richText":
        return {
          block: await mapRichText(block, context),
        };
      case "siteTitle":
        return {
          block: await mapSiteTitle(siteTitle)(block, context),
        };
      case "stack":
        return {
          block: await mapStack(block, context),
          blocks: await Promise.all(block.blocks.map((block) => mapBlock(options)(block, context))),
        };
      case "textSection":
        return {
          block: await mapTextSection(block, context),
          blocks: await Promise.all(block.blocks.map((block) => mapBlock(options)(block, context))),
        };
    }
  };
}
