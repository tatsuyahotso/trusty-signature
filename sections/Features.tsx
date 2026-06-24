import { featureCards } from "@/data/features";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-[78px] border-y border-slate-200 bg-slate-50 px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[700px] text-center">
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-blue-600">
            Features
          </p>
          <h2 className="mt-5 text-[34px] font-semibold leading-tight tracking-[-.045em] text-slate-950 sm:text-[48px]">
            Understand your wallet security with confidence.{" "}
          </h2>
          <p className="mx-auto mt-5 line-clamp-2 max-w-[620px] text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Clear insights into wallet security.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1040px] gap-4 md:grid-cols-3">
          {featureCards.map(({ title, description, icon: Icon }, index) => (
            <article
              key={title}
              className="flex min-h-[200px] flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-blue-600">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-auto pt-6">
                <h3 className="text-xl font-semibold tracking-[-.025em] text-slate-950">
                  {title}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-4 flex max-w-[1040px] flex-col items-start justify-between gap-7 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-sm font-semibold text-emerald-600">
              Stay ahead of wallet risks
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-.03em] text-slate-950 sm:text-3xl">
              Get a clearer view of your wallet security.
            </h3>
            <p className="mt-3 line-clamp-2 max-w-[580px] text-base leading-7 text-slate-600">
              Scan any public wallet address in seconds—no payment required.
            </p>
          </div>
          <Link
            href="#home"
            className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(37,99,235,.2)] transition-colors hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:w-auto"
          >
            Scan your wallet
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
