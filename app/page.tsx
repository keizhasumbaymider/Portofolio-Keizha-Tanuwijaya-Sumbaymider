import { SkipLink } from "@/components/layout/SkipLink";
import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { BackgroundSection } from "@/components/sections/BackgroundSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { getPublishedProjects } from "@/content/projects";

export default function HomePage() {
  const projects = getPublishedProjects();

  return (
    <>
      <SkipLink />
      <Navigation />
      <main id="main-content" className="relative isolate min-h-dvh overflow-hidden bg-[#f4f4f1] text-[#111114]">
        <Hero />
        <AboutSection />
        <BackgroundSection />
        <ProjectsSection projects={projects} />
        <ContactSection />
      </main>
    </>
  );
}
