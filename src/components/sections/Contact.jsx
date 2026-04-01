"use client";

import { useState, useRef } from "react";
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
import { sanitizeObject, checkRateLimit, resetRateLimit } from "@/lib/utils";

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

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const particles = Array.from({ length: 10 }, (_, i) => i);

  // ✅ VALIDATION (FROM OLD CODE)
  const validateField = (name, value) => {
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
  };

  // ✅ HANDLE CHANGE + VALIDATION
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    setFocusedField(null);
  };

  const handleFocus = (field) => setFocusedField(field);

  // ✅ SUPABASE SUBMIT (MAIN LOGIC)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check rate limit
    const rateLimit = checkRateLimit("contact_form");
    if (!rateLimit.allowed) {
      setErrors({
        form: `Too many attempts. Please wait ${rateLimit.waitTime} seconds.`,
      });
      return;
    }

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrors({});

    try {
      // Sanitize input to prevent XSS
      const sanitizedData = sanitizeObject(formData);
      await messagesApi.submit(sanitizedData);

      // Send email notification (non-blocking, don't fail if email fails)
      try {
        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sanitizedData),
        });
      } catch (emailError) {
        // Log email error but don't fail the submission
        console.error("Email notification failed:", emailError);
      }

      // Reset rate limit on successful submission
      resetRateLimit("contact_form");

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setSubmitStatus(null), 4000);
    } catch (error) {
      console.error("Error submitting message:", error.message); // ✅ .message not {}
      setSubmitStatus("error");
      setErrors({
        form: error.message || "Failed to send message. Please try again.",
      });
      setTimeout(() => setSubmitStatus(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
      {/* BACKGROUND */}
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
            {/* LEFT */}
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
                          <a href={item.link} className="font-semibold">
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
                      className="p-3 bg-white dark:bg-gray-900 rounded-full shadow hover:scale-110 transition">
                      <s.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* RIGHT FORM */}
            <AnimatedSection className="lg:col-span-3">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-3xl p-8 shadow-xl">
                <h3 className="text-xl font-bold mb-4">Send Message</h3>

                <AnimatePresence>
                  {errors.form && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4 p-3 bg-red-500 text-white rounded flex items-center gap-2">
                      <XCircleIcon className="w-4 h-4" />
                      {errors.form}
                    </motion.div>
                  )}

                  {submitStatus === "success" && (
                    <motion.div className="mb-4 p-3 bg-green-500 text-white rounded flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4" />
                      Message sent successfully!
                    </motion.div>
                  )}

                  {submitStatus === "error" && !errors.form && (
                    <motion.div className="mb-4 p-3 bg-red-500 text-white rounded flex items-center gap-2">
                      <XCircleIcon className="w-4 h-4" />
                      Failed to send message
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {["name", "email", "subject"].map((field) => (
                    <input
                      key={field}
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      placeholder={field}
                      value={formData[field]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus(field)}
                      className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-900"
                    />
                  ))}

                  <textarea
                    name="message"
                    placeholder="Message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-900"
                  />

                  <Button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
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
