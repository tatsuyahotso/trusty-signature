"use client";

import { useActiveUsers } from "@/hooks/useActiveUsers";
import { Users } from "lucide-react";

export default function ActiveUsers({
  prominent = false,
}: {
  prominent?: boolean;
}) {
  const count = useActiveUsers();

  return (
    <div
      className={`flex items-center rounded-lg border border-slate-200 bg-white font-semibold text-slate-600 ${
        prominent
          ? "min-h-11 w-full gap-2.5 px-4 py-2.5 text-sm shadow-[0_2px_8px_rgba(15,23,42,.04)]"
          : "gap-2 px-3 py-2.5 text-sm"
      }`}
      title="Current active users"
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-full w-full rounded-full bg-emerald-500" />
      </span>
      <Users className="h-4 w-4" />
      <span className="tabular-nums">
        {count === null ? "—" : count.toLocaleString()} active
      </span>
    </div>
  );
}
