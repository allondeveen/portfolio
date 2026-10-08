import z from "zod";

export const VariantSchema = z
  .literal("default")
  .or(z.literal("primary"))
  .or(z.literal("secondary"))
  .or(z.literal("disabled"))
  .default("default");

export type Variant = z.infer<typeof VariantSchema>;
