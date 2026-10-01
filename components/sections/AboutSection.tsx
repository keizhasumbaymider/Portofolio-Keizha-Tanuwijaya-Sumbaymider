export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-16 px-6 sm:py-24 max-w-6xl mx-auto border-t border-b border-[var(--color-border)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
          <span className="text-xs font-mono tracking-wider uppercase text-[var(--color-text-muted)] mb-2 block">
            Profile
          </span>
          <h2
            id="about-heading"
            className="text-3xl sm:text-5xl font-medium tracking-tight text-[var(--color-text)]"
            style={{ fontFamily: "'Iowan Old Style', 'Georgia', serif" }}
          >
            About
          </h2>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6 text-base font-medium leading-relaxed text-[var(--color-text)] max-w-[65ch] text-justify">
          <p>
            I'm a Computer Science student at BINUS University with an interest
            in Software Engineering and digital product development. I enjoy
            combining programming and UI/UX to turn ideas into functional,
            intuitive experiences.
          </p>
          <p className="text-[var(--color-text-muted)]">
            Through academic and personal projects, I've explored web
            development, machine learning, computer vision, databases, and
            interface design using technologies such as C++, Python, Java,
            MySQL, and Figma. I'm continuously learning, experimenting, and
            building projects that help me grow as a software engineer.
          </p>
        </div>
      </div>
    </section>
  );
}
