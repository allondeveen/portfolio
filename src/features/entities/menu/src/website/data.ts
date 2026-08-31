import { allIcons } from "@allondeveen-portfolio/ui";
import * as z from "zod";

import type { IconName } from "@allondeveen-portfolio/ui";

const MenuItemSchema = z.object({
  label: z.string().min(1),
  icon: z.union(allIcons.map((name) => z.literal<IconName>(name))).optional(),
  externality: z.literal("external").or(z.literal("internal")),
  location: z.string().min(1),
  order: z.number(),
});

export const MenuSchema = z.object({
  id: z.string(),
  location: z.string().min(1),
  items: z.array(MenuItemSchema).min(1),
});

export type Menu = z.infer<typeof MenuSchema>;
