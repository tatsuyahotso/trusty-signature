import { FileCheck2, ScanSearch, ShieldAlert } from "lucide-react";

export const featureCards = [
  {
    title: "Approval Exposure",
    description:
      "Quickly identify smart contracts that still have permission to spend your assets.",
    icon: ShieldAlert,
  },
  {
    title: "Contract Reputation",
    description:
      "Identify suspicious contracts, phishing attempts, and malicious approvals early.",
    icon: ScanSearch,
  },
  {
    title: "Wallet Health Report",
    description:
      "Get a clear security score with practical recommendations for your wallet.",
    icon: FileCheck2,
  },
];

export const workflowSteps = [
  {
    number: "01",
    title: "Enter a public wallet address",
    description: "Paste any supported public address without connecting.",
  },
  {
    number: "02",
    title: "Analyze approvals and activity",
    description:
      "We inspect public permissions, contracts, and wallet activity.",
  },
  {
    number: "03",
    title: "Receive a security report",
    description:
      "Get a clear risk score with recommended actions.",
  },
];
