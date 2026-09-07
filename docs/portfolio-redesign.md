# Systems Observatory — CipherLoop vertical slice

Implementation record, 2026-09-07. Baseline: `92eeb72`.

The prior requested audit document was absent from this working tree at the start of implementation. Read the current owner direction in [implementation-plan.md](implementation-plan.md), [design-system.md](design-system.md), [project-evidence.md](project-evidence.md), and [verification.md](verification.md). This record supplements those documents without replacing them.

## Decisions for this milestone

- CipherLoop is the provisional flagship. Its homepage summary and dedicated study distinguish the recorded project intent from implementation evidence that has not been verified. No source-repository audit or newly verified capability is claimed.
- The homepage positions Jay around AI systems, constrained compute, security tooling, and field software. The hero is an editorial statement rather than an assertion of measured reliability.
- `case-studies/cipherloop.html` is a dedicated static page. Vercel's existing clean-URL behavior gives it the public canonical URL `/case-studies/cipherloop`. Internal links use the physical `.html` path so a plain Python HTTP server works too; Vercel may canonicalize that path. No legacy `/work/*` redirect is changed.
- Both pages share CSS, the tiny enhancement script, and the same original SVG asset. Semantic header/footer and case-study markup are deliberately hand-maintained. No build system, router, runtime content fetch, or new runtime dependency is introduced.
- The case-study pattern is: introduction/status/source, section navigation, question, concept, design questions, evidence/limits, next steps. Reuse this shell for future verified studies. Copy the header/footer carefully; validation covers every HTML file under `case-studies/`.
- Native anchors handle focus, URL fragments, and history. `main` has `tabindex="-1"` for the skip target. The site header is in normal flow, avoiding a fixed-height sticky-offset assumption at narrow widths. The case-study contents navigation sticks only in the desktop sidebar.
- No text or links are hidden for reveals. A single optional 700ms rule animation accents a figure when it enters view; it is decorative, bounded, and never represents live execution. Reduced motion and missing JavaScript/observer leave the SVG and all content readable. A live preference change reconfigures the enhancement.
- Retain Space Grotesk and JetBrains Mono; remove the Inter request. Google Fonts remains an external dependency with system fallbacks. Optional font display avoids late swaps after the initial rendering window; first visits may retain the fallback face. Self-hosting and broader font work are deferred.

## Scope delivered

1. Refactored palette, spacing, typography, responsive composition, navigation, and homepage hero.
2. Large CipherLoop feature with project intent, constraints/questions, source link, and dedicated study CTA.
3. Original `assets/diagrams/investigation-topology.svg`: a conceptual loop of Plan → Inspect → Evidence → Review around shared context. Written for this portfolio, with no third-party artwork or screenshots. Caption and alt text explicitly describe its conceptual status.
4. Dedicated static CipherLoop study with reusable classes, semantic sections, canonical/social metadata, and persistent evidence caveats.
5. Anchor/skip-link repair and elimination of hidden-card reveal states.
6. All six project source destinations and existing contact/profile destinations retained. Five secondary entries remain compact and their summaries are explicitly scoped to the unverified snapshot.
7. CI formatting and HTML validation expanded to include the case-study directory; reproducible optional browser QA in `scripts/portfolio-qa.cjs`.

## Deferred

No CMS, complete secondary case studies, research-lab redesign, current-work feed, source audits of all six repositories, new imagery pipeline, or framework. No push, merge, or deployment. `vercel.json` is untouched, including its current immutable-cache rule for stable asset filenames; cache behavior remains a release-preparation concern rather than an unrequested configuration change in this slice.

## Owner visual review

- Approve the hero wording “Intelligent systems. Real constraints.” and the large two-tone editorial treatment.
- Review CipherLoop's prominence and the balance between narrative and the square topology illustration, particularly the stacked mobile arrangement.
- Review the deliberately restrained motion and normal-flow header; both prioritize readable content and native navigation.
- Approve the visible editorial-draft treatment before any publication; source verification is still needed to replace the outline with demonstrated technical detail.

See [QA report](qa/observatory/report.md) for actual checks, screenshots, limitations, and reproduction commands.
