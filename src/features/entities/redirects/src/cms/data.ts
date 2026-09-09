import z from "zod";

export const RedirectSchema = z.object({
  id: z.string().min(1),
  source: z.string().min(1),
  destination: z.string().min(1),
  active: z.boolean().default(true),
  queryString: z.boolean().default(false),
});

export type Redirect = z.infer<typeof RedirectSchema>;
