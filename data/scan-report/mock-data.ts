export type ScanReportTab =
  | "Risky Approvals"
  | "Malicious Contracts"
  | "Phishing Signatures"
  | "Suspicious Activity";

export type ScanReportRow = {
  asset: string;
  symbol: string;
  logo: string;
  primary: string;
  secondary: string;
  target: string;
  revokeAddress: string;
  exposure: string;
  type: string;
  risk: "High" | "Medium";
  action: string;
};

export const fallbackAddress =
  "0x742d35Cc6634C0532925a3b844Bc454e438f44e";

export const summaryCards = [
  {
    title: "Risky Approvals" as ScanReportTab,
    value: "12",
    unit: "Approvals",
    badge: "6 Unlimited",
    description: "Tokens approved for spending by third-party contracts.",
    icon: "alert",
  },
  {
    title: "Malicious Contracts" as ScanReportTab,
    value: "5",
    unit: "Contracts",
    badge: "3 High Risk",
    description: "Interactions with contracts flagged as malicious or unsafe.",
    icon: "shield",
  },
  {
    title: "Phishing Signatures" as ScanReportTab,
    value: "7",
    unit: "Signatures",
    badge: "4 Critical",
    description: "Signatures that could authorize malicious wallet actions.",
    icon: "file",
  },
  {
    title: "Suspicious Activity" as ScanReportTab,
    value: "4",
    unit: "Activities",
    badge: "Recent",
    description: "Unusual blockchain activity detected on this wallet.",
    icon: "radar",
  },
];

export const tabs = summaryCards.map(({ title, value }) => ({
  label: title,
  count: value,
}));

const baseTabRows: Record<ScanReportTab, ScanReportRow[]> = {
  "Risky Approvals": [
    {
      asset: "USD Tether",
      symbol: "USDT",
      logo: "/tokens/usdt.svg",
      primary: "0xdAC17F958D2ee523a2206206994597C13...",
      secondary: "Tether: USDT Token",
      target: "0x3CDeF1...aBcd (FakeUSDT Drainer)",
      revokeAddress: "0x3CDeF1a8B7c92E40D6aBcd",
      exposure: "Unlimited",
      type: "ERC-20",
      risk: "High",
      action: "Revoke",
    },
    {
      asset: "Dai Stablecoin",
      symbol: "DAI",
      logo: "/tokens/dai.svg",
      primary: "0x6B175474E89094C44Da98b954EedeAC4...",
      secondary: "Dai Stablecoin",
      target: "0xF2A3bC...9D12 (Dai Unlimited)",
      revokeAddress: "0xF2A3bC781a6D05E42B9D12",
      exposure: "Unlimited",
      type: "ERC-20",
      risk: "High",
      action: "Revoke",
    },
    {
      asset: "Uniswap",
      symbol: "UNI",
      logo: "/tokens/uni.svg",
      primary: "0x1f98431c8aD98523631AE4a59f267346...",
      secondary: "Uniswap Token",
      target: "0xC02aAa...BbAD (Fake Uniswap)",
      revokeAddress: "0xC02aAa9207B33d65E1BbAD",
      exposure: "45,678.123 UNI",
      type: "ERC-20",
      risk: "Medium",
      action: "Revoke",
    },
  ],
  "Malicious Contracts": [
    {
      asset: "Wallet Guard",
      symbol: "WG",
      logo: "/tokens/contract.svg",
      primary: "0x91A7D4...C20F",
      secondary: "Unverified proxy contract",
      target: "Permit transfer request",
      revokeAddress: "0x91A7D4e1B4c608F92AC20F",
      exposure: "Full wallet access",
      type: "Contract",
      risk: "High",
      action: "Revoke",
    },
    {
      asset: "Claim Router",
      symbol: "CR",
      logo: "/tokens/contract.svg",
      primary: "0x77B2E9...4A11",
      secondary: "Known drainer router",
      target: "Batch token transfer",
      revokeAddress: "0x77B2E9aC6D01F48e324A11",
      exposure: "3 token assets",
      type: "Contract",
      risk: "High",
      action: "Revoke",
    },
    {
      asset: "Reward Vault",
      symbol: "RV",
      logo: "/tokens/contract.svg",
      primary: "0x2DF640...8C32",
      secondary: "Recently deployed contract",
      target: "Delegated wallet call",
      revokeAddress: "0x2DF640A9c3875E1B6F8C32",
      exposure: "Unknown",
      type: "Proxy",
      risk: "Medium",
      action: "Revoke",
    },
  ],
  "Phishing Signatures": [
    {
      asset: "Permit Request",
      symbol: "SIG",
      logo: "/tokens/signature.svg",
      primary: "0x095ea7b3",
      secondary: "approve(address,uint256)",
      target: "Fake USDT Approval",
      revokeAddress: "0x3CDeF1a8B7c92E40D6aBcd",
      exposure: "Unlimited spend",
      type: "Signature",
      risk: "High",
      action: "Revoke",
    },
    {
      asset: "Transfer Request",
      symbol: "SIG",
      logo: "/tokens/signature.svg",
      primary: "0x23b872dd",
      secondary: "transferFrom(address,address,uint256)",
      target: "Fake Permit Contract",
      revokeAddress: "0x9E7fA2d410cB28A7122A1B",
      exposure: "Token transfer",
      type: "Signature",
      risk: "High",
      action: "Revoke",
    },
    {
      asset: "NFT Operator",
      symbol: "SIG",
      logo: "/tokens/signature.svg",
      primary: "0xa22cb465",
      secondary: "setApprovalForAll(address,bool)",
      target: "Unknown NFT Marketplace",
      revokeAddress: "0x8C3dF94A730B5c18E66F9A",
      exposure: "All NFT assets",
      type: "Signature",
      risk: "Medium",
      action: "Revoke",
    },
  ],
  "Suspicious Activity": [
    {
      asset: "Rapid Transfers",
      symbol: "TX",
      logo: "/tokens/activity.svg",
      primary: "0xA31F...C882",
      secondary: "Six transfers within two minutes",
      target: "Multiple new recipients",
      revokeAddress: "0xA31F9C2E74D65A1023C882",
      exposure: "2.34 ETH",
      type: "Activity",
      risk: "High",
      action: "Revoke",
    },
    {
      asset: "New Network",
      symbol: "TX",
      logo: "/tokens/activity.svg",
      primary: "0xB98D...712E",
      secondary: "First interaction on an unknown chain",
      target: "Unverified bridge",
      revokeAddress: "0xB98D1A4F7E306C522E712E",
      exposure: "1 token asset",
      type: "Activity",
      risk: "Medium",
      action: "Revoke",
    },
    {
      asset: "Failed Calls",
      symbol: "TX",
      logo: "/tokens/activity.svg",
      primary: "0xC882...1AD0",
      secondary: "Repeated failed contract calls",
      target: "Unknown executor",
      revokeAddress: "0xC882B0917D4E52F3101AD0",
      exposure: "Gas only",
      type: "Activity",
      risk: "Medium",
      action: "Revoke",
    },
  ],
};

