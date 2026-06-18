"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import Button from "@/components/ui/Button";
import {
  Layers,
  Briefcase,
  LayoutDashboard,
  ShoppingBag,
  Smartphone,
  Cpu,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "SaaS Development",
    description:
      "End-to-end development of scalable Software as a Service platforms tailored to your business model. I focus on multi-tenancy, subscription management, and performance.",
    icon: Layers,
    features: [
      "Multi-tenant Architecture",
      "Subscription Integration",
      "Real-time Analytics",
      "Cloud Scalability",
    ],
  },
  {
    title: "Management Systems",
    description:
      "Custom ERP and CRM solutions to streamline your business operations. Whether it's healthcare, education, or logistics, I build systems that keep your data organized.",
    icon: Briefcase,
    features: [
      "Inventory Management",
      "Workflow Automation",
      "Role-based Access",
      "Data Security",
    ],
  },
  {
    title: "Admin Dashboards",
    description:
      "Powerful, intuitive administrative interfaces to manage your applications. High-performance data visualization and user management made simple and effective.",
    icon: LayoutDashboard,
    features: [
      "Interactive Charts",
      "User Permissions",
      "Activity Logging",
      "Bulk Data Actions",
    ],
  },
  {
    title: "E-Commerce Solutions",
    description:
      "Robust online stores with seamless checkout experiences. From small boutiques to large-scale marketplaces, I ensure a secure and high-converting shop.",
    icon: ShoppingBag,
    features: [
      "Payment Gateways",
      "Order Tracking",
      "Product Catalogs",
      "Customer Management",
    ],
  },
  {
    title: "Mobile App Development",
    description:
      "Responsive and high-performance mobile applications using React Native. Get your business in the pockets of your customers with a premium mobile experience.",
    icon: Smartphone,
    features: [
      "Cross-platform Support",
      "Offline Functionality",
      "Push Notifications",
      "Native Performance",
    ],
  },
  {
    title: "AI & Business Automation",
    description:
      "Integrating modern AI capabilities to automate repetitive tasks and provide intelligent insights. Leverage LLMs and automated workflows to stay ahead.",
    icon: Cpu,
    features: [
      "AI Chatbots",
      "Workflow Automation",
      "Predictive Analytics",
      "Document Processing",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 text-sm font-bold mb-6 border border-primary-100 dark:border-primary-900/50">
              <Sparkles size={16} />
              <span>Full-Stack Solutions</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-8">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                Expert Services for
              </span>
              <br />
              <span className="text-gradient">Modern Businesses</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
              I deliver high-quality, scalable, and secure digital products that
              solve complex business problems. My approach combines technical
              excellence with a deep understanding of client requirements.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/#contact">
                <Button variant="glow" size="lg">
                  Start Your Project
                  {/* <ArrowRight size={5} /> */}
                </Button>
              </Link>
              <Link href="/#projects">
                <Button variant="outline" size="lg">
                  View My Work
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50/50 dark:bg-gray-900/20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="What I Offer"
            subtitle="Explore the core areas of my expertise, where I combine code and creativity to build impactful solutions."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 overflow-hidden relative">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-primary-600 to-purple-700 p-8 sm:p-16 lg:p-20 relative overflow-hidden shadow-2xl">
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10 text-center text-white">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to bring your vision to life?
            </h2>
            <p className="text-lg text-primary-10/80 mb-10 max-w-2xl mx-auto text-blue-50/90 font-medium">
              Let's collaborate to build a solution that drives growth and
              simplifies operations. I'm always open to discussing new projects
              and creative ideas.
            </p>
            <Link href="/#contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-primary-700 text-lg font-bold rounded-2xl shadow-xl hover:shadow-white/20 transition-all flex items-center gap-2 mx-auto">
                Let's Talk
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
