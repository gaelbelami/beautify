"use client";
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Header } from "./(sections)/Header";
import { Hero } from "./(sections)/SectionOne";

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
      <main className="w-full max-w-[100vw] overflow-x-hidden">
        {/* Hero Section */}
        <section id="section-1">
          <Header />
          <Hero />
        </section>

        {/* Features Overview Section */}
        {/* <section id="section-2">
        
        </section> */}
        {/* <Footer /> */}

        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
          style={{ scaleX }}
        />
      </main>

      {/* Footer */}
    </div>
  );
}

export default HomePage;
