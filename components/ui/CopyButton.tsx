"use client";

import { useState } from "react";
import { Check, Copy, CursorClick } from "@phosphor-icons/react";

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  iconOnly?: boolean;
}

export function CopyButton({
  textToCopy,
  label = "Copy",
  iconOnly = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is denied
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className={[
          "relative inline-flex items-center justify-center overflow-hidden rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-text)] transition-colors active:scale-95",
          iconOnly ? "h-8 w-8 p-0" : "gap-2 px-3 py-1.5 text-xs font-mono",
        ].join(" ")}
        aria-label={`${label || "Copy"}: ${textToCopy}`}
      >
        {copied && (
          <CursorClick
            size={iconOnly ? 18 : 14}
            weight="bold"
            aria-hidden="true"
            className="copy-cursor-animation absolute text-emerald-500"
          />
        )}
        {copied ? (
          <Check
            size={iconOnly ? 18 : 14}
            weight="bold"
            className="copy-check-animation text-emerald-500"
          />
        ) : (
          <>
            <Copy size={iconOnly ? 18 : 14} weight="regular" />
            {!iconOnly && <span>{label}</span>}
          </>
        )}
      </button>

      {/* Screen-reader announcement region */}
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? `Copied ${textToCopy} to clipboard` : ""}
      </span>
    </div>
  );
}
