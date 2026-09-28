import { SkipLink } from "@/components/layout/SkipLink";
import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { BackgroundSection } from "@/components/sections/BackgroundSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <SkipLink />
      <Navigation />
      <main id="main-content">
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <BackgroundSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
