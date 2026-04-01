import { useState, useEffect } from "react";

export default function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);

      // Update active section based on scroll position
      const sections = ["home", "about", "skills", "projects", "contact"];
      const sectionElements = sections.map((id) => document.getElementById(id));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return { scrollPosition, activeSection };
}
