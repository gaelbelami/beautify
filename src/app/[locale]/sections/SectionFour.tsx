"use client";
import { ThemeColorToggle } from "@/components/theme-color-toggle";
import ThemeModeToggle from "@/components/theme-mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCounterStore } from "@/stores/counterStore";
import { Rocket, Settings, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

const setCount = () => useCounterStore.setState({ count: 1 });

export const SectionFour = () => {
  const t = useTranslations("SectionFour");
  const count = useCounterStore((state) => state.count);

  return (
    <div
      className="min-h-[calc(100vh-100px)] mx-auto max-w-6xl mt-24 px-4 relative group h-[600px]
        flex items-center"
    >
      {/* Background elements */}
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
          dark:from-blue-500/10 dark:to-transparent dark:border-neutral-800"
      >
        <CardContent className="grid lg:grid-cols-2 gap-12 p-12 h-full">
          {/* Text Content Section */}
          <div className="flex flex-col justify-center space-y-8 pr-8">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                <Sparkles className="w-4 h-4" />
                {t("headerLabel")}
              </span>
              <h2
                className="text-4xl font-bold tracking-tight bg-clip-text text-transparent
                  bg-[linear-gradient(45deg,hsl(var(--primary)),hsl(var(--primary)/0.7))]"
              >
                {t("title")}
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("description")}
              </p>

              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Rocket className="w-5 h-5 text-primary" />
                  <span className="flex-1">{t("features.themeSwitching")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-primary" />
                  <span className="flex-1">
                    {t("features.stateManagement")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <div
            className="flex flex-col items-center justify-center rounded-3xl p-8 bg-background border
              border-border/20 dark:bg-gradient-to-br dark:from-transparent
              dark:to-blue-900/10 dark:border-neutral-800
              shadow-[inset_0_4px_24px_0_rgba(0,0,0,0.05)]
              dark:shadow-[inset_0_4px_24px_0_rgba(0,0,0,0.2)]"
          >
            <div className="space-y-8 w-full max-w-sm">
              {/* Counter Section */}
              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-semibold">
                    {t("Counter.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("Counter.subtitle")}
                  </p>
                </div>
                <CounterDisplay count={count} />
              </div>

              {/* Theme Controls */}
              <div className="space-y-4 pt-8 border-t border-border/20">
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-semibold">{t("Theme.title")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("Theme.subtitle")}
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                  <ThemeModeToggle />
                  <ThemeColorToggle />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CounterDisplay = ({ count }: { count: number }) => {
  const t = useTranslations("SectionFour");
  const incrementAsync = useCounterStore((state) => state.incrementAsync);
  const decrement = useCounterStore((state) => state.decrement);

  useEffect(() => {
    setCount();
  }, []);

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex items-center gap-4 w-full">
        <Button
          onClick={decrement}
          variant="secondary"
          className="h-12 w-12 rounded-xl text-lg shadow-sm hover:scale-[1.02] transition-transform"
        >
          -
        </Button>
        <div className="flex-1 text-center">
          <span
            className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text
              text-transparent px-4 py-2 rounded-lg"
          >
            {count}
          </span>
        </div>
        <Button
          onClick={incrementAsync}
          variant="secondary"
          className="h-12 w-12 rounded-xl text-lg shadow-sm hover:scale-[1.02] transition-transform"
        >
          +
        </Button>
      </div>
      <p className="text-sm text-center text-muted-foreground">
        {t("Counter.persistenceText")}
      </p>
    </div>
  );
};
