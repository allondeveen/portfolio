import { HeadingSchema } from "@allondeveen-portfolio/heading-block/cms";
import { MenuSchema } from "@allondeveen-portfolio/menu-block/cms";
import { RichTextSchema } from "@allondeveen-portfolio/rich-text-block/cms";
import { SiteTitleSchema } from "@allondeveen-portfolio/site-title-block/cms";
import { StackSchema } from "@allondeveen-portfolio/stack-block/cms";
import * as z from "zod";

export const GridItemSchema = z.object({
  id: z.string(),
  blockType: z.literal("grid-item"),
  blocks: z
    .array(
      z.discriminatedUnion("blockType", [
        HeadingSchema,
        RichTextSchema,
        StackSchema,
        MenuSchema,
        SiteTitleSchema,
      ]),
    )
    .min(1),
  size: z.number().min(1).max(12),
});

export type GridItem = z.infer<typeof GridItemSchema>;
