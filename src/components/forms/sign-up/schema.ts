import { z } from "zod"

export const SignUpSchema = z.object({
    firstname: z
        .string()
        .min(3, { message: "auth.validation.firstname.min" }),
    lastname: z
        .string()
        .min(3, { message: "auth.validation.lastname.min" }),
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
    role: z.enum(["client", "owner"]),
})
