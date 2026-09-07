# Systems Observatory — CipherLoop evidence release

Implementation record, 2026-09-07. Baseline: `92eeb72`.

The prior requested audit document was absent from this working tree at the start of implementation. Read the current owner direction in [implementation-plan.md](implementation-plan.md), [design-system.md](design-system.md), [project-evidence.md](project-evidence.md), and [verification.md](verification.md). This record supplements those documents without replacing them.

## Release-closeout status

The CipherLoop release is now source-backed at immutable commit `f03a1e186e491cf24aa0f0e0671cac766c1fa8ab`. The evidence record contains the archived Linux/Python test result (20 passing tests), fixture rerun, and bounded offline probes; it does not claim live-model, Docker, scanner, or production behavior. The dedicated study and claim ledger use source permalinks to that commit.

`vercel.json` now requests `public, max-age=0, must-revalidate` for mutable CSS, JS, WebP, and SVG filenames, while the HTML references the shared CSS/JS through the one-time `?v=20260907-evidence` query. The change is committed configuration only: the currently deployed site still returned immutable asset headers and did not contain the new architecture SVG during the 2026-09-07 read-only hosted check. No deployment, push, or merge has occurred.

## Decisions for this milestone

- CipherLoop is the flagship source-backed study. Its homepage summary and dedicated study distinguish recorded source/test evidence from implementation behavior that remains untested; no live-service, Docker, scanner, or measured-performance capability is claimed.
- The homepage positions Jay around AI systems, constrained compute, security tooling, and field software. The hero is an editorial statement rather than an assertion of measured reliability.
- `case-studies/cipherloop.html` is a dedicated static page. The current deployed Vercel behavior gives it the public canonical URL `/case-studies/cipherloop`; internal links use the physical `.html` path so a plain Python HTTP server works too. No legacy `/work/*` redirect is changed.
- Both pages share CSS, the tiny enhancement script, and the same original SVG asset. Semantic header/footer and case-study markup are deliberately hand-maintained. No build system, router, runtime content fetch, or new runtime dependency is introduced.
- The case-study pattern is: introduction/status/source, section navigation, question, concept, design questions, evidence/limits, next steps. Reuse this shell for future verified studies. Copy the header/footer carefully; validation covers every HTML file under `case-studies/`.
- Native anchors handle focus, URL fragments, and history. `main` has `tabindex="-1"` for the skip target. The site header is in normal flow, avoiding a fixed-height sticky-offset assumption at narrow widths. The case-study contents navigation sticks only in the desktop sidebar.
- No text or links are hidden for reveals. A single optional 700ms rule animation accents a figure when it enters view; it is decorative, bounded, and never represents live execution. Reduced motion and missing JavaScript/observer leave the SVG and all content readable. A live preference change reconfigures the enhancement.
- Retain Space Grotesk and JetBrains Mono; remove the Inter request. Google Fonts remains an external dependency with system fallbacks. Optional font display avoids late swaps after the initial rendering window; first visits may retain the fallback face. Self-hosting and broader font work are deferred.

## Scope delivered

1. Refactored palette, spacing, typography, responsive composition, navigation, and homepage hero.
2. Large CipherLoop feature with project intent, constraints/questions, source link, and dedicated study CTA.
3. Original `assets/diagrams/investigation-topology.svg`: a conceptual loop of Plan → Inspect → Evidence → Review around shared context. Written for this portfolio, with no third-party artwork or screenshots. Caption and alt text explicitly describe its conceptual status.
4. Dedicated static CipherLoop study with reusable classes, semantic sections, canonical/social metadata, immutable source permalinks, and persistent evidence caveats.
5. Anchor/skip-link repair and elimination of hidden-card reveal states.
6. All six project source destinations and existing contact/profile destinations retained. Five secondary entries remain compact and their summaries are explicitly scoped to the unverified snapshot.
7. CI formatting and HTML validation expanded to include the case-study directory; reproducible optional browser QA in `scripts/portfolio-qa.cjs`, with committed historical captures and a release-closeout report.

## Deferred

No CMS, complete secondary case studies, research-lab redesign, current-work feed, source audits of the other five repositories, new imagery pipeline, or framework. No push, merge, or deployment. Cache-header behavior remains unverified until a separately authorized deployment; the committed correction must not be described as live.

## Owner visual review

- Approve the hero wording “Intelligent systems. Real constraints.” and the large two-tone editorial treatment.
- Review CipherLoop's prominence and the balance between narrative and the square topology illustration, particularly the stacked mobile arrangement.
- Review the deliberately restrained motion and normal-flow header; both prioritize readable content and native navigation.
- Review the source-backed evidence framing and its explicit limits before publication; current validation does not replace the untested runtime boundaries listed in the claim ledger.

See the [CipherLoop release QA report](qa/cipherloop/report.md) for actual checks, screenshots, limitations, and reproduction commands. The earlier [vertical-slice QA record](qa/observatory/report.md) remains useful historical context.
