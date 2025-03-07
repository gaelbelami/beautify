"use client";
import { useTranslations } from "next-intl";
import { FormGenerator } from "../../global/form-generator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Mail } from "lucide-react";
import { BEAUTIFY_CONSTANTS } from "@/constants";
import { useAuthForgotPassword } from "@/hooks/authentication";

const ForgotPasswordForm = () => {
  const translate = useTranslations("auth.forgotpassword");
  const { register, errors } = useAuthForgotPassword();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setEmailSent(true);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {BEAUTIFY_CONSTANTS.forgotPasswordForm.map((field) => (
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
        disabled={isLoading || emailSent}
      >
        {isLoading ? (
          <span className="animate-pulse">{translate("loading")}</span>
        ) : emailSent ? (
          translate("successMessage")
        ) : (
          translate("submitButton")
        )}
      </Button>

      {emailSent && (
        <p className="text-center text-sm text-muted-foreground">
          {translate("checkEmail")}
        </p>
      )}
    </form>
  );
};

export default ForgotPasswordForm;
