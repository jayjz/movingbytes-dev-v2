# Portfolio live-system validation — 2026-10-04

Branch: `feat/portfolio-live-system`; baseline `072dd5db2a08f46effbe9226916d6aa7e0384daa`.
Implementation and public source inspection began 3 October. Snapshot timestamps
are UTC; the collected snapshot is `2026-10-04T02:55:02.670Z`.

## Results

- Baseline: clean main, `npm ci`, `npm run check` and browser suite passed before
  implementation. npm reported one moderate development-dependency advisory;
  dependencies and lockfile were not changed in this task.
- Final `npm run check`: formatting, HTML validation, internal links/fragments,
  preserved redirects, syntax, strict data validation, generated HTML freshness
  and updater tests all passed. `git diff --check` passed.
- `node scripts/portfolio-data.test.cjs`: **17 tests passed**. The environment's
  `node --test` wrapper reports a single passing file; direct execution reports
  all 17 cases. Covers deterministic/escaped rendering, schema and reference
  rejection, private-record restrictions, exact metadata field selection,
  configured request count, and byte-for-byte snapshot preservation on offline,
  simulated timeout, rate limit, malformed JSON, non-public repository, identity
  mismatch, missing SHA, impossible date, oversized body, and partial failures.
  Also verifies redirect/content-type rejection, edited allowlists, corrupt or
  absent cache recovery and the never-collected fallback.
- `CHROME_PATH=/opt/google/chrome/chrome PORTFOLIO_QA_OUTPUT=test-results/live-system npm run qa`:
  **39 checks passed**: 15 page/viewport combinations (home and both case studies
  at 320, 390, 768, 1280 and 1440) and 24 resilience combinations. Zero axe
  violations in scans; no page errors or horizontal overflow. Includes native
  navigation/history, keyboard, reduced motion, no JavaScript, blocked assets,
  missing observer, touch, and 200% text at 390/320.
- `CHROME_PATH=/opt/google/chrome/chrome npm run qa:aetherforge`:
  **26 viewport/scenario and resilience checks passed**.
- `CHROME_PATH=/opt/google/chrome/chrome npm run qa:live-system`:
  **6 expanded-layout checks passed**, including 320/390/768/1440, 200% text at
  320, and no JavaScript. All ten records open by keyboard. Legacy anchors
  `research`, `evidence-strategy`, `fracture`, `sightglass` remain visible targets.
  Zero console errors, failed requests, HTTP errors or runtime GitHub/JSON
  requests. Zero axe violations in all five JS-enabled scans. No overflow.
- Read-only `node scripts/check-hosted.cjs`: **21 responses captured**. Existing
  homepage, case studies and assets return 200; expected canonicalization and
  legacy redirects return 308/301; mutable assets request revalidation. This
  checks deployed main only, not this branch. No deployment action performed.
- The actual anonymous metadata refresh succeeded for all five selected public
  repositories. Earlier sandbox DNS failure left the snapshot untouched.
- Diff review confirmed flagship/applied stories and capabilities/footer remain
  byte-for-byte unchanged. Case studies, existing browser JS, deployment config,
  dependencies and CI workflow are unchanged. Generated metadata cannot rewrite
  claims. No private repository was accessed.

## Visual review and introduced fixes

Inspected desktop/mobile map, Current Focus, recent notes, collapsed and expanded
registry, and enlarged ledger captures. Map lanes stack; labels distinguish
artifact handoff, shared concern and research question. Status shapes and words
remain legible without motion or color alone. Expanded records are deliberately
long; their default collapsed state preserves flagship priority.

Tall element captures sometimes paint the fixed skip link inside the captured
region. Actual viewport capture and explicit unfocused geometry check confirm
it stays above the viewport; no production CSS workaround was introduced.

Two intermediate QA failures were introduced by test sequencing: new mouse clicks
changed focus-visible modality, and scrolling disclosures before the observer
check moved the hero out of view. Keyboard interaction and ordering corrected
both; the final full suite passed. The only implementation defect found was
refresh validation rejecting an old snapshot after an allowlist edit; refresh
now validates editorial inputs independently before validating/replacing its
candidate. Regression coverage passed. No pre-existing product failures were
identified. The canceled baseline-copy command was not a product/test failure.

## Evidence locations and limits

Local ignored captures/results:
`test-results/live-system/`, `test-results/live-system-focused/`,
`test-results/aetherforge/`, `test-results/hosted.json`.
Baseline log: `/tmp/portfolio-live-baseline.log`; final log:
`/tmp/portfolio-live-final.log`. These files are local review artifacts, not
published scientific evidence. Local homepage CLS was 0 at all five widths;
LCP samples 220–236 ms are local observations, not production performance claims.

Used installed Chrome instead of downloading Playwright's pinned browser.
Firefox, Safari, assistive-technology testing and actual 400% browser zoom were
not run; 320px reflow and 200% text were tested. Source-project tests and new
TEMPER experiments were not executed. No latest-HEAD capability re-audit is
implied by metadata collection. Scheduled refresh is intentionally absent;
run refresh/render and review a feature-branch diff. Deployment behavior for
these new sections remains unverified until a separately authorized release.
