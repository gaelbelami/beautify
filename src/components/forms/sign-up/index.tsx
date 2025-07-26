"use client";
import { FormGenerator } from "../../global/form-generator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BEAUTIFY_CONSTANTS } from "@/constants";
import { useAuthSignUp } from "@/hooks/authentication";
import { useRegister } from "@/hooks/api/useAuth";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { Loader } from "@/components/global/loader";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { RegisterRequest } from "@/types/api";

const OtpInput = dynamic(
  () =>
    import("@/components/global/otp-input").then(
      (component) => component.default,
    ),
  { ssr: false },
);

const SignUpForm = () => {
  const translate = useTranslations("auth.signup");
  const { register, errors, getValues, handleSubmit } = useAuthSignUp();
  const router = useRouter();
  const registerMutation = useRegister();
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");

  const handleGenerateCode = async () => {
    // Simulate OTP generation API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setVerifying(true);
  };

  const onSubmit = async (data: { firstname: string; lastname: string; username: string; email: string; password: string }) => {
    if (!verifying) {
      await handleGenerateCode();
      return;
    }

    try {
      // Transform form data to match RegisterRequest interface
      const registerData: RegisterRequest = {
        name: `${data.firstname} ${data.lastname}`.trim(),
        username: data.email.split('@')[0], // Generate username from email
        email: data.email,
        password: data.password,
        confirmPassword: data.password, // Assuming password confirmation is handled in form validation
      };
      
      await registerMutation.mutateAsync(registerData);
      router.push("/dashboard");
    } catch (error) {
      console.error('Registration failed:', error);
      // Reset verification state on error
      setVerifying(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {verifying ? (
        <div className="flex justify-center mb-5">
          <OtpInput otp={code} setOtp={setCode} />
        </div>
      ) : (
        BEAUTIFY_CONSTANTS.signUpForm.map((field) => {
          const fieldProps = {
            ...field,
            options: Array.isArray(field.options) ? field.options : undefined,
            icon: field.icon ? <field.icon className="h-5 w-5" /> : undefined,
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
        })
      )}

      <Button
        type="submit"
        className="w-full h-12 text-base font-medium transition-all"
        disabled={registerMutation.isPending}
      >
        <Loader loading={registerMutation.isPending}>
          {verifying ? translate("verifying") : translate("submitButton")}
        </Loader>
      </Button>
      
      {registerMutation.error && (
        <div className="text-sm text-red-600 text-center">
          {registerMutation.error.message || 'Registration failed. Please try again.'}
        </div>
      )}

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
