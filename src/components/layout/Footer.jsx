"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { SiNetlify, SiVercel } from "react-icons/si";
import {
  HeartIcon,
  ArrowUpIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";

// ✅ FIX 1: Pre-computed deterministic bubble values (outside component, runs once)
// Math.random() inside the component causes server/client mismatch (hydration error)
const BUBBLES = Array.from({ length: 15 }, (_, i) => {
  const a = ((i * 9301 + 49297) % 233280) / 233280;
  const b = ((i * 6571 + 31337) % 233280) / 233280;
  const c = ((i * 8121 + 28411) % 233280) / 233280;
  const d = ((i * 7193 + 52673) % 233280) / 233280;
  const e = ((i * 5483 + 39749) % 233280) / 233280;
  return {
    width: a * 200 + 50,
    height: b * 200 + 50,
    left: `${c * 100}%`,
    top: `${d * 100}%`,
    duration: e * 10 + 5,
  };
});

export default function Footer() {
  // ✅ FIX 2: currentYear via state to avoid SSR/client mismatch
  const [currentYear, setCurrentYear] = useState(2024);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.95, 1], [0, 0, 1]);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = [
    { label: "Home", href: "#home", icon: "" },
    { label: "About", href: "#about", icon: "" },
    { label: "Skills", href: "#skills", icon: "" },
    { label: "Projects", href: "#projects", icon: "" },
    { label: "Contact", href: "#contact", icon: "" },
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/muhammadnomanorakzai",
      label: "GitHub",
      color: "#333",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/muhammad-noman-orakzai/",
      label: "LinkedIn",
      color: "#0077B5",
    },
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/nomii.khani.3/",
      label: "Facebook",
      color: "#1877F2",
    },
    {
      icon: SiVercel,
      href: "https://vercel.com/muhammad-nomans-projects-81e1e5cd",
      label: "Vercel",
      color: "#000000",
    },
    {
      icon: SiNetlify,
      href: "https://app.netlify.com/teams/muhammadnomanorakzai/projects",
      label: "Netlify",
      color: "#00C7B7",
    },
  ];

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      text: "muhammadnomanorakzai313@gmail.com",
      href: "mailto:muhammadnomanorakzai313@gmail.com",
    },
    { icon: PhoneIcon, text: "+92 3181915749", href: "Phone:+92 3285609765" },
    {
      icon: MapPinIcon,
      text: "Peshawar, Khyber Pakhtunkhwa, Pakistan",
      href: null,
    },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    if (pathname !== "/") {
      window.location.href = href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Scroll to Top Button */}
      <motion.button
        style={{ opacity }}
        initial={{ scale: 0 }}
        animate={{ scale: showScrollTop ? 1 : 0 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 group"
        aria-label="Scroll to top">
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity }}>
          <ArrowUpIcon className="w-5 h-5" />
        </motion.div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-600 to-pink-600 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
      </motion.button>

      <footer className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-t border-gray-200/50 dark:border-gray-800/50 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-pink-500/5" />

          {/* ✅ FIX 3: Use pre-computed BUBBLES array — no Math.random() at render time */}
          {BUBBLES.map((bubble, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary-500/5 dark:bg-primary-400/5"
              style={{
                width: bubble.width,
                height: bubble.height,
                left: bubble.left,
                top: bubble.top,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: bubble.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto container-padding py-16 relative z-10">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4">
              <Link
                href="#home"
                onClick={(e) => scrollToSection(e, "#home")}
                className="inline-block group">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Muhammad
                </h2>
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-primary-600 to-pink-600 mt-1"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Building beautiful, responsive, and performant web applications
                with modern technologies. Let&apos;s create something amazing
                together.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 pt-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-sm">
                    <info.icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400">
                        {info.text}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}>
              <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-primary-600 to-pink-600 bg-clip-text text-transparent">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {footerLinks.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}>
                    <Link
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300">
                      <span className="text-lg transition-transform group-hover:translate-x-1">
                        {link.icon}
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services / Expertise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}>
              <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-primary-600 to-pink-600 bg-clip-text text-transparent">
                Expertise
              </h3>
              <ul className="space-y-3">
                {[
                  "Frontend Development",
                  "Backend Development",
                  "UI/UX Design",
                  "Database Design",
                ].map((service, index) => (
                  <motion.li
                    key={service}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary-600 to-pink-600" />
                    <span>{service}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Connect & Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}>
              <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-primary-600 to-pink-600 bg-clip-text text-transparent">
                Connect With Me
              </h3>

              {/* Social Links */}
              <div className="flex flex-wrap gap-3 mb-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05, type: "spring" }}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative"
                    aria-label={social.label}>
                    <div
                      className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity"
                      style={{ backgroundColor: social.color }}
                    />
                    <div
                      className="relative p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-xl transition-all"
                      style={{ color: social.color }}>
                      <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Newsletter Signup */}
              <div className="mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Subscribe to my newsletter
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-8 border-t border-gray-200 dark:border-gray-800 relative">
            <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-primary-600 to-transparent" />

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {currentYear} Muhammad Noman. All rights reserved.
              </p>

              <div className="flex items-center gap-6">
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Terms of Service
                </Link>
              </div>

              <motion.p
                whileHover={{ scale: 1.05 }}
                className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                Made with{" "}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}>
                  <HeartIcon className="w-4 h-4 text-red-500" />
                </motion.span>{" "}
                by Muhammad Noman
              </motion.p>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
}
