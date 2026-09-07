# Ledger opening revision

Baseline: `9dc8098`. Isolated branch: `design/ledger-refinement`.
Open `/prototypes/portfolio-v3/ledger-revised.html`; compare with `ledger.html`.
Production files, the three original prototypes, and Ledger's secondary work,
approach, and contact content remain unchanged.

## Composition and iteration

The opening leads with Jay, his engineering scope, a short personal introduction,
and one action. The evidence preamble is removed. CipherLoop follows immediately,
with its name, system description, and a scoped context/record visual.

The first browser review found that the visual read like a text table and mobile
line-break removal joined words. The deliberate second pass adds a source-to-two-
branches SVG, enlarges the outcomes and project name, removes the extra project
slogan, tightens the hero, and fixes mobile spacing. Mobile uses a single rail
and stacked records with ordinary HTML labels rather than a scaled desktop SVG.
No JavaScript, new dependencies, or motion was added.

The visual summarizes existing evidence register CL-04–CL-06 at CipherLoop
`f03a1e186e491cf24aa0f0e0671cac766c1fa8ab`. It distinguishes summary batches
in graph state from selected raw messages in a separate JSONL recorder. It is
not a live trace, retention guarantee, or claim of measured context savings.
No source-project audit or source tests were rerun.

## Actual validation

Chromium / Playwright 1.63.0, Node 22.22.3. Both original and revised Ledger:
320, 390, 768, and 1440px widths (900px height), plus no-JS at 390×844.
All 10 route/mode checks passed, zero axe violations in eight width checks.
Checks include local links/fragments, overflow, browser errors, skip-link focus
and activation, visible focus outline, hero anchor, reduced-motion scroll
behavior, and no-JS content. HTML validation, Prettier, and JS syntax passed.

Actual document positions from the same final browser run:

| At 900px viewport height | Original | Revised |
| --- | ---: | ---: |
| Desktop hero action bottom | 939px | 451px |
| Desktop CipherLoop heading top | 1423px | 609px |
| Mobile hero action bottom | 705px | 556px |
| Mobile CipherLoop heading top | 1290px | 699px |

Captures and raw results: `screenshots/ledger-revised/pass-1/` and
`screenshots/ledger-revised/final/`. Files ending `-viewport.png` show the
actual first viewport; other PNGs show the full page. Original Ledger was
captured again in each run for comparison.

## Local review

From this worktree, using the existing pinned development dependencies:

```sh
npm ci
npm run qa:install
npm run dev
# http://127.0.0.1:8000/prototypes/portfolio-v3/ledger-revised.html
```

Validation (the comparison harness starts its own server on port 4174):

```sh
npx --no-install html-validate prototypes/portfolio-v3/ledger-revised.html
npx --no-install prettier --check prototypes/portfolio-v3/ledger-revised.html prototypes/portfolio-v3/styles/ledger-revised.css prototypes/portfolio-v3/qa-ledger-revised.cjs
node --check prototypes/portfolio-v3/qa-ledger-revised.cjs
node prototypes/portfolio-v3/qa-ledger-revised.cjs
```

This session reused the existing checkout's node_modules through NODE_PATH
and its Chromium installation through PLAYWRIGHT_BROWSERS_PATH; it did not
install dependencies. Use those environment variables if reusing that cache.

## Recommendation

Ready for owner visual approval and then a bounded production integration.
The opening now gives the project comparable weight to the headline. The mobile
evidence panel remains a deliberate reading section; review whether that density
suits the homepage. No further full-page design pass is recommended.

Limitations: Chromium only; no manual screen-reader, physical-device, zoom,
blocked-font, production-performance, or hosted-deployment assessment. Remote
fonts retain the baseline's optional loading behavior. Automated results are
not complete accessibility certification. Nothing was pushed, merged, or deployed.
