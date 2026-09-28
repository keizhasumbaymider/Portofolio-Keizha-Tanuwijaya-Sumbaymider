export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 px-6 max-w-6xl mx-auto border-t border-[var(--color-border)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
          <span className="text-xs font-mono tracking-wider uppercase text-[var(--color-text-muted)] mb-2 block">
            Profile
          </span>
          <h2
            id="about-heading"
            className="text-3xl sm:text-5xl font-light tracking-tight text-[var(--color-text)]"
          >
            About
          </h2>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6 text-lg sm:text-xl font-light leading-relaxed text-[var(--color-text)] max-w-[65ch]">
          <p>
            I am a Software Engineering undergraduate at BINUS University,
            focused on building dependable software architectures, practical
            machine learning applications, and clean, restrained user
            interfaces.
          </p>
          <p className="text-[var(--color-text-muted)]">
            My work is centered around continuous technical growth—bridging
            computer vision and web development with a focus on usability and
            honest engineering. Currently preparing for internship roles where I
            can contribute to real-world codebases and collaborate with
            thoughtful teams.
          </p>
        </div>
      </div>
    </section>
  );
}
