# CipherLoop vertical slice — QA record

Date: 2026-09-07. Original implementation baseline: `92eeb72`. Local preview: Python HTTP server on `127.0.0.1:8000`. No push, merge, preview deployment, or production deployment performed.

## Scope and findings

Reviewed homepage, `case-studies/cipherloop.html`, shared CSS/JS, original SVG, internal navigation, and CI coverage. Owner-provided `.agents/`, `.codex/`, `AGENTS.md`, and planning documents were already untracked at the start. Owner guidance was preserved; a milestone record and evidence-register entry were added.

Resolved findings:

- Native skip-link focus and fragment/history behavior replace the old script's scroll-only interception. Both main elements are programmatic focus targets.
- Content is no longer opacity-hidden by reveal initialization. The pre-change full-page captures visibly contain blank regions where project cards had not entered the viewport.
- Normal-flow header avoids obscured anchor targets at mobile widths. Case-study sidebar navigation sticks only on wide layouts.
- Enlarging text to 200% at 390px initially caused heading/metadata overflow. Added intrinsic text wrapping and stacked mobile metadata, then repeated the checks.
- An initial local run observed mobile CLS of 0.171 while fonts loaded. Changed Google Fonts from swap to optional display to avoid late font substitution; repeated browser checks after this change.
- CI now formats and validates the added case-study pages.

## Actual validation

- Prettier **3.9.6**: homepage, case-study HTML, CSS, JS, and browser QA script pass.
- html-validate **11.14.0**: homepage and CipherLoop case study pass using the repository configuration.
- `node --check`: application script and QA script pass (Node 22.22.3).
- SVG: parses as XML successfully.
- Local static link audit: every internal HTML destination and fragment resolves; original email/profile/project source destinations are retained.
- `vercel.json`: exact parsed configuration matches HEAD; all six legacy redirects preserved. `git diff --check` passes.
- Browser: installed headless Google Chrome via Playwright **1.63.0**, axe integration **4.13.0**. Full results are recorded in [results.json](results.json).
- Both pages checked at **320, 390, 768, and 1440 CSS px**. Automated checks cover HTTP 200 responses, horizontal overflow, skip-link focus, fragment navigation, homepage Back history, case-study navigation, all six project sources, and page JavaScript errors. Axe WCAG A/AA scans at these eight page/viewport combinations found **zero violations**.
- Both pages also checked at 390px with JavaScript disabled, IntersectionObserver unavailable, Google Fonts blocked, reduced motion enabled before load, SVG requests blocked, and root text size doubled. Motion preference is also toggled during ordinary-page checks. This does not substitute for a real screen-reader or cross-browser review.

## Browser and visual evidence

Captured and visually inspected the original desktop/mobile page and redesigned desktop/mobile homepage and case study. Desktop uses a large two-tone hero and narrative/diagram split; mobile stacks the feature and case navigation, with all primary content visible. The SVG remains a complete static frame; the only enhancement is a short decorative border trace.

| Page | Desktop | Mobile |
| --- | --- | --- |
| Original homepage, full page | [Before desktop](before-desktop.png) | [Before mobile](before-mobile.png) |
| Redesigned homepage, full page | [After desktop](after-home-1440.png) | [After mobile](after-home-390.png) |
| CipherLoop case study, full page | [Case desktop](after-case-1440.png) | [Case mobile](after-case-390.png) |
| Homepage, first viewport | [Desktop viewport](viewport-home-1440.png) | [Mobile viewport](viewport-home-390.png) |
| Case study, first viewport | [Desktop viewport](viewport-case-1440.png) | [Mobile viewport](viewport-case-390.png) |

## Performance baseline and limits

Before implementation, HTML/CSS/JS totaled **25,566 bytes uncompressed**, excluding fonts. The local baseline resource trace recorded CSS transfer 10,242 bytes and JS transfer 2,260 bytes, with approximately 7–8ms fetch durations on desktop. Google Fonts CSS transferred 1,356 bytes; initial font-file transfer accounting was incomplete. The original site also requested a missing favicon. These are localhost observations, not network-constrained benchmarks.

The new local asset sizes can be reproduced with the `wc` command below. `results.json` records page LCP observations, CLS, resource transfer accounting, and font-loading state from an unthrottled local browser load. Cache and cross-origin timing affect those fields; a zero transfer size does not establish a zero-cost resource. The final unthrottled local run observed LCP from 148–196ms and CLS of 0 across all eight page/viewport combinations after the font adjustment. These are a development baseline only. No Lighthouse score, field Core Web Vitals, INP result, or before/after speed improvement is claimed. No performance budget is inferred from this smoke run. The implementation adds one shared 2.1KB SVG and keeps JavaScript near 1KB; there are no new runtime packages.

## Remaining limitations, ordered by release importance

1. **Content gate:** CipherLoop source code and execution paths were not audited. The case study is explicitly an editorial draft with intent, design questions, and pending evidence. Source verification is required before replacing that wording with capability claims. Other project descriptions are scoped to the existing snapshot.
2. **Hosting gate:** local Python serving does not test Vercel canonicalization, redirect responses, or headers. The canonical CipherLoop URL is `/case-studies/cipherloop`; local preview uses its physical `.html` file. Existing immutable caching of mutable CSS/JS filenames is a known release concern; no configuration was changed this milestone.
3. **Coverage:** headless Chrome only; no real-device, Safari, Firefox, screen-reader, actual 400% browser zoom, or throttled performance audit. Text doubling and 320px reflow are narrower checks. Axe does not prove full WCAG conformance. External destination preservation was checked, not remote availability of every repository.
4. **Visual/content review:** owner review remains for the two-tone hero wording, CipherLoop's prominence, conceptual diagram treatment, restrained motion, and visible editorial-draft copy.
5. **Reference:** the MotionSites reference in the owner plan could not be opened; implementation follows the written brief and original SVG work. No visual reference inspection is claimed.

## Reproduce locally

No application build or package installation is needed to preview:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/` and `http://127.0.0.1:8000/case-studies/cipherloop.html`.

The temporary QA tools used here live outside the repository. To reproduce their exact versions without adding application dependencies:

```sh
npm install --prefix /tmp/observatory-qa --cache /tmp/observatory-npm-cache --no-audit --no-fund playwright@1.63.0 prettier@3.9.6 html-validate@11.14.0 @axe-core/playwright@4.13.0
/tmp/observatory-qa/node_modules/.bin/prettier --check "index.html" "case-studies/**/*.html" "css/**/*.css" "js/**/*.js" scripts/portfolio-qa.cjs
/tmp/observatory-qa/node_modules/.bin/html-validate index.html "case-studies/**/*.html"
node --check js/main.js
node --check scripts/portfolio-qa.cjs
NODE_PATH=/tmp/observatory-qa/node_modules CHROME_PATH=/usr/bin/google-chrome node scripts/portfolio-qa.cjs
wc -c index.html case-studies/cipherloop.html css/style.css js/main.js assets/diagrams/investigation-topology.svg
git diff --check
```

The QA script writes screenshots and JSON to this directory. Override `PORTFOLIO_BASE_URL` and `CHROME_PATH` when needed. It is optional development tooling, not a runtime dependency or a newly mandatory CI browser service.
