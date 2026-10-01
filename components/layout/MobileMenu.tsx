"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";
import { X } from "@phosphor-icons/react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  activeSection,
}: MobileMenuProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      ref={dialogRef}
      className="fixed inset-0 z-50 bg-[var(--color-bg)] flex flex-col px-6 py-6"
    >
      <div className="flex items-center justify-between pb-6 border-b border-[var(--color-border)]">
        <span className="font-mono text-sm tracking-tight text-[var(--color-text)]">
          {site.fullName}
        </span>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface)]"
            aria-label="Close menu"
          >
            <X size={20} weight="regular" />
          </button>
        </div>
      </div>

      <nav
        className="flex-1 flex flex-col justify-center gap-6 py-12"
        aria-label="Mobile Navigation"
      >
        {site.nav.map((item) => {
          const isActive = activeSection === item.href.replace("#", "");
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`text-2xl font-medium tracking-tight transition-colors ${
                isActive
                  ? "text-[var(--color-text)] font-normal"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)] font-mono">
        Software Engineering · BINUS University
      </div>
    </div>
  );
}
