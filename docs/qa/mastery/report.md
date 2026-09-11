# Portfolio mastery pass — 2026-09-11

Implemented the **Observatory Ledger** opening and paired flagship on `design/portfolio-mastery`. No commit, push, merge or deployment. The local preview is `http://127.0.0.1:8000/` while `npm run dev` is running.

## Diagnosis and repository state

The initial checkout was the old evidence branch `0d0fedc`, not current main. Read-only GitHub inspection confirms main `cf7276b` and merged Observer PR #10. The locally available Observer head `95abf40` has an identical source tree (API comparison: one merge commit, zero changed files), so this work branch starts there without fetching or merging. Cached old feature/design branches are ancestors; cached `dev` diverges and was not used. Missing old /tmp worktrees were left alone. See the [plan and instruction audit](../../portfolio-mastery-plan.md).

The rendered baseline had clear identity, readable type and a strong source-pinned CipherLoop study. It lacked TraceForge and Sightglass, delayed work on mobile, left an awkward gap above the tablet headline, and gave uncertain secondary entries too much equal weight. The Observer was a good original prototype, absent from production. Historical documentation contained stale approval, source and deployed-status language; it was treated as history, with this user's current authorization controlling the work.

## Project hierarchy and evidence

**CipherLoop + TraceForge** is the flagship: producing evidence and evaluating it are separate responsibilities. The implemented relationship is an **offline capture harness**, with JSONL, metadata and sidecars, plus an independent two-fixture oracle. No live audit or general detection-accuracy claim.

**AetherForge** follows as constrained infrastructure; **Truck-Ready and Unhinged** provide applied systems; **Sightglass and HVAC Ops** remain smaller prototypes; **Fracture** is a compact research scaffold entry. Exact revisions, source/tests, current CI failures, branch distinctions and honest visual candidates are in the [eight-project evidence audit](../../evidence/portfolio-mastery-2026-09-11.md). No underlying project tests were rerun. TraceForge's successful hosted run was inspected, not executed by this portfolio task.

## Three directions and selection

[Rendered comparison and full 15-criterion scorecard](../../../prototypes/mastery/REVIEW.md): **Ledger 61/75**, **Instrument 54/75**, **Narrative 45/75**. All were rendered at 1440, 390 and 320. Ledger won on orientation, density, mobile reading order and implementation cost. Instrument leaned toward a documentation template; Narrative spent too much space before showing proof. Low-risk scores mean better outcomes in the two risk rows.

