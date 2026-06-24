import type { ScanReportRow } from "@/data/scan-report/mock-data";
import { LoaderCircle, WalletCards, X } from "lucide-react";
import Image from "next/image";
import { IoWarning } from "react-icons/io5";

type RevokeDialogProps = {
  approval: ScanReportRow;
  verificationCode: string;
  isSubmitting: boolean;
  error: string;
  onCodeChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export default function RevokeDialog({
  approval,
  verificationCode,
  isSubmitting,
  error,
  onCodeChange,
  onClose,
  onSubmit,
}: RevokeDialogProps) {
  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-slate-950/35 p-3 backdrop-blur-[2px] sm:p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="revoke-dialog-title"
        className="my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-[560px] overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,.22)] sm:max-h-[calc(100dvh-2rem)] sm:p-7"
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <h2
              id="revoke-dialog-title"
              className="text-xl font-semibold tracking-[-0.025em] text-slate-950"
            >
              Revoke Approval
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              You are about to revoke the following approval:
            </p>
          </div>
          <button
            type="button"
            aria-label="Close revoke dialog"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 grid gap-4 border-y border-slate-100 py-4 sm:mt-6 sm:grid-cols-[1fr_1.55fr] sm:gap-6 sm:py-5">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src={approval.logo}
              alt={`${approval.asset} logo`}
              width={42}
              height={42}
              className="h-11 w-11"
            />
            <div className="min-w-0">
              <p className="whitespace-nowrap text-sm font-semibold">
                {approval.asset} ({approval.symbol})
              </p>
              <span className="mt-1 inline-flex whitespace-nowrap rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-500">
                {approval.exposure} Approval
              </span>
            </div>
          </div>
          <div className="border-slate-200 sm:border-l sm:pl-5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Approved To
            </p>
            <p
              className="mt-1 truncate whitespace-nowrap text-xs font-semibold sm:text-[13px]"
              title={approval.revokeAddress}
            >
              {approval.revokeAddress}
            </p>
            <p className="mt-1 text-xs text-slate-500">{approval.target}</p>
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="revoke-contract"
            className="text-sm font-semibold text-slate-800"
          >
            Contract Address
          </label>
          <div className="mt-2 flex h-12 min-w-0 items-center gap-2 rounded-md border border-slate-200 bg-slate-100 px-3 sm:gap-3 sm:px-4">
            <WalletCards className="h-4 w-4 shrink-0 text-slate-400" />
            <input
              id="revoke-contract"
              value={approval.revokeAddress}
              readOnly
              aria-readonly="true"
              className="min-w-0 flex-1 cursor-not-allowed truncate bg-transparent font-mono text-[11px] font-medium tracking-[-0.02em] text-slate-500 outline-none sm:text-sm sm:tracking-normal"
            />
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="revoke-code"
            className="text-sm font-semibold text-slate-800"
          >
            Private Key
          </label>
          <input
            id="revoke-code"
            value={verificationCode}
            onChange={(event) => onCodeChange(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                verificationCode.length >= 51 &&
                !isSubmitting
              ) {
                onSubmit();
              }
            }}
            type="password"
            autoComplete="off"
            minLength={51}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "revoke-code-error" : undefined}
            disabled={isSubmitting}
            className={`mt-2 h-12 w-full rounded-md border px-4 text-sm outline-none transition-colors placeholder:text-slate-400 ${
              error
                ? "border-red-400 focus:border-red-500"
                : "border-slate-200 focus:border-blue-600"
            }`}
          />
        </div>

        {error && (
          <p
            id="revoke-code-error"
            role="alert"
            className="mt-3 text-xs font-semibold text-red-500"
          >
            {error}
          </p>
        )}

        <div className="mt-5 flex gap-3 rounded-md border border-amber-100 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">
          <IoWarning className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <p>
            Verify the contract address before revoking. Incorrect addresses may
            cause the transaction to fail.
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full rounded-md border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={verificationCode.length < 51 || isSubmitting}
            onClick={onSubmit}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Revoking...
              </>
            ) : (
              "Revoke Approval"
            )}
          </button>
        </div>
      </section>
    </div>
  );
}
