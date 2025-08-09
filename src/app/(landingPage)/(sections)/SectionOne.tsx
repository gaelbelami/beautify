"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import {
  Languages,
  LockIcon,
  LogInIcon,
  MoreHorizontalIcon,
  Sun,
  Palette,
  Terminal,
  ArrowRight,
  PlayIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { TextEffect } from "../../../../components/motion-primitives/text-effect";
import { AnimatedGroup } from "../../../../components/motion-primitives/animated-group";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { VideoPlayer } from "@/components/global/video-player";

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
    <section className="min-h-screen py-20 relative overflow-hidden">
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
            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mt-16"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/features">
                  <Button size="lg" className="group">
                    <Terminal className="w-4 h-4 mr-2" />
                    {t("ctaPrimary")}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Modal>
                  <ModalTrigger className="group/modal-btn">
                    <Button size="lg" variant="outline" className="group" asChild>
                      <span>
                        <PlayIcon className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        {t("ctaSecondary")}
                      </span>
                    </Button>
                  </ModalTrigger>
                  <ModalBody>
                    <ModalContent>
                      <VideoPlayer videoSrc={"/leaf.mp4"} />
                    </ModalContent>
                  </ModalBody>
                </Modal>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 w-full max-w-3xl relative">
            <div className="absolute -inset-8 -z-10">
              <div
                className="absolute inset-0
                  bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_70%)]
                  blur-2xl opacity-10"
              />
            </div>

            <Card
              className="relative bg-background/70 backdrop-blur-xl border-2 border-border/30 rounded-3xl
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
          </div>
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
          <div></div>
          {/* Scroll indicator button */}
          {/* <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20">
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
          </div> */}
        </AnimatedGroup>
        {/* CTA Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center bottom-0"
        >
          <div className="flex flex-col sm:flex-row gap-20 justify-center items-center">
            <Link href="/features">
              <div className="group flex items-center text-sm">
                <Terminal className="w-4 h-4 mr-2" />
                Explore All Features
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <Link href="/docs">
              <div className="group flex items-center text-sm">
                View Documentation
              </div>
            </Link>
          </div>
        </motion.div> */}
      </div>

      {/* Glowing Half-Arc Background Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -bottom-[300px] left-1/2 -translate-x-1/2 w-[1200px] h-[400px]
            bg-gradient-to-t from-primary/40 via-primary/20 to-transparent rounded-full
            blur-3xl"
        />
        <div
          className="absolute -bottom-[250px] left-1/2 -translate-x-1/2 w-[1000px] h-[350px]
            bg-gradient-to-t from-primary/30 via-primary/15 to-transparent rounded-full
            blur-2xl"
        />
        <div
          className="absolute -bottom-[200px] left-1/2 -translate-x-1/2 w-[800px] h-[300px]
            bg-gradient-to-t from-primary/20 via-primary/10 to-transparent rounded-full
            blur-xl"
        />
      </div>
    </section>
  );
};
