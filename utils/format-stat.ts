export function formatStat(value: number, label: string) {
  if (label === "Uptime") return `${value.toFixed(1)}%`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M+`;
  if (value >= 1_000) return `${Math.floor(value / 1_000)}K+`;
  return `${Math.floor(value)}+`;
}
