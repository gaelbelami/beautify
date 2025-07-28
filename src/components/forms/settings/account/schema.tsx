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
  email: z.string().email({
    message: "auth.validation.email",
  }),
  phone: z
    .string()
    .min(10, {
      message: "auth.validation.phone.min",
    })
    .max(15, {
      message: "auth.validation.phone.max",
    })
    .regex(/^[+]?[1-9]\d{1,14}$/, {
      message: "auth.validation.phone.format",
    })
    .optional(),
  dob: z.date({
    required_error: "validation.dob.required",
  }),
  timezone: z.string({
    required_error: "validation.timezone.required",
  }),
  language: z.string({
    required_error: "validation.language.required",
  }),
  // Phase 2: Profile Enhancement Fields
  country: z.string().optional(),
  jobTitle: z
    .string()
    .max(100, {
      message: "validation.jobTitle.max",
    })
    .optional(),
  company: z
    .string()
    .max(100, {
      message: "validation.company.max",
    })
    .optional(),
});

// Separate schema for profile picture upload
export const profilePictureSchema = z.object({
  profilePicture: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, {
      message: "validation.profilePicture.size",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "validation.profilePicture.type",
      }
    )
    .optional(),
});