const rowCounts: Record<ScanReportTab, number> = {
  "Risky Approvals": 12,
  "Malicious Contracts": 5,
  "Phishing Signatures": 7,
  "Suspicious Activity": 4,
};

export const tabRows = Object.fromEntries(
  (Object.keys(baseTabRows) as ScanReportTab[]).map((tab) => [
    tab,
    Array.from({ length: rowCounts[tab] }, (_, index) => {
      const source = baseTabRows[tab][index % baseTabRows[tab].length];
      const itemNumber = index + 1;

      return {
        ...source,
        asset:
          index < baseTabRows[tab].length
            ? source.asset
            : `${source.asset} ${itemNumber}`,
        primary: `${source.primary.replace(/\.\.\.$/, "")}-${String(itemNumber).padStart(2, "0")}`,
      };
    }),
  ]),
) as Record<ScanReportTab, ScanReportRow[]>;

function addressSeed(address: string) {
  return address
    .toLowerCase()
    .split("")
    .reduce((seed, character) => (seed * 31 + character.charCodeAt(0)) >>> 0, 0);
}

function seededRandom(seed: number) {
  let state = seed || 1;

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function getMockReportRows(address: string) {
  if (address.toLowerCase() === fallbackAddress.toLowerCase()) return tabRows;

  const random = seededRandom(addressSeed(address));

  return Object.fromEntries(
    (Object.keys(baseTabRows) as ScanReportTab[]).map((tab, tabIndex) => {
      const sources = baseTabRows[tab];
      const count = 2 + Math.floor(random() * (tab === "Risky Approvals" ? 8 : 5));

      return [
        tab,
        Array.from({ length: count }, (_, index) => {
          const source =
            sources[Math.floor(random() * sources.length) % sources.length];
          const suffix = `${address.slice(2, 8)}${tabIndex}${String(index + 1).padStart(2, "0")}`;
          return {
            ...source,
            asset: index < sources.length ? source.asset : `${source.asset} ${index + 1}`,
            primary: `${source.primary.replace(/\.\.\.$/, "").split("-")[0]}-${suffix}`,
            revokeAddress: `0x${address.slice(2, 24)}${suffix}`.slice(0, 42),
            risk: "High" as const,
          };
        }),
      ];
    }),
  ) as Record<ScanReportTab, ScanReportRow[]>;
}
