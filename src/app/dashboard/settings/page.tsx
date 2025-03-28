import { Separator } from "@/components/ui/separator";
import { ProfileFormPage } from "./profile-form";

// settings/profile/page.tsx
export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold tracking-tight">Profile</h3>
        <p className="text-muted-foreground text-base">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator className="bg-border/50" />
      <ProfileFormPage />
    </div>
  );
}
