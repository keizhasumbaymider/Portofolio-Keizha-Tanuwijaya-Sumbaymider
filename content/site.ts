export const site = {
  fullName: "Keizha Tanuwijaya Sumbaymider",
  displayName: "Keizha Tanuwijaya Sumbaymider",
  identity: "Software Engineering Student, BINUS University",
  heroIntro: null as string | null,
  email: null as string | null,
  github: null as string | null,
  linkedin: null as string | null,
  cvPath: null as string | null,
  availability: null as string | null,
  nav: [
    { label: "Work", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Background", href: "#background" },
    { label: "Contact", href: "#contact" },
  ],
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://keizha-portfolio.vercel.app",
  metaDescription:
    "Personal portfolio of Keizha Tanuwijaya Sumbaymider — Software Engineering student at BINUS University, interested in software development, AI/ML, and UI/UX design.",
};
