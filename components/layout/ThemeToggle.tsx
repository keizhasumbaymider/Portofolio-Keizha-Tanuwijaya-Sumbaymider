"use client";

import { useTheme } from "next-themes";
import { useRef, useSyncExternalStore, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { Sun, Moon } from "@phosphor-icons/react";

function subscribe() {
  return () => {};
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isTransitioning = useRef(false);
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <button
        type="button"
        className="w-9 h-9 flex items-center justify-center rounded border border-[var(--color-border)] text-[var(--color-text-muted)] opacity-50 cursor-default"
        aria-label="Toggle theme"
        disabled
      >
        <span className="w-4 h-4" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    if (isTransitioning.current) return;

    const nextTheme = isDark ? "light" : "dark";
    const root = document.documentElement;
    const transitionDocument = document as Document & {
      startViewTransition?: (update: () => void) => {
        finished: Promise<void>;
      };
    };

    if (!transitionDocument.startViewTransition) {
      root.classList.add("theme-transitioning");
      setTheme(nextTheme);
      window.setTimeout(() => {
        root.classList.remove("theme-transitioning");
      }, 300);
      return;
    }

    const buttonBounds = event.currentTarget.getBoundingClientRect();
    const x =
      event.detail > 0
        ? event.clientX
        : buttonBounds.left + buttonBounds.width / 2;
    const y =
      event.detail > 0
        ? event.clientY
        : buttonBounds.top + buttonBounds.height / 2;
    const farthestX = Math.max(x, window.innerWidth - x);
    const farthestY = Math.max(y, window.innerHeight - y);

    root.style.setProperty("--theme-reveal-x", `${x}px`);
    root.style.setProperty("--theme-reveal-y", `${y}px`);
    root.style.setProperty(
      "--theme-reveal-radius",
      `${Math.hypot(farthestX, farthestY)}px`,
    );

    isTransitioning.current = true;
    const finishTransition = () => {
      root.style.removeProperty("--theme-reveal-x");
      root.style.removeProperty("--theme-reveal-y");
      root.style.removeProperty("--theme-reveal-radius");
      isTransitioning.current = false;
    };

    try {
      const transition = transitionDocument.startViewTransition(() => {
        flushSync(() => setTheme(nextTheme));
      });
      void transition.finished.then(finishTransition, finishTransition);
    } catch {
      finishTransition();
      setTheme(nextTheme);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="w-9 h-9 flex items-center justify-center rounded border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors focus-visible:outline-2"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
    >
      {isDark ? (
        <Sun size={18} weight="regular" aria-hidden="true" />
      ) : (
        <Moon size={18} weight="regular" aria-hidden="true" />
      )}
    </button>
  );
}
