import { skillGroups } from "@/content/skills";

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-16 px-6 sm:py-24 max-w-6xl mx-auto border-t border-[var(--color-border)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10 sm:mb-16">
        <div className="lg:col-span-4">
          <span className="text-xs font-mono tracking-wider uppercase text-[var(--color-text-muted)] mb-2 block">
            Capabilities
          </span>
          <h2
            id="skills-heading"
            className="text-3xl sm:text-5xl font-medium tracking-tight text-[var(--color-text)]"
            style={{ fontFamily: "'Iowan Old Style', 'Georgia', serif" }}
          >
            Skills & Tools
          </h2>
        </div>

        <div className="lg:col-span-8 text-base text-[var(--color-text-muted)] font-normal leading-relaxed max-w-[65ch]">
          Grouped transparently by practical application and coursework
          experience. No inflated mastery ratings or decorative percentage bars.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-6 flex flex-col"
          >
            <div className="pb-4 mb-4 border-b border-[var(--color-border)] flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
                {group.label}
              </h3>
              <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                {group.skills.length}
              </span>
            </div>

            <ul className="flex flex-col gap-3">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="flex items-center justify-between text-sm text-[var(--color-text)] font-normal"
                >
                  <span>{skill.name}</span>
                  {skill.note && (
                    <span className="text-xs font-mono text-[var(--color-text-muted)] italic">
                      ({skill.note})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
