import { BlockSchema } from "@allondeveen-portfolio/blocks-property/website/data";
import { RedirectSchema } from "@allondeveen-portfolio/redirects/website/data";
import { SiteSettingsSchema } from "@allondeveen-portfolio/site-settings/website/data";
import { TemplateSchema } from "@allondeveen-portfolio/templates/website/data";
import z from "zod";

export const DocumentSchema = z.object({
  id: z.string(),
  kind: z.literal("page").or(z.literal("project")).or(z.literal("article")),
  meta: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  slug: z.string(),
  header: TemplateSchema,
  footer: TemplateSchema,
  siteSettings: SiteSettingsSchema,
  blocks: z.array(BlockSchema).min(1),
});

export type Document = z.infer<typeof DocumentSchema>;

export const DocumentResponseSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("redirect"),
    data: RedirectSchema,
    tags: z.record(z.string().min(1), z.string().nullable()),
  }),
  z.object({
    kind: z.literal("document"),
    data: DocumentSchema,
    tags: z.record(z.string().min(1), z.string().nullable()),
  }),
]);

export type DocumentResponse = z.infer<typeof DocumentResponseSchema>;
