import { site } from "@/content/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] py-12 px-6 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-[var(--color-text-muted)] font-mono">
        <div>
          <p>
            © {currentYear} {site.fullName}.
          </p>
          <p className="mt-1">Software Engineering · BINUS University</p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#hero"
            className="hover:text-[var(--color-text)] transition-colors"
          >
            Back to top ↑
          </a>
          {site.github && (
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-text)] transition-colors"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
