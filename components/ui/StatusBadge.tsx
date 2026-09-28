import type { ProjectStatus } from "@/types/project";

interface StatusBadgeProps {
  status: ProjectStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isLive = status === "Live";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono rounded ${
        isLive
          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
          : "bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isLive ? "bg-emerald-500" : "bg-[var(--color-text-muted)]"
        }`}
        aria-hidden="true"
      />
      {status}
    </span>
  );
}
