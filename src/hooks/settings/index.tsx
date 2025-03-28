// src/hooks/use-profile-form.ts
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { PROFILE_FORM } from "@/constants/forms";
import { useTranslations } from "next-intl";
import { profileFormSchema } from "@/components/forms/settings/profile/schema";
import { accountFormSchema } from "@/components/forms/settings/account/schema";

type FormFields = z.infer<typeof profileFormSchema>;
type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

export const useProfileForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(profileFormSchema),
    mode: "onBlur",
  });
  return { register, errors };
};

export const useAccountForm = () => {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    mode: "onBlur",
  });
  return { form };
};
