import { AccountForm } from "@/components/forms/settings/account";
import { Separator } from "@/components/ui/separator";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
}
