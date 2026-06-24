"use client";

import ActiveUsers from "@/components/ActiveUsers";
import { heroFacts } from "@/data/hero";
import { useHero } from "@/hooks/useHero";
import {
  Check,
  LoaderCircle,
  Search,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

export default function Hero() {
  const { address, scanError, isValidating, changeAddress, scan } = useHero();

  return (
    <main id="home" className="overflow-hidden bg-white">
      <section className="relative px-4 pb-20 pt-20 text-center sm:px-6 sm:pb-28 sm:pt-28 lg:px-8 lg:pb-32 lg:pt-32">
        <div className="relative mx-auto max-w-[1280px]">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-[0_1px_2px_rgba(15,23,42,.04)]">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
            Trusted by Web3 Users Worldwide
          </div>

          <h1 className="mx-auto mt-7 max-w-[920px] text-[40px] font-semibold leading-[1.04] tracking-[-0.055em] text-slate-950 sm:text-[58px] md:text-[68px] lg:text-[76px]">
            Audit Wallet Signatures &amp; Token Approvals
          </h1>
          <p className="mx-auto mt-7 line-clamp-2 max-w-[700px] text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Detect risky approvals, suspicious contracts, and wallet activity.
          </p>

          <div id="scan" className="mx-auto mt-10 w-full max-w-[820px]">
            <div className="rounded-2xl text-xs border border-slate-200 bg-white p-2 shadow-[0_18px_50px_rgba(15,23,42,.10),0_2px_8px_rgba(15,23,42,.04)]">
              <div className="flex flex-col gap-2 sm:flex-row">
                <label
                  className={`flex min-h-14 flex-1 items-center gap-3 rounded-xl text-xs border px-4 text-left transition-all sm:min-h-16 ${
                    scanError
                      ? "border-red-400 ring-4 ring-red-50"
                      : "border-blue-100  bg-slate-50 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50"
                  }`}
                >
                  <WalletCards
                    className={`h-5 w-5 shrink-0 ${scanError ? "text-red-500" : "text-slate-400"}`}
                  />
                  <input
                    value={address}
                    onChange={(event) => changeAddress(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !isValidating) scan();
                    }}
                    aria-invalid={Boolean(scanError)}
                    className={`min-w-0 flex-1 bg-transparent  sm:text-base outline-none text-slate-900  ${
                      scanError
                        ? "placeholder:text-red-500"
                        : "placeholder:text-slate-400"
                    }`}
                    placeholder={scanError || "Enter a public wallet address"}
                    aria-label="Wallet address"
                  />
                </label>
                <button
                  type="button"
                  onClick={scan}
                  disabled={isValidating}
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(37,99,235,.22)] transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 disabled:cursor-wait disabled:opacity-70 sm:min-h-16"
                >
                  {isValidating ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  {isValidating ? "Verifying..." : "Scan Wallet"}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500 sm:text-sm">
            {[
              "Public Data Only",
              "Your Wallet Stays Secure",
              "No Payment Required",
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                {item}
              </span>
            ))}
          </div>

          <div className="mx-auto mt-5 w-fit lg:hidden">
            <ActiveUsers />
          </div>

          <div
            aria-label="Product facts"
            className="mx-auto mt-16 grid max-w-[1040px] grid-cols-2 overflow-hidden border-y border-slate-100 bg-white shadow-[0_8px_28px_rgba(15,23,42,.035)] sm:mt-20 sm:grid-cols-4 sm:rounded-2xl sm:border"
          >
            {heroFacts.map(
              ({ value, label, description, icon: Icon }, index) => (
                <div
                  key={label}
                  className={`flex min-h-[96px] items-center gap-3 px-3 py-5 text-left sm:px-5 ${
                    index % 2 === 0 ? "max-sm:border-r" : ""
                  } ${index < 2 ? "max-sm:border-b" : ""} ${
                    index > 0 ? "sm:border-l" : ""
                  } border-slate-100`}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-blue-100/70 bg-blue-50/60 text-blue-600">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline gap-x-1.5">
                      <strong className="text-base font-semibold tracking-[-.02em] text-slate-950">
                        {value}
                      </strong>
                      <span className="text-xs font-semibold text-slate-700">
                        {label}
                      </span>
                    </span>
                    <span className="mt-1 hidden text-[11px] leading-4 text-slate-500 sm:block">
                      {description}
                    </span>
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
