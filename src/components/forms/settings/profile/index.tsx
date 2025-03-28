"use client";
import { FormGenerator } from "@/components/global/form-generator";
import { Button } from "@/components/ui/button";
import { BEAUTIFY_CONSTANTS } from "@/constants";
import { useProfileForm } from "@/hooks/settings";

export const ProfileForm = () => {
  const { register, errors } = useProfileForm();
  const handleSubmit = (e: React.FormEvent) => {
    console.log("Pressed On");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {BEAUTIFY_CONSTANTS.userProfileForm.map((field) => (
        <FormGenerator
          key={field.id}
          {...field}
          label={field.label}
          register={register}
          errors={errors}
        />
      ))}
      <Button className="semi-bold" type="submit">
        Update Profile
      </Button>
    </form>
  );
};
