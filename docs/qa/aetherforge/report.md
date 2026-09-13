# AetherForge admission instrument · 13 September 2026

Ready for owner review on `design/aetherforge-evidence-instrument`, based on current main `a42e264cbaa6a6977d9cea8d788a0079ebb86f1e`. No commit, push, merge or deployment performed.

## Implemented and verified

Replaced only AetherForge's project card with a full-width instrument inside the existing project index. Four native radio choices reveal static, source-derived decisions: admission, insufficient economic benefit, thermal lock and queue saturation. The decisive changed field is labeled in words and marked by a rule. Exact response codes, HTTP status, retained/applied strategy, source links and a captured route-probe artifact accompany the decision. No runtime API requests, dependency additions or fabricated telemetry. Optional JavaScript is 1,451 bytes and provides polite announcements and a 220ms bounded gate-path transition.

[Source verification](../../evidence/aetherforge/verification.md) records the exact AetherForge revision, configuration formula, four executed route probes and five passing existing tests under documented mock isolation. Timings are estimates; the scope is strategy admission, not complete autonomous workload execution or physical GPU validation.

## Visual review

Rendered the unchanged homepage before editing; [desktop baseline](baseline/home-1440.png), [phone baseline](baseline/home-390.png), [baseline checks](baseline/results.json). Inspected the initial instrument on desktop and phone, then performed exactly two visual refinement passes:

1. **Mobile scan path:** the result originally followed both constraints and gate, too far below the selector. The narrow composition now puts the result immediately after selection, followed by supporting constraints and calculation. Source order is outcome-first; the desktop grid presents request → gate → decision. There are no reordered interactive controls.
2. **Enlarged-text readability:** the resource heading split ordinary words at 200% text/320px. At the narrowest text measure only, it now uses body-scale type. Rechecked both enlarged widths without rerunning unaffected full suites.

Final screenshots manually inspected:

| Viewport | Example inspected |
| --- | --- |
| 1440 | [Admission](browser/1440-baseline.png), [homepage](browser/home-1440.png) |
| 1280 | [Economic rejection](browser/1280-short.png) |
| 768 | [Thermal rejection](browser/768-thermal.png) |
| 390 | [Economic rejection](browser/390-short.png), [no JavaScript](browser/no-js.png) |
| 320 | [Queue rejection](browser/320-queue.png) |
| 200% root text | [320 viewport](text-reflow/text-200-320-viewport.png), [390 viewport](text-reflow/text-200-390-viewport.png) |

The desktop economic comparison makes the switching tradeoff legible without reading the source. Phone selection gives the decision first, then the changed constraint and proof. No remaining objective composition defect observed. All four states were captured at all five ordinary widths, beyond the representative manual reviews above. Native focus is intentionally visible in keyboard captures.

Oversized full-element enlarged-text captures paint the offscreen fixed skip link inside the captured area. The viewport captures linked above do not show that artifact; focused DOM assertions confirm the unfocused skip link's bottom stays at or above the viewport's top. Full-element captures are retained for the rest of the reflow inspection, not as evidence of a visible overlap.

## Checks actually run

- `npm run check`: passed formatting, HTML validation, internal links/assets/fragments, eight repository destinations, legacy redirect definitions and JavaScript syntax, including the new script and focused runner.
- `CHROME_PATH=/opt/google/chrome/chrome PORTFOLIO_QA_OUTPUT=/tmp/aetherforge-regression npm run qa`: **26 checks passed** across homepage/case study, five widths and sixteen resilience modes. [Results](portfolio-regression.json). Existing Observer gaze, navigation, skip links, flagship table and case-study disclosure passed. No axe violations or horizontal overflow; measured CLS was zero. Local unthrottled LCP varied from 144–2308ms; these are smoke-run measurements, not field performance or a benchmark claim.
- `CHROME_PATH=/opt/google/chrome/chrome AETHERFORGE_QA_OUTPUT=docs/qa/aetherforge/browser npm run qa:aetherforge`: **26 focused checks passed** (20 scenario/viewport pairs plus six resilience modes). [Results](browser/results.json). Four native keyboard selections, focus outline, exact response/value agreement with probe JSON, panel visibility, internal/page overflow, source-link focus order, polite announcement content, touch taps, no JS, blocked enhancement, reduced motion at load and after preference changes, 200% text at 390/320. Axe A/AA checks returned no violations; axe is not run with JavaScript disabled, where all four CSS-only selections and content assertions still passed.
- `AETHERFORGE_QA_TEXT_ONLY=1` with the same runner: final two enlarged-text modes passed across all four cases; [results](text-reflow/results.json). This is the only CSS scope changed after the full passes.
- `git diff --check`: passed. Reviewed all changed source, tooling, evidence and generated artifacts. Programmatic scope comparison confirmed homepage content before AetherForge and from Truck-Ready onward is byte-identical except the new script tag; prior homepage CSS is preserved as a prefix. Shared stylesheet/scripts, Observer, case study, CI, lockfile and deployment configuration have no diff.

The first static run caught invalid ARIA labels on generic symbol spans; explicit image roles fixed them before final verification. The first focused run attempted axe with JavaScript disabled; the runner now records that audit as unavailable. A reduced-motion assertion initially raced the asynchronous media-change event; the corrected assertion waits for it. These were resolved, not omitted passing checks.

## Limits and handoff

Chromium with emulated touch; no Safari, Firefox, physical phone or manual screen-reader session. Enlarged root text verifies reflow, not complete browser-zoom certification. Physical GPU behavior, actual thermal events, production inference and current hosted AetherForge CI remain unverified. No production browser/cache check or deployment.

Exact changed/new files, including all captured artifacts: [file manifest](files-changed.txt). Product files are `index.html`, `css/home.css`, and new `js/aetherforge.js`; validation changes are `package.json` and new `scripts/aetherforge-qa.cjs`; evidence is confined to `docs/project-evidence.md`, `docs/evidence/aetherforge/` and this QA directory.
