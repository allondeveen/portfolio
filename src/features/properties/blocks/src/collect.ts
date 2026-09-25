import { containerBlock } from "@allondeveen-portfolio/container-block/config";
import { copyrightBlock } from "@allondeveen-portfolio/copyright-block/config";
import { embeddedvideoBlock } from "@allondeveen-portfolio/embedded-video-block/config";
import { filedownloadBlock } from "@allondeveen-portfolio/file-download-block/config";
import { gridBlock } from "@allondeveen-portfolio/grid-block/config";
import { gridItemBlock } from "@allondeveen-portfolio/grid-item-block/config";
import { groupBlock } from "@allondeveen-portfolio/group-block/config";
import { headingBlock } from "@allondeveen-portfolio/heading-block/config";
import { heroBlock } from "@allondeveen-portfolio/hero-block/config";
import { imageBlock } from "@allondeveen-portfolio/image-block/config";
import { labelBlock } from "@allondeveen-portfolio/label-block/config";
import { listblock } from "@allondeveen-portfolio/list-block/config";
import { menuBlock } from "@allondeveen-portfolio/menu-block/config";
import { quoteblock } from "@allondeveen-portfolio/quote-block/config";
import { richTextblock } from "@allondeveen-portfolio/rich-text-block/config";
import { siteTitleBlock } from "@allondeveen-portfolio/site-title-block/config";
import { stackBlock } from "@allondeveen-portfolio/stack-block/config";
import { textsectionBlock } from "@allondeveen-portfolio/text-section-block/config";

import type { Block, BlockSlug } from "payload";

export const allBlocks: Block[] = [
  // Group
  groupBlock(["heading", "richText", "image"]),

  // Layout
  containerBlock([
    "heading",
    "richText",
    "stack",
    "grid",
    "image",
    "copyright",
    "siteTitle",
    "menu",
  ]),
  gridBlock(["grid-item"]),
  gridItemBlock(["heading", "richText", "stack", "menu", "siteTitle"]),
  stackBlock(["heading", "richText"]),

  // Media
  embeddedvideoBlock,
  filedownloadBlock,
  imageBlock,

  // Navigation
  copyrightBlock,
  menuBlock,
  siteTitleBlock,

  // Section
  heroBlock(["heading", "richText", "label"]),
  textsectionBlock([
    "heading",
    "richText",
    "image",
    "grid",
    "stack",
    "quote",
    "list",
    "label",
    "embeddedVideo",
    "fileDownload",
  ]),

  // Textual
  headingBlock,
  labelBlock,
  listblock,
  quoteblock,
  richTextblock,
];
export const allBlockTypes: BlockSlug[] = allBlocks.map((block) => block.slug) as BlockSlug[];
