"use client";

import { site } from "@/content/site";
import { CopyButton } from "@/components/ui/CopyButton";
import { ArrowUpRight } from "@phosphor-icons/react";

export function ContactSection() {
  const displayEmail = site.email || "keizha.tanuwijaya@example.com";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-28 px-6 max-w-6xl mx-auto border-t border-[var(--color-border)]"
    >
      <div className="flex flex-col items-start max-w-4xl">
        <span className="text-xs font-mono tracking-wider uppercase text-[var(--color-text-muted)] mb-3 block">
          Initiate Contact
        </span>

        <h2
          id="contact-heading"
          className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[var(--color-text)] mb-8 leading-[1.1]"
        >
          Let’s discuss internships and collaborative projects.
        </h2>

        {site.availability && (
          <p className="text-sm font-mono text-emerald-600 dark:text-emerald-400 mb-8">
            ● {site.availability}
          </p>
        )}

        {/* Email Highlight & Copy */}
        <div className="w-full rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-[var(--color-text-muted)] block mb-1">
              Direct Inquiries
            </span>
            <span className="text-lg sm:text-xl font-mono text-[var(--color-text)] select-all">
              {displayEmail}
            </span>
          </div>

          <CopyButton textToCopy={displayEmail} label="Copy address" />
        </div>

        {/* External Links */}
        <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
          {site.github && (
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[var(--color-text)] hover:opacity-75 transition-opacity"
            >
              <span>GitHub</span>
              <ArrowUpRight size={14} weight="regular" />
            </a>
          )}

          {site.linkedin && (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[var(--color-text)] hover:opacity-75 transition-opacity"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={14} weight="regular" />
            </a>
          )}

          {site.cvPath && (
            <a
              href={site.cvPath}
              download
              className="inline-flex items-center gap-1.5 text-[var(--color-text)] hover:opacity-75 transition-opacity"
            >
              <span>Download CV (PDF)</span>
              <ArrowUpRight size={14} weight="regular" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
