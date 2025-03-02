import { z } from "zod"

export const SignInSchema = z.object({
    email: z.string().email("auth.validation.email"),
    password: z
        .string()
        .min(8, { message: "auth.validation.password.min" })
        .max(64, {
            message: "auth.validation.password.max",
        })
        .refine(
            (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
            "auth.validation.password.pattern",
        ),
})