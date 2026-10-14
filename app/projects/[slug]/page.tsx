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
    title: `${project.title}`,
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
        className="min-h-[85vh] pt-32 pb-24 px-6 sm:px-8 max-w-4xl mx-auto"
      >
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-mono transition-colors mb-12 hover:text-[var(--color-accent)]"
          style={{ color: "var(--color-text-muted)" }}
        >
          <ArrowLeft size={14} weight="regular" />
          <span>Back to selected work</span>
        </Link>

        <header
          className="mb-12 pb-8 border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="font-mono text-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              {project.year}
            </span>
            <span
              className="text-xs font-mono uppercase px-2 py-0.5 rounded-[var(--radius)] border"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
                color: "var(--color-text-muted)",
              }}
            >
              {project.type} project
            </span>
            <StatusBadge status={project.status} />
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-6"
            style={{ color: "var(--color-text)" }}
          >
            {project.title}
          </h1>

          <p
            className="text-lg sm:text-xl leading-relaxed max-w-[55ch]"
            style={{ color: "var(--color-text-muted)" }}
          >
            {project.summary}
          </p>
        </header>

        <section className="space-y-12">
          <div>
            <h2
              className="text-xs font-mono tracking-wider uppercase mb-3"
              style={{ color: "var(--color-text-muted)" }}
            >
              Overview & Scope
            </h2>
            <p
              className="text-base sm:text-lg leading-relaxed max-w-[65ch]"
              style={{ color: "var(--color-text)" }}
            >
              {project.description}
            </p>
          </div>

          <div>
            <h2
              className="text-xs font-mono tracking-wider uppercase mb-3"
              style={{ color: "var(--color-text-muted)" }}
            >
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <TechTag key={tech.name} name={tech.name} />
              ))}
            </div>
          </div>

          {project.links && project.links.length > 0 && (
            <div>
              <h2
                className="text-xs font-mono tracking-wider uppercase mb-3"
                style={{ color: "var(--color-text-muted)" }}
              >
                Project Links
              </h2>
              <div className="flex flex-wrap gap-4">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-[var(--radius)] border transition-colors hover:bg-[#262626]"
                    style={{
                      borderColor: "var(--color-border)",
                      backgroundColor: "var(--color-surface)",
                      color: "var(--color-text)",
                    }}
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
