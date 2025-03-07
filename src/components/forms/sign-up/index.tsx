"use client";
import { FormGenerator } from "../../global/form-generator";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import { BEAUTIFY_CONSTANTS } from "@/constants";
import { useAuthSignUp } from "@/hooks/authentication";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { Loader } from "@/components/global/loader";

const OtpInput = dynamic(
  () =>
    import("@/components/global/otp-input").then(
      (component) => component.default,
    ),
  { ssr: false },
);

const SignUpForm = () => {
  const translate = useTranslations("auth.signup");
  const { register, errors, getValues } = useAuthSignUp();
  const { signup } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");

  const handleGenerateCode = async () => {
    setIsLoading(true);
    // Simulate OTP generation API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setVerifying(true);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!verifying) {
      await handleGenerateCode();
      return;
    }

    // Simulate OTP verification and signup
    await new Promise((resolve) => setTimeout(resolve, 1000));
    signup({
      id: "1",
      name: getValues("firstname"),
      email: getValues("email"),
    });
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {verifying ? (
        <div className="flex justify-center mb-5">
          <OtpInput otp={code} setOtp={setCode} />
        </div>
      ) : (
        BEAUTIFY_CONSTANTS.signUpForm.map((field) => (
          <FormGenerator
            {...field}
            key={field.id}
            register={register}
            errors={errors}
          />
        ))
      )}

      <Button
        type="submit"
        className="w-full h-12 text-base font-medium transition-all"
        disabled={isLoading}
      >
        <Loader loading={isLoading}>
          {verifying ? translate("verifying") : translate("submitButton")}
        </Loader>
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        {translate("loginPrompt")}{" "}
        <Link
          href="/login"
          className="hover:text-primary transition-colors font-medium"
        >
          {translate("loginLink")}
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
