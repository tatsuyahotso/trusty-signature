const ETHERSCAN_API_URL = "https://api.etherscan.io/v2/api";

export type EtherscanResponse<T> = {
  status: string;
  message: string;
  result: T;
};

export type EtherscanTransaction = {
  hash: string;
  timeStamp: string;
  from: string;
  to: string;
  value: string;
  isError?: string;
  functionName?: string;
  contractAddress?: string;
  tokenName?: string;
  tokenSymbol?: string;
  tokenDecimal?: string;
};

export async function etherscanRequest<T>(
  apiKey: string,
  chainId: string,
  params: Record<string, string>,
) {
  const query = new URLSearchParams({
    chainid: chainId,
    apikey: apiKey,
    ...params,
  });
  const response = await fetch(`${ETHERSCAN_API_URL}?${query}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Etherscan is temporarily unavailable.");
  }

  return (await response.json()) as EtherscanResponse<T>;
}

export function normalizeEtherscanList(
  result: EtherscanTransaction[] | string,
) {
  return Array.isArray(result) ? result : [];
}

export function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
