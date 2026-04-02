"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import GitHubRepos from "@/components/GitHubRepos";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import {
  GlobeAltIcon,
  XMarkIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { FaGithub } from "react-icons/fa";
import { projectsApi } from "@/lib/api";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    try {
      const data = await projectsApi.getAll();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const categories = useMemo(
    () => [
      { value: "all", label: "All Projects" },
      { value: "frontend", label: "Frontend" },
      { value: "backend", label: "Backend" },
      { value: "fullstack", label: "Full Stack" },
    ],
    [],
  );

  const filteredProjects = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter, projects],
  );

  if (loading) {
    return (
      <section
        id="projects"
        className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto w-full">
          <SectionHeading title="Featured Projects" />
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="projects"
        className="relative overflow-hidden px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
        {/* Professional Grid Background - Better Performance than random particles */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <SectionHeading
            title="Featured Projects"
            subtitle="A selection of my best work showcasing my skills and experience"
          />

          {/* Professional Segmented Filter - Responsive */}
          <div className="flex flex-wrap justify-center items-center gap-1 p-1 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl w-full sm:w-fit mx-auto mb-8 sm:mb-12 lg:mb-16 border border-gray-200/50 dark:border-gray-700/50">
            {categories.map((cat) => {
              const isActive = filter === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setFilter(cat.value)}
                  className={`flex-1 sm:flex-none px-3 sm:px-6 py-2.5 text-xs sm:text-sm font-bold transition-colors duration-300 rounded-xl ${
                    isActive
                      ? "text-primary-600 dark:text-white"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
                  }`}>
                  {isActive && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-white dark:bg-primary-600 shadow-sm rounded-xl"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onSelect={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-12 pb-8 sm:pb-10">
            <GitHubRepos username="muhammadnomanorakzai" />
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectCard({ project, index, onSelect }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), {
    stiffness: 100,
    damping: 20,
  });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative cursor-pointer group"
      onClick={onSelect}>
      <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 hover:border-primary-500/30">
        {/* Responsive image height */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <Image
            src={project.image_url || "/images/Noman.png"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] uppercase font-bold tracking-widest text-white border border-white/10 z-10">
            {project.category}
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors dark:text-white">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 sm:mb-5 line-clamp-2">
            {project.description}
          </p>
          <div className="flex items-center text-primary-600 font-bold text-xs uppercase tracking-wider">
            View Case Study{" "}
            <ChevronRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-gray-950/90 backdrop-blur-md"
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white dark:bg-gray-900 rounded-[2rem] sm:rounded-[2.5rem] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}>
        {/* Responsive image height */}
        <div className="relative h-56 sm:h-72 md:h-[450px] w-full">
          <Image
            src={project.image_url || "/images/Noman.png"}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
          />
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2.5 sm:p-3 bg-black/20 hover:bg-black/40 backdrop-blur-xl rounded-full text-white transition-all z-20 border border-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close modal">
            <XMarkIcon className="w-5 h-5" />
          </button>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10">
            <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-primary-600 text-white text-[10px] sm:text-xs font-black rounded-lg uppercase tracking-[0.2em]">
              {project.category}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mt-3 sm:mt-4 tracking-tight">
              {project.title}
            </h2>
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-10 lg:p-14">
          <p className="text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 lg:mb-12 text-sm sm:text-base lg:text-lg leading-relaxed">
            {project.long_description || project.description}
          </p>

          <div className="space-y-6 sm:space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary-600">
              Technical Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gray-50 dark:bg-gray-800 dark:text-gray-200 rounded-xl text-xs sm:text-sm font-bold border border-gray-100 dark:border-gray-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Responsive button layout - stack on mobile */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-10 sm:mt-12 lg:mt-16">
            {project.live_url && (
              <Button
                onClick={() => window.open(project.live_url, "_blank")}
                className="flex-1 py-4 sm:py-5 text-sm sm:text-base shadow-xl shadow-primary-600/20 min-h-[48px]">
                <GlobeAltIcon className="w-5 h-5 mr-2" /> Live Preview
              </Button>
            )}
            {project.github_url && (
              <Button
                variant="outline"
                onClick={() => window.open(project.github_url, "_blank")}
                className="flex-1 py-4 sm:py-5 text-sm sm:text-base border-2 min-h-[48px]">
                <FaGithub className="inline mr-2 text-xl" /> Source Code
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
