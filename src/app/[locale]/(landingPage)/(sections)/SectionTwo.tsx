"use client";

import { ThemeColorToggle } from "@/components/theme-color-toggle";
import ThemeModeToggle from "@/components/theme-mode-toggle";
import { Card } from "@/components/ui/card";
import { Globe, Languages } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import LocaleSwitcher from "@/components/locale-switcher";
import { useTranslations } from "next-intl";

export const SectionTwo = () => {
  const t = useTranslations("sectionTwo");
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
          dark:from-fuchsia-500/10 dark:to-transparent dark:border-neutral-800"
      >
        <div className="grid lg:grid-cols-2 gap-12 p-12 h-full">
          {/* Content Section */}
          <div className="flex flex-col justify-center space-y-8 pr-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                <Globe className="w-4 h-4" />
                {t("multiLanguageSupport")}
              </span>
              <h2
                className="text-4xl font-bold tracking-tight bg-clip-text text-transparent
                  bg-[linear-gradient(45deg,hsl(var(--primary)),hsl(var(--primary)/0.7))]"
              >
                {t("globalExperienceLocalized")}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("breakLanguageBarriers")}
              </p>

              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Languages className="w-5 h-5 text-primary" />
                  <span className="flex-1">{t("breakLanguageBarriers")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary" />
                  <span className="flex-1">
                    {t("automaticLocaleDetection")}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Interactive Section */}
          <div
            className="flex flex-col items-center justify-center rounded-3xl p-8 bg-background border
              border-border/20 dark:border-neutral-800
              shadow-[inset_0_4px_24px_0_rgba(0,0,0,0.05)]
              dark:shadow-[inset_0_4px_24px_0_rgba(0,0,0,0.2)]"
          >
            <motion.div
              className="space-y-8 w-full max-w-sm text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center bg-primary/10 p-4 rounded-full">
                  <Languages className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">
                  {t("languagePreferences")}
                </h3>
                <p className="text-muted-foreground">
                  {t("selectPreferredLanguage")}
                </p>
              </div>

              <div className="space-y-6">
                <LocaleSwitcher className="w-full" />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      {t("combinedWith")}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <ThemeModeToggle />
                  <ThemeColorToggle />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Card>
    </div>
  );
};
