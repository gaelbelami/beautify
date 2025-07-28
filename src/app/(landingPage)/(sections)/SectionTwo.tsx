import { AdvancedThemeToggle } from "@/components/improved-theme-toggle";
import { Card } from "@/components/ui/card";
import {
  Globe,
  Languages,
  Palette,
  Zap,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import React, { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatedGroup } from "../../../../components/motion-primitives/animated-group";
import { TextEffect } from "../../../../components/motion-primitives/text-effect";
import { EnhancedLocaleSwitcher } from "@/components/enhanced-toggles";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
  isHovered,
  onHover,
}: {
  icon: any;
  title: string;
  description: string;
  delay?: number;
  isHovered: boolean;
  onHover: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.3 },
      }}
      onHoverStart={onHover}
      className="group relative"
    >
      <Card
        className="p-6 h-full bg-gradient-to-br from-background/50 to-background/80
          backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all
          duration-300 hover:shadow-xl hover:shadow-primary/10"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.2 : 1,
            }}
            transition={{ duration: 0.5 }}
            className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors"
          >
            <Icon className="w-6 h-6 text-primary" />
          </motion.div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export const SectionTwo = () => {
  const t = useTranslations("sectionTwo");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: Globe,
      title: "Multi-Language Support",
      description:
        "Seamlessly switch between languages with our advanced internationalization system",
    },
    {
      icon: Palette,
      title: "Dynamic Theming",
      description:
        "22 beautiful color palettes with real-time theme switching and custom design tokens",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Optimized performance with Next.js 15, React 19, and modern build tools",
    },
    {
      icon: Sparkles,
      title: "Modern UI",
      description:
        "Beautiful components built with Radix UI and Tailwind CSS for the best user experience",
    },
  ];

  return (
    <div
      ref={ref}
      className="min-h-screen mx-auto max-w-7xl px-4 py-24 relative"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            background: [
              "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(var(--primary)/0.1), transparent)",
              "radial-gradient(ellipse 80% 50% at 30% 40%, rgba(var(--primary)/0.15), transparent)",
              "radial-gradient(ellipse 80% 50% at 70% 60%, rgba(var(--primary)/0.1), transparent)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        />
        <div
          className="absolute inset-0
            bg-[conic-gradient(from_45deg,rgba(var(--primary)/0.02),transparent,rgba(var(--primary)/0.02))]"
        />
      </div>

      <Card className="p-8 lg:p-12 backdrop-blur-sm bg-background/50 border-primary/10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-sm text-primary font-medium px-4 py-2
                rounded-full bg-primary/10 border border-primary/20"
            >
              <Sparkles className="w-4 h-4" />
              Modern Features
            </motion.div>

            <TextEffect
              per="word"
              preset="slide"
              className="text-4xl md:text-5xl font-bold leading-tight"
            >
              {t("title")}
            </TextEffect>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-muted-foreground leading-relaxed"
            >
              {t("description")}
            </motion.p>

            <AnimatedGroup
              preset="slide"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.1}
                  isHovered={hoveredCard === index}
                  onHover={() => setHoveredCard(index)}
                />
              ))}
            </AnimatedGroup>
          </div>

          {/* Right Content - Interactive Demo */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              {/* Floating elements */}
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full blur-sm"
              />
              <motion.div
                animate={{
                  y: [10, -10, 10],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute -bottom-4 -right-4 w-12 h-12 bg-secondary/20 rounded-full blur-sm"
              />

              <Card
                className="p-8 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm
                  border border-primary/20"
              >
                <div className="space-y-6">
                  <div className="flex gap-4 items-center">
                    <h2
                      className="text-4xl font-bold tracking-tight bg-clip-text text-transparent
                        bg-[linear-gradient(45deg,hsl(var(--primary)),hsl(var(--primary)/0.7))]"
                    >
                      {t("multiLanguageSupport")}
                    </h2>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:space-y-48 space-y-8"
                  >
                    <p className="text-lg font-medium text-muted-foreground leading-relaxed">
                      {t("breakLanguageBarriers")}
                    </p>

                    <div className="space-y-4 text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <Languages className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium">
                          {t("selectLanguage")}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <EnhancedLocaleSwitcher className="" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <Palette className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">
                          {t("customizeTheme")}
                        </span>
                      </div>

                      <div className="flex justify-center gap-4">
                        <AdvancedThemeToggle />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </Card>
    </div>
  );
};
