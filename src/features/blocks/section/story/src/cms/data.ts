import * as z from "zod";

export const StorySchema = z.object({
  id: z.string(),
  blockType: z.literal("story"),
  columnDistribution: z.literal("1/1").or(z.literal("1/2")).or(z.literal("1/3")).default("1/1"),
  mobileColumnDistribution: z
    .literal("1/1")
    .or(z.literal("1/2"))
    .or(z.literal("1/3"))
    .default("1/1"),
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

export type StoryItems<Block> = {
  id: string;
  content: Block[];
  frame: Block[];
}[];
