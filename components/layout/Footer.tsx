"use client";

import { site } from "@/content/site";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="px-6 sm:px-8 py-10 border-t border-[#262626] bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-[#737373]">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
          <span>© {new Date().getFullYear()} {site.fullName}. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-[#525252]">Jakarta, UTC+7</span>
          <button
            onClick={scrollToTop}
            className="hover:text-white transition-colors flex items-center gap-1 text-[#A3A3A3]"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
