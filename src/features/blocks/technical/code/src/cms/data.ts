import z from "zod";

import { languages } from "../languages";

export const CodeSchema = z.object({
  id: z.string(),
  blockType: z.literal("code"),
  files: z
    .array(
      z.object({
        language: z.enum(languages),
        fileName: z.string().min(1),
        code: z.string().min(1),
      }),
    )
    .min(1),
});

export type Code = z.infer<typeof CodeSchema>;
