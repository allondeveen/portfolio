import { mapLexicalText } from "@allondeveen-portfolio/lexical-text/trpc-server";
import { MediaSchema } from "@allondeveen-portfolio/media/cms";
import { mapMedia } from "@allondeveen-portfolio/media/trpc-server";

import type { FileDownload as CMSFileDownload } from "../cms/data";
import type { FileDownload } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapFileDownload: Adapter<CMSFileDownload, FileDownload> = async (
  filedownload,
  context,
) => {
  const resolvedFileDownload = await context.resolvePublic(
    {
      collection: "media",
      id: filedownload.download,
    },
    MediaSchema,
  );
  const base = {
    id: filedownload.id,
    kind: filedownload.blockType,
    style: filedownload.style,
    variant: filedownload.variant ?? "default",
    label: filedownload.label ? await mapLexicalText(filedownload.label, context) : undefined,
  };
  if (resolvedFileDownload.status !== "resolved") {
    return base;
  }
  const mappedFileDownload = await mapMedia(resolvedFileDownload.source, context);
  if (mappedFileDownload.kind === "image") {
    return base;
  }
  return {
    ...base,
    download: mappedFileDownload,
  };
};
