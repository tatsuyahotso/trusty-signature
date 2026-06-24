import { securityPrinciples } from "@/data/about";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-[78px] bg-white py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div className="sm:text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[.14em] text-blue-600">
              Security principles
            </p>
            <h2 className="mt-5 text-[34px] font-semibold leading-tight tracking-[-.045em] text-slate-950 sm:text-[48px] lg:text-[56px]">
              Built Around Privacy
            </h2>
            <p className="mt-5 line-clamp-2 max-w-[540px] text-base leading-7 text-slate-600 sm:mx-auto sm:text-lg sm:leading-8 lg:mx-0">
              Review wallet activity securely without connecting your wallet.
            </p>
          </div>

          <div className="grid gap-4">
            {securityPrinciples.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-[56px_1fr] sm:items-center sm:p-8"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-blue-600">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">
                    {title}
                  </h3>
                  <p className="mt-2 line-clamp-2 max-w-[520px] text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
