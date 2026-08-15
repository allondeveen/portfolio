import { HeadingSchema } from "@allondeveen-portfolio/heading-block/cms";
import { RichTextSchema } from "@allondeveen-portfolio/rich-text-block/cms";
import * as z from "zod";

const HeroChildBlockSchema = z.discriminatedUnion("blockType", [HeadingSchema, RichTextSchema]);

export const HeroSchema = z.object({
  blockType: z.literal("hero"),
  blocks: z.array(HeroChildBlockSchema).min(1),
});

export type Hero = z.infer<typeof HeroSchema>;
