"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../ui/AnimatedSection";
import {
  VscCode,
  VscDebugAlt,
  VscServerProcess,
  VscSettingsGear,
  VscRocket,
  VscTools,
} from "react-icons/vsc";
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
  SiGithubactions,
  SiJenkins,
  SiScrumalliance,
} from "react-icons/si";
import {
  FaBrain,
  FaProjectDiagram,
  FaUserCheck,
  FaReact,
  FaNodeJs,
  FaDatabase,
} from "react-icons/fa";

export default function Skills() {
  const skillCategories = useMemo(
    () => [
      {
        title: "Frontend Development",
        description: "Building responsive, high-performance user interfaces",
        icon: <VscCode className="text-primary-500" />,
        skills: [
          { name: "React.js", icon: SiReact, level: 90, color: "#61DAFB" },
          { name: "Next.js", icon: SiNextdotjs, level: 80, color: "#000000" },
          {
            name: "TypeScript",
            icon: SiTypescript,
            level: 70,
            color: "#3178C6",
          },
          {
            name: "JavaScript",
            icon: SiJavascript,
            level: 80,
            color: "#F7DF1E",
          },
          {
            name: "Tailwind CSS",
            icon: SiTailwindcss,
            level: 100,
            color: "#06B6D4",
          },
          {
            name: "Bootstrap",
            icon: SiBootstrap,
            level: 100,
            color: "#7952B3",
          },
          { name: "Material UI", icon: SiMui, level: 100, color: "#007FFF" },
          {
            name: "Ant Design",
            icon: SiAntdesign,
            level: 100,
            color: "#0170FE",
          },
          { name: "Shadcn UI", icon: SiShadcnui, level: 95, color: "#000000" },
        ],
      },
      {
        title: "Backend & Database",
        description:
          "Designing scalable backend systems and efficient data management solutions",
        icon: <VscServerProcess className="text-green-500" />,
        skills: [
          { name: "Node.js", icon: SiNodedotjs, level: 90, color: "#339933" },
          { name: "Express.js", icon: SiExpress, level: 90, color: "#000000" },
          { name: "MongoDB", icon: SiMongodb, level: 85, color: "#47A248" },
          {
            name: "PostgreSQL",
            icon: SiPostgresql,
            level: 80,
            color: "#4169E1",
          },
          { name: "Firebase", icon: SiFirebase, level: 80, color: "#FFCA28" },
          { name: "Supabase", icon: SiSupabase, level: 80, color: "#3ECF8E" },
          { name: "EJS", icon: SiEjs, level: 90, color: "#B4CA65" },
        ],
      },
      {
        title: "AI & Machine Learning",
        description:
          "Applying machine learning concepts and AI techniques to solve real-world problems",
        icon: <FaBrain className="text-purple-500" />,
        skills: [
          { name: "Python", icon: SiPython, level: 50, color: "#3776AB" },
          {
            name: "Machine Learning",
            icon: SiTensorflow,
            level: 60,
            color: "#FF6F00",
          },
          {
            name: "Prompt Engineer",
            icon: SiOpenai,
            level: 90,
            color: "#412991",
          },
        ],
      },
      {
        title: "DevOps & CI/CD",
        description:
          "Automated deployment, containerization, and continuous integration",
        icon: <VscRocket className="text-blue-500" />,
        skills: [
          { name: "Docker", icon: SiDocker, level: 85, color: "#2496ED" },
          {
            name: "CI/CD Pipeline",
            icon: VscSettingsGear,
            level: 90,
            color: "#00A86B",
          },
          {
            name: "GitHub Actions",
            icon: SiGithubactions,
            level: 85,
            color: "#2088FF",
          },
          { name: "Vercel", icon: SiVercel, level: 95, color: "#000000" },
          { name: "Netlify", icon: SiNetlify, level: 95, color: "#00C7B7" },
        ],
      },
    ],
    [],
  );

  // Tools categories (same as before)
  const toolsCategories = {
    development: {
      title: "Development Tools",
      icon: <VscCode className="text-blue-500" />,
      tools: [
        {
          name: "VS Code",
          icon: VscCode,
          proficiency: "Expert",
          color: "#007ACC",
        },
        {
          name: "Git & GitHub",
          icon: SiGit,
          proficiency: "Expert",
          color: "#F05032",
        },
        {
          name: "Postman",
          icon: SiPostman,
          proficiency: "Expert",
          color: "#FF6C37",
        },
        {
          name: "Docker",
          icon: SiDocker,
          proficiency: "Intermediate",
          color: "#2496ED",
        },
      ],
    },
    collaboration: {
      title: "Collaboration & Agile",
      icon: <FaUserCheck className="text-green-500" />,
      tools: [
        {
          name: "Agile Scrum",
          icon: SiScrumalliance,
          proficiency: "Advanced",
          color: "#009FDA",
        },
        {
          name: "Problem Solver",
          icon: FaBrain,
          proficiency: "Expert",
          color: "#FF6B35",
        },
        {
          name: "GitHub Projects",
          icon: SiGithubactions,
          proficiency: "Advanced",
          color: "#2088FF",
        },
        {
          name: "Project Management",
          icon: FaProjectDiagram,
          proficiency: "Advanced",
          color: "#7C3AED",
        },
      ],
    },
    design: {
      title: "Design & Prototyping",
      icon: <VscTools className="text-pink-500" />,
      tools: [
        // {
        //   name: "Figma",
        //   icon: SiFigma,
        //   proficiency: "Advanced",
        //   color: "#F24E1E",
        // },
        {
          name: "UI/UX Design",
          icon: VscDebugAlt,
          proficiency: "Advanced",
          color: "#EC4899",
        },
        // {
        //   name: "Wireframing",
        //   icon: VscTools,
        //   proficiency: "Intermediate",
        //   color: "#8B5CF6",
        // },
        // {
        //   name: "Prototyping",
        //   icon: VscRocket,
        //   proficiency: "Advanced",
        //   color: "#06B6D4",
        // },
      ],
    },
  };

  const additionalTags = [
    "Redux",
    // "GraphQL",
    "Redis",
    "REST API",
    "MERN Stack",
    "Unit Testing",
    "Jest",
    // "Webpack",
    "Agile Methodologies",
    "Problem Solving",
    "Code Review",
    "Technical Documentation",
  ];

  return (
    <section
      id="skills"
      className="relative bg-white dark:bg-gray-950 px-4 sm:px-6 py-12 sm:py-16">
      {/* Background */}
      <div className="absolute inset-0 opacity-30 sm:opacity-40 dark:opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <SectionHeading
          title="Technical Proficiency"
          subtitle="A comprehensive overview of my technology stack and expertise levels"
        />

        {/* ✅ SKILL MATRIX COMPONENT - ADDED HERE */}
        <SkillMatrix />

        {/* Skill Categories */}
        <div className="">
          {skillCategories.map((category, idx) => (
            <AnimatedSection
              key={category.title}
              direction="up"
              delay={idx * 0.1}
              className="mb-8 sm:mb-12">
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-2xl">{category.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {category.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Tools Section */}
        <AnimatedSection direction="up" delay={0.2}>
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full mb-3">
                <VscTools className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Tools & Workflow
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Industry-standard tools and methodologies I use daily
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {Object.values(toolsCategories).map((category, idx) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group">
                  <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="p-5 sm:p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-900/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500/10 to-purple-500/10 text-primary-500">
                          {category.icon}
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                          {category.title}
                        </h4>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <div className="space-y-4">
                        {category.tools.map((tool) => (
                          <div
                            key={tool.name}
                            className="flex items-center justify-between group/tool">
                            <div className="flex items-center gap-3 flex-1">
                              <div
                                className="p-1.5 rounded-lg transition-all duration-200 group-hover/tool:scale-110"
                                style={{ backgroundColor: `${tool.color}15` }}>
                                <tool.icon
                                  className="w-4 h-4 sm:w-5 sm:h-5"
                                  style={{ color: tool.color }}
                                />
                              </div>
                              <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                                {tool.name}
                              </span>
                            </div>
                            <span
                              className="text-xs font-mono px-2 py-1 rounded-full"
                              style={{
                                backgroundColor: `${tool.color}10`,
                                color: tool.color,
                                border: `1px solid ${tool.color}20`,
                              }}>
                              {tool.proficiency}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Additional Expertise Tags */}
        <AnimatedSection direction="up" delay={0.4}>
          <div className="pb-8 sm:pb-10 pt-8 sm:pt-10 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4 sm:mb-5">
              Other Technologies & Frameworks
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {additionalTags.map((tag, idx) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.02 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-xs sm:text-sm font-medium border border-gray-200 dark:border-gray-800 hover:border-primary-500/50 hover:bg-primary-50 dark:hover:bg-primary-950/30 transition-all duration-200 cursor-default">
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ✅ SKILL MATRIX COMPONENT (Defined here, above SkillCard)
function SkillMatrix() {
  // You can easily update these stats with your real data
  const stats = {
    leetcode: "50+",
    githubRepos: "55",
    commits: "1k+",
    projects: "20+",
    clients: "10+",
    yearsExperience: "1+",
  };

  return (
    <AnimatedSection direction="up" className="mb-16">
      {/* Featured Skills with Project Examples */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Skill Spotlight */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-2xl p-6 border border-primary-500/20">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaReact className="text-primary-500" /> Most Used Stack
          </h3>
          <div className="space-y-4">
            {[
              {
                name: "MERN Stack",
                projects: stats.projects,
                lines: "30k+",
                icon: FaReact,
                color: "#61DAFB",
              },
              {
                name: "Next.js",
                projects: "2",
                lines: "10k+",
                icon: SiNextdotjs,
                color: "#000000",
              },
              {
                name: "Tailwind CSS",
                projects: "15",
                lines: "20k+",
                icon: SiTailwindcss,
                color: "#06B6D4",
              },
            ].map((stack) => (
              <motion.div
                key={stack.name}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${stack.color}15` }}>
                    <stack.icon
                      className="w-5 h-5"
                      style={{ color: stack.color }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {stack.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {stack.projects} projects • {stack.lines} lines
                    </p>
                  </div>
                </div>
                <div className="text-2xl">📁</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills in Action */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaNodeJs className="text-green-500" />
            Problem Solving Stats
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white/50 dark:bg-gray-900/50 rounded-xl hover:shadow-md transition-all">
              <div className="text-2xl font-bold text-primary-500">
                {stats.leetcode}
              </div>
              <div className="text-xs text-gray-600">LeetCode Problems</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-gray-900/50 rounded-xl hover:shadow-md transition-all">
              <div className="text-2xl font-bold text-purple-500">
                {stats.githubRepos}
              </div>
              <div className="text-xs text-gray-600">GitHub Repos</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-gray-900/50 rounded-xl hover:shadow-md transition-all">
              <div className="text-2xl font-bold text-green-500">
                {stats.commits}
              </div>
              <div className="text-xs text-gray-600">Code Commits</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-gray-900/50 rounded-xl hover:shadow-md transition-all">
              <div className="text-2xl font-bold text-orange-500">
                {stats.projects}
              </div>
              <div className="text-xs text-gray-600">Projects Completed</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Skill Proficiency with Real Examples */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaDatabase className="text-purple-500" />
          🔧 Technologies I've Built With
        </h3>
        <div className="flex flex-wrap gap-3">
          {[
            {
              name: "React Query",
              example: "15+ APIs integrated",
              icon: SiReact,
            },
            {
              name: "Zustand",
              example: "State management in 8 apps",
              icon: FaBrain,
            },
            { name: "Prisma", example: "5 database schemas", icon: FaDatabase },
            {
              name: "NextAuth",
              example: "Authentication in 6 projects",
              icon: SiNextdotjs,
            },
            {
              name: "Redux Toolkit",
              example: "Used in 10+ projects",
              icon: SiReact,
            },
            { name: "Socket.io", example: "3 real-time apps", icon: FaNodeJs },
          ].map((tech) => (
            <div key={tech.name} className="group relative">
              <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm cursor-help flex items-center gap-2 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all">
                <tech.icon className="w-3 h-3" />
                {tech.name}
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {tech.example}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

// Skill Card Component
function SkillCard({ skill }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="p-4 sm:p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.4 }}
            className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 flex-shrink-0 group-hover:shadow-sm transition-all"
            style={{ color: skill.color }}>
            <skill.icon size={20} className="sm:w-6 sm:h-6" />
          </motion.div>
          <span className="font-bold text-gray-800 dark:text-gray-100 text-sm sm:text-base">
            {skill.name}
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-gray-400 flex-shrink-0">
          {skill.level}%
        </span>
      </div>

      <div className="relative">
        <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full relative"
            style={{ backgroundColor: skill.color }}
          />
        </div>
        <div className="absolute inset-0 h-1.5 w-full rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>
    </motion.div>
  );
}
