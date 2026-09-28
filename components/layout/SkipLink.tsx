export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-bg)] focus:text-[var(--color-text)] focus:border focus:border-[var(--color-border)] focus:shadow-md focus:outline-none"
    >
      Skip to main content
    </a>
  );
}
