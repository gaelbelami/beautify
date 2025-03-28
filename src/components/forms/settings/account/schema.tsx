import { z } from "zod";

export const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "auth.validation.firstname.min",
    })
    .max(30, {
      message: "auth.validation.firstname.max",
    }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  language: z.string({
    required_error: "Please select a language.",
  }),
});
