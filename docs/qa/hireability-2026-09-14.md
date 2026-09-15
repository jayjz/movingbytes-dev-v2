# Hireability implementation and QA — 2026-09-14

## Scope and milestones

Baseline: clean `main` at `876a322`, as supplied by planning. Existing baseline browser artifacts were available at `/tmp/hireability-baseline/`; they were compared with the implementation run, not represented as newly rerun baseline checks.

1. **Positioning and hierarchy:** retained “Build systems. Leave evidence.” and Observer; added backend/AI infrastructure positioning, email, three project shortcuts, five numbered groups and an explicit employment CTA. Homepage and `css/home.css` changed.
2. **Flagship and SHAD0W:** production-v2 handoff and failure outcomes, separate historical oracle, current-contract introduction preserving the historical CipherLoop anchors, and a new static SHAD0W study/timeline. Changes in both studies and narrowly scoped shared CSS.
3. **Supporting evidence and conversion:** preserved the entire AetherForge instrument, added compact applied/research narratives, linked capabilities, dated evidence register and README updates. Removed HVAC Ops only from featured content; redirects remain asserted.
4. **Verification:** expanded page/route/source checks and browser assertions; no runtime dependency, JavaScript, font loading, or deployment configuration changes.

## Actual results

- `npm run check`: **pass** — Prettier, HTML Validate, all internal files/fragments, nine required source repositories, legacy redirects and JavaScript syntax. An initial invalid ARIA label on a generic container was removed before the passing run.
- `CHROME_PATH=/opt/google/chrome/chrome PORTFOLIO_QA_OUTPUT=/tmp/hireability-final npm run qa`: **39 passing records**. Homepage, CipherLoop and SHAD0W at 320, 390, 768, 1280 and 1440 px; zero axe violations across all 15 standard viewport scans, no page errors or horizontal overflow.
- Browser checks cover keyboard skip-link activation and focus, visible primary-action focus, navigation/history, both study routes, contact visibility, Observer bounds and text separation, reduced motion at load and after preference changes, no JavaScript, unavailable IntersectionObserver, blocked fonts/images, and 200% root text at 390 and 320 px on all pages. New timeline remains visible and within the viewport in fallback modes. Homepage also covers touch, missing character and blocked character script.
- `CHROME_PATH=/opt/google/chrome/chrome npm run qa:aetherforge`: **26 passing viewport/scenario and resilience checks**. All four mock scenarios remain intact.
- Sandbox preview startup initially failed; browser suites passed after running outside the sandbox with approval. No product change was needed for that environment restriction.
- `git diff --check`: **pass**. Final diff review found no runtime JS, dependency or deployment configuration changes. Original AetherForge instrument HTML remains byte-identical. Homepage script/image source list remains unchanged.

## Visual review

Inspected desktop/mobile opening captures and SHAD0W desktop/mobile timeline captures. Role statement and contact action are readable; Observer stays separated from hero text and CTA. Timeline uses a four-step chronological reading order, two columns in the narrower desktop study content, and a single vertical sequence on mobile. Same-time rejection has a restrained orange rule. No overlap or clipped evidence text observed in these captures. Automated fallback checks supplement this review; not every full-page pixel or screen-reader interaction was manually reviewed.

Retained review artifacts: [browser results](hireability/browser/results.json), [desktop opening](hireability/browser/viewport-home-1440.png), [mobile opening](hireability/browser/viewport-home-390.png), [desktop timeline](hireability/browser/diagram-shadow-1440.png), [mobile timeline](hireability/browser/diagram-shadow-390.png). Full-page and fallback captures remain in `/tmp/hireability-final/` for local inspection.

## Local loading comparison

Single local Chrome samples, not a production performance benchmark. Resource bytes exclude the document and can vary with cache/font responses. No new runtime request destinations or assets were added; CSS carries the additional layout.

| Page / width | Baseline LCP | Updated LCP | Baseline → updated resource transfer | CLS |
| --- | ---: | ---: | ---: | ---: |
| Home / 390 | 180 ms | 220 ms | 43,883 → 46,385 B | 0 → 0 |
| Home / 1440 | 208 ms | 208 ms | 43,883 → 46,385 B | 0 → 0 |
| CipherLoop / 390 | 240 ms | 192 ms | 25,790 → 27,065 B | 0 → 0 |
| CipherLoop / 1440 | 184 ms | 184 ms | 25,790 → 27,065 B | 0 → 0 |
| SHAD0W / 390 | New page | 172 ms | 22,477 B | 0 |
| SHAD0W / 1440 | New page | 188 ms | 22,477 B | 0 |

No material loading regression is apparent from these samples; they do not establish field Core Web Vitals.

## Evidence and remaining limits

[The dated evidence register](../evidence/project-evidence-2026-09-14.md) records full revisions, source/test paths, hosted CI links and evidence levels. Source-project tests were not rerun. The new narratives preserve the limits around live audit accuracy, physical hardware, SHAD0W live-session observation, current Truck-Ready integration, and research effectiveness. Historical and feature revisions are explicitly identified.

Chromium only; no manual screen-reader, Firefox/Safari or physical-device session. Canonical host remains `www.jaysystems.dev`. Physical `.html` internal routes pass locally. The new extensionless SHAD0W production route is included in `check-hosted.cjs` but remains unverified until a separately authorized deployment. No push, merge or deployment performed. Changes remain local and uncommitted on `main`.
