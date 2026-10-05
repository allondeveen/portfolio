import { IconSchema } from "@allondeveen-portfolio/icon-block/cms";
import z from "zod";

export const IconsSchema = z.object({
  id: z.string(),
  blockType: z.literal("icons"),
  blocks: z.array(IconSchema).min(1),
});

export type Icons = z.infer<typeof IconsSchema>;
