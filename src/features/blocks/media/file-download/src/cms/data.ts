import { LexicalEditorStateSchema } from "@allondeveen-portfolio/lexical-text/cms";
import { VariantSchema } from "@allondeveen-portfolio/variant-property/cms";
import z from "zod";

export const FileDownloadSchema = z.object({
  id: z.string(),
  blockType: z.literal("fileDownload"),
  style: z.literal("link").or(z.literal("button")),
  variant: VariantSchema.nullish(),
  label: LexicalEditorStateSchema.nullish(),
  download: z.string(),
});

export type FileDownload = z.infer<typeof FileDownloadSchema>;
