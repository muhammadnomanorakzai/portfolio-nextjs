"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../ui/AnimatedSection";
import { VscCode } from "react-icons/vsc";
import {
  SiReact,
  SiPostman,
  SiVercel,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiTensorflow,
  SiOpenai,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiTypescript,
  SiJavascript,
  SiFigma,
  SiSupabase,
  SiFirebase,
  SiShadcnui,
  SiAntdesign,
  SiMui,
  SiEjs,
  SiBootstrap,
  SiExpress,
  SiFirebase as SiFirebaseAlt,
} from "react-icons/si";

export default function Skills() {
  // Memoized data prevents unnecessary re-renders
  const skillCategories = useMemo(
    () => [
      {
        title: "Frontend Development",
        description: "Building responsive, high-performance user interfaces",
        skills: [
          { name: "React.js", icon: SiReact, level: 90, color: "#61DAFB" },
          { name: "Next.js", icon: SiNextdotjs, level: 80, color: "#000000" },
          {
            name: "TypeScript",
            icon: SiTypescript,
            level: 80,
            color: "#3178C6",
          },
          {
            name: "JavaScript",
            icon: SiJavascript,
            level: 95,
            color: "#F7DF1E",
          },
          {
            name: "Tailwind CSS",
            icon: SiTailwindcss,
            level: 85,
            color: "#06B6D4",
          },
          {
            name: "Bootstrap",
            icon: SiBootstrap,
            level: 90,
            color: "#7952B3",
          },
          {
            name: "Material UI",
            icon: SiMui,
            level: 80,
            color: "#007FFF",
          },
          {
            name: "Ant Design",
            icon: SiAntdesign,
            level: 85,
            color: "#0170FE",
          },
          {
            name: "Shadcn UI",
            icon: SiShadcnui,
            level: 90,
            color: "#000000",
          },
        ],
      },
      {
        title: "Backend & Database",
        description:
          "Designing scalable backend systems and efficient data management solutions",
        skills: [
          { name: "Node.js", icon: SiNodedotjs, level: 85, color: "#339933" },
          { name: "Express.js", icon: SiExpress, level: 85, color: "#000000" },
          {
            name: "MongoDB",
            icon: SiMongodb,
            level: 85,
            color: "#47A248",
          },
          {
            name: "PostgreSQL",
            icon: SiPostgresql,
            level: 80,
            color: "#4169E1",
          },
          {
            name: "Firebase",
            icon: SiFirebase,
            level: 80,
            color: "#FFCA28",
          },
          {
            name: "Supabase",
            icon: SiSupabase,
            level: 80,
            color: "#3ECF8E",
          },
          {
            name: "EJS",
            icon: SiEjs,
            level: 90,
            color: "#B4CA65",
          },
        ],
      },
      {
        title: "AI & Machine Learning",
        description:
          "Applying machine learning concepts and AI techniques to solve real-world problems",
        skills: [
          {
            name: "Python",
            icon: SiPython,
            level: 60,
            color: "#3776AB",
          },
          {
            name: "Machine Learning",
            icon: SiTensorflow,
            level: 60,
            color: "#FF6F00",
          },
          {
            name: "Artificial Intelligence",
            icon: SiOpenai,
            level: 60,
            color: "#412991",
          },
        ],
      },
      {
        title: "Tools",
        description:
          "Industry-standard tools for development, collaboration, and deployment",
        skills: [
          { name: "Git & GitHub", icon: SiGit, level: 90, color: "#F05032" },
          { name: "Figma", icon: SiFigma, level: 75, color: "#F24E1E" },
          { name: "Postman", icon: SiPostman, level: 90, color: "#FF6C37" },
          {
            name: "VS Code",
            icon: VscCode,
            level: 90,
            color: "#007ACC",
          },
          { name: "Vercel", icon: SiVercel, level: 95, color: "#000000" },
          { name: "Netlify", icon: SiNetlify, level: 95, color: "#00C7B7" },
        ],
      },
    ],
    [],
  );

  const additionalTags = [
    "Redux",
    "GraphQL",
    "Redis",
    "REST API",
    "Shadcn/UI",
    "MERN Stack",
    "Unit Testing",
    "Agile",
  ];

  return (
    <section
      id="skills"
      className="relative bg-white dark:bg-gray-950 px-4 sm:px-6 py-12 sm:py-16">
      {/* Clean, Performance-Friendly Background */}
      <div className="absolute inset-0 opacity-30 sm:opacity-40 dark:opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <SectionHeading
          title="Technical Proficiency"
          subtitle="A comprehensive overview of my technology stack and expertise levels"
        />

        <div className="">
          {skillCategories.map((category) => (
            <AnimatedSection
              key={category.title}
              direction="up"
              className="mb-8 sm:mb-12">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </div>

              {/* Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {category.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Additional Expertise Tags - Responsive */}
        <AnimatedSection direction="up">
          <div className="mt-12 sm:mt-16 lg:mt-20 pb-8 sm:pb-10 pt-8 sm:pt-10 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4 sm:mb-5">
              Other Technologies & Frameworks
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {additionalTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-xs sm:text-sm font-medium border border-gray-200 dark:border-gray-800">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Sub-component for better performance (React can optimize each card)
function SkillCard({ skill }) {
  return (
    <div className="p-4 sm:p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 flex-shrink-0"
            style={{ color: skill.color }}>
            <skill.icon size={20} className="sm:w-6 sm:h-6" />
          </div>
          <span className="font-bold text-gray-800 dark:text-gray-100 text-sm sm:text-base">
            {skill.name}
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-gray-400 flex-shrink-0">
          {skill.level}%
        </span>
      </div>

      <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: skill.color }}
        />
      </div>
    </div>
  );
}
