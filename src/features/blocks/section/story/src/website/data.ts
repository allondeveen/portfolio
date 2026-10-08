import * as z from "zod";

export const StorySchema = z.object({
  id: z.string(),
  kind: z.literal("story"),
});

export const StoryItemsSchema = <Block>(BlockSchema: z.ZodType<Block>) =>
  z
    .array(
      z.object({
        id: z.string().min(1),
        content: z.array(BlockSchema).min(1),
        frame: z.array(BlockSchema).min(1),
      }),
    )
    .min(2);

export type Story = z.infer<typeof StorySchema>;

export type StoryItems<Blocks> = {
  id: string;
  content: Blocks;
  frame: Blocks;
}[];
