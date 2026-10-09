import { BackgroundVariantSchema } from "@allondeveen-portfolio/background-variant-property/cms";
import z from "zod";

export const CallToActionSchema = z.object({
  id: z.string(),
  blockType: z.literal("callToAction"),
  variant: BackgroundVariantSchema,
});

export type CallToAction = z.infer<typeof CallToActionSchema>;
