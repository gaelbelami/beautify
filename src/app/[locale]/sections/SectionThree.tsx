"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/stores/authStore";
import { Lock, Shield, User, UserCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export const SectionThree = () => {
  const t = useTranslations("SectionThree");
  const { user, isAuthenticated, login, logout } = useAuthStore();

  return (
    <div
      className="min-h-[calc(100vh-100px)] mx-auto max-w-6xl px-4 mt-24 relative group h-[600px]
        flex items-center"
    >
      {/* Background effects */}
      <div
        className="absolute inset-0 -z-10 opacity-20
          [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"
      >
        <div
          className="absolute inset-0
            bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(var(--primary)/0.15),transparent)]"
        />
        <div
          className="absolute inset-0
            bg-[linear-gradient(45deg,rgba(var(--primary)/0.05),rgba(var(--secondary)/0.05))]"
        />
      </div>

      <Card
        className="rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-300 w-full
          bg-background/80 backdrop-blur-xl border border-border/30 dark:bg-gradient-to-br
          dark:from-indigo-500/10 dark:to-transparent dark:border-neutral-800"
      >
        <div className="grid lg:grid-cols-2 gap-12 p-12 h-full">
          {/* Auth Content Section */}
          <div className="flex flex-col justify-center space-y-8 pr-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                <Shield className="w-4 h-4" />
                {t("secureAuth")}
              </span>
              <h2
                className="text-4xl font-bold tracking-tight bg-clip-text text-transparent
                  bg-[linear-gradient(45deg,hsl(var(--primary)),hsl(var(--primary)/0.7))]"
              >
                {isAuthenticated ? t("welcomeBack") : t("secureUserAccess")}
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {isAuthenticated
                  ? t("descriptionAuthenticated")
                  : t("descriptionUnauthenticated")}
              </p>

              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-primary" />
                  <span className="flex-1">
                    {t("features.encryptedSessions")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-primary" />
                  <span className="flex-1">{t("features.roleAccess")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Auth Interactive Section */}
          <div
            className="flex flex-col items-center justify-center rounded-3xl p-8 bg-background border
              border-border/20 dark:border-neutral-800
              shadow-[inset_0_4px_24px_0_rgba(0,0,0,0.05)]
              dark:shadow-[inset_0_4px_24px_0_rgba(0,0,0,0.2)]"
          >
            {isAuthenticated ? (
              <div className="space-y-8 w-full max-w-sm text-center">
                <div className="space-y-4">
                  <User className="w-16 h-16 mx-auto text-primary p-3 bg-primary/10 rounded-full" />
                  <h3 className="text-2xl font-semibold">{user?.name}</h3>
                  <p className="text-muted-foreground">{t("activeSession")}</p>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={logout}
                    className="w-full py-6 text-lg transition-all hover:scale-[1.02]"
                    variant="destructive"
                  >
                    {t("logoutSession")}
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    {t("sessionExpires")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-8 w-full max-w-sm">
                <div className="space-y-4 text-center">
                  <div className="inline-flex items-center justify-center bg-primary/10 p-4 rounded-full">
                    <Lock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">
                    {t("signInToContinue")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("chooseAuthMethod")}
                  </p>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={() => login({ id: "1", name: "John Doe" })}
                    className="w-full py-6 text-lg transition-all hover:scale-[1.02]"
                  >
                    {t("continueSecureId")}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        {t("orUseDemo")}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-center text-muted-foreground">
                    <p>{t("demoAccount")}</p>
                    <p className="font-mono bg-muted/50 p-2 rounded">
                      {t("demoUser")}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
