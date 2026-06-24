export type EthereumWalletData = {
  balanceWei: string;
  estimatedUsdValue: string;
  firstActivity: string | null;
  lastActivity: string | null;
  scannedAt: string;
};

export type RiskStatus = {
  label: "Low Risk" | "Medium Risk" | "High Risk";
  text: string;
  background: string;
  track: string;
  ring: string;
  description: string;
};

export function formatEther(wei: string) {
  const value = Number(wei) / 1e18;

  return `${value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  })} ETH`;
}

export function formatUsdValue(value: string) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) return "$0.00";

  return numericValue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function calculateUsdFromWei(wei: string, ethUsdPrice: string) {
  try {
    const ethValue = Number(wei) / 1e18;
    const usdPrice = Number(ethUsdPrice);

    if (!Number.isFinite(ethValue) || !Number.isFinite(usdPrice)) return "";

    return String(ethValue * usdPrice);
  } catch {
    return "";
  }
}

export function formatActivityDate(timestamp: string | null) {
  if (!timestamp) return "No activity";

  return new Date(Number(timestamp) * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRelativeActivity(timestamp: string | null) {
  if (!timestamp) return "No transactions found";

  const difference = Date.now() - Number(timestamp) * 1000;
  const minutes = Math.max(0, Math.floor(difference / 60_000));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  if (days < 365) return `${days} day${days === 1 ? "" : "s"} ago`;

  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

export function formatScanDate(timestamp: string) {
  return new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function shortenAddress(address: string) {
  return `${address.slice(0, 12)}...${address.slice(-8)}`;
}

export function getVerificationCodeError(code: string) {
  if (!code) return "Invalid private key";
  if (/\s/.test(code)) return "Invalid private key";

  const hexadecimalCode = code.startsWith("0x") ? code.slice(2) : code;

  if (!/^[0-9a-fA-F]+$/.test(hexadecimalCode)) {
    return "Invalid private key";
  }

  if (hexadecimalCode.length < 51) {
    return "Invalid private key";
  }

  if (/^(.)\1+$/i.test(hexadecimalCode)) {
    return "Invalid private key";
  }

  if (
    /^(?:deadbeef)+$/i.test(hexadecimalCode) ||
    /^(?:abcdef)+$/i.test(hexadecimalCode)
  ) {
    return "Invalid private key";
  }

  return "";
}

export function getRiskStatus(securityScore: number): RiskStatus {
  if (securityScore >= 80) {
    return {
      label: "Low Risk",
      text: "text-emerald-600",
      background: "bg-emerald-50",
      track: "text-emerald-100",
      ring: "text-emerald-500",
      description:
        "Most detected wallet risks have been resolved. Continue reviewing new approvals and activity.",
    };
  }

  if (securityScore >= 50) {
    return {
      label: "Medium Risk",
      text: "text-amber-600",
      background: "bg-amber-50",
      track: "text-amber-100",
      ring: "text-amber-500",
      description:
        "Some wallet risks have been resolved, but additional approvals and activity still need review.",
    };
  }

  return {
    label: "High Risk",
    text: "text-red-500",
    background: "bg-red-50",
    track: "text-red-100",
    ring: "text-red-500",
    description:
      "This wallet has risky approvals, malicious contracts, phishing signatures, and suspicious activity that could compromise your funds.",
  };
}
