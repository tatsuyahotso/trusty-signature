"use client";

import { opaqueStorageKey, sha256 } from "@/utils/client-storage";
import { useEffect, useState } from "react";

const LEGACY_STORAGE_KEY = "trusty-active-users";
const MIN_ACTIVE_USERS = 120_000;
const MAX_ACTIVE_USERS = 125_000;

function randomActiveUsers() {
  return (
    Math.floor(Math.random() * (MAX_ACTIVE_USERS - MIN_ACTIVE_USERS + 1)) +
    MIN_ACTIVE_USERS
  );
}

export function useActiveUsers() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    let storageKey = "";

    const initialize = async () => {
      storageKey = await opaqueStorageKey("presence");
      const initialCount = randomActiveUsers();

      if (!cancelled) setCount(initialCount);
      localStorage.setItem(storageKey, await sha256(String(initialCount)));
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    };

    initialize();

    const timer = window.setInterval(() => {
      setCount((current) => {
        const base = current ?? randomActiveUsers();
        const change = Math.floor(Math.random() * 3) - 1;
        const nextCount = Math.min(
          MAX_ACTIVE_USERS,
          Math.max(MIN_ACTIVE_USERS, base + change),
        );

        if (storageKey) {
          sha256(String(nextCount)).then((hashedCount) => {
            localStorage.setItem(storageKey, hashedCount);
          });
        }
        return nextCount;
      });
    }, 3 * 1000);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return count;
}
