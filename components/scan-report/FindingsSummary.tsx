import {
  summaryCards,
  type ScanReportTab,
} from "@/data/scan-report/mock-data";
import {
  AlertTriangle,
  Check,
  FileWarning,
  Radar,
  ShieldAlert,
} from "lucide-react";

const summaryIcons = {
  alert: AlertTriangle,
  shield: ShieldAlert,
  file: FileWarning,
  radar: Radar,
};

type FindingsSummaryProps = {
  remainingCount: (tab: ScanReportTab) => number;
  onSelectTab: (tab: ScanReportTab, scroll?: boolean) => void;
};

export default function FindingsSummary({
  remainingCount,
  onSelectTab,
}: FindingsSummaryProps) {
  return (
    <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
      {summaryCards.map(({ title, unit, description, icon }) => {
        const Icon = summaryIcons[icon as keyof typeof summaryIcons];
        const count = remainingCount(title);
        const isResolved = count === 0;

        return (
          <article
            key={title}
            className="rounded-2xl border border-slate-100 bg-white p-5 transition-colors hover:border-slate-200 sm:p-6"
          >
            <button
              type="button"
              onClick={() => onSelectTab(title, true)}
              className="w-full text-left"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-xl ${
                    isResolved
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {isResolved ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </span>
                <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
              </div>
              <div className="mt-4 flex flex-wrap items-end gap-2 sm:mt-5">
                <strong
                  className={`text-3xl font-semibold tracking-[-.035em] ${
                    isResolved ? "text-emerald-600" : ""
                  }`}
                >
                  {count}
                </strong>
                <span className="mb-1 text-xs text-slate-500">{unit}</span>
                <span
                  className={`mb-0.5 rounded-full px-2.5 py-1 text-[10px] font-bold sm:ml-2 ${
                    isResolved
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {isResolved ? "Resolved" : `${count} detected`}
                </span>
              </div>
              <p className="mt-3 min-h-10 text-xs leading-5 text-slate-500">
                {isResolved
                  ? `All detected ${title.toLowerCase()} have been fixed.`
                  : description}
              </p>
            </button>
          </article>
        );
      })}
    </div>
  );
}
