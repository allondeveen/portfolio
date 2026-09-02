import z from "zod";

export type EmailValidationResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

export function validateEmail(email: string): EmailValidationResult {
  const EmailSchema = z.email();
  const result = EmailSchema.safeParse(email);
  if (result.success) {
    return { success: true };
  } else {
    return { success: false, error: result.error.message };
  }
}
