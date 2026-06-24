import { workflowSteps } from "@/data/features";
import { ArrowRight } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[700px] text-left sm:text-center">
          <p className="text-xs  font-semibold uppercase tracking-[.14em] text-blue-600">
            How it works
          </p>
          <h2 className="mt-5 text-[34px] font-semibold tracking-[-.045em]  text-slate-950 sm:text-[48px]">
           Protect Your Wallet
          </h2>
          <p className="mt-5 max-w-[320px] sm:mx-auto text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Receive a clear, read-only report without connecting your wallet.
          </p>
        </div>

        <div className="relative mt-16 grid gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="absolute left-[16.66%] right-[16.66%] top-5 hidden h-px bg-slate-200 lg:block" />
          {workflowSteps.map((step, index) => (
            <article key={step.number} className="relative text-center">
              <span className="relative z-10 mx-auto grid h-10 w-10 place-items-center rounded-full border border-slate-100 bg-white text-xs font-semibold text-blue-600 shadow-xs">
                {step.number}
              </span>
              <h3 className="mt-6 text-lg font-semibold text-slate-950">
                {step.title}
              </h3>
              <p className="mx-auto mt-3 line-clamp-2 max-w-[320px] text-sm leading-6 text-slate-600">
                {step.description}
              </p>
              {index < workflowSteps.length - 1 && (
                <ArrowRight className="mx-auto mt-8 h-4 w-4 rotate-90 text-slate-300 lg:hidden" />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
