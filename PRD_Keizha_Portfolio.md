# Product Requirements Document — Personal Portfolio Website

**Owner:** Keizha Tanuwijaya Sumbaymider
**Version:** 0.1 (draft for approval)
**Status:** Pre-design. No code, no implementation.

**Legend used throughout**

- **[CONFIRMED]**: provided by the owner.
- **[DECISION]**: a design or product decision made in this PRD, changeable on request.
- **[RECOMMENDATION]**: my suggestion, needs owner approval.
- **[TBD]**: missing information. Must be collected, never invented.

---

## 1. Product Overview

**[CONFIRMED]** A personal professional portfolio for Keizha Tanuwijaya Sumbaymider, a Software Engineering student at BINUS University. Immediate purpose: support internship applications in semester 6. Long-term purpose: remain a useful personal portfolio as skills and projects grow.

**[CONFIRMED]** Areas of interest to represent: Software Engineering, Software Development, AI/Machine Learning, UI/UX and visual design.

**[DECISION]** The site is a one-page portfolio with a distinct project sub-view (see §8). It presents an honest, student-level profile: curious, capable, growing. It is not a startup landing page.

**[CONFIRMED]** Planned stack (later phases): Next.js, TypeScript, Tailwind CSS, Git/GitHub, Antigravity, Vercel. Design exploration in Google Stitch, with Taste Skill as an anti-generic design guardrail.

## 2. Product Goals

| #   | Goal                                      | How it is judged                                                                                       |
| --- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| G1  | Get shortlisted for internship interviews | A recruiter understands who Keizha is, what they built and how to make contact within about 60 seconds |
| G2  | Show technical ability honestly           | Every skill and claim maps to a real project or coursework                                             |
| G3  | Show design awareness                     | The site itself demonstrates typography, composition and restraint                                     |
| G4  | Feel personal and distinctive             | Does not read as a template or AI-generated site                                                       |
| G5  | Stay maintainable long term               | Adding a project means adding one data entry, not redesigning                                          |

**Non-goals:** traffic growth, blogging, e-commerce, user accounts, showing off effects.

## 3. Target Audience

1. **Primary: internship recruiters and HR screeners** (tech companies, startups, software houses). Time-poor, scan quickly, often on mobile or in a short desktop session.
2. **Primary: engineering managers / technical interviewers.** Want evidence of real work, honest scope and thinking.
3. **Secondary: design-minded reviewers** (UI/UX teams). Will judge visual craft.
4. **Secondary: peers, lecturers, collaborators.** Contact and credibility.
5. **[TBD]** Target countries/regions and company types (affects language, see §24).

## 4. User Goals

- Quickly learn who Keizha is and what they are looking for.
- Judge skill level accurately (no inflated claims).
- Inspect real work: live sites, source, write-ups.
- Download a CV [TBD: CV file needed].
- Contact Keizha with minimal friction.

## 5. User Problems Being Solved

- Student portfolios are frequently generic, template-like and indistinguishable.
- Skill lists are often inflated, which makes them untrustworthy.
- Project pages often hide what the student personally did, or overclaim it.
- Heavy visual effects slow the site and bury the content.

## 6. Product Scope

**In scope (v1):** one-page portfolio, light/dark themes, project showcase with per-project detail view, contact, CV link, SEO basics, accessibility, responsive design, deployment on Vercel.

**Out of scope:** see §30.

## 7. Information Architecture

**[RECOMMENDATION]** The proposed 9 sections are evaluated below.

| Proposed                | Verdict                     | Reasoning                                                                                              |
| ----------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------ |
| Navigation              | Keep                        | Minimal, sticky or auto-hiding                                                                         |
| Hero                    | Keep                        | Photo, name, identity, CTA                                                                             |
| About                   | Keep, short                 | Merge personality and direction; no long biography                                                     |
| Selected Projects       | Keep, most important        | Core of the site                                                                                       |
| Skills                  | Keep, but honest            | Grouped by level of use, tied to projects                                                              |
| Education               | **Merge with Experience**   | Only one education entry and (as far as known) no work experience; two thin sections would feel padded |
| Experience / Additional | **Merge into "Background"** | Contents are TBD; section renders only if content exists                                               |
| Contact                 | Keep                        | Also functions as the closing statement                                                                |
| Footer                  | Keep, tiny                  | Copyright, theme switch, source link                                                                   |

**Resulting structure:**

