import { BlockSchema } from "@allondeveen-portfolio/blocks-property/website/data";
import { TemplateSchema } from "@allondeveen-portfolio/templates/website/data";
import z from "zod";

export const ErrorPageSchema = z.object({
  header: TemplateSchema,
  blocks: z.array(BlockSchema).min(1),
  footer: TemplateSchema,
  siteTitle: z.string().min(1),
});

export type ErrorPage = z.infer<typeof ErrorPageSchema>;
