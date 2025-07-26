"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCounterStore } from "@/stores/counterStore";
import { useTranslations } from "next-intl";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TextEffect } from "../../../../components/motion-primitives/text-effect";
import { AnimatedGroup } from "../../../../components/motion-primitives/animated-group";
import {
  BarChart3,
  TrendingUp,
  Activity,
  Zap,
  Target,
  Gauge,
  Plus,
  Minus,
  RotateCcw,
  Sparkles,
} from "lucide-react";

const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  change: string;
  icon: any;
  color: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-border/50
        hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-xs text-green-600 dark:text-green-400 font-medium">
          {change}
        </span>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </motion.div>
  );
};

const InteractiveChart = ({ count }: { count: number }) => {
  const [data, setData] = useState([12, 19, 3, 5, 2, 3]);

  useEffect(() => {
    // Update chart data based on counter
    const newData = data.map((_, index) => {
      if (index === data.length - 1) {
        return Math.max(1, count);
      }
      return data[index];
    });
    setData(newData);
  }, [count]);

  const maxValue = Math.max(...data);

  return (
    <div className="bg-background/30 backdrop-blur-sm rounded-xl p-6 border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Live Analytics</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Real-time
        </div>
      </div>

      <div className="flex items-end gap-3 h-32">
        {data.map((value, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: `${(value / maxValue) * 100}%` }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex-1 rounded-t-lg ${
            index === data.length - 1
                ? "bg-gradient-to-t from-primary to-primary/60"
                : "bg-gradient-to-t from-muted to-muted/60"
            }`}
          />
        ))}
      </div>

      <div className="flex justify-between mt-4 text-xs text-muted-foreground">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Today"].map((day, index) => (
          <span
            key={index}
            className={index === 5 ? "text-primary font-medium" : ""}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
};

const CounterControls = ({
  count,
  increment,
  decrement,
  reset,
}: {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}) => {
  return (
    <div className="space-y-6">
      {/* Counter Display */}
      <motion.div
        className="text-center"
        key={count}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative inline-block">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(var(--primary)/0.3)",
                "0 0 40px rgba(var(--primary)/0.5)",
                "0 0 20px rgba(var(--primary)/0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl font-bold text-primary bg-primary/10 rounded-2xl px-8 py-4 border
              border-primary/20"
          >
            {count}
          </motion.div>

          {/* Floating sparkles */}
          <AnimatePresence>
            {count > 0 && (
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute -top-2 -right-2 text-yellow-500"
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Control Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={increment}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-700
            text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={decrement}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-700
            text-white rounded-lg font-medium transition-colors"
        >
          <Minus className="w-4 h-4" />
          Sub
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-muted hover:bg-muted/80
            text-foreground rounded-lg font-medium transition-colors border border-border/50"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </motion.button>
      </div>
    </div>
  );
};

export const SectionFour = () => {
  const t = useTranslations("SectionFour");
  const { count, increment, decrement } = useCounterStore();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const metrics = [
    {
      title: "Active Users",
      value: "2.4k",
      change: "+12%",
      icon: Activity,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Performance",
      value: "98.5%",
      change: "+2.1%",
      icon: Gauge,
      color:
        "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    },
    {
      title: "Efficiency",
      value: count.toString(),
      change: "+∞",
      icon: Zap,
      color:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
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
              "radial-gradient(ellipse 50% 30% at 20% 70%, rgba(var(--primary)/0.1), transparent)",
              "radial-gradient(ellipse 50% 30% at 80% 30%, rgba(var(--primary)/0.15), transparent)",
              "radial-gradient(ellipse 50% 30% at 50% 50%, rgba(var(--primary)/0.1), transparent)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        />
        <div
          className="absolute inset-0
            bg-[linear-gradient(45deg,rgba(var(--primary)/0.02),transparent,rgba(var(--secondary)/0.02))]"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Content Section */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-sm text-primary font-medium px-4 py-2
              rounded-full bg-primary/10 border border-primary/20"
          >
            <BarChart3 className="w-4 h-4" />
            Interactive Dashboard
          </motion.div>

          <TextEffect
            per="word"
            preset="slide"
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            Real-time data visualization that responds to your actions
          </TextEffect>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            Experience powerful state management with live analytics,
            interactive controls, and beautiful data visualization that updates
            in real-time.
          </motion.p>

          {/* Metrics Grid */}
          <AnimatedGroup preset="slide" className="grid grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                icon={metric.icon}
                color={metric.color}
              />
            ))}
          </AnimatedGroup>
        </div>

        {/* Interactive Demo Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          {/* Interactive Chart */}
          <InteractiveChart count={count} />

          {/* Counter Controls */}
          {/* <CounterControls 
            count={count}
            increment={increment}
            decrement={decrement}
            reset={reset}
          /> */}
        </motion.div>
      </div>
    </div>
  );
};
