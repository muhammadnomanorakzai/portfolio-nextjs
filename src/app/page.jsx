"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/layout/Footer";
import SectionSkeleton from "@/components/ui/SectionSkeleton";

const About = dynamic(() => import("@/components/sections/About"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const Skills = dynamic(() => import("@/components/sections/Skills"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const Projects = dynamic(() => import("@/components/sections/Projects"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />

      <Footer />
    </main>
  );
}
