"use client";

import React, { useEffect } from "react";
import { EnhancedLocaleSwitcher } from "@/components/enhanced-toggles";
import { FormGenerator } from "@/components/global/form-generator";
import { Button } from "@/components/ui/button";
import { BEAUTIFY_CONSTANTS } from "@/constants";
import { useCurrentUser, useUpdateProfile } from "@/hooks/api/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountFormSchema } from "./schema";
import type { User } from "@/types/api";
import { z } from "zod";
import { toast } from "sonner";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
  const { data: currentUser } = useCurrentUser();
  const updateProfileMutation = useUpdateProfile();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    mode: "onBlur",
  });

  // Populate form with current user data
  useEffect(() => {
    if (currentUser) {
      form.setValue("name", currentUser.name || "");
      if (currentUser.dateOfBirth) {
        form.setValue("dob", new Date(currentUser.dateOfBirth));
      }
      form.setValue("language", currentUser.language || "en");
    }
  }, [currentUser, form]);

  const onSubmit = async (data: AccountFormValues) => {
    try {
      const updateData: Partial<User> = {
        name: data.name,
        dateOfBirth: data.dob.toISOString(),
        language: data.language,
      };

      await updateProfileMutation.mutateAsync(updateData);
      toast.success("Account updated successfully!", {
        description: "Your account settings have been saved.",
      });
    } catch (error) {
      console.error("Account update failed:", error);
      toast.error("Failed to update account", {
        description:
          "Please try again or contact support if the problem persists.",
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {BEAUTIFY_CONSTANTS.userAccountForm.map((field) => {
        const fieldProps = {
          ...field,
          options: Array.isArray(field.options) ? field.options : undefined,
          inputType: field.inputType === "array" ? "input" : field.inputType,
          icon: field.icon ? React.createElement(field.icon) : undefined,
        };
        return (
          <FormGenerator
            key={field.id}
            {...fieldProps}
            label={field.label}
            control={form.control}
            register={form.register}
            errors={form.formState.errors}
          />
        );
      })}
      {/* <LocalSwitcher className="w-[180px]" /> */}
      <div className="w-[180px]">
        <EnhancedLocaleSwitcher />
      </div>
      <Button
        className="semi-bold"
        type="submit"
        disabled={updateProfileMutation.isPending}
      >
        {updateProfileMutation.isPending ? "Updating..." : "Update account"}
      </Button>
    </form>
  );
}
