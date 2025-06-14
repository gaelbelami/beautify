"use client";
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Header } from "./(sections)/Header";
import { Hero } from "./(sections)/SectionOne";
import { SectionFour } from "./(sections)/SectionFour";
import { SectionThree } from "./(sections)/SectionThree";
import { SectionTwo } from "./(sections)/SectionTwo";
import { SectionFive } from "./(sections)/SectionFive";

function HomePage() {
  // Get the scroll progress using framer-motion's `useScroll` hook
  const { scrollYProgress } = useScroll();

  // Animate the progress bar's width based on scroll progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div id="home-page">
      <main className="w-full max-w-[100vw] overflow-x-hidden px-4 md:px-8">
        {/* Scrollable container with snap scroll */}
        <section id="section-1" className="items-center justify-center">
          <Header />
          <Hero />
        </section>
        <section id="section-2">
          <SectionTwo />
        </section>
        <section id="section-3">
          <SectionThree />
        </section>
        <section id="section-4">
          <SectionFour />
        </section>
        <section id="section-5">
          <SectionFive />
        </section>
        <motion.div className="progress" style={{ scaleX }} />
      </main>

      {/* Progress bar */}
    </div>
  );
}

export default HomePage;
