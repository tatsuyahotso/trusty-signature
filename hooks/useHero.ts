"use client";

import { isPlausibleWalletAddress } from "@/utils/wallet-address";
import { useState } from "react";

export function useHero() {
  const [address, setAddress] = useState("");
  const [scanError, setScanError] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const changeAddress = (value: string) => {
    setAddress(value);
    if (scanError) setScanError("");
  };

  const scan = async () => {
    const value = address.trim();
    setScanError("");

    if (!value) {
      setAddress("");
      return;
    }

    if (!isPlausibleWalletAddress(value)) {
      setAddress("");
      setScanError("Invalid address");
      return;
    }

    setIsValidating(true);

    try {
      const sheetResponse = await fetch("/api/addToSheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: value,
          timestamp: new Date().toISOString(),
        }),
      });
      const sheetData = await sheetResponse.json();

      if (!sheetResponse.ok) {
        throw new Error(
          sheetData.message || "Unable to save this wallet address.",
        );
      }

      window.location.href = `/scan-report?address=${encodeURIComponent(value)}`;
    } catch {
      setAddress("");
    } finally {
      setIsValidating(false);
    }
  };

  return {
    address,
    scanError,
    isValidating,
    changeAddress,
    scan,
  };
}
