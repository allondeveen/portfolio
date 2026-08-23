import { MenuSchema as MenuCollectionSchema } from "@allondeveen-portfolio/menu/website/data";
import z from "zod";

export const MenuSchema = MenuCollectionSchema.extend({
  id: z.string(),
  kind: z.literal("menu"),
});

export type Menu = z.infer<typeof MenuSchema>;
