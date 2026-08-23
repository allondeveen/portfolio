import * as z from "zod";

const MenuItemSchema = z.object({
  label: z.string().min(1),
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
