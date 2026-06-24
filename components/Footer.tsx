"use client";

import { footerColumns } from "@/data/footer";
import { useNewsletter } from "@/hooks/useNewsletter";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  LoaderCircle,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const { email, error, isSuccess, isSubmitting, changeEmail, subscribe } =
    useNewsletter();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-16 sm:grid-cols-2 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_.65fr_1.35fr] lg:px-8">
        <div>
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
          <p className="mt-5 line-clamp-2 max-w-[320px] text-sm leading-6 text-slate-600">
            Clear Web3 security for wallet signatures, token approvals, and
            on-chain activity.
          </p>
          <div className="mt-5 flex gap-2.5">
            <Link
              href="#"
              aria-label="X"
              className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:border-[#3157ff] hover:bg-blue-50 hover:text-[#3157ff]"
            >
              <FaXTwitter className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              aria-label="Discord"
              className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-[#3157ff] hover:bg-blue-50 hover:text-[#3157ff]"
            >
              <FaDiscord className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3 className="text-xs font-semibold uppercase tracking-[.14em] text-blue-600">
              {column.title}
            </h3>
            <ul className="mt-5 space-y-3.5">
              {column.links.map((link) => (
                <li key={link}>
                  <Link
                    href={`/#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="text-xs font-semibold uppercase tracking-[.14em] text-blue-600">
            Stay Updated
          </h3>
          <p className="mt-5 line-clamp-2 max-w-[480px] text-sm leading-6 text-slate-600">
            Get exclusive security tips and product updates straight to your
            inbox.
          </p>
          <form
            className="mt-6 w-full max-w-[560px]"
            onSubmit={subscribe}
            noValidate
          >
            <div className="rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_6px_18px_rgba(15,23,42,.05)]">
              <div className="flex flex-col gap-2 sm:flex-row">
                <label
                  className={`flex min-h-11 flex-1 items-center gap-2.5 rounded-lg border px-3 transition-all ${
                    error
                      ? "border-red-400 ring-4 ring-red-50"
                      : "border-blue-100 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50"
                  }`}
                >
                  <Mail
                    className={`h-4 w-4 shrink-0 ${
                      error ? "text-red-500" : "text-slate-400"
                    }`}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => changeEmail(event.target.value)}
                    aria-label="Email address"
                    aria-invalid={Boolean(error)}
                    aria-describedby={
                      isSuccess ? "newsletter-success" : undefined
                    }
                    placeholder={error || "Enter your email"}
                    disabled={isSubmitting}
                    className={`min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none disabled:cursor-wait ${
                      error
                        ? "placeholder:text-red-500"
                        : "placeholder:text-slate-400"
                    }`}
                  />
                </label>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-[0_5px_12px_rgba(37,99,235,.18)] transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 disabled:cursor-wait disabled:opacity-75 sm:w-auto"
                >
                  {isSubmitting ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                  <span>{isSubmitting ? "Checking..." : "Subscribe"}</span>
                </button>
              </div>
            </div>
            {isSuccess && (
              <p
                id="newsletter-success"
                role="status"
                className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-600"
              >
                <CheckCircle2 className="h-4 w-4" />
                You&apos;re subscribed successfully.
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-4 py-6 text-center text-xs font-medium text-slate-500 sm:flex-row sm:px-6 sm:text-left sm:text-sm lg:px-8">
          <p>TrustySignatures © {new Date().getFullYear()}</p>
          <p className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-end">
            Made with
            <Heart className="h-3.5 w-3.5 fill-[#3157ff] text-[#3157ff]" />
            by the team behind
            <Link
              href="https://etherscan.io"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Etherscan
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
