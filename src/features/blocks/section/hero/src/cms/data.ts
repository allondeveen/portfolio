import * as z from "zod";

export const HeroSchema = z.object({
  id: z.string(),
  blockType: z.literal("hero"),
});

export type Hero = z.infer<typeof HeroSchema>;