Prototype routes: [Ledger](http://127.0.0.1:8000/prototypes/mastery/ledger.html), [Instrument](http://127.0.0.1:8000/prototypes/mastery/instrument.html), [Narrative](http://127.0.0.1:8000/prototypes/mastery/narrative.html). Their optional keyboard-operable tuning controls adjust display, spacing and Observer scale. Production does not load the tuner. Reference observations are in the [dated research note](../../research/portfolio-ui-ux/mastery-2026-09-11.md).

## Bounded implementation

- Two-line engineering thesis, explicit role, field background, one route into the work.
- Original inline Observer SVG, reserved 96px/72px mount, bounded pointer/focus gaze. No idle animation, greeting UI, external asset request or runtime dependency. Reduced motion and no JS retain the static character; missing artwork/script never blocks content.
- CipherLoop → harness files → TraceForge diagram, actual committed toy/safe decisions, independent-expectation links, pinned source revisions, successful hosted CI link and adjacent limits.
- Source refresh and ordering of the existing project index; Fracture demoted. Existing case-study content and shared stylesheet/script preserved. Homepage styles isolated in `css/home.css`.
- QA now covers both new repository links, the new artifact, gaze bounds, enlarged text, missing character, missing character script and touch behavior.

## Rendered evidence

| View | Baseline | Implemented |
| --- | --- | --- |
| Desktop, 1440 | [Opening](baseline/home-1440-viewport.png) | [Opening](final/home-1440-viewport.png) / [full page](final/home-1440.png) |
| Desktop, 1280 | [Opening](baseline/home-1280-viewport.png) | [Opening](final/home-1280-viewport.png) |
| Tablet, 768 | [Opening](baseline/home-768-viewport.png) | [Opening](final/home-768-viewport.png) |
| Mobile, 390 | [Opening](baseline/home-390-viewport.png) | [Opening](final/home-390-viewport.png) / [flow](production/diagram-home-390.png) |
| Mobile, 320 | [Opening](baseline/home-320-viewport.png) | [Opening](final/home-320-viewport.png) |
| Enlarged text, 320 | — | [Opening](final/text-200-viewport.png) / [fixture results](final/text-200-fixtures.png) |

The selected-work divider moves from approximately 647→499px at 390, and 668→517px at 320. These are local screenshot geometry, not a usability-study result. Historical baseline JSON calls this boundary `flagshipY`; the reproducible runner names it `workY`. Tablet intentionally becomes a vertical composition, removing the empty upper-left gap; it uses slightly more height to retain readable measures.

## Verification

Final verification record is in [production/results.json](production/results.json). Commands use existing pinned dev dependencies and Node 22.22.3; no dependency additions or installs.

**Final result: passed.** Ten ordinary page/viewport checks and sixteen resilience modes passed; zero axe violations on ordinary views and the additional enlarged homepage views, no horizontal overflow/page errors, and CLS 0 on the ten measured views. Homepage local LCP was 156–288ms in this unthrottled run; this is not field performance. The corrected enlarged-text header and stacked fixture results were also visually inspected.

- `npm run check`: formatting, HTML, eight project destinations/internal assets/fragments, legacy redirect definitions and JS syntax.
- `CHROME_PATH=/opt/google/chrome/chrome PORTFOLIO_QA_OUTPUT=docs/qa/mastery/production npm run qa`: both routes at 320, 390, 768, 1280, 1440; axe WCAG A/AA, skip link, navigation/history, case-study disclosure, focus, no page errors/overflow, reduced motion, gaze range/neutral return and Observer/text separation.
- Resilience: no JS, missing IntersectionObserver, blocked fonts/images, reduced motion at load; plus homepage blocked Observer script, absent inline artwork, touch and 200% root text at 390/320. Enlarged-text axe and brand/navigation overlap assertions added after visual review exposed an overlap that overflow alone missed. The header now wraps intrinsically; narrow fixture results stack with their labels.
- Prototype HTML, formatting, syntax, all nine viewport captures and keyboard tuning controls checked. Fixed the narrative prototype's stray pseudo-element overflow and the tuner's ambiguous nested output labels.
- Visual review: all three directions, five baseline widths, five final widths, mobile artifact, static/missing-character and enlarged-text details. No unrelated source diff; shared CSS/JS, case study, lockfile, CI and `vercel.json` unchanged.

Measured local smoke values belong only to this machine/run. No production performance claim; inspect final JSON for observed LCP/CLS. No Lighthouse score was generated.

Reproduce comparison captures with preview running:

```sh
CHROME_PATH=/opt/google/chrome/chrome node prototypes/mastery/capture.cjs prototypes
CHROME_PATH=/opt/google/chrome/chrome node prototypes/mastery/capture.cjs final
```

Omit `CHROME_PATH` when using Playwright's installed Chromium. Baseline captures are preserved; the runner only replaces prototypes/final.

## Exact changes, limits and next milestone

Production: `index.html`, new `css/home.css`, new `js/observer.js`. Tooling: `package.json`, `scripts/check-links.cjs`, `scripts/portfolio-qa.cjs`. Evidence: appended `docs/project-evidence.md`; added source audit, research note, plan, three prototypes, comparison/tuning/capture files and QA artifacts. [Exact file manifest](files-changed.txt) lists every changed/new file, including screenshots.

Remaining limits: Chromium-family desktop browser with emulated touch; no Safari, Firefox, real device or manual screen-reader pass. 200% root text is a text-reflow stress test, not complete browser-zoom certification. Hosted portfolio browser/cache behavior was not verified; no deployment occurred. Existing Google Fonts dependency remains with fallbacks. The lower homepage retains its earlier layout. Whether the terse headline best matches Jay's voice remains an owner taste decision; it does not block the implemented slice.

**Next milestone for a cheaper model:** promote AetherForge from the index into one source-derived admission/rejection plate. Use `265c267` server/test paths in the evidence audit; label mock control-plane behavior and keep physical GPU swapping experimental. Preserve this opening and the CipherLoop case study, add no dependency, and run the same checks. Stop after that one system. Current failing AetherForge CI must not be described as passing.
