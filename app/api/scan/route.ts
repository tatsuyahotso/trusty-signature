import { freeEtherscanChains } from "@/data/supported-chains";
import {
  etherscanRequest,
  normalizeEtherscanList,
  wait,
  type EtherscanTransaction,
} from "@/utils/etherscan-service";
import {
  calculateUsdFromWei,
} from "@/utils/scan-report";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.ETHERSCAN_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { message: "ETHERSCAN_API_KEY is not configured." },
      { status: 500 },
    );
  }

  const { address, validateOnly } = (await request.json()) as {
    address?: string;
    validateOnly?: boolean;
  };

  if (!address) {
    return NextResponse.json({ message: "Invalid address" }, { status: 400 });
  }

  try {
    if (validateOnly) {
      const [balanceResponse, firstActivityResponse, lastActivityResponse] =
        await Promise.all([
          etherscanRequest<string>(apiKey, "1", {
            module: "account",
            action: "balance",
            address,
            tag: "latest",
          }),
          etherscanRequest<EtherscanTransaction[] | string>(apiKey, "1", {
            module: "account",
            action: "txlist",
            address,
            startblock: "0",
            endblock: "9999999999",
            page: "1",
            offset: "1",
            sort: "asc",
          }),
          etherscanRequest<EtherscanTransaction[] | string>(apiKey, "1", {
            module: "account",
            action: "txlist",
            address,
            startblock: "0",
            endblock: "9999999999",
            page: "1",
            offset: "1",
            sort: "desc",
          }),
        ]);

      await wait(1100);

      const ethPriceResponse = await etherscanRequest<{ ethusd: string }>(
        apiKey,
        "1",
        {
          module: "stats",
          action: "ethprice",
        },
      );

      if (balanceResponse.status !== "1") {
        return NextResponse.json(
          {
            valid: false,
            message:
              typeof balanceResponse.result === "string"
                ? balanceResponse.result
                : "Ethereum could not verify this wallet address.",
          },
          { status: 422 },
        );
      }

      return NextResponse.json({
        valid: true,
        reportEligible: true,
        address,
        balanceWei: balanceResponse.result,
        estimatedUsdValue:
          ethPriceResponse.status === "1"
            ? calculateUsdFromWei(
                balanceResponse.result,
                ethPriceResponse.result.ethusd,
              )
            : "",
        scannedAt: new Date().toISOString(),
        firstActivity:
          normalizeEtherscanList(firstActivityResponse.result)[0]?.timeStamp ||
          null,
        lastActivity:
          normalizeEtherscanList(lastActivityResponse.result)[0]?.timeStamp ||
          null,
      });
    }

    const chains = [];

    // The free plan allows three calls per second. Each chain uses exactly
    // three calls, followed by a pause before scanning the next chain.
    for (const chain of freeEtherscanChains) {
      const [balanceResponse, transactionsResponse, transfersResponse] =
        await Promise.all([
          etherscanRequest<string>(apiKey, chain.chainId, {
            module: "account",
            action: "balance",
            address,
            tag: "latest",
          }),
          etherscanRequest<EtherscanTransaction[] | string>(
            apiKey,
            chain.chainId,
            {
              module: "account",
              action: "txlist",
              address,
              startblock: "0",
              endblock: "9999999999",
              page: "1",
              offset: "5",
              sort: "desc",
            },
          ),
          etherscanRequest<EtherscanTransaction[] | string>(
            apiKey,
            chain.chainId,
            {
              module: "account",
              action: "tokentx",
              address,
              startblock: "0",
              endblock: "9999999999",
              page: "1",
              offset: "10",
              sort: "desc",
            },
          ),
        ]);

      const balanceAvailable = balanceResponse.status === "1";

      chains.push({
        ...chain,
        balanceWei: balanceAvailable ? balanceResponse.result : "0",
        available: balanceAvailable,
        message: balanceAvailable
          ? null
          : typeof balanceResponse.result === "string"
            ? balanceResponse.result
            : "Data unavailable.",
        recentTransactions: normalizeEtherscanList(transactionsResponse.result),
        tokenTransfers: normalizeEtherscanList(transfersResponse.result),
      });

      if (chain !== freeEtherscanChains[freeEtherscanChains.length - 1]) {
        await wait(1100);
      }
    }

    return NextResponse.json({
      address,
      chains,
      scannedAt: new Date().toISOString(),
      disclaimer:
        "Token entries are observed from recent ERC-20 transfer history and are not a complete list of current holdings.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to scan this address.";

    return NextResponse.json({ message }, { status: 502 });
  }
}
