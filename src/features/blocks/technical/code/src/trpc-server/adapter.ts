import { codeToHtml } from "shiki";

import { languagesOptions } from "../languages";
import { lineStructureTransformer } from "./lineTransformer";

import type { Code as CMSCode } from "../cms";
import type { Code } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapCode: Adapter<CMSCode, Code> = async (code) => {
  return {
    id: code.id,
    kind: code.blockType,
    files: await Promise.all(
      code.files.map(async (file) => {
        const option = languagesOptions.find(
          (lang) => lang.value === file.language,
        ) as (typeof languagesOptions)[number];
        return {
          language: option.label,
          fileName: file.fileName,
          code: await codeToHtml(file.code, {
            theme: "dark-plus",
            lang: file.language,
            transformers: [lineStructureTransformer],
          }),
          rawCode: file.code,
        };
      }),
    ),
  };
};
