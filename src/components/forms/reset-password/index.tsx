"use client";
import { useTranslations } from "next-intl";
import { FormGenerator } from "../../global/form-generator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { KeyRound } from "lucide-react";
import { BEAUTIFY_CONSTANTS } from "@/constants";
import { useAuthResetPassword } from "@/hooks/authentication";

const ResetPasswordForm = () => {
  const translate = useTranslations("auth.resetpassword");
  const { register, errors } = useAuthResetPassword();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSuccess(true);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {BEAUTIFY_CONSTANTS.resetPasswordForm.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          register={register}
          errors={errors}
        />
      ))}

      <Button
        type="submit"
        className="w-full h-12 text-base font-medium transition-all"
        disabled={isLoading || success}
      >
        {isLoading ? (
          <span className="animate-pulse">{translate("loading")}</span>
        ) : success ? (
          translate("successMessage")
        ) : (
          translate("submitButton")
        )}
      </Button>

      {success && (
        <p className="text-center text-sm text-muted-foreground">
          {translate("successDescription")}
        </p>
      )}
    </form>
  );
};

export default ResetPasswordForm;
