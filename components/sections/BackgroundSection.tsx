import { education, experienceEntries } from "@/content/background";

export function BackgroundSection() {
  const hasExperience = experienceEntries.length > 0;

  return (
    <section
      id="background"
      aria-labelledby="background-heading"
      className="py-24 px-6 max-w-6xl mx-auto border-t border-[var(--color-border)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        <div className="lg:col-span-4">
          <span className="text-xs font-mono tracking-wider uppercase text-[var(--color-text-muted)] mb-2 block">
            Academic & Experience
          </span>
          <h2
            id="background-heading"
            className="text-3xl sm:text-5xl font-light tracking-tight text-[var(--color-text)]"
          >
            Background
          </h2>
        </div>

        <div className="lg:col-span-8">
          {/* Education Block */}
          <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[var(--color-border)]">
              <span className="font-mono text-xs text-[var(--color-text-muted)] uppercase">
                Undergraduate Education
              </span>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                In progress · Semester 6
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-light tracking-tight text-[var(--color-text)] mb-2">
              {education.institution}
            </h3>
            <p className="text-base text-[var(--color-text-muted)] font-light">
              {education.field}
            </p>

            {education.relevantCoursework &&
              education.relevantCoursework.length > 0 && (
                <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
                  <span className="text-xs font-mono text-[var(--color-text-muted)] block mb-2">
                    Coursework
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {education.relevantCoursework.map((course) => (
                      <span
                        key={course}
                        className="px-2 py-0.5 text-xs font-mono rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)]"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Experience Block (Conditional Render) */}
          {hasExperience && (
            <div className="mt-8 space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
                Experience & Activities
              </h3>
              {experienceEntries.map((exp, index) => (
                <div
                  key={index}
                  className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-medium text-[var(--color-text)]">
                      {exp.role}
                    </h4>
                    <span className="text-xs font-mono text-[var(--color-text-muted)]">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-[var(--color-text-muted)] mb-3">
                    {exp.organization}
                  </p>
                  <p className="text-sm text-[var(--color-text)] font-light leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
