import { AccountForm } from "@/components/forms/settings/account";
import { Separator } from "@/components/ui/separator";

export default function SettingsNotificationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
      <Separator />
      {/* <AccountForm /> */}
    </div>
  );
}
