import { Separator } from "@/components/ui/separator";
import { ProfileFormPage } from "./profile-form";
import { useTranslations } from "next-intl";

export default function SettingsProfilePage() {
  const t = useTranslations("settings.pages.profile");
  
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold tracking-tight">{t("title")}</h3>
        <p className="text-muted-foreground text-base">
          {t("description")}
        </p>
      </div>
      <Separator className="bg-border/50" />
      <ProfileFormPage />
    </div>
  );
}
