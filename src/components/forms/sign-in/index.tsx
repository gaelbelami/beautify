import { useTranslations } from "next-intl";
import { FormGenerator } from "../../global/form-generator";
import { Button } from "@/components/ui/button";
import { BEAUTIFY_CONSTANTS } from "@/constants";
import { useAuthSignIn } from "@/hooks/authentication";
import { useLogin } from "@/hooks/api/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { LoginRequest } from "@/types/api";

const SignInForm = () => {
  const translate = useTranslations("auth.signin");
  const { register, errors, handleSubmit, getValues } = useAuthSignIn();
  const router = useRouter();
  const loginMutation = useLogin();

  const onSubmit = async (data: LoginRequest) => {
    try {
      await loginMutation.mutateAsync(data);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {BEAUTIFY_CONSTANTS.signInForm.map((field) => {
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
      })}

      <Button
        type="submit"
        className="w-full h-12 text-base font-medium transition-all"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <span className="animate-pulse">{translate("loading")}</span>
        ) : (
          translate("submitButton")
        )}
      </Button>

      {loginMutation.error && (
        <div className="text-sm text-red-600 text-center">
          {loginMutation.error.message || "Login failed. Please try again."}
        </div>
      )}

      <div className="text-center text-sm text-muted-foreground">
        <Link
          href="/forgot-password"
          className="hover:text-primary transition-colors"
        >
          {translate("forgotPassword")}
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;
