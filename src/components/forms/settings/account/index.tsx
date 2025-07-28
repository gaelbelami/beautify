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
import { ProfilePictureUpload } from "./profile-picture-upload";
import type { User } from "@/types/api";
import { z } from "zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
  const { data: currentUser } = useCurrentUser();
  const updateProfileMutation = useUpdateProfile();
  const t = useTranslations("");
  const [profilePicture, setProfilePicture] = React.useState<File | null>(null);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    mode: "onBlur",
  });

  // Populate form with current user data
  useEffect(() => {
    if (currentUser) {
      form.setValue("name", currentUser.name || "");
      form.setValue("email", currentUser.email || "");
      form.setValue("phone", currentUser.phone || "");
      if (currentUser.dateOfBirth) {
        form.setValue("dob", new Date(currentUser.dateOfBirth));
      }
      form.setValue("timezone", currentUser.timezone || "");
      form.setValue("language", currentUser.language || "en");
      // Phase 2 fields
      form.setValue("country", currentUser.address?.country || "");
      form.setValue("jobTitle", currentUser.company?.jobTitle || "");
      form.setValue("company", currentUser.company?.name || "");
    }
  }, [currentUser, form]);

  const onSubmit = async (data: AccountFormValues) => {
    try {
      const updateData: Partial<User> = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.dob.toISOString(),
        timezone: data.timezone,
        language: data.language,
        // Phase 2 fields
        address: {
          ...currentUser?.address,
          country: data.country || "",
        },
        company: {
          ...currentUser?.company,
          name: data.company || "",
          jobTitle: data.jobTitle || "",
        },
      };

      // Handle profile picture upload if present
      if (profilePicture) {
        // In a real app, you would upload the file to a storage service
        // and get back a URL to store in the user's avatar field
        const formData = new FormData();
        formData.append('profilePicture', profilePicture);
        // updateData.avatar = await uploadProfilePicture(formData);
        console.log('Profile picture would be uploaded:', profilePicture.name);
      }

      await updateProfileMutation.mutateAsync(updateData);
      toast.success(t("account.toast.success.title"), {
        description: t("account.toast.success.description"),
      });
    } catch (error) {
      console.error("Account update failed:", error);
      toast.error(t("account.toast.error.title"), {
        description: t("account.toast.error.description"),
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Phase 2: Profile Picture Upload */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{t("account.profilePicture.title")}</h3>
        <p className="text-sm text-muted-foreground">{t("account.profilePicture.description")}</p>
        <ProfilePictureUpload
          currentAvatar={currentUser?.avatar}
          onImageChange={setProfilePicture}
          disabled={updateProfileMutation.isPending}
        />
      </div>

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
          {updateProfileMutation.isPending ? t("account.button.updating") : t("account.button.update")}
        </Button>
      </form>
    </div>
  );
}
