"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Header } from "../(landingPage)/(sections)/Header";
import { SectionTwo } from "../(landingPage)/(sections)/SectionTwo";
import { SectionThree } from "../(landingPage)/(sections)/SectionThree";
import { SectionFour } from "../(landingPage)/(sections)/SectionFour";
import { SectionFive } from "../(landingPage)/(sections)/SectionFive";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FeaturesPage() {
  // Get the scroll progress using framer-motion's `useScroll` hook
  const { scrollYProgress } = useScroll();

  // Animate the progress bar's width based on scroll progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div id="features-page">
      <main className="w-full max-w-[100vw] overflow-x-hidden px-4 md:px-8">
        {/* Header */}
        <Header />

        {/* Back to Home Button */}
        <div className="container mx-auto py-6">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2 mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Features Hero Section */}
        <section className="container mx-auto py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60
                bg-clip-text text-transparent"
            >
              Powerful Features
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover all the amazing capabilities that make our platform the
              perfect choice for your needs.
            </p>
          </motion.div>
        </section>

        {/* Feature Sections */}
        <section id="advanced-features" className="py-8">
          <SectionTwo />
        </section>

        <section id="integrations" className="py-8">
          <SectionThree />
        </section>

        <section id="analytics" className="py-8">
          <SectionFour />
        </section>

        <section id="testimonials" className="py-8">
          <SectionFive />
        </section>

        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
          style={{ scaleX }}
        />
      </main>
    </div>
  );
}
