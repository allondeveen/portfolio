import { MenuSchema as CMSMenuSchema } from "@allondeveen-portfolio/menu/cms";
import z from "zod";

export const MenuSchema = z.object({
  id: z.string(),
  blockType: z.literal("menu"),
  menu: CMSMenuSchema,
});

export type Menu = z.infer<typeof MenuSchema>;