1. Navigation
2. Hero
3. About
4. Selected Projects (+ project detail view)
5. Skills
6. Background (education first; experience, activities, certificates only when verified)
7. Contact
8. Footer

**Navigation labels:** Work, About, Skills, Background, Contact (final wording TBD in design).

## 8. Website Structure

- **Single route `/`** containing all sections, with anchor navigation.
- **[RECOMMENDATION]** Project detail as a dedicated route per project (`/projects/[slug]`), not a modal, so that each project has a shareable URL, its own SEO metadata and browser back-button behaviour. The showcase on `/` links to it.
- **Custom 404.** Simple, on-brand, with a link home.
- **Sections that render conditionally:** any block whose data is TBD must be hidden, not filled with placeholder text, before launch.

## 9. Section Requirements (common template)

Each section below is specified with Purpose, Content, Interaction, Visual direction, Functional requirements, Responsive behavior, Accessibility, Dependencies.

---

## 10. Hero Requirements

**Purpose:** Strong first impression and instant clarity: who, what, next step.

**Content**

- Portrait photo **[TBD: photo(s) needed]**.
- Name: Keizha Tanuwijaya Sumbaymider.
- Identity line: Software Engineering student, BINUS University.
- Short introduction, 1 to 2 sentences **[TBD: owner-written or approved copy]**.
- One primary CTA (recommended: "View selected work", scrolls to projects) and one quiet secondary link (contact or CV).

**Interaction:** subtle image reveal (mask wipe), staggered text reveal on load, optional very light parallax on the portrait.

**Visual direction [DECISION]:** typography-led. Oversized name set in a distinctive typeface, with the portrait cropped unconventionally or partially overlapping the type. One composition idea only. No decorative shapes, no floating elements.

**Functional requirements**

- Name is the single `h1`.
- Above-the-fold on desktop shows name, identity, CTA and portrait.
- Image loads with priority and defined dimensions (no layout shift).

**Responsive:** portrait and type re-compose on mobile (stacked, name may wrap intentionally). Overlap effects must degrade gracefully with no clipped text.

**Accessibility:** meaningful `alt` on the portrait; text contrast passes over image areas; reveal animations do not hide content when reduced motion is on.

**Dependencies:** photo, approved intro copy, typeface choice.

---

## 11. About Requirements

**Purpose:** Give a personal, honest picture in under 150 words.

**Content:** who Keizha is, what they are studying, what they are curious about (software engineering, AI/ML, UI/UX), what kind of internship they seek **[TBD: target role types, e.g. software engineering, ML, frontend, UI/UX]**. No invented personal stories.

**Interaction:** scroll reveal of text lines; none needed beyond that.

**Visual direction:** editorial column layout, generous whitespace, optional second smaller photo **[TBD]**.

**Functional:** copy stored in a content file, not hard-coded in components.

**Responsive:** single column on mobile, comfortable measure (about 60 to 75 characters).

**Accessibility:** semantic heading, readable size (16px+ body).

**Dependencies:** owner-written copy, statement of internship goals.

---

## 12. Project Showcase Requirements

**Purpose:** Demonstrate real work in a memorable but usable way. This is the signature interaction of the site.

**Confirmed projects**

| Project           | Type                         | Confirmed facts                                                                                                                                                                                                                                 | Unknown ([TBD])                                                                                                           |
| ----------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **DeepFruit**     | Academic ML, team project    | Classifies fruit images as fresh or rotten. Classes: Fresh/Rotten Apple, Banana, Orange. Python, TensorFlow, Keras, MobileNetV2, transfer learning, data augmentation, computer vision, image classification. Live at deepfruit-v717.vercel.app | Individual role, team size and members, dataset source, accuracy/metrics, repo link, what the live site does, screenshots |
| **FontDale Mall** | Academic web + UI/UX concept | Mall info, tenant directory, events, facilities, modern lifestyle experience. Designed in Figma, then implemented as a website. Not deployed                                                                                                    | Tech stack, individual role, Figma link, repo, screenshots, course context                                                |
| **Well-Desk**     | Academic project             | Known files: `welldesk_app.py`, `riwayat_welldesk.csv`, `Well-Desk.spec`                                                                                                                                                                        | **Everything else**: purpose, features, stack, role. Do not display until reviewed                                        |
| **Portfolio**     | Personal                     | Planned only                                                                                                                                                                                                                                    | Add only after completion, listing only technologies actually used                                                        |

