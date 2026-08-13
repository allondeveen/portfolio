import { publicProcedure } from "@allondeveen-portfolio/trpc/server";
import * as z from "zod";

export const DocumentResponseSchema = z.object({
  hello: z.string(),
});

export type DocumentResponse = z.infer<typeof DocumentResponseSchema>;

export const contentProcedure = publicProcedure
  .input(z.string().min(1))
  .output(DocumentResponseSchema)
  .query(() => {
    return {
      hello: "Hello from tRPC!",
    };
  });
