"use client";

import { useRef, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../ui/AnimatedSection";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  CommandLineIcon,
  SparklesIcon,
  RocketLaunchIcon,
  TrophyIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

export default function About() {
  const containerRef = useRef(null);

  const stats = useMemo(
    () => [
      { label: "Years Experience", value: 1, icon: TrophyIcon, suffix: "+" },
      {
        label: "Successfully Delivered Projects",
        value: 10,
        icon: RocketLaunchIcon,
        suffix: "+",
      },
      {
        label: "Satisfied Clients",
        value: 8,
        icon: UserGroupIcon,
        suffix: "+",
      },
      {
        label: "Technologies Mastered",
        value: 15,
        icon: SparklesIcon,
        suffix: "+",
      },
    ],
    [],
  );

  const experiences = useMemo(
    () => [
      {
        year: "2025 - 2026",
        title: " Full Stack Developer",
        company: "Growbiz365",
        description:
          "Contributing to the development of scalable and production-ready enterprise applications with modern technologies and best coding practices.",
      },
      {
        year: "2024 - 2025",
        title: "DIT Instructor",
        company: "The Coventry Institute",
        description:
          "Delivered structured lessons on computer fundamentals and programming concepts, helping students build a strong technical foundation.",
      },
      {
        year: "2023 - 2024",
        title: "Frontend Developer",
        company: "Growbiz365",
        description:
          "Designed and developed responsive, interactive, and user-centric interfaces with a focus on performance and usability.",
      },
    ],
    [],
  );

  const education = useMemo(
    () => [
      {
        year: "2021 - 2025",
        title: "BS in Computer Science",
        company: "University of Peshawar",
        description:
          "Focused on software engineering, data structures, and modern development practices.",
      },
      {
        year: "2019 - 2021",
        title: "Intermediate in Computer Science",
        company: "Jamal International College",
        description:
          "Built strong foundations in computer science fundamentals and programming using C++.",
      },
      {
        year: "2018",
        title: "Secondary School Certificate",
        company: "Iqra Eduction Academy",
        description:
          "Completed with a strong academic record in science subjects.",
      },
    ],
    [],
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-purple-500/5 to-pink-500/5" />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 bg-primary-500/10 rounded-full blur-2xl"
        />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-5">
        <SectionHeading
          title="About Me"
          subtitle="Passionate Full Stack Developer focused on delivering clean, scalable, and user-centric digital solutions"
        />

        {/* Top Content: Image & Intro - Stack on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-10 lg:mb-16">
          <AnimatedSection direction="right">
            <div className="relative max-w-[280px] mx-auto lg:mx-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 opacity-50 blur-xl"
              />
              <div className="relative aspect-square rounded-3xl overflow-hidden p-1 bg-gradient-to-br from-primary-400 to-primary-600">
                <div className="w-full h-full rounded-3xl overflow-hidden relative bg-gray-900">
                  <Image
                    src="/images/Noman.png"
                    alt="Muhammad Noman"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                I build scalable and modern digital solutions that turn ideas
                into reality
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                With <span className="font-bold text-primary-600">1+ year</span>{" "}
                of experience, I am a passionate Full Stack Developer with
                hands-on experience in building responsive, scalable, and
                user-friendly web applications. I specialize in modern
                technologies like the MERN stack, focusing on clean code,
                performance, and real-world problem solving. I enjoy solving
                real-world problems through technology and continuously learning
                to improve my skills as a developer.
              </p>

              {/* Stats Grid - Responsive */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4">
                {stats.map((stat, index) => {
                  const [ref, inView] = useInView({ triggerOnce: true });
                  return (
                    <div
                      key={stat.label}
                      ref={ref}
                      className="text-center p-3 sm:p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                      <div className="text-xl sm:text-2xl font-bold text-primary-600">
                        {inView && <CountUp end={stat.value} duration={2} />}
                        {stat.suffix}
                      </div>
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 font-bold mt-1">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom Content: Two Column Timeline - Stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-10">
          {/* LEFT COLUMN: EDUCATION */}
          <AnimatedSection direction="up">
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary-600/10">
                  <AcademicCapIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold">Education</h4>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="relative pl-6 sm:pl-8 border-l-2 border-primary-600/20 group hover:border-primary-600 transition-colors">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-2 border-primary-600 group-hover:bg-primary-600 transition-colors" />
                    <div className="text-xs sm:text-sm font-bold text-primary-600 mb-1">
                      {edu.year}
                    </div>
                    <div className="text-base sm:text-xl font-bold dark:text-white">
                      {edu.title}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mb-2">
                      {edu.company}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* RIGHT COLUMN: EXPERIENCE */}
          <AnimatedSection direction="up">
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-purple-600/10">
                  <BriefcaseIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold">
                  Professional Experience
                </h4>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {experiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className="relative pl-6 sm:pl-8 border-l-2 border-purple-600/20 group hover:border-purple-600 transition-colors">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-2 border-purple-600 group-hover:bg-purple-600 transition-colors" />
                    <div className="text-xs sm:text-sm font-bold text-purple-600 mb-1">
                      {exp.year}
                    </div>
                    <div className="text-base sm:text-xl font-bold dark:text-white">
                      {exp.title}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mb-2">
                      {exp.company}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
