import { z } from "zod";

interface ResetPasswordInput {
  email: string;
  password: string;
  confirmPassword: string;
}

export const ResetPasswordSchema = z
  .object({
    email: z.string().email("auth.validation.email"),
    password: z
      .string()
      .min(8, { message: "auth.validation.password.min" })
      .max(64, {
        message: "auth.validation.password.max",
      })
      .refine(
        (value): value is string => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
        "auth.validation.password.pattern",
      ),
    confirmPassword: z
      .string()
      .min(8, { message: "auth.validation.password.min" })
      .max(64, {
        message: "auth.validation.confirmPassword.max",
      })
      .refine(
        (value): value is string => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
        "auth.validation.confirmPassword.pattern",
      ),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "auth.validation.confirmPassword.match",
        path: ["confirmPassword"],
      });
    }
  }) satisfies z.ZodType<ResetPasswordInput>;
