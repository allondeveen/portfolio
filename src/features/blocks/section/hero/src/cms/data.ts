import * as z from "zod";

export const HeroSchema = z.object({
  id: z.string(),
  blockType: z.literal("hero"),
  variant: z.literal("default").or(z.literal("elevated")).or(z.literal("overlay")),
});

export type Hero = z.infer<typeof HeroSchema>;
