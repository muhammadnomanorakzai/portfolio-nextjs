"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import useScrollPosition from "@/hooks/useScrollPosition";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const { scrollPosition, activeSection } = useScrollPosition();
  const { scrollYProgress } = useScroll();

  // Progress bar animation
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    const darkMode =
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(darkMode);

    if (darkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navLinks = [
    { href: "#home", label: "Home", icon: "" },
    { href: "#about", label: "About", icon: "" },
    { href: "#skills", label: "Skills", icon: "" },
    { href: "#projects", label: "Work", icon: "" },
    { href: "#contact", label: "Contact", icon: "" },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 z-[60]"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrollPosition > 50
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl border-b border-gray-200/20 dark:border-gray-700/30"
            : "bg-transparent"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="#home"
              onClick={(e) => scrollToSection(e, "#home")}
              className="group relative">
              <motion.h1
                whileHover={{ scale: 1.05 }}
                className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Portfolio
              </motion.h1>

              <SparklesIcon className="absolute -top-2 -right-4 w-4 h-4 text-yellow-500 animate-pulse" />

              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-primary-600 to-pink-600 group-hover:w-full transition-all duration-300" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.label.toLowerCase();

                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative px-4 py-2 group">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600">
                      {link.label}
                    </span>

                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 to-pink-600"
                      />
                    )}
                  </motion.a>
                );
              })}

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="ml-3 p-2 rounded-xl bg-gray-100 dark:bg-gray-800">
                {isDark ? (
                  <SunIcon className="w-5 h-5 text-yellow-500" />
                ) : (
                  <MoonIcon className="w-5 h-5 text-gray-700" />
                )}
              </motion.button>
            </div>

            {/* Mobile Buttons */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800">
                {isDark ? (
                  <SunIcon className="w-5 h-5 text-yellow-500" />
                ) : (
                  <MoonIcon className="w-5 h-5 text-gray-700" />
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800">
                {isOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t">
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <span>{link.icon}</span>
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
