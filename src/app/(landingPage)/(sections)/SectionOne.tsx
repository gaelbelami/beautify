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
import { TextEffect } from "../../../../components/motion-primitives/text-effect";
import { AnimatedGroup } from "../../../../components/motion-primitives/animated-group";
import Image from "next/image";

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
    <section className="min-h-screen px-4 sm:px-6 lg:px-40 py-20 relative container">
      <div>
        <Spotlight />
      </div>

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

      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-12 xl:gap-16">
          <div className="max-w-3xl">
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                item: {
                  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                      duration: 1.2,
                      type: "spring",
                      bounce: 0.3,
                    },
                  },
                },
              }}
              className=""
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full
                  text-sm mb-6 text-left"
              >
                <span>✨</span>
                <span>{t("versionBadge")}</span>
              </div>
            </AnimatedGroup>
            <div className="text-center">
              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                      },
                    },
                  },
                  item: {
                    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: {
                        duration: 1.2,
                        type: "spring",
                        bounce: 0.3,
                      },
                    },
                  },
                }}
                className=""
              >
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
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
              </AnimatedGroup>

              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.3}
                as="p"
                className="mt-8 max-w-2xl text-pretty text-lg text-muted-foreground leading-relaxed mx-auto
                  lg:mx-0"
              >
                {t("description")}
              </TextEffect>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                item: {
                  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                      duration: 1.2,
                      type: "spring",
                      bounce: 0.3,
                    },
                  },
                },
              }}
              className="mt-12 flex justify-center flex-wrap gap-4"
            >
              <Button size="lg" className="gap-2">
                {t("ctaPrimary")}
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                {t("ctaSecondary")}
              </Button>
            </AnimatedGroup>
          </div>

          {/* <div className="flex-1 w-full max-w-md relative">
            <div className="absolute -inset-8 -z-10">
              <div
                className="absolute inset-0
                  bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_70%)]
                  blur-2xl opacity-10"
              />
            </div>

            <Card
              className="relative bg-background/70 backdrop-blur-xl border border-border/30 rounded-3xl
                p-6 shadow-2xl hover:shadow-primary/20 transition-shadow duration-300"
            >
              <div className="flex gap-6">
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
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-100">
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
          </div> */}
        </div>

        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.75,
                },
              },
            },
            item: {
              hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 1.2,
                  type: "spring",
                  bounce: 0.3,
                },
              },
            },
          }}
        >
          <div className="relative mt-28 md:40 px-2">
            <div
              aria-hidden
              className="absolute inset-0 z-10 bg-gradient-to-b from-transparent dark:via-black/90
                dark:to-black via-white/95 to-white"
            />
            <div
              className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border p-4 dark:shadow-lg
                bg-background"
            >
              <Image
                className="aspect-[15/8] hidden dark:block rounded-2xl"
                src="/boarding.jpeg"
                alt="app screen"
                width={2700}
                height={1440}
              />
              <Image
                className="aspect-[15/8] block dark:hidden rounded-2xl border"
                src="/boarding-light.jpeg"
                alt="app screen"
                width={2700}
                height={1440}
              />
            </div>
          </div>
          {/* Scroll indicator button */}
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20">
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
        </AnimatedGroup>
      </div>
    </section>
  );
};
