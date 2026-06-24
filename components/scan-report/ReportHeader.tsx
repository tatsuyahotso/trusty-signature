import {
  formatScanDate,
  type EthereumWalletData,
  type RiskStatus,
} from "@/utils/scan-report";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type ReportHeaderProps = {
  riskStatus: RiskStatus;
  walletData: EthereumWalletData | null;
  isWalletDataLoading: boolean;
};

export default function ReportHeader({
  riskStatus,
  walletData,
  isWalletDataLoading,
}: ReportHeaderProps) {
  return (
    <>
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[.14em] text-blue-600">
            Wallet security
          </p>
          <h1 className="mt-4 text-[36px] font-semibold leading-tight tracking-[-.045em] text-slate-950 sm:text-[48px]">
            Scan Report
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            {isWalletDataLoading
              ? "Finalizing blockchain data…"
              : walletData
                ? `Scanned ${formatScanDate(walletData.scannedAt)}`
                : "Public wallet analysis complete"}
          </p>
        </div>
        <span
          className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${riskStatus.background} ${riskStatus.text}`}
        >
          {riskStatus.label}
        </span>
      </div>

      {/* <article className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white">
        <div className="flex flex-col gap-5 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-center gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50">
              <Image
                src="/networks/ethereum.svg"
                alt="Ethereum"
                width={36}
                height={36}
                className="h-9 w-9"
              />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500">
                Ethereum wallet
              </p>
              <div className="mt-1 flex min-w-0 items-center gap-2">
                <p className="font-mono text-sm font-semibold text-slate-950 md:hidden">
                  {shortenAddress(address)}
                </p>
                <p
                  className="hidden max-w-[min(60vw,620px)] truncate whitespace-nowrap font-mono text-sm font-semibold text-slate-950 md:block"
                  title={address}
                >
                  {address}
                </p>
                <button
                  type="button"
                  aria-label="Copy wallet address"
                  onClick={onCopyAddress}
                  className="text-slate-400 transition-colors hover:text-blue-600"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <Link
            href={`https://etherscan.io/address/${address}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 text-xs font-semibold text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            View on Etherscan
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          <ReportDetail
            label="EST. USD VALUE"
            value={
              walletData?.estimatedUsdValue
                ? formatUsdValue(walletData.estimatedUsdValue)
                : undefined
            }
            subvalue={walletData ? "Based on Etherscan ETH price" : undefined}
            isLoading={isWalletDataLoading}
            error={walletDataError}
            className="sm:border-r"
          />
          <ReportDetail
            label="NATIVE BALANCE"
            value={walletData ? formatEther(walletData.balanceWei) : undefined}
            subvalue={walletData ? "Live Ethereum balance" : undefined}
            isLoading={isWalletDataLoading}
            error={walletDataError}
            className="max-sm:border-t lg:border-r"
          />
          <ReportDetail
            label="First Activity"
            value={
              walletData
                ? formatActivityDate(walletData.firstActivity)
                : undefined
            }
            subvalue={
              walletData
                ? formatRelativeActivity(walletData.firstActivity)
                : undefined
            }
            isLoading={isWalletDataLoading}
            error={walletDataError}
            className="border-t sm:border-r lg:border-t-0"
          />
          <ReportDetail
            label="Last Activity"
            value={
              walletData
                ? formatActivityDate(walletData.lastActivity)
                : undefined
            }
            subvalue={
              walletData
                ? formatRelativeActivity(walletData.lastActivity)
                : undefined
            }
            isLoading={isWalletDataLoading}
            error={walletDataError}
            className="border-t lg:border-t-0"
          />
        </div>
      </article> */}
    </>
  );
}

// function ReportDetail({
//   label,
//   value,
//   subvalue,
//   icon = false,
//   isLoading = false,
//   error = "",
//   className = "",
// }: {
//   label: string;
//   value?: string;
//   subvalue?: string;
//   icon?: boolean;
//   isLoading?: boolean;
//   error?: string;
//   className?: string;
// }) {
//   return (
//     <div className={`border-slate-100 p-5 sm:p-6 ${className}`}>
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       {isLoading ? (
//         <div className="mt-3 space-y-2">
//           <Skeleton className="h-3.5 w-20" />
//           <Skeleton className="h-3 w-24" />
//         </div>
//       ) : error ? (
//         <p className="mt-2 text-sm font-semibold text-slate-400">Unavailable</p>
//       ) : (
//         <>
//           <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-950">
//             {icon && (
//               <Image
//                 src="/networks/ethereum.svg"
//                 alt="Ethereum"
//                 width={18}
//                 height={18}
//                 className="h-[18px] w-[18px]"
//               />
//             )}
//             {value}
//           </p>
//           {subvalue && (
//             <p className="mt-1 text-xs text-slate-500">{subvalue}</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// }
//
// function Skeleton({ className }: { className: string }) {
//   return (
//     <span
//       aria-hidden="true"
//       className={`block animate-pulse rounded bg-slate-200/80 ${className}`}
//     />
//   );
// }
