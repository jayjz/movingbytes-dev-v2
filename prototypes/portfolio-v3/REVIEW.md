# Portfolio v3 visual prototype review

## Review scope

These are isolated, static homepage prototypes. They share the same verified project hierarchy and source-derived CipherLoop overview diagram so the comparison is about art direction and information hierarchy, not different claims. They do not change the production homepage, case study, deployment configuration, or source repositories.

Final routes:

- `ledger.html` — A. Evidence Ledger Observatory
- `field-notes.html` — B. Field Notes / Engineering Journal
- `systems-index.html` — C. Modular Systems Index

## Rendered review and revision

### A. Evidence Ledger Observatory

First-pass observations:

1. The desktop CipherLoop display type was so large that the name could break mid-word; that weakened the otherwise precise editorial tone.
2. The flagship grid overflowed at 320px because its visual and text columns retained desktop minimum widths.
3. The hero ledger made the project, evidence layer, and current boundary quickly scannable, while the three secondary entries stayed appropriately subordinate.

Revision: reduced the display scale, restored normal word wrapping, and allowed the grid children to shrink. The final 390px render keeps `CipherLoop` intact, retains the evidence facts above the fold, and keeps the diagram legible without horizontal scrolling.

### B. Field Notes / Engineering Journal

First-pass observations:

1. The tall architecture diagram made the evidence plate feel narrow and visually heavier than the reading-led page around it.
2. The muted figure-caption and accent-red text fell below the automated contrast threshold.
3. The side-note areas needed explicit landmark labels; the prose itself was clear, but the document landmarks were ambiguous to assistive technology.

Revision: substituted the wider source-derived overview diagram, strengthened the muted and accent colors, and labelled each complementary landmark. The final mobile render preserves a comfortable single reading column; the desktop plate now reads as a deliberate evidence interruption rather than a long technical insert.

### C. Modular Systems Index

First-pass observations:

1. The flagship name could split at desktop and narrow widths, which made the strongest module look accidental rather than engineered.
2. The black, lime, white, and orange modules communicated unequal maturity well, but colored metadata initially had insufficient contrast.
3. The asymmetric module sequence made the selected systems clearly distinct without turning them into equal-weight cards.

Revision: reduced the heading scale, removed emergency word breaking, allowed module children to shrink, and moved colored metadata to the dark ink color. The final 390px page becomes a clean sequence of unequal system records, with no horizontal overflow.

## Rubric comparison

Score: 2 = strong fit, 1 = usable with a meaningful trade-off, 0 = does not meet the prototype objective.

| Criterion                                                | Ledger | Field Notes | Systems Index |
| -------------------------------------------------------- | -----: | ----------: | ------------: |
| First-viewport role and proposition                      |      2 |           2 |             2 |
| Flagship hierarchy and evidence legibility               |      2 |           2 |             2 |
| Honest distinction between verified and scoped work      |      2 |           2 |             2 |
| Typography and reading comfort                           |      2 |           2 |             2 |
| Composition and visual rhythm                            |      2 |           2 |             2 |
| Project imagery / source-derived evidence                |      2 |           2 |             2 |
| Responsive composition at 320–1440px                     |      2 |           2 |             2 |
| Navigation and contact discoverability                   |      2 |           1 |             2 |
| Semantic, keyboard, no-JS, reduced-motion baseline       |      2 |           2 |             2 |
| Fit for the existing near-black / bone / orange identity |      2 |           1 |             1 |
| **Total**                                                | **20** |      **18** |        **19** |

The scores are a decision aid, not an accessibility certification or a substitute for stakeholder taste. Field Notes is intentionally less navigation-forward and deliberately leaves the established color identity; Systems Index earns its score through hierarchy but asks the brand to accept a markedly lighter, more graphic surface.

## Recommendation

Choose **A. Evidence Ledger Observatory** as the implementation candidate. In the final renders, it is the clearest balance of engineering credibility, fast project orientation, serious visual identity, and mobile resilience. It advances the existing near-black, bone-white, and orange language instead of treating a portfolio refresh as a rebrand. The visible boundary statement also makes the evidence discipline a real interface behavior, not a claim in body copy.

Choose **B. Field Notes** instead only if the primary goal is an authored, essay-like identity and longer reading sessions. Choose **C. Systems Index** if the portfolio is expected to grow into a larger catalog of independently evidenced systems; its asymmetric inventory is compelling, but it gives secondary work more visual force than the current evidence depth warrants.

## Bounded implementation milestone for A

If selected, the next milestone should translate the Ledger hierarchy into the existing static site without changing the portfolio’s factual scope.

Likely production files:

- `index.html` — homepage semantics, order, and verified copy only.
- `css/style.css` — responsive Ledger layout, typography, focus states, and reduced-motion-safe presentation.
- `js/main.js` — only if an existing enhancement needs a small progressive enhancement; essential content must remain static.
- `assets/diagrams/cipherloop-overview.svg` — reuse as-is; do not fabricate a new product visual.
- `docs/portfolio-redesign.md` and the relevant QA record — document the approved decision and actual post-implementation checks.

Preserve: the existing canonical URLs and metadata; navigation and case-study route; source/evidence links and claim boundaries; keyboard access, skip link, visible focus, no-JavaScript reading path, and reduced-motion behavior; legacy redirects and deployment configuration. Do not change `vercel.json`, add dependencies, alter CipherLoop source, or imply the local prototype is deployed.

## Local review and verification

From the repository root, run `node scripts/serve.cjs`, then open:

- `http://127.0.0.1:8000/prototypes/portfolio-v3/ledger.html`
- `http://127.0.0.1:8000/prototypes/portfolio-v3/field-notes.html`
- `http://127.0.0.1:8000/prototypes/portfolio-v3/systems-index.html`

Final captures are in `screenshots/final/`; initial-pass captures remain in `screenshots/first/` to make the revisions reviewable. Run `node prototypes/portfolio-v3/qa.cjs` to regenerate final captures and check all routes. It starts a temporary local server on port 4174 and checks each prototype at 320, 390, 768, and 1440px for response status, horizontal overflow, first keyboard focus, page errors, reduced-motion behavior, and axe WCAG 2/2.1/2.2 A/AA violations; it also checks a 390px no-JavaScript rendering.

Recorded final run: all 15 route/mode results passed, with zero axe violations. This is local headless Chromium evidence only; it is not cross-browser testing, production performance testing, or a complete accessibility audit. The local run used Node 25, while the repository package metadata targets Node 22.
