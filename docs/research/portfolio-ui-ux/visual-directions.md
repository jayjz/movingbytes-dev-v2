# Visual directions and next milestone

All directions retain an evidence-first content model and must use original, approved, or source-derived assets only.

## A. Evidence Ledger Observatory — recommended

**Concept:** evolve the current Systems Observatory into a calmer editorial instrument: a bold thesis, a small evidence register, then one flagship investigation. It reads as a professional engineering publication rather than a product launch.

- **Typography:** keep Space Grotesk for display/body and JetBrains Mono for small, meaningful metadata. Increase contrast between large thesis, readable narrative, and evidence labels; use fewer labels rather than smaller labels.
- **Layout:** retain the generous near-black grid and full-width editorial sections. Add a compact “what is demonstrated / what is untested” panel at the flagship entry and a short, scan-first case-study summary before the detailed sections.
- **Projects and imagery:** CipherLoop gets a source-derived architecture/evidence composition. Other projects stay text-led and transparently scoped until real artifacts are approved.
- **Motion:** one optional, short path-trace or state transition per diagram; nothing moves before content is usable. Reduced motion is static.
- **Fit and trade-off:** best match for Jay’s evidence discipline and existing implementation. It is less instantly flashy than an immersive portfolio, but more defensible to technical evaluators and clients.

## B. Field Notes / Engineering Journal

**Concept:** make the portfolio feel like an exceptionally edited technical notebook: numbered observations, margin metadata, large reading column, occasional full-bleed evidence plates, and clear revision status.

- **Typography:** a warmer editorial display face paired with a highly legible sans body face; mono remains only for revisions, commands, and evidence references. New fonts require a performance and licensing decision.
- **Layout:** a narrow primary reading measure with a flexible metadata rail that becomes inline on mobile. Homepage uses a sequence of selected notes rather than a conventional card grid.
- **Projects and imagery:** real screenshots, test-output plates, and diagrams appear as annotated figures. Each figure answers a specific question with a caption and source/limit note.
- **Motion:** no ambient motion; brief disclosure/figure expansion only, with native `details` preferred where it suits the content.
- **Fit and trade-off:** strongest for communicating judgment and long-form engineering thought. It may underplay visual-product craft unless authentic product screens become available.

## C. Modular Systems Index

**Concept:** a structured index of engineering systems: each project opens as a module with its own evidence status, constraint, and artifact. The homepage becomes a crisp map of capability without pretending each project has equal maturity.

- **Typography:** retain the current two-family system but use a firmer modular scale and larger card titles; mono tags serve as taxonomy, not decoration.
- **Layout:** responsive asymmetric grid with one dominant flagship module and smaller secondary modules. A module grows into a case-study page with persistent section navigation and a related-work return path.
- **Projects and imagery:** source-derived diagrams, real interface captures, or an intentionally blank “evidence pending” state. No generic stock art or mock dashboards.
- **Motion:** discrete module focus/selection feedback only; no 3D gallery or scroll choreography.
- **Fit and trade-off:** makes the portfolio easy to scan and expand as projects mature. It risks treating complex work as equal cards unless the flagship scale and evidence labels remain forceful.

## Recommendation

Choose **Evidence Ledger Observatory**. It preserves the strongest existing identity and codebase, makes credibility more visible at the exact point a reviewer selects a project, and does not require invented media or a new framework. Field Notes is the strongest alternative if Jay wants to lead with writing and analytical judgment; Modular Systems Index fits only once multiple projects have comparable evidence artifacts.

## Exact next design-only milestone

Produce an approved **Evidence Ledger Observatory design packet**, without changing website files:

1. A one-page audience/content brief with approved first-viewport copy options and explicit evidence boundaries.
2. Homepage and CipherLoop case-study content hierarchy/wireframes at 390px and 1440px, including the new scan-first evidence panel and the existing long-form route.
3. A real-asset inventory marking each candidate screenshot/diagram/output as approved, source-derived, conceptual, unavailable, or prohibited.
4. A token/reflow specification: typography scale, spacing rhythm, grid behavior, focus/contrast states, interaction rules, and reduced-motion baseline.
5. A screenshot-based visual-review plan and acceptance rubric for a subsequent implementation milestone.

The milestone ends with owner direction approval. It does not create UI, rewrite claims, add fonts/dependencies, modify deployment, or run a redesign implementation.
