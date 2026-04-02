"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Button from "../ui/Button";
import CVButton from "../CVButton";
import { ArrowDownIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

export default function Hero() {
  const [particles, setParticles] = useState([]);
  const heroRef = useRef(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const floatingParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 3,
    }));
    setParticles(floatingParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  const scrollToNext = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      {/* Background gradients - reduced size on mobile */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-purple-500/20 to-pink-500/20 dark:from-primary-500/10 dark:via-purple-500/10 dark:to-pink-500/10" />

        {/* Smaller background orbs on mobile */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 bg-primary-500/25 rounded-full blur-2xl"
        />

        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 bg-purple-500/25 rounded-full blur-2xl"
        />
      </div>

      {/* Grid background - lighter on mobile */}
      <div className="absolute inset-0 -z-5 opacity-10 sm:opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary-500/30 dark:bg-primary-400/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{ y: [0, -25, 0], x: [0, 15, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Mouse follow effect - hidden on mobile for performance */}
      <motion.div
        className="hidden sm:block absolute w-80 h-80 rounded-full pointer-events-none -z-5"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)",
        }}
      />

      {/* Main content */}
      <div className="max-w-7xl mx-auto w-full text-center relative z-10">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
          className="relative mb-6 sm:mb-8 inline-block">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600"
            style={{ padding: "3px" }}
          />

          {/* Responsive image size */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden">
            <Image
              src="/images/nomi.png"
              alt="Muhammad Noman"
              fill
              className="object-cover"
              priority
            />
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-primary-600 to-pink-600 flex items-center justify-center shadow-lg">
            <SparklesIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </motion.div>
        </motion.div>

        {/* Name - Responsive typography */}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-2"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{
            background:
              "linear-gradient(135deg, #3B82F6, #A855F7, #EC4899, #3B82F6)",
            backgroundSize: "300% 300%",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}>
          Muhammad Noman
        </motion.h1>

        {/* Type Animation - Responsive text size */}
        <div className="text-base sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6 px-4">
          <TypeAnimation
            sequence={[
              "Full Stack Developer",
              2000,
              "MERN Stack Developer",
              2000,
              "Problem Solver",
              2000,
              "UI/UX Expert",
              2000,
              "Tech Enthusiast",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
            className="bg-gradient-to-r from-primary-600 to-pink-600 bg-clip-text text-transparent font-bold"
          />
        </div>

        {/* Description - Responsive */}
        <p className="max-w-xl sm:max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg mb-8 sm:mb-10 px-4">
          I craft beautiful, responsive, and performant web applications
        </p>

        {/* CTA Buttons - Stack on mobile, row on desktop */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
          <Button size="md" className="w-full sm:w-auto min-h-[48px]">
            <Link href="#projects">View My Work</Link>
          </Button>
          <Button
            size="md"
            variant="outline"
            className="w-full sm:w-auto min-h-[48px]">
            <a href="#contact">Contact Me</a>
          </Button>
          <CVButton variant="split" />
        </div>

        {/* Scroll indicator - larger touch target */}
        {/* <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}>
          <button
            onClick={scrollToNext}
            className="p-3 sm:p-4 rounded-full bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Scroll down">
            <ArrowDownIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </motion.div> */}
      </div>
    </section>
  );
}