**[DECISION] Presentation pattern: "Document stack" with focused view**

Projects are presented as a stack of paper-like files (layered sheets, each with title, year, short descriptor). Selecting a file brings it forward and expands into a focused editorial view. Rationale: it matches the file/document inspiration, works with 3 to 10 entries, and is usable with mouse, touch and keyboard, unlike pure drag.

- **Desktop:** hover slightly lifts a sheet; click brings it to front and opens the preview; arrow keys and visible prev/next controls move between projects.
- **Mobile:** vertical scroll leads into a stacked list; tap opens the project. Swipe between projects is optional as an enhancement, never the only way.
- **[RECOMMENDATION] Fallback:** if the stack proves fussy in Stitch exploration, use a horizontal scroll-snap track of large editorial spreads (one project per screen width). Decide during design phase, not before.
- **Not adopted:** free-drag physics, 3D tilt, random rotation.

**Per-project preview content:** title, one-line summary, role label, year, tech tags, status (e.g. "Live", "Not deployed", "In progress"), main image.

**Per-project detail content:** overview, problem/goal, what the project does, tech used, **individual contribution (only when documented)**, outcome only when verified, links (live, repo, Figma), screenshots.

**Honesty rules**

- Team projects are labeled as team projects.
- If individual role is unknown, show "Team project" and no role claims.
- No metrics unless supplied and verified.
- Well-Desk stays hidden or is shown as minimal "details coming" only if the owner explicitly wants that; recommendation is hidden until reviewed.

**Functional requirements:** project data drawn from a structured data file (see §25); order and featured flag configurable; keyboard operable; deep-linkable URLs; external links open safely.

**Accessibility:** the stack must have a plain, semantic list equivalent (ordered list of links); focus order follows visual order; focus visible; reduced-motion users get instant transitions and no parallax.

**Dependencies:** screenshots, verified facts, decision on stack vs horizontal track after design exploration.

---

## 13. Skills Requirements

**Purpose:** Communicate skills honestly and connect them to evidence.

**Content [CONFIRMED]**

- Programming: C++, Python, Java (basic)
- Database: MySQL
- Design: Figma
- From projects (with evidence in DeepFruit): TensorFlow, Keras, MobileNetV2, transfer learning, data augmentation, computer vision. Present these as "used in project", not as mastery.

**[DECISION]** Use no percentage bars, star ratings or "expert/advanced" labels. Instead, group by **"Comfortable / Used in projects / Learning"** or by plain categories, and link each item to the project where it was used. Java is labeled basic. **[TBD]** which items belong in which group; owner must self-assess.

**Interaction:** hovering or focusing a skill may highlight related projects (optional, subtle).

**Visual:** a typographic list or index, not icon walls or logo grids.

**Responsive/Accessibility:** plain text list, no icon-only meaning.

**Dependencies:** owner's self-assessment; web technologies used in FontDale Mall (TBD).

---

## 14. Education Requirements

**Content [CONFIRMED]:** BINUS University, Software Engineering student. **[TBD]:** degree name, expected graduation, current semester and GPA (include only if owner wants), relevant coursework.

**Visual:** compact entry inside "Background". **Rule:** no invented coursework or honors.

## 15. Experience Requirements

**Content [CONFIRMED]:** none provided. **[DECISION]** Do not render an Experience block unless the owner supplies real entries (internships, organizations, committees, competitions, volunteer work, certificates). Academic team projects are covered in Projects, not repeated here.

**[RECOMMENDATION]** Collect any real organizational, competition or certificate information before design begins so the layout can account for it. If none exists, the "Background" section is simply the education entry, kept short.

## 16. Contact Requirements

**Purpose:** Make the next step obvious.

**Content:** email **[TBD]**, GitHub **[TBD]**, LinkedIn **[TBD]**, CV download **[TBD]**. Optional: location (city/country) and availability statement, such as "Open to internship opportunities from semester 6" **[TBD: confirm wording and dates]**.

**Interaction:** copy-email button with confirmation; links open in new tab with `rel` safeguards.

**[RECOMMENDATION]** Use direct links instead of a contact form for v1. A form requires spam protection and a backend or third-party service, and recruiters usually prefer email. Revisit in future scope.

**Accessibility:** descriptive link text (not "click here"); copy confirmation announced via live region.

**Visual:** large typographic email address as the closing statement.

