import { networkRows } from "@/data/networks";
import Image from "next/image";
import { createElement } from "react";
export default function Networks() {
  return (
    <section
      id="networks"
      className="scroll-mt-[78px] overflow-hidden bg-[#f8faff] py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-4 text-left sm:px-6 sm:text-center lg:px-8">
        <div className="max-w-[600px] sm:mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-blue-600">
            Supported networks
          </p>
          <h2 className="mt-5 max-w-[350px] text-[34px] font-semibold leading-tight tracking-[-.045em] text-slate-950 sm:mx-auto sm:max-w-none sm:text-[48px]">
            Security across the chains you trust.
          </h2>
          <p className="mt-5 line-clamp-2 max-w-[620px] text-base leading-7 text-slate-600 sm:mx-auto sm:text-lg sm:leading-8">
            Protect assets across multiple networks.
          </p>
        </div>
      </div>

      <div className="mt-10 space-y-3 sm:mt-14 sm:space-y-4">
        {networkRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="network-marquee-mask group overflow-hidden"
          >
            <div
              className={`flex w-max gap-4 px-2 ${
                rowIndex === 0
                  ? "network-marquee-forward"
                  : "network-marquee-reverse"
              } group-hover:[animation-play-state:paused]`}
            >
              {[...row, ...row].map(
                (
                  { name, description, background, ...network },
                  index,
                ) => (
                  <article
                    key={`${name}-${index}`}
                    aria-hidden={index >= row.length}
                    className="flex w-[220px] shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:w-[260px] sm:gap-4 sm:p-5"
                  >
                    <span
                      className={`grid h-13 w-13 shrink-0 place-items-center rounded-2xl ${background}`}
                    >
                      {"image" in network && network.image ? (
                        <Image
                          src={network.image}
                          alt=""
                          width={40}
                          height={40}
                          className="h-10 w-10"
                        />
                      ) : (
                        createElement(network.icon!, {
                          className: `h-7 w-7 ${network.color}`,
                        })
                      )}
                    </span>
                    <div className="text-left">
                      <h3 className="text-base font-bold text-[#0a1025]">
                        {name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {description}
                      </p>
                    </div>
                  </article>
                ),
              )}
            </div>
          </div>
        ))}
      </div>

      {/* <p className="mx-auto mt-10 px-5 text-center text-sm font-medium text-slate-500">
        More network integrations are added as the Web3 ecosystem grows.
      </p> */}
    </section>
  );
}
