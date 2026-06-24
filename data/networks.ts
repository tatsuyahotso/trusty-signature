import {
  SiAlgorand,
  SiBinance,
  SiCardano,
  SiChainlink,
  SiCoinbase,
  SiFantom,
  SiNear,
  SiOptimism,
  SiPolkadot,
  SiPolygon,
  SiSolana,
} from "react-icons/si";

export const supportedNetworks = [
  {
    name: "Ethereum",
    description: "Mainnet",
    image: "/networks/ethereum.svg",
    background: "bg-transparent",
  },
  {
    name: "Polygon",
    description: "PoS",
    icon: SiPolygon,
    color: "text-[#8247E5]",
    background: "bg-[#8247E5]/10",
  },
  {
    name: "Optimism",
    description: "Layer 2",
    icon: SiOptimism,
    color: "text-[#FF0420]",
    background: "bg-[#FF0420]/10",
  },
  {
    name: "BNB Chain",
    description: "BSC",
    icon: SiBinance,
    color: "text-[#F3BA2F]",
    background: "bg-[#F3BA2F]/10",
  },
  {
    name: "Fantom",
    description: "Opera",
    icon: SiFantom,
    color: "text-[#1969FF]",
    background: "bg-[#1969FF]/10",
  },
  {
    name: "Solana",
    description: "Mainnet",
    icon: SiSolana,
    color: "text-[#14F195]",
    background: "bg-[#14F195]/10",
  },
  {
    name: "Base",
    description: "Layer 2",
    icon: SiCoinbase,
    color: "text-[#0052FF]",
    background: "bg-[#0052FF]/10",
  },
  {
    name: "Chainlink",
    description: "Oracle Network",
    icon: SiChainlink,
    color: "text-[#2A5ADA]",
    background: "bg-[#2A5ADA]/10",
  },
  {
    name: "NEAR",
    description: "Mainnet",
    icon: SiNear,
    color: "text-slate-900",
    background: "bg-slate-100",
  },
  {
    name: "Polkadot",
    description: "Relay Chain",
    icon: SiPolkadot,
    color: "text-[#E6007A]",
    background: "bg-[#E6007A]/10",
  },
  {
    name: "Cardano",
    description: "Mainnet",
    icon: SiCardano,
    color: "text-[#0033AD]",
    background: "bg-[#0033AD]/10",
  },
  {
    name: "Algorand",
    description: "Mainnet",
    icon: SiAlgorand,
    color: "text-slate-900",
    background: "bg-slate-100",
  },
];

export const networkRows = [
  supportedNetworks.slice(0, 6),
  supportedNetworks.slice(6),
];