## 17. Navigation Requirements

- Minimal top bar: name or monogram, 4 to 5 anchor links, theme toggle.
- Sticky or hide-on-scroll-down/show-on-scroll-up **[RECOMMENDATION: hide on scroll down]**.
- Active-section indicator is subtle (underline or weight change).
- Smooth scroll to anchors, with correct offset and reduced-motion respect.
- Mobile: simple full-screen or dropdown menu, no elaborate hamburger animation; focus trapped while open; closes with Escape.
- Skip-to-content link.

## 18. Light/Dark Theme Requirements

**[CONFIRMED direction]** One design system, two modes, not inverted colors.

| Aspect               | Light                                                                                                                              | Dark                               |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Mood                 | Editorial, monochrome, bright                                                                                                      | Technical, immersive, professional |
| Background           | Off-white                                                                                                                          | Near-black                         |
| Text                 | Dark                                                                                                                               | Off-white                          |
| Surfaces             | Subtle borders, minimal fill                                                                                                       | Dark gray surfaces                 |
| Constant across both | Typeface, type scale, spacing, layout, shape language (sharp or lightly rounded, one radius rule), motion and interaction patterns | Same                               |

**Requirements**

- Follow system preference on first visit; manual toggle overrides and persists.
- No flash of wrong theme on load.
- Smooth, brief transition on toggle; disabled under reduced motion.
- Photos and project images reviewed in both modes (e.g. avoid images with white boxes on dark).
- Contrast meets WCAG AA in both modes.
- Palette, typeface and accent decision **[TBD: design phase]**. Accent, if any, is a single restrained color and never a purple gradient.

## 19. Animation Requirements

**Purpose:** support hierarchy, storytelling, navigation and interaction only.

**Approved:** page entrance, text reveal, image reveal, project transitions (stack to detail), hover states, scroll reveal, subtle parallax (hero only, optionally one more place), theme transition.

**Rules**

- Single motion language: one easing family, a short set of durations.
- Prefer animating transform and opacity.
- Every animation must answer "what does this help the user understand?"
- Respect `prefers-reduced-motion`: replace with instant state changes or simple fades.
- Nothing loops or floats continuously; no particles, bounce, random rotation or heavy zoom.
- Animations never block reading or delay the CTA.

## 20. Responsive Requirements

- Mobile-first; target widths from about 360px to large desktop.
- Recruiters likely open links on phones, so mobile is a first-class experience.
- No horizontal page scroll (intentional scroll tracks excepted, contained).
- Touch targets at least 44px.
- Hover-only interactions must have tap/focus equivalents.
- Project showcase has a defined mobile behaviour (see §12).
- Hero composition re-designed, not merely scaled, for mobile.

## 21. Accessibility Requirements

- Target WCAG 2.2 AA.
- Semantic landmarks and heading hierarchy (single `h1`).
- Full keyboard operability including the project showcase and menu.
- Visible focus styles in both themes.
- Meaningful `alt` text; decorative images empty alt.
- Reduced-motion support everywhere.
- Contrast checks for text over images.
- Theme toggle exposes state to assistive tech.
- No information conveyed by color alone.

## 22. Performance Requirements

- Targets **[RECOMMENDATION]**: Lighthouse Performance, Accessibility, Best Practices and SEO all 90+ on mobile; LCP under 2.5s; CLS under 0.1; INP under 200ms (on a typical mid-range phone over decent connection).
- Optimized images (modern formats, responsive sizes, explicit dimensions); portrait prioritized.
- Limit font files and weights; use font-display strategy that avoids invisible text.
- Keep JavaScript lean; animation library only if justified, and only loaded where used.
- Lazy-load below-the-fold media.
- No autoplay video in v1.

## 23. SEO Requirements

- Unique title and meta description per page, including each project page.
- Open Graph and Twitter card with a designed share image **[TBD]**.
- Person structured data (name, role, university) using only confirmed facts.
- Semantic HTML, sitemap, robots file, canonical URL, favicon.
- Descriptive URLs for projects.
- **[TBD]** Custom domain (a name-based domain is recommended over the default Vercel subdomain).

## 24. Content Requirements

- **Language:** English for v1 **[TBD: confirm; consider bilingual EN/ID later]**.
- **Tone:** first person, plain, confident but modest. No buzzwords ("passionate", "rockstar", "cutting-edge").
- All copy in a structured content layer, separate from layout.
- Every factual claim traceable to the owner or a project artifact.
- Content checklist before design: portrait photo(s), intro and about copy, project screenshots, project write-ups, CV, contact links, target roles.

