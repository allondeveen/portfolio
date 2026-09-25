import { LexicalTextSchema } from "@allondeveen-portfolio/lexical-text/website/data";
import { DownloadSchema } from "@allondeveen-portfolio/media/website/data";
import z from "zod";

export const FileDownloadSchema = z.object({
  id: z.string(),
  kind: z.literal("fileDownload"),
  style: z.literal("link").or(z.literal("button")),
  variant: z
    .literal("default")
    .or(z.literal("primary"))
    .or(z.literal("secondary"))
    .or(z.literal("disabled")),
  label: LexicalTextSchema.optional(),
  download: DownloadSchema.optional(),
});

export type FileDownload = z.infer<typeof FileDownloadSchema>;
