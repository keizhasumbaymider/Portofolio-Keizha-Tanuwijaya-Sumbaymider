import { getPublishedProjects } from "@/content/projects";
import { ProjectStack } from "@/components/project/ProjectStack";

export function ProjectsSection() {
  const publishedProjects = getPublishedProjects();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-16 px-6 sm:py-24 max-w-6xl mx-auto"
    >
      <div className="mb-12">
        <span className="text-xs font-mono tracking-wider uppercase text-[var(--color-text-muted)] mb-2 block">
          Project
        </span>
        <h2
          id="projects-heading"
          className="text-3xl sm:text-5xl font-medium tracking-tight text-[var(--color-text)]"
          style={{ fontFamily: "'Iowan Old Style', 'Georgia', serif" }}
        >
          Selected Projects
        </h2>
      </div>

      <ProjectStack projects={publishedProjects} />
    </section>
  );
}