**Content integrity rule (applies to the whole product):** no fabricated experience, certificates, achievements, expertise, contributions, technologies, results, metrics or awards. Missing means TBD or hidden.

## 25. Project Data Structure Requirements

**[RECOMMENDATION]** Each project is one structured record (format, file location and typing decided in technical design). Fields, described conceptually:

| Field                  | Required | Notes                                            |
| ---------------------- | -------- | ------------------------------------------------ |
| `slug`                 | Yes      | URL-safe id                                      |
| `title`                | Yes      |                                                  |
| `summary`              | Yes      | One line                                         |
| `description`          | Yes      | Longer text                                      |
| `type`                 | Yes      | Academic / personal / team / individual          |
| `status`               | Yes      | Live / Not deployed / In progress / Archived     |
| `year` or period       | Yes      |                                                  |
| `role`                 | Optional | Only when verified; otherwise omitted            |
| `teamSize`             | Optional |                                                  |
| `technologies`         | Yes      | Only confirmed ones; each with a "verified" flag |
| `links`                | Optional | Live, repository, Figma, write-up                |
| `media`                | Optional | Images with alt text and dimensions              |
| `featured` and `order` | Yes      | Controls showcase ordering                       |
| `visibility`           | Yes      | Draft/hidden until reviewed                      |
| `verified`             | Yes      | Whether facts have been confirmed by owner       |

**Rule:** a project with `visibility` not published never renders. Well-Desk starts as draft.

## 26. Technical Requirements

**[CONFIRMED stack]** Next.js, TypeScript (strict), Tailwind CSS, Git/GitHub, Vercel. Antigravity for AI-assisted coding.

**Requirements**

- Statically generated pages where possible.
- Design tokens (color, type, spacing, radius, motion) defined once and shared by both themes.
- Component library kept small and purposeful.
- Content and project data separate from components.
- Linting and formatting configured; type-check clean.
- Environment: no secrets needed for v1.
- Analytics: optional, privacy-friendly, **[TBD]**.
- Browser support: current evergreen browsers (Chrome, Safari, Firefox, Edge), including iOS Safari.
- Repository: public or private **[TBD]**; if public, README written honestly.

## 27. AI-Assisted Development Considerations

- This PRD is the source of truth. The agent must not add features, sections, copy or technologies not in it.
- Give the agent the PRD, design tokens and content files as context; keep tasks small (one section or component per task).
- Require the agent to flag missing information as TBD and ask, never fill with placeholder facts (no lorem-style fake projects, testimonials or metrics).
- Review all generated code and dependencies: justify each new package.
- Human review checkpoints after each section: visual match to the approved design, accessibility, performance.
- Commit small and often; review diffs before merging.
- Owner should understand the code they publish, since interviewers may ask about it.
- The portfolio may be listed as a project only if the owner can honestly describe their own contribution, including how AI assistance was used.

## 28. Anti-AI-Slop Design Constraints

**Forbidden:** generic SaaS layouts; purple or multi-color AI gradients; heavy glassmorphism; repetitive rounded card grids; the three-identical-cards pattern; decorative blobs; random geometric shapes; floating elements; pill overload; fake dashboards; fake terminal windows; unnecessary icons; excessive or purposeless animation.

**Required instead:** typography as the main design tool; strong hierarchy; generous whitespace; deliberate composition and asymmetry; real photography; restrained palette; one signature interaction (project stack); consistent shape language.

**Review test (apply to every screen):**

1. Could this screen belong to any other developer's portfolio? If yes, refine.
2. Does every element earn its place?
3. Does every animation serve a purpose?
4. Is every claim true?

Taste Skill is applied as a guardrail during Stitch exploration and again during implementation review.

## 29. Future Scalability

- Adding a project should require only a new data record and assets.
- Structure allows later addition of: blog/notes, case-study pages, bilingual support, additional experience entries, certificates, a contact form, analytics, a CMS.
- Design tokens allow visual refinement without restructuring.
- Sections designed to render only when data exists.
- Portfolio should be revisited after the internship to update content.

## 30. Out-of-Scope Features (v1)

Blog, CMS, user accounts, comments, contact form with backend, chatbot, AI features, e-commerce, 3D/WebGL scenes, particle effects, autoplay video, testimonials (none confirmed), stats counters, multi-language, analytics dashboards, and any fabricated content.

