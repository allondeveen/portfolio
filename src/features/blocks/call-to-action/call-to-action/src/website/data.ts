import { BackgroundVariantSchema } from "@allondeveen-portfolio/background-variant-property/website/data";
import z from "zod";

export const CallToActionSchema = z.object({
  id: z.string(),
  kind: z.literal("callToAction"),
  variant: BackgroundVariantSchema,
});

export type CallToAction = z.infer<typeof CallToActionSchema>;
