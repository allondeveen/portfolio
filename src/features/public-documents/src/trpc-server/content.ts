import { protectedProcedure } from "@allondeveen-portfolio/trpc/server";
import * as z from "zod";

import { DocumentSchema as CMSDocumentSchema, findBySlug } from "../cms";
import { mapDocument } from "./adapter";

export const DocumentResponseSchema = z.object({
  hello: z.string(),
});

export type DocumentResponse = z.infer<typeof DocumentResponseSchema>;

export const contentProcedure = protectedProcedure
  .input(z.string().min(1))
  .output(DocumentResponseSchema)
  .query(async ({ input, ctx }) => {
    const document = await findBySlug({ payload: ctx.payload, slug: input });
    const validatedDocument = CMSDocumentSchema.parse(document);
    const mappedDocument = await mapDocument(validatedDocument);
    console.log("mapped document: " + JSON.stringify(mappedDocument, null, 2));
    return {
      hello: "Hello from tRPC!",
    };
  });
