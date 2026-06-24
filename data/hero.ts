import {
  Activity,
  Database,
  Globe2,
  Users,
} from "lucide-react";

export const heroFacts = [
  {
    value: "120K+",
    label: "Users",
    description: "Growing security community",
    icon: Users,
  },
  {
    value: "100+",
    label: "Networks",
    description: "Leading chains supported",
    icon: Globe2,
  },
  {
    value: "Real-time",
    label: "Risk Detection",
    description: "Fast approval analysis",
    icon: Activity,
  },
  {
    value: "100%",
    label: "Public Data",
    description: "Read-only blockchain analysis",
    icon: Database,
  },
] as const;

export const dashboardFindings = [
  {
    label: "Unlimited approvals",
    value: "2 detected",
    tone: "warning",
  },
  {
    label: "Suspicious contracts",
    value: "1 requires review",
    tone: "danger",
  },
  {
    label: "Recent activity",
    value: "24 interactions",
    tone: "success",
  },
] as const;

export const dashboardActions = [
  "Review the unlimited USDT approval",
  "Verify the flagged contract interaction",
];
