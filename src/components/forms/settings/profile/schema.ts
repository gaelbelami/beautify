import { z } from "zod";

export const profileFormSchema = z.object({
    firstname: z
        .string()
        .min(3, { message: "auth.validation.firstname.min" }),
    lastname: z
        .string()
        .min(3, { message: "auth.validation.lastname.min" }),
  username: z
    .string()
    .min(2, {
      message: "auth.validation.username.min",
    })
    .max(30, {
      message: "auth.validation.username.max",
    }),
  email: z.string().email("auth.validation.email"),
  bio: z.string().max(160, {message: "auth.validation.bio.min"}).min(4, {message: "auth.validation.bio.min"}),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "auth.validation.url" }),
      })
    )
    .optional(),
})