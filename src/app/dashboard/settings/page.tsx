import { Separator } from "@/components/ui/separator";
import { ProfileFormPage } from "./profile-form";
import { useTranslations } from "next-intl";

export default function SettingsProfilePage() {
  const t = useTranslations("settings.pages.profile");
  
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-medium">{t("title")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("description")}
        </p>
      </div>
      <Separator />
      <ProfileFormPage />
    </div>
  );
}
