import {
  summaryCards,
  tabs,
  type ScanReportTab,
} from "@/data/scan-report/mock-data";
import { Check } from "lucide-react";
import type { RiskStatus } from "@/utils/scan-report";

type RiskOverviewProps = {
  securityScore: number;
  totalRemainingIssues: number;
  riskStatus: RiskStatus;
  remainingCount: (tab: ScanReportTab) => number;
  onSelectTab: (tab: ScanReportTab, scroll?: boolean) => void;
};

export default function RiskOverview({
  securityScore,
  totalRemainingIssues,
  riskStatus,
  remainingCount,
  onSelectTab,
}: RiskOverviewProps) {
  const reviewNextRisk = () => {
    const nextTab = tabs.find(({ label }) => remainingCount(label) > 0)?.label;
    if (nextTab) onSelectTab(nextTab, true);
  };

  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-[1.12fr_.88fr]">
      <article className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[.12em] text-blue-600">
          Risk overview
        </p>
        <h2 className="mt-3 text-xl font-semibold tracking-[-.025em] text-slate-950">
          Security Risk Score
        </h2>
        <div className="mt-4 grid flex-1 items-center gap-5 sm:grid-cols-[160px_1fr] lg:grid-cols-[180px_1fr] lg:gap-6">
          <div className="relative mx-auto grid h-36 w-36 place-items-center sm:h-40 sm:w-40">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="9"
                className={riskStatus.track}
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="9"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray={`${securityScore} 100`}
                className={`${riskStatus.ring} transition-all duration-700`}
              />
            </svg>
            <div className="absolute text-center">
              <strong className="block text-4xl font-semibold tabular-nums tracking-[-.04em]">
                {securityScore}
              </strong>
              <span className="text-sm font-semibold text-slate-400">/100</span>
            </div>
          </div>
          <div className="flex h-full flex-col justify-center">
            <h3 className={`text-xl font-semibold ${riskStatus.text}`}>
              {riskStatus.label}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
              {riskStatus.description}
            </p>
            <div className="mt-5 grid min-h-[190px] w-full flex-1 grid-cols-2 grid-rows-2 overflow-hidden rounded-2xl border border-slate-100 bg-white">
              {summaryCards.map(({ title }, index) => (
                <div
                  key={title}
                  className={`flex min-h-[94px] flex-col items-center justify-center px-3 py-4 text-center ${
                    index % 2 === 0 ? "border-r border-slate-100/60" : ""
                  } ${index < 2 ? "border-b border-slate-100/60" : ""}`}
                >
                  <p
                    className={`text-2xl font-semibold tracking-[-.025em] ${
                      index === 1
                        ? "text-[#3157ff]"
                        : index === 3
                          ? "text-amber-500"
                          : "text-red-500"
                    }`}
                  >
                    {remainingCount(title)}
                  </p>
                  <p className="mt-2 min-h-9 max-w-28 text-xs leading-4 text-slate-500">
                    <span className="block">{title.split(" ")[0]}</span>
                    <span className="block">
                      {title.split(" ").slice(1).join(" ")}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      <article
        className="relative flex overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 sm:p-8"
      >
        <div className="z-10 flex w-full max-w-[470px] flex-col">
          <p className="text-xs font-semibold uppercase tracking-[.12em] text-blue-600">
            Recommended action
          </p>
          <h2
            className={`mt-3 text-xl font-semibold tracking-[-.025em] ${
              totalRemainingIssues === 0
                ? "text-emerald-600"
                : securityScore >= 50
                  ? "text-amber-600"
                  : "text-red-500"
            }`}
          >
            {totalRemainingIssues === 0
              ? "All Issues Resolved"
              : securityScore >= 50
                ? "Continue Reviewing Risks"
                : "Immediate Action Recommended"}
          </h2>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
            {totalRemainingIssues === 0
              ? "All detected wallet risks have been fixed. Continue monitoring your wallet for new approvals and suspicious activity."
              : `${totalRemainingIssues} detected issue${
                  totalRemainingIssues === 1 ? "" : "s"
                } still require your attention.`}
          </p>

          <div className="mt-6 grid gap-3">
            {[
              {
                title: "Review highest-risk permissions first",
                description: "Start with unlimited approvals and flagged contracts.",
              },
              {
                title: "Verify unfamiliar interactions",
                description: "Compare each contract with your recent wallet activity.",
              },
              {
                title: "Re-scan after resolving findings",
                description: "Confirm your score improves after each completed action.",
              },
            ].map(({ title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-slate-100 bg-white p-3.5"
              >
                <p className="line-clamp-2 text-xs font-semibold leading-4 text-slate-800">
                  {title}
                </p>
                <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-500">
                  {description}
                </p>
              </div>
            ))}
          </div>

          {totalRemainingIssues === 0 ? (
            <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white">
              <Check className="h-4 w-4" />
              Wallet Protected
            </div>
          ) : (
            <button
              type="button"
              onClick={reviewNextRisk}
              className={`mt-6 inline-flex w-fit items-center rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors ${
                securityScore >= 50
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              Review Risks
            </button>
          )}
        </div>
      </article>
    </div>
  );
}
