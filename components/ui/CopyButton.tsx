"use client";

import { useState } from "react";
import { Copy, Check } from "@phosphor-icons/react";

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
}

export function CopyButton({ textToCopy, label = "Copy" }: CopyButtonProps) {
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
        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-text)] transition-colors active:scale-95"
        aria-label={`${label}: ${textToCopy}`}
      >
        {copied ? (
          <>
            <Check size={14} weight="bold" className="text-emerald-500" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy size={14} weight="regular" />
            <span>{label}</span>
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
