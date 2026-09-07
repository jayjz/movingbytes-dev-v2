---
name: portfolio-design
description: Research, direct, and review a high-signal software-engineering portfolio or evidence-backed case study. Use for portfolio information architecture, visual direction, case-study storytelling, or design-only iteration; not for generic landing pages or implementation-only fixes.
---

# Portfolio design

Create a professional surface that makes engineering judgment legible to hiring managers, engineers, collaborators, and prospective clients. Favor evidence, clarity, and an authored visual system over fashion, generated decoration, or unsupported claims.

## Start with the source of truth

Read `AGENTS.md`, `docs/design-system.md`, `docs/project-evidence.md`, `docs/portfolio-redesign.md`, `docs/verification.md`, the relevant page HTML/CSS, and its QA record before proposing a direction. Treat project evidence and source commits as the authority for technical claims; a README, screenshot, or mockup is not proof by itself. Preserve the existing architecture unless the task authorizes a change.

## Research and design workflow

1. State the audience, decision to enable, content confidence, and non-goals. Inspect the live working tree before treating a plan or snapshot as current.
2. For a substantial direction, review roughly 12-20 relevant, high-quality sources where practical: authoritative accessibility/responsive guidance; editorial and design-system practice; current portfolio/case-study examples; and at most a few video walkthroughs. Prefer recent material, but retain older primary standards when they remain authoritative. Keep a dated source log under `docs/research/portfolio-ui-ux/` recording title, author, date, URL, relevance, and exactly what was reviewed. Do not treat popularity as evidence.
3. Extract patterns only when they are independently supported and fit the portfolio's audience. Record disagreements and context: short scan paths versus deep case studies, expressive identity versus restraint, and real media versus conceptual diagrams.
4. Audit the current site against the resulting principles: retain, improve, remove, and unknown. Do not prescribe a redesign merely because a trend is newer.
5. Offer 2-3 differentiated visual directions. Each specifies concept, type, layout, project treatment, imagery, motion, audience fit, cost, and risk. Recommend one based on the brief and evidence, not personal novelty.
6. Write a design brief before implementation. Describe behavior and hierarchy across widths rather than fixed pixels. Hand implementation only a bounded milestone, source-backed copy, approved assets, token changes, and visual acceptance criteria.

For video, review captions/transcript only when actually accessible and permitted. Otherwise record that only the title, description, chapters, or metadata was reviewed; never imply that the video was watched.

## Operating principles

- **First viewport:** say who Jay is, what kind of engineering work is demonstrated, and give one clear route into the strongest evidence. Personality supports orientation; it does not replace it.
- **Selection and hierarchy:** feature few projects deeply; label maturity, role, evidence level, and limits plainly. Weak or speculative work must not receive flagship treatment.
- **Case study:** orient first (problem, role, scope, constraints, evidence); then show decisions, artifacts, implementation, verification, limits, and next steps. Provide anchors for long pages and a useful skim path.
- **Visual evidence:** use real screenshots, source-derived diagrams, measured outputs, or candid process artifacts with captions. Label conceptual graphics. Never fabricate product UI, metrics, users, or telemetry.
- **Typography and rhythm:** use a small type system with a readable measure, fluid bounds, intentional line breaks, and a consistent spacing scale. Let display type create hierarchy; do not use tiny mono copy as body text.
- **Interaction:** motion must explain state, sequence, or spatial relation. Start with a complete static experience; enhance only when motion is optional, short, interruptible, and testable.
- **Accessibility:** retain semantic landmarks, logical source order, meaningful names/alt text, visible focus, keyboard operation, zoom/reflow, contrast, and equivalent reduced-motion/no-JS experiences.
- **Visual QA:** compare actual desktop and mobile captures against the brief. Test the first viewport, long content, dense evidence, focus, 200% text/400% zoom where feasible, overflow, reduced motion, blocked assets, and no JavaScript. Record what was not tested.

## Anti-patterns

- Generic AI-product hero copy, fake dashboards, decorative code, or visual complexity standing in for evidence.
- One undifferentiated project grid, hidden role/scope, unlabelled claims, or metrics without provenance.
- Full-page animation, scroll hijacking, hover-only meaning, inaccessible carousels, cursor replacement, or motion that delays reading.
- Static desktop mockups treated as a specification; arbitrary breakpoint patches instead of component behavior.
- Copying another portfolio's visual language, assets, or layout rather than learning its information-design choices.

## Reusable design brief

```md
# [Milestone] design brief

Audience and decision:
Evidence boundary / approved claims:
Primary route and first-viewport message:
Featured projects and their hierarchy:
Content model: skim path / deep path:
Visual direction: concept, palette, typography, grid, imagery:
Responsive behavior: narrow / medium / wide:
Interaction and reduced-motion baseline:
Approved assets and required captions/alt text:
Non-goals and constraints:
Acceptance: screenshots, routes, accessibility, content, performance:
```

## Visual review rubric

Score each 0-2 with notes: orientation, project/evidence hierarchy, claim credibility, typography/readability, composition/rhythm, asset integrity, responsive intent, navigation/contact clarity, keyboard/focus/contrast, no-JS/reduced-motion equivalence, and implementation simplicity. A direction cannot pass if it fails claim credibility, accessibility, or responsive composition, regardless of visual score.

## Handoff and iteration

- **Research to design:** hand off a source log, synthesis, current-site audit, decision brief, and asset/evidence inventory.
- **Design to implementation:** obtain direction approval; implement one bounded milestone only. Do not change claims, architecture, or deployment policy without explicit approval.
- **Implementation to QA:** run repository checks, capture the agreed desktop/mobile routes, inspect them, and log observed results separately from prior evidence.
- **QA to next iteration:** classify defects, risks, and subjective options. Fix verified regressions before adding polish; preserve screenshots and decision rationale for comparison.
