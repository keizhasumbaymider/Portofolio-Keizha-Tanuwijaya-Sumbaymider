import { education, experienceEntries } from "@/content/background";

export function BackgroundSection() {
  const hasExperience = experienceEntries.length > 0;

  return (
    <section
      id="background"
      aria-labelledby="background-heading"
      className="py-16 px-6 sm:py-24 max-w-6xl mx-auto border-t border-[var(--color-border)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-4">
          <span className="text-xs font-mono tracking-wider uppercase text-[var(--color-text-muted)] mb-2 block">
            Academic & Experience
          </span>
          <h2
            id="background-heading"
            className="text-3xl sm:text-5xl font-medium tracking-tight text-[var(--color-text)]"
            style={{ fontFamily: "'Iowan Old Style', 'Georgia', serif" }}
          >
            Background
          </h2>
        </div>

        <div className="lg:col-span-8">
          <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-[var(--color-border)]">
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                Undergraduate Education
              </span>
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                2024 - 2028 (Expected)
              </span>
            </div>

            <h3 className="text-[1.5rem] sm:text-[2rem] font-bold tracking-[-0.05em] text-[var(--color-text)] leading-[1.1] mb-2">
              {education.institution}
            </h3>

            <p className="text-lg sm:text-[1.5rem] font-medium tracking-[-0.04em] text-[var(--color-text)] leading-tight">
              {education.field}
            </p>

            <p className="mt-6 max-w-[70ch] text-base sm:text-[1.rem] leading-relaxed text-[var(--color-text-muted)] font-normal">
              Bachelor of Computer Science in Software Engineering. Focus areas encompass: Data
              Structures &amp; Algorithm Analysis, Object-Oriented Software
              Engineering, Computer Networks, Database Systems &amp; Query
              Optimization, and Machine Learning application development.
            </p>

            <div className="mt-7 pt-4 border-t border-[var(--color-border)] flex flex-wrap gap-2">
              {[,
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

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
                  <p className="text-sm text-[var(--color-text)] font-normal leading-relaxed">
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
