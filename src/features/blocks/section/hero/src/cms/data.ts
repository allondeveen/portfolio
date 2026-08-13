import * as z from "zod";

export const HeroSchema = z.object({
  blockType: z.literal("hero"),
  blocks: z.array(z.unknown()).nullish(),
});

export type Hero = z.infer<typeof HeroSchema>;
