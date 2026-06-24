"use client";

import { navigationLinks } from "@/data/navigation";
import { useEffect, useRef, useState } from "react";

export function useHeaderNavigation() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const scrollTarget = useRef<string | null>(null);
  const scrollReleaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const updateActiveSection = () => {
      const targetId = scrollTarget.current;

      if (targetId) {
        const target = document.getElementById(targetId);
        if (target && Math.abs(target.getBoundingClientRect().top - 78) < 12) {
          scrollTarget.current = null;
        }
        return;
      }

      const marker = 140;
      let current = "home";

      for (const link of navigationLinks) {
        const section = document.getElementById(link.toLowerCase());
        if (section && section.getBoundingClientRect().top <= marker) {
          current = section.id;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      if (scrollReleaseTimer.current) clearTimeout(scrollReleaseTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();
    scrollTarget.current = sectionId;

    if (scrollReleaseTimer.current) clearTimeout(scrollReleaseTimer.current);
    scrollReleaseTimer.current = setTimeout(() => {
      scrollTarget.current = null;
    }, 1200);

    setActiveSection(sectionId);
    setOpen(false);

    const section = document.getElementById(sectionId);
    if (!section) {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const top = section.getBoundingClientRect().top + window.scrollY - 77;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", `#${sectionId}`);
  };

  return {
    open,
    activeSection,
    openMenu: () => setOpen(true),
    closeMenu: () => setOpen(false),
    scrollToSection,
  };
}
