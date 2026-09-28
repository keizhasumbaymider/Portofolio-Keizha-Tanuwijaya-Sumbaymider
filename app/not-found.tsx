import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <p
        aria-hidden="true"
        style={{ fontSize: "4rem", fontWeight: 700, lineHeight: 1 }}
      >
        404
      </p>
      <h1 style={{ fontSize: "1.25rem", marginTop: "1rem" }}>Page not found</h1>
      <p style={{ marginTop: "0.5rem", opacity: 0.6 }}>
        This page does not exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "2rem",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        }}
      >
        ← Back to home
      </Link>
    </main>
  );
}
