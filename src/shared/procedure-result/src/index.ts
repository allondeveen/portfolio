import { TemplateSchema } from "@allondeveen-portfolio/templates/website/data";
import z from "zod";

export function ProcedureResultSuccessSchema<T extends z.ZodType>(DataSchema: T) {
  return z.object({
    status: z.literal("success"),
    data: DataSchema,
  });
}

export function ProcedureResultErrorSchema<E extends z.ZodType>(ErrorSchema: E) {
  return z.object({
    status: z.literal("error"),
    error: ErrorSchema,
    template: TemplateSchema.optional(),
  });
}

export const ProcedureResultContentNotFoundSchema = z.object({
  status: z.literal("not-found"),
  template: TemplateSchema.optional(),
});

export function ProcedureResultSchema<T extends z.ZodType, E extends z.ZodType>(
  DataSchema: T,
  ErrorSchema: E,
) {
  return z.discriminatedUnion("status", [
    ProcedureResultSuccessSchema(DataSchema),
    ProcedureResultErrorSchema(ErrorSchema),
    ProcedureResultContentNotFoundSchema,
  ]);
}
