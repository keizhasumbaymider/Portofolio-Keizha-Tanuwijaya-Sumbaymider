import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center"
    >
      <p
        aria-hidden="true"
        className="text-8xl font-medium tracking-tighter"
        style={{ color: "var(--color-text)" }}
      >
        404
      </p>
      <h1
        className="text-xl mt-4"
        style={{ color: "var(--color-text)" }}
      >
        Page not found
      </h1>
      <p
        className="mt-2 text-sm"
        style={{ color: "var(--color-text-muted)" }}
      >
        This page does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm font-mono underline underline-offset-4 transition-colors hover:text-[var(--color-accent)]"
        style={{ color: "var(--color-text-muted)" }}
      >
        Back to home
      </Link>
    </main>
  );
}
