import { useTranslations } from "next-intl";
import { FormGenerator } from "../../global/form-generator";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { KeyRound, Mail } from "lucide-react";
import { Input } from "../../ui/input";
import { Link } from "@/i18n/routing";
import { Label } from "../../ui/label";
import { BEAUTIFY_CONSTANTS } from "@/constants";
import { useAuthSignIn } from "@/hooks/authentication";

const SignInForm = () => {
  const translate = useTranslations("auth.signin");
  const { register, errors } = useAuthSignIn();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    login({ id: "1", name: "Demo User", email: credentials.email });
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {BEAUTIFY_CONSTANTS.signInForm.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          register={register}
          errors={errors}
        />
      ))}
      {/* <div className="space-y-4">
        <Label htmlFor="email" className="flex items-center gap-2 font-medium">
          <Mail className="w-5 h-5 text-primary" />
          {translate("emailLabel")}
        </Label>
        <Input
          id="email"
          type="email"
          placeholder={translate("emailPlaceholder")}
          className="h-12 text-base"
        />
      </div>

      <div className="space-y-4">
        <Label
          htmlFor="password"
          className="flex items-center gap-2 font-medium"
        >
          <KeyRound className="w-5 h-5 text-primary" />
          {translate("passwordLabel")}
        </Label>
        <Input
          id="password"
          type="password"
          placeholder={translate("passwordPlaceholder")}
          className="h-12 text-base"
        />
      </div>
*/}
      <Button
        type="submit"
        className="w-full h-12 text-base font-medium transition-all"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="animate-pulse">{translate("loading")}</span>
        ) : (
          translate("submitButton")
        )}
      </Button>

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
