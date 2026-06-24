"use client";

import FindingsSummary from "@/components/scan-report/FindingsSummary";
import FindingsTable from "@/components/scan-report/FindingsTable";
import ReportHeader from "@/components/scan-report/ReportHeader";
import RevokeDialog from "@/components/scan-report/RevokeDialog";
import RiskOverview from "@/components/scan-report/RiskOverview";
import Header from "@/components/Header";
import ScrollAnimations from "@/components/ScrollAnimations";
import { useScanReport } from "@/hooks/useScanReport";

export default function ScanReport() {
  const report = useScanReport();

  if (report.isReportInitializing) {
    return <ScanReportSkeleton />;
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Header hideNavigation />

      <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <ReportHeader
          riskStatus={report.riskStatus}
          walletData={report.walletData}
          isWalletDataLoading={report.isWalletDataLoading}
        />

        <RiskOverview
          securityScore={report.securityScore}
          totalRemainingIssues={report.totalRemainingIssues}
          riskStatus={report.riskStatus}
          remainingCount={report.remainingCount}
          onSelectTab={report.selectTab}
        />

        <FindingsSummary
          remainingCount={report.remainingCount}
          onSelectTab={report.selectTab}
        />

        <FindingsTable
          activeTab={report.activeTab}
          currentPage={report.currentPage}
          rowsPerPage={report.rowsPerPage}
          rows={report.rows}
          visibleRows={report.visibleRows}
          totalPages={report.totalPages}
          resolvedIssues={report.resolvedIssues}
          remainingCount={report.remainingCount}
          onSelectTab={report.selectTab}
          onRowsPerPageChange={report.changeRowsPerPage}
          onPageChange={report.setCurrentPage}
          onSelectApproval={report.setSelectedApproval}
        />
      </section>

      {report.selectedApproval && (
        <RevokeDialog
          approval={report.selectedApproval}
          verificationCode={report.verificationCode}
          isSubmitting={report.isSubmittingRevoke}
          error={report.revokeError}
          onCodeChange={report.changeVerificationCode}
          onClose={report.closeRevokeModal}
          onSubmit={report.submitRevoke}
        />
      )}

      <ScrollAnimations />
    </main>
  );
}

export function ScanReportSkeleton() {
  return (
    <main
      className="min-h-screen bg-slate-50 text-slate-950"
      aria-busy="true"
      aria-live="polite"
    >
      <Header hideNavigation />
      <span className="sr-only">Loading scan report...</span>
      <section className="mx-auto max-w-[1280px] animate-pulse px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="h-4 w-24 rounded bg-slate-200" />
        <div className="mt-8 h-3 w-28 rounded bg-blue-100" />
        <div className="mt-4 h-12 w-56 rounded bg-slate-200" />
        <div className="mt-3 h-4 w-48 rounded bg-slate-200" />

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white">
          <div className="flex items-center gap-4 border-b border-slate-100 p-6">
            <div className="h-11 w-11 rounded-xl bg-slate-200" />
            <div className="space-y-2">
              <div className="h-3 w-24 rounded bg-slate-200" />
              <div className="h-4 w-64 max-w-full rounded bg-slate-200" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="border-slate-100 p-6 sm:border-r">
                <div className="h-3 w-20 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-28 rounded bg-slate-200" />
                <div className="mt-2 h-3 w-24 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.12fr_.88fr]">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="min-h-[360px] rounded-2xl border border-slate-100 bg-white p-7"
            >
              <div className="h-3 w-28 rounded bg-blue-100" />
              <div className="mt-4 h-6 w-48 rounded bg-slate-200" />
              <div className="mt-8 h-48 rounded-xl bg-slate-100" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
