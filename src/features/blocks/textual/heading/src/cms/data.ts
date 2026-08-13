import * as z from "zod";

export const HeadingSchema = z.object({
  blockType: z.literal("heading"),
  size: z.number(),
  headingText: z.unknown(),
  variant: z.literal("default").or(z.literal("muted")).or(z.literal("primary")),
});

export type Heading = z.infer<typeof HeadingSchema>;
