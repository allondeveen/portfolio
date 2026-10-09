import { BackgroundVariantSchema } from "@allondeveen-portfolio/background-variant-property/cms";
import * as z from "zod";

export const HeroSchema = z.object({
  id: z.string(),
  blockType: z.literal("hero"),
  variant: BackgroundVariantSchema,
});

export type Hero = z.infer<typeof HeroSchema>;
