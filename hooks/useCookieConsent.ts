"use client";

import { opaqueStorageKey, sha256 } from "@/utils/client-storage";
import { useEffect, useState } from "react";

const LEGACY_CONSENT_KEY = "trusty-cookie-consent";

export function useCookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const restoreConsent = async () => {
      const storageKey = await opaqueStorageKey("preference");
      const [acceptedHash, essentialHash] = await Promise.all([
        sha256("accepted"),
        sha256("essential"),
      ]);
      const storedValue = localStorage.getItem(storageKey);

      if (!cancelled) {
        setVisible(
          storedValue !== acceptedHash && storedValue !== essentialHash,
        );
      }

      localStorage.removeItem(LEGACY_CONSENT_KEY);
    };

    restoreConsent();

    return () => {
      cancelled = true;
    };
  }, []);

  const saveConsent = async (value: "accepted" | "essential") => {
    const storageKey = await opaqueStorageKey("preference");
    localStorage.setItem(storageKey, await sha256(value));
    localStorage.removeItem(LEGACY_CONSENT_KEY);
    setVisible(false);
  };

  return { visible, saveConsent };
}
