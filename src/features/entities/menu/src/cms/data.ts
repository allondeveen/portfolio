import * as z from "zod";

const MenuItemInternalSchema = z.object({
  label: z.string().min(1),
  externality: z.literal("internal"),
  internal: z.object({
    value: z.object({
      slug: z.string().min(1),
    }),
  }),
  order: z.number(),
});

const MenuItemExternalSchema = z.object({
  label: z.string().min(1),
  externality: z.literal("external"),
  external: z.string().min(1),
  order: z.number(),
});

const MenuItemSchema = z.discriminatedUnion("externality", [
  MenuItemExternalSchema,
  MenuItemInternalSchema,
]);

export const MenuSchema = z.object({
  id: z.string(),
  location: z.string().min(1),
  items: z.array(MenuItemSchema).min(1),
});

export type Menu = z.infer<typeof MenuSchema>;
