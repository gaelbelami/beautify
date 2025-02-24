"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import {
  ArrowRightIcon,
  Languages,
  LockIcon,
  LogInIcon,
  MoreHorizontalIcon,
  Sun,
  Palette,
  ChevronDown,
  Mouse,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

export const Hero = () => {
  const t = useTranslations("Hero");
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(true);

  const features = [
    {
      icon: <Languages className="h-5 w-5" />,
      title: t("features.language.title"),
      description: t("features.language.description"),
    },
    {
      icon: <Palette className="h-5 w-5" />,
      title: t("features.theme.title"),
      description: t("features.theme.description"),
    },
    {
      icon: <Sun className="h-5 w-5" />,
      title: t("features.darkMode.title"),
      description: t("features.darkMode.description"),
    },
    {
      icon: <LogInIcon className="h-5 w-5" />,
      title: t("features.auth.title"),
      description: t("features.auth.description"),
    },
    {
      icon: <LockIcon className="h-5 w-5" />,
      title: t("features.security.title"),
      description: t("features.security.description"),
    },
    {
      icon: <MoreHorizontalIcon className="h-5 w-5" />,
      title: t("features.more.title"),
      description: t("features.more.description"),
    },
  ];

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="min-h-[calc(100vh-100px)] px-4 sm:px-6 lg:px-8 py-20 md:py-36 lg:py-44 relative">
      <Spotlight />
      {/* Background Glow */}
      <div
        className="absolute inset-0 -z-10 opacity-20
          [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"
      >
        <div
          className="absolute right-0 -top-[200px] w-[800px] h-[800px]
            bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_70%)]
            blur-3xl opacity-15 animate-pulse-slow"
        />
      </div>

      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-16">
          {/* Left Content */}
          <div className="flex-1 max-w-3xl text-center lg:text-left">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full
                text-sm mb-6"
            >
              <span>✨</span>
              <span>{t("versionBadge")}</span>
            </div>

            {/* Split Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span
                className="block md:inline-block md:mr-4 bg-gradient-to-r from-primary to-primary/80
                  bg-clip-text text-transparent"
              >
                {t("titlePart1")}
              </span>
              <span
                className="block md:inline-block md:mx-4 text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r
                  from-secondary to-primary bg-clip-text text-transparent"
              >
                {t("titlePart2")}
              </span>
              <span
                className="block md:inline-block md:ml-4 mt-2 md:mt-0 bg-gradient-to-r from-primary
                  to-secondary/80 bg-clip-text text-transparent"
              >
                {t("titlePart3")}
              </span>
            </h1>

            <p
              className="text-lg md:text-xl text-muted-foreground mt-6 leading-relaxed max-w-2xl mx-auto
                lg:mx-0"
            >
              {t("description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <Button size="lg" className="gap-2">
                {t("ctaPrimary")}
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>

          {/* Right Content - Interactive Card */}
          <div className="flex-1 w-full max-w-2xl relative">
            {/* Oval Glow Behind Card */}
            <div className="absolute -inset-8 -z-10">
              <div
                className="absolute inset-0
                  bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_70%)]
                  blur-2xl opacity-10"
              />
            </div>

            {/* Transparent Card */}
            <Card
              className="relative bg-background/70 backdrop-blur-xl border border-border/30 rounded-3xl
                p-6 shadow-2xl hover:shadow-primary/20 transition-shadow duration-300"
            >
              <div className="grid grid-cols-3 gap-3">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    onMouseEnter={() => {
                      setActiveFeature(index);
                      setIsPanelVisible(false);
                    }}
                    onMouseLeave={() => {
                      setActiveFeature(null);
                      setIsPanelVisible(true);
                    }}
                    className={`p-3 cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                        ? "bg-primary/10 border-primary/30 shadow-inner"
                        : "bg-background/70 border-border/20 hover:bg-background/90"
                    }`}
                  >
                    <div className="text-primary flex justify-center">
                      {feature.icon}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Animated Description Panel */}
              <div className="mt-6 pt-4 border-t border-border/20 h-[100px] overflow-hidden">
                <div className="relative h-full">
                  <div
                    className={`absolute inset-0 transition-opacity duration-300
                      ${isPanelVisible ? "opacity-100" : "opacity-0"}`}
                  >
                    <p
                      className="text-center text-muted-foreground/80 text-sm h-full flex items-center
                        justify-center"
                    >
                      {t("hoverPrompt")}
                    </p>
                  </div>

                  {activeFeature !== null && (
                    <div
                      className={`absolute inset-0 transition-opacity duration-300
                      ${activeFeature !== null ? "opacity-100" : "opacity-0"}`}
                    >
                      <h3 className="text-lg font-semibold text-primary">
                        {features[activeFeature].title}
                      </h3>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {features[activeFeature].description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Scroll indicator button */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollToNext}
          className="rounded-full h-12 w-12 bg-background/50 border border-border/50
            hover:border-border hover:bg-background/80 backdrop-blur-lg transition-all
            hover:scale-110 active:scale-95"
          aria-label="Scroll down"
        >
          <span className="border border-r-0 border-primary-foreground/10 px-2 rounded-lg text-sm">
            {t("scrollAria.partOne")}
          </span>
          <span>
            <Mouse className="h-6 w-6" />{" "}
            <ChevronDown className="h-6 w-6 animate-bounce" />{" "}
          </span>
          <span className="border border-l-0 border-primary-foreground/10 px-2 rounded-lg text-sm">
            {t("scrollAria.partTwo")}
          </span>
        </Button>
      </div>
    </section>
  );
};
