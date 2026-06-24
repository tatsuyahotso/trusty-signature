import { Eye, ShieldCheck, UserRoundCheck } from "lucide-react";

export const securityPrinciples = [
  {
    title: "Read-only Analysis",
    description:
      "We inspect public records without requesting wallet permissions.",
    icon: Eye,
  },
  {
    title: "Non-Custodial",
    description: "Your wallet, assets, and private keys always remain yours.",
    icon: ShieldCheck,
  },
  {
    title: "You Stay in Control",
    description: "You decide what action to take and when, with confidence.",
    icon: UserRoundCheck,
  },
];

export const trustPoints = [
  "Public blockchain analysis only",
  "Transparent risk scoring",
  "No sensitive credentials collected",
  "Security-first architecture",
  "Clear and understandable reports",
];
