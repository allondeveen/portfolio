import { HeadingSchema } from "@allondeveen-portfolio/heading-block/website/data";
import { RichTextSchema } from "@allondeveen-portfolio/rich-text-block/website/data";
import * as z from "zod";

const HeroChildBlockSchema = z.discriminatedUnion("kind", [HeadingSchema, RichTextSchema]);

export const HeroSchema = z.object({
  kind: z.literal("hero"),
  blocks: z.array(HeroChildBlockSchema).min(2),
});

export type Hero = z.infer<typeof HeroSchema>;
