"use client";

import { navigationLinks } from "@/data/navigation";
import { useHeaderNavigation } from "@/hooks/useHeaderNavigation";
import Link from "next/link";
import { Menu, ShieldCheck, X } from "lucide-react";
import { createPortal } from "react-dom";
import ActiveUsers from "./ActiveUsers";

export default function Header({
  hideNavigation = false,
}: {
  hideNavigation?: boolean;
}) {
  const {
    open,
    activeSection,
    openMenu,
    closeMenu,
    scrollToSection,
  } = useHeaderNavigation();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-4 sm:h-[78px] sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-1 text-lg font-semibold tracking-[-0.035em] text-slate-950 sm:text-xl"
        >
          <ShieldCheck
            className="h-7 w-7 fill-[#3157ff] text-[#3157ff] [&_path]:stroke-white sm:h-8 sm:w-8"
            strokeWidth={2.5}
          />
          TrustySignatures
        </Link>

        {!hideNavigation && (
          <nav className="hidden items-center gap-8 text-[15px] font-semibold text-[#13182b] lg:flex xl:gap-11">
            {navigationLinks.map((link) => (
              <Link
                key={link}
                href={`/#${link.toLowerCase()}`}
                onClick={(event) => scrollToSection(event, link.toLowerCase())}
                className={`relative py-2 transition-colors hover:text-[#3157ff] ${
                  activeSection === link.toLowerCase()
                    ? "text-[#3157ff] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-[#3157ff]"
                    : ""
                }`}
              >
                {link}
              </Link>
            ))}
          </nav>
        )}

        <div className="hidden items-center gap-2 lg:flex">
          <ActiveUsers />
        </div>

        {!hideNavigation && (
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="rounded-lg p-2 text-slate-700 lg:hidden"
            onClick={open ? closeMenu : openMenu}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        )}
      </div>

      {!hideNavigation &&
        open &&
        createPortal(
          <div className="fixed inset-x-0 bottom-0 top-[68px] z-[90] lg:hidden sm:top-[78px]">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 animate-in fade-in bg-slate-950/30 duration-200"
              onClick={closeMenu}
            />
            <nav
              aria-label="Mobile navigation"
              className="relative flex max-h-full origin-top animate-in flex-col gap-1 overflow-y-auto border-t border-slate-200 bg-white px-4 py-4 text-base font-semibold text-slate-700 shadow-[0_20px_45px_rgba(15,23,42,.18)] slide-in-from-top-3 duration-300 sm:px-6 sm:py-5"
            >
              {navigationLinks.map((link) => (
                <Link
                  key={link}
                  href={`/#${link.toLowerCase()}`}
                  className={`rounded-lg px-4 py-3 transition-colors hover:bg-blue-50 hover:text-[#3157ff] ${
                    activeSection === link.toLowerCase()
                      ? "bg-blue-50 text-[#3157ff]"
                      : ""
                  }`}
                  onClick={(event) =>
                    scrollToSection(event, link.toLowerCase())
                  }
                >
                  {link}
                </Link>
              ))}
            </nav>
          </div>,
          document.body,
        )}
    </header>
  );
}
