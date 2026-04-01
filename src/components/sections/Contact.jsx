"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../ui/AnimatedSection";
import Button from "../ui/Button";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { messagesApi } from "@/lib/api";
import { sanitizeObject, validateForm } from "@/lib/utils";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  // Track submission attempt to prevent multiple submissions
  const submissionAttemptRef = useRef(false);
  const abortControllerRef = useRef(null);

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const particles = Array.from({ length: 10 }, (_, i) => i);

  // Clear form after successful submission
  const resetForm = useCallback(() => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  }, []);

  // Handle input change with debounced validation
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation (but don't show errors until blur)
    if (value.length > 0) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, []);

  // Validation function (extracted for reusability)
  const validateField = useCallback((name, value) => {
    switch (name) {
      case "name":
        return value.length < 2 ? "Name must be at least 2 characters" : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Please enter a valid email"
          : "";
      case "subject":
        return value.length < 3 ? "Subject must be at least 3 characters" : "";
      case "message":
        return value.length < 10
          ? "Message must be at least 10 characters"
          : "";
      default:
        return "";
    }
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
      setFocusedField(null);
    },
    [validateField],
  );

  const handleFocus = useCallback((field) => setFocusedField(field), []);

  // Main submit handler with proper debouncing and cancellation
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Prevent multiple submissions
      if (isSubmitting || submissionAttemptRef.current) {
        console.log("Submission already in progress");
        return;
      }

      // Cancel any in-flight request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      // Validate all fields
      const validationErrors = {};
      Object.keys(formData).forEach((key) => {
        const error = validateField(key, formData[key]);
        if (error) validationErrors[key] = error;
      });

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      // Set submission flags
      setIsSubmitting(true);
      submissionAttemptRef.current = true;
      setSubmitStatus(null);
      setErrors({});

      try {
        // Sanitize input
        const sanitizedData = sanitizeObject(formData);

        // Submit to Supabase with timeout
        const submitPromise = messagesApi.submit(sanitizedData);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), 15000),
        );

        await Promise.race([submitPromise, timeoutPromise]);

        // Fire and forget email notification (don't wait for it)
        fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sanitizedData),
          signal: abortControllerRef.current.signal,
        }).catch((err) => console.error("Email notification failed:", err));

        // Success
        setSubmitStatus("success");
        resetForm();

        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } catch (error) {
        console.error("Submit error:", error);

        // Handle different error types
        let errorMessage = "Failed to send message. Please try again.";

        if (error.name === "AbortError") {
          errorMessage = "Request cancelled. Please try again.";
        } else if (error.message === "Request timeout") {
          errorMessage =
            "Request timed out. Please check your connection and try again.";
        } else if (error.message?.includes("duplicate key")) {
          errorMessage =
            "This message appears to be a duplicate. Please wait before sending again.";
        } else if (
          error.message?.includes("429") ||
          error.message?.includes("rate limit")
        ) {
          errorMessage =
            "Too many requests. Please wait a moment and try again.";
        }

        setSubmitStatus("error");
        setErrors({ form: errorMessage });

        // Clear error after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } finally {
        setIsSubmitting(false);
        submissionAttemptRef.current = false;
        abortControllerRef.current = null;
      }
    },
    [formData, isSubmitting, validateField, resetForm],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      label: "Email",
      value: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "your.email@example.com",
      link: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "your.email@example.com"}`,
    },
    {
      icon: PhoneIcon,
      label: "Phone",
      value: process.env.NEXT_PUBLIC_CONTACT_PHONE || "(+1) 234-567-8900",
      link: `tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE || "+12345678900"}`,
    },
    {
      icon: MapPinIcon,
      label: "Location",
      value: "KPK , Peshawar / Pakistan",
    },
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      url: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com",
    },
    {
      icon: FaLinkedin,
      url: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com",
    },
    {
      icon: FaInstagram,
      url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="contact"
      className="section-padding relative overflow-hidden">
      {/* Background particles - unchanged */}
      <div className="absolute inset-0 -z-10">
        {particles.map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary-500/10"
            style={{
              width: 80,
              height: 80,
              left: `${i * 10}%`,
              top: `${i * 8}%`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0, 0.2, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto container-padding pb-5">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind? Let's work together"
        />

        <motion.div style={{ y, opacity }}>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left side - unchanged */}
            <AnimatedSection className="lg:col-span-2">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
                <div className="space-y-4 mb-6">
                  {contactInfo.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
                      <item.icon className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="text-xs text-gray-400">{item.label}</p>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="font-semibold hover:text-primary-600 transition">
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-semibold">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  {socialLinks.map((s, i) => (
                    <a
                      key={i}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white dark:bg-gray-900 rounded-full shadow hover:scale-110 transition-transform">
                      <s.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection className="lg:col-span-3">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-3xl p-8 shadow-xl">
                <h3 className="text-xl font-bold mb-4">Send Message</h3>

                <AnimatePresence>
                  {errors.form && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4 p-3 bg-red-500 text-white rounded-lg flex items-center gap-2">
                      <XCircleIcon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm">{errors.form}</span>
                    </motion.div>
                  )}

                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4 p-3 bg-green-500 text-white rounded-lg flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm">
                        Message sent successfully! I'll get back to you soon.
                      </span>
                    </motion.div>
                  )}

                  {submitStatus === "error" && !errors.form && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4 p-3 bg-red-500 text-white rounded-lg flex items-center gap-2">
                      <XCircleIcon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm">
                        Failed to send message. Please try again.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {["name", "email", "subject"].map((field) => (
                    <div key={field} className="relative">
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        placeholder={
                          field.charAt(0).toUpperCase() + field.slice(1)
                        }
                        value={formData[field]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() => handleFocus(field)}
                        disabled={isSubmitting}
                        className={`w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-900 transition-colors
                          ${focusedField === field ? "border-primary-500 ring-2 ring-primary-500/20" : "border-gray-300 dark:border-gray-700"}
                          ${errors[field] ? "border-red-500" : ""}
                          disabled:opacity-50 disabled:cursor-not-allowed`}
                      />
                      <AnimatePresence>
                        {errors[field] && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-xs text-red-500 mt-1">
                            {errors[field]}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  <div className="relative">
                    <textarea
                      name="message"
                      placeholder="Message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus("message")}
                      disabled={isSubmitting}
                      className={`w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-900 resize-none transition-colors
                        ${focusedField === "message" ? "border-primary-500 ring-2 ring-primary-500/20" : "border-gray-300 dark:border-gray-700"}
                        ${errors.message ? "border-red-500" : ""}
                        disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-xs text-red-500 mt-1">
                          {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full"
                    disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
