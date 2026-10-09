import z from "zod";

export const BackgroundVariantSchema = z
  .literal("default")
  .or(z.literal("elevated"))
  .or(z.literal("overlay"))
  .default("default");

export type BackgroundVariant = z.infer<typeof BackgroundVariantSchema>;
