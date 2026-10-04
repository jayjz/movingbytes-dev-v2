# jaysystems.dev

## Purpose

This repository is Jay's personal engineering website.

The site should communicate who Jay is, how he thinks, what he is currently exploring, and what technical work supports those ideas.

It is not primarily a repository browser, GitHub activity feed, or project catalog.

The intended narrative hierarchy is:

1. Jay
2. Perspective
3. Working principles
4. Current thinking
5. Selected work
6. Evidence and wider project history
7. Contact

GitHub and repository metadata are supporting evidence, not the site's identity.

## Positioning

Jay is a software engineer with a background in HVAC and construction, focused on backend systems, AI infrastructure, agent reliability, explicit authority boundaries, execution state, and independently inspectable evidence.

Do not inflate this positioning into unsupported claims of expertise, scientific validation, production scale, reliability, performance, business outcomes, or uniqueness.

The website should feel like Jay's intellectual and professional home.

## Design direction

Preserve the existing "Systems Observatory" identity, but prioritize human authorship over instrumentation.

Visual identity:

- Near-black backgrounds
- Bone/white typography
- `#ff5f1f` as a restrained signal accent
- Oversized editorial typography
- Strong hierarchy and generous spacing
- Subtle technical grids and instrumentation
- Original SVG and lightweight visual systems
- Purposeful motion that communicates state or system behavior
- The Observer as a recurring but restrained brand asset

Avoid generic SaaS cards, dashboard aesthetics, excessive GitHub-like UI, decorative complexity, and trend-driven redesigns that weaken Jay's identity.

The site should feel editorial, technical, personal, and deliberate.

## Information architecture

Personal sections should lead.

Prefer this order:

- Hero
- Perspective / background
- Working principles
- Now / current questions
- Selected work
- Systems map / evidence / registry
- Capabilities
- Contact

Repository names should not dominate the first viewport.

Selected work should lead with the engineering question or problem being investigated, with project/repository names as secondary identifiers.

## Content ownership

Treat content as two different classes.

### Authored content

These are manually written and must never be generated from repository activity:

- Hero copy
- Personal background
- Perspective
- Working principles
- Current questions
- Personal notes
- Positioning
- Calls to action

Changes to these require editorial judgment.

### Evidence-backed content

These may be generated or refreshed from reviewed sources:

- Project metadata
- Repository metadata
- Evidence links
- Revision pins
- Activity snapshots
- Research relationships
- Maturity/status records

Generated metadata must never automatically rewrite authored content, project claims, maturity, or personal positioning.

## Current data architecture

The current portfolio system includes:

- `data/projects.json` — curated project metadata, maturity, evidence, role, visibility, and selection
- `data/research.json` — curated research thesis, focus, relationships, ledger, and engineering notes
- `data/github.json` — explicit public GitHub allowlist
- `data/activity.json` — generated public repository metadata snapshot

Rendering is deterministic and performed at authoring time.

Visitors should not require runtime GitHub API requests or runtime JSON fetching for core content.

A failed metadata refresh must not break the published site or corrupt the previous valid snapshot.

Private repository content must never be exposed through the public static site.

## Engineering constraints

- Preserve the existing static HTML/CSS/JavaScript architecture unless a clear requirement justifies changing it.
- Do not add React, Next.js, Three.js, GSAP, or other large dependencies by default.
- Prefer semantic HTML, CSS, SVG, and small JavaScript modules.
- Preserve keyboard accessibility.
- Preserve reduced-motion behavior.
- Keep essential content usable without JavaScript.
- Avoid unnecessary network requests and third-party trackers.
- Preserve portable local preview behavior.
- Do not invent project capabilities, metrics, screenshots, verification claims, or research results.
- Use repository evidence and pinned revisions for technical claims.
- Do not modify deployment configuration without a documented reason.
- Do not push, merge, or deploy without explicit authorization.

## Evidence discipline

Technical claims must remain bounded by available evidence.

Distinguish clearly between:

- implemented
- experimentally verified
- historically verified
- unverified
- research hypothesis
- editorial synthesis

Do not treat:

- repository activity as progress
- passing tests as scientific validation
- deterministic behavior as correctness
- mocked behavior as live behavior
- paper behavior as live-capital behavior
- source inspection as experimental reproduction

Project relationships must not imply integration unless an actual integration exists.

## Brand rules

The Observer is Jay's strongest existing visual brand asset.

Use it selectively:

- hero identity
- favicon / lens mark
- field-note accents
- small evidence markers where appropriate

Do not let the mascot become the subject of the website.

The favicon should derive from a simplified Observer eye/lens motif and remain recognizable at small sizes.

## Current-work philosophy

The "Now" area should communicate what Jay is thinking about, not what GitHub has recently changed.

Prefer:

- active questions
- current engineering interests
- short observations
- things being tested or reconsidered

Avoid:

- raw commit feeds
- streaks
- generic changelogs
- inflated "currently building" lists

Keep this layer lightweight until repeated usage justifies more publishing infrastructure.

## Workflow

Before substantial changes:

1. Inspect `AGENTS.md`.
2. Inspect git status.
3. Confirm the current branch and baseline.
4. Read the affected HTML, CSS, scripts, data files, and relevant documentation.
5. Identify which content is authored versus evidence-backed.
6. Create a scoped implementation plan.

During implementation:

- Make minimal, reviewable changes.
- Preserve existing work.
- Avoid unrelated cleanup.
- Keep visual and content hierarchy intentional.
- Add or update tests proportionally to the change.
- Do not weaken existing assertions merely to make CI pass.

After implementation:

- Review the full diff.
- Check for unsupported claims.
- Check for accidental private information exposure.
- Check for unrelated changes.
- Report what changed, what was tested, and what remains unverified.

## Validation

For meaningful portfolio changes, run the relevant existing checks, including as applicable:

```sh
npm run check
npm run qa
npm run qa:aetherforge
npm run qa:live-system
git diff --check
```

Inspect responsive behavior at minimum across:

- 320px
- 390px
- tablet
- desktop

Also verify:

- keyboard navigation
- focus visibility
- reduced motion
- no-JavaScript behavior
- enlarged text
- project anchors
- internal links
- evidence links
- case-study routes
- generated-section freshness
- favicon references when applicable

Browser automation supports review but does not replace manual visual inspection.

## Decision rule

When choosing between:

- more repository detail
- more generated metadata
- more instrumentation
- more personal clarity

prefer personal clarity unless the additional technical detail materially improves evidence or credibility.

The site should make Jay memorable first, then make his work inspectable.
