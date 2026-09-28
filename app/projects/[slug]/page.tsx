import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProjectBySlug, getPublishedSlugs } from "@/content/projects";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechTag } from "@/components/ui/TechTag";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, ArrowUpRight } from "@/components/ui/Icons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getPublishedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main
        id="main-content"
        className="min-h-[85vh] pt-32 pb-24 px-6 max-w-4xl mx-auto"
      >
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-12"
        >
          <ArrowLeft size={14} weight="regular" />
          <span>Back to selected work</span>
        </Link>

        <header className="mb-12 pb-8 border-b border-[var(--color-border)]">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[var(--color-text-muted)]">
              {project.year}
            </span>
            <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
              {project.type} project
            </span>
            <StatusBadge status={project.status} />
          </div>

          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-[var(--color-text)] mb-6">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl text-[var(--color-text-muted)] font-light leading-relaxed">
            {project.summary}
          </p>
        </header>

        <section className="space-y-12">
          {/* Overview */}
          <div>
            <h2 className="text-xs font-mono tracking-wider uppercase text-[var(--color-text-muted)] mb-3">
              Overview & Scope
            </h2>
            <p className="text-base sm:text-lg text-[var(--color-text)] font-light leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h2 className="text-xs font-mono tracking-wider uppercase text-[var(--color-text-muted)] mb-3">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <TechTag key={tech.name} name={tech.name} />
              ))}
            </div>
          </div>

          {/* Project Links */}
          {project.links && project.links.length > 0 && (
            <div>
              <h2 className="text-xs font-mono tracking-wider uppercase text-[var(--color-text-muted)] mb-3">
                Project Links
              </h2>
              <div className="flex flex-wrap gap-4">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-text)] transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={14} weight="regular" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
