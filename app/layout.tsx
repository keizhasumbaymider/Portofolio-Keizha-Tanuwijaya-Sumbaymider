import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import { site } from "@/content/site";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const manropeSans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: site.fullName,
    template: `%s — ${site.fullName}`,
  },
  description: site.metaDescription,
  metadataBase: new URL(site.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.fullName,
    title: site.fullName,
    description: site.metaDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: site.fullName,
    description: site.metaDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manropeSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CursorGlow />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
