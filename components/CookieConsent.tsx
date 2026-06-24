"use client";

import { useCookieConsent } from "@/hooks/useCookieConsent";
import { ShieldCheck } from "lucide-react";

export default function CookieConsent() {
  const { visible, saveConsent } = useCookieConsent();

  if (!visible) return null;

  return (
    <aside className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-[720px] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.14)] sm:inset-x-4 sm:bottom-5">
      <div className="grid items-center gap-3 sm:grid-cols-[40px_1fr_auto] sm:gap-4">
        <span className="hidden h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-blue-600 sm:grid">
          <ShieldCheck className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-slate-950">
            Your privacy matters
          </h2>
          <p className="mt-1 text-sm leading-5 text-slate-600">
            We only use essential cookies to remember your preferences and keep
            the experience working smoothly.
          </p>
        </div>
        <div className="flex shrink-0 sm:justify-end">
          <button
            type="button"
            onClick={() => saveConsent("accepted")}
            className="min-h-10 w-full rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-[0_5px_12px_rgba(37,99,235,.18)] transition-colors hover:bg-blue-700 sm:w-auto"
          >
            Accept
          </button>
        </div>
      </div>
    </aside>
  );
}
