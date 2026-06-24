import {
  tabs,
  type ScanReportRow,
  type ScanReportTab,
} from "@/data/scan-report/mock-data";
import { Check } from "lucide-react";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoWarning } from "react-icons/io5";

type FindingsTableProps = {
  activeTab: ScanReportTab;
  currentPage: number;
  rowsPerPage: number;
  rows: ScanReportRow[];
  visibleRows: ScanReportRow[];
  totalPages: number;
  resolvedIssues: Set<string>;
  remainingCount: (tab: ScanReportTab) => number;
  onSelectTab: (tab: ScanReportTab) => void;
  onRowsPerPageChange: (value: number) => void;
  onPageChange: Dispatch<SetStateAction<number>>;
  onSelectApproval: (row: ScanReportRow) => void;
};

export default function FindingsTable({
  activeTab,
  currentPage,
  rowsPerPage,
  rows,
  visibleRows,
  totalPages,
  resolvedIssues,
  remainingCount,
  onSelectTab,
  onRowsPerPageChange,
  onPageChange,
  onSelectApproval,
}: FindingsTableProps) {
  return (
    <article
      id="report-findings"
      className="mt-6 scroll-mt-24 overflow-hidden rounded-2xl border border-slate-100 bg-white"
    >
      <div className="flex gap-5 overflow-x-auto border-b border-slate-200 px-4 sm:gap-8 sm:px-5">
        {tabs.map(({ label }) => (
          <button
            key={label}
            type="button"
            onClick={() => onSelectTab(label)}
            className={`flex shrink-0 items-center gap-2 border-b-2 py-4 text-xs font-semibold transition-colors ${
              activeTab === label
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-blue-600"
            }`}
          >
            {label}
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] ${
                remainingCount(label) === 0
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-500"
              }`}
            >
              {remainingCount(label)}
            </span>
          </button>
        ))}
      </div>

      <div className="overflow-x-auto p-2 sm:p-4">
        <table className="w-full min-w-[1050px] text-left text-xs">
          <thead className="bg-slate-50/80 text-[10px] uppercase tracking-[.08em] text-slate-500">
            <tr>
              {[
                "Asset",
                "Contract / Event",
                "Interaction",
                "Exposure",
                "Type",
                "Risk Level",
                "Action",
              ].map((heading) => (
                <th key={heading} className="px-4 py-3 font-semibold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => {
              const isResolved = resolvedIssues.has(row.primary);

              return (
                <tr
                  key={`${activeTab}-${row.primary}`}
                  className={`border-b border-slate-100 transition-colors last:border-0 ${
                    isResolved ? "bg-emerald-50/40" : "hover:bg-slate-50"
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={row.logo}
                        alt={`${row.asset} logo`}
                        width={30}
                        height={30}
                        className="h-[30px] w-[30px]"
                      />
                      <div>
                        <p className="font-semibold text-slate-950">{row.asset}</p>
                        <p className="mt-0.5 text-[10px] text-slate-500">
                          {row.symbol}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="max-w-52 truncate font-semibold text-blue-600">
                      {row.primary}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      {row.secondary}
                    </p>
                  </td>
                  <td className="px-4 py-3 font-medium">{row.target}</td>
                  <td
                    className={`px-4 py-3 font-bold ${
                      row.risk === "High" ? "text-red-500" : "text-amber-600"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {row.exposure === "Unlimited" && (
                        <IoWarning className="h-3.5 w-3.5" />
                      )}
                      {row.exposure}
                    </span>
                  </td>
                  <td className="px-4 py-3">{row.type}</td>
                  <td className="px-4 py-3">
                    {isResolved ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                        <Check className="h-3 w-3" />
                        Safe
                      </span>
                    ) : (
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          row.risk === "High"
                            ? "bg-red-50 text-red-500"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {row.risk}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      disabled={isResolved}
                      onClick={() => onSelectApproval(row)}
                    className={`rounded-lg border px-5 py-2.5 text-[10px] font-semibold transition-colors ${
                        isResolved
                          ? "cursor-default border-emerald-200 bg-emerald-50 text-emerald-600"
                          : "border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {isResolved ? (
                        "Fixed"
                      ) : (
                        row.action
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 px-3 py-3 text-xs sm:px-4 md:flex-row md:items-center md:justify-between">
        <label className="flex items-center gap-1.5 text-slate-700">
          Show
          <select
            value={rowsPerPage}
            onChange={(event) =>
              onRowsPerPageChange(Number(event.target.value))
            }
            className="h-8 w-14 rounded-md border border-slate-200 bg-white px-1.5 text-xs outline-none transition-colors focus:border-[#3157ff]"
          >
            {[3, 5, 10, 25].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          of {rows.length} entries
        </label>

        <div className="grid w-full grid-cols-[minmax(52px,auto)_36px_minmax(96px,1fr)_36px_minmax(52px,auto)] gap-1.5 sm:flex sm:w-auto sm:flex-wrap sm:items-center">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(1)}
            className="h-9 min-w-0 rounded-md border border-slate-200 px-2 text-slate-600 transition-colors hover:bg-blue-50 hover:text-[#3157ff] disabled:cursor-not-allowed disabled:opacity-40 sm:px-3"
          >
            First
          </button>
          <button
            type="button"
            aria-label="Previous page"
            disabled={currentPage === 1}
            onClick={() => onPageChange((page) => page - 1)}
            className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-slate-600 transition-colors hover:border-[#3157ff] hover:bg-[#3157ff] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600"
          >
            <FiChevronLeft className="h-4 w-4" />
          </button>
          <span className="flex h-9 min-w-0 items-center justify-center whitespace-nowrap rounded-md border border-slate-200 bg-slate-50 px-1.5 text-[11px] text-slate-600 sm:px-3 sm:text-xs">
            Page&nbsp;{currentPage}&nbsp;of&nbsp;{totalPages}
          </span>
          <button
            type="button"
            aria-label="Next page"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange((page) => page + 1)}
            className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-slate-600 transition-colors hover:border-[#3157ff] hover:bg-[#3157ff] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600"
          >
            <FiChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
            className="h-9 min-w-0 rounded-md border border-slate-200 px-2 text-[#3157ff] transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:text-slate-600 disabled:opacity-40 sm:px-3"
          >
            Last
          </button>
        </div>
      </div>
    </article>
  );
}
