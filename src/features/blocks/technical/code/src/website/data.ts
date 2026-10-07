import z from "zod";

import { languagesOptions } from "../languages";

export const CodeSchema = z.object({
  id: z.string(),
  kind: z.literal("code"),
  files: z
    .array(
      z.object({
        language: z.enum(languagesOptions.map((option) => option.label)),
        fileName: z.string().min(1),
        code: z.string().min(1),
        rawCode: z.string().min(1),
      }),
    )
    .min(1),
});

export type Code = z.infer<typeof CodeSchema>;
