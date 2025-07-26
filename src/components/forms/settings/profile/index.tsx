"use client";
import React, { useEffect } from "react";
import { FormGenerator } from "@/components/global/form-generator";
import { Button } from "@/components/ui/button";
import { BEAUTIFY_CONSTANTS } from "@/constants";
import { useCurrentUser, useUpdateProfile } from "@/hooks/api/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileFormSchema } from "./schema";
import type { User } from "@/types/api";
import { z } from "zod";
import { toast } from "sonner";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const ProfileForm = () => {
  const { data: currentUser } = useCurrentUser();
  const updateProfileMutation = useUpdateProfile();
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onBlur",
  });
  
  // Populate form with current user data
  useEffect(() => {
    if (currentUser) {
      const nameParts = currentUser.name?.split(' ') || ['', ''];
      setValue('firstname', nameParts[0] || '');
      setValue('lastname', nameParts.slice(1).join(' ') || '');
      setValue('username', currentUser.username || '');
      setValue('email', currentUser.email || '');
      setValue('bio', currentUser.bio || '');
    }
  }, [currentUser, setValue]);
  
  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const updateData: Partial<User> = {
        name: `${data.firstname} ${data.lastname}`.trim(),
        username: data.username,
        email: data.email,
        bio: data.bio,
      };
      
      await updateProfileMutation.mutateAsync(updateData);
      toast.success('Profile updated successfully!', {
        description: 'Your profile information has been saved.',
      });
    } catch (error) {
      console.error('Profile update failed:', error);
      toast.error('Failed to update profile', {
        description: 'Please try again or contact support if the problem persists.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {BEAUTIFY_CONSTANTS.userProfileForm.map((field) => {
        const fieldProps = {
          ...field,
          options: Array.isArray(field.options) ? field.options : undefined,
          type: field.type === 'url' ? 'text' : field.type,
          inputType: field.inputType === 'array' ? 'input' : field.inputType,
          icon: field.icon ? React.createElement(field.icon) : undefined,
        };
        return (
          <FormGenerator
            key={field.id}
            {...fieldProps}
            label={field.label}
            register={register}
            errors={errors}
          />
        );
      })}
      <Button 
        className="semi-bold" 
        type="submit"
        disabled={updateProfileMutation.isPending}
      >
        {updateProfileMutation.isPending ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
  );
};