## 31. Open Questions / TBD Information

**Identity and goals**

1. Which internship roles are targeted (software engineering, ML, frontend, UI/UX)?
2. Preferred display name (full name, or a shorter form such as "Keizha")?
3. Availability wording and dates?

**Assets** 4. Portrait photo(s), and their orientation, quality and background. 5. CV (PDF) and whether it is public. 6. Email, GitHub, LinkedIn (any others?). 7. Preferred domain name.

**Projects** 8. DeepFruit: your individual role, team size, dataset, results, repo link, screenshots. 9. FontDale Mall: tech stack actually used, role, Figma link, repo, screenshots. 10. Well-Desk: purpose, features, stack, role, and whether it should be public. 11. Are there other projects worth including (e.g. C++ or MySQL coursework)?

**Background** 12. Any organizations, committees, competitions, certificates or volunteer work? 13. Degree name, expected graduation, GPA (include or not)?

**Design** 14. Any reference sites you like (for Stitch)? 15. Any typeface or accent-color preferences? 16. Final decision on stack vs horizontal track (to be made after exploration).

**Technical** 17. Repository public or private? Analytics wanted? 18. Language: English only for v1?

## 32. Acceptance Criteria

**Content**

- [ ] No unverified claim appears anywhere; every TBD is resolved or the element is hidden.
- [ ] Skills are presented without inflated levels; Java labeled basic.
- [ ] Team projects are labeled as such; no invented roles or metrics.

**Design**

- [ ] Passes the anti-AI-slop review (§28) on every section.
- [ ] Light and dark modes share one system and are individually polished.
- [ ] Hero is typography-led with a clear CTA and no more than one signature composition idea.
- [ ] Project showcase is not a grid of identical cards.

**Functionality**

- [ ] All anchor links, project routes, external links and CV download work.
- [ ] Theme follows system, is togglable, persists, and has no flash on load.
- [ ] Email copy works with confirmation.
- [ ] Custom 404 present.

**Accessibility**

- [ ] Keyboard-only use covers all features including project showcase and menu.
- [ ] WCAG AA contrast in both themes; reduced-motion honored.
- [ ] Automated accessibility check has no serious issues.

**Performance and SEO**

- [ ] Meets targets in §22 on mobile.
- [ ] Metadata, Open Graph, sitemap, structured data verified.

**Responsive**

- [ ] Verified at mobile, tablet, laptop and wide desktop; no unintended horizontal scroll.

**Delivery**

- [ ] Code in GitHub with clear history; deployed on Vercel; preview reviewed before production.

---

## Appendix A — Unresolved Questions (concise)

1. Target internship roles?
2. Preferred display name?
3. Your specific role in DeepFruit, and its results?
4. FontDale Mall's actual tech stack?
5. What is Well-Desk, and should it be public?
6. Any experience, organizations or certificates?
7. Contact links and CV?
8. Domain name?
9. Language: English only?
10. Stack vs horizontal track for projects (decide after design exploration)?

## Appendix B — Information to Provide Next

1. Portrait photo(s), preferably several with different framing.
2. CV as PDF.
3. Email, GitHub, LinkedIn URLs.
4. For each project: 3 to 6 screenshots, a short factual description in your own words, tech actually used, your own contribution, repo/Figma/live links.
5. Well-Desk review notes (what it does, how it runs).
6. Any organizations, competitions, certificates.
7. 3 to 5 reference sites and any typography or color preferences.
8. A rough draft (or bullet points) for your About text.

## Appendix C — Recommended Next Step After Approval

Workflow: **PRD → Design Direction → Google Stitch → Design exploration/prototype → Design system → Antigravity implementation → Testing/review → GitHub → Vercel deployment**

**Immediate next step (after approving this PRD):**

1. Resolve the highest-priority TBDs (photo, project facts, contact links, target roles).
2. Write a short **Design Direction brief** (1 to 2 pages) from §10 to §12, §18, §19 and §28: type direction, palette logic, hero composition concept, project-stack concept, motion principles, and the Taste Skill guardrail rules.
3. Use that brief as the Google Stitch prompt for hero, project stack and both themes. Explore several options, choose one, and evaluate against the acceptance criteria before any design system or code exists.

I recommend not starting implementation until a design has been chosen and the design tokens are documented.
