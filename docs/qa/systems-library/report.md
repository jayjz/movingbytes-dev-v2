# Three doors and systems library — implementation review

Reviewed 29 October 2026 against main `30d9997`. All work is on
`feat/systems-library-v2`. The old branch remains at `127b1951`. Main already
contained PR #22 and M1 via PR #23, so setup required no duplicate cherry-picks.

## Delivered experience

Jay → Perspective/Sinai → Jonah → Curiosity/TEMPER/field observation → principles
→ three engineering doors → contact. The homepage has six top-level sections,
down from sixteen. Original personal markup, artwork and reflections pass the
frozen hashes. No personal writing was rewritten.

The threshold uses shared rules, editorial type and three distinct static
mechanism marks. `/work/` is a separate, script-free index: six collections and
ten selected entries, organized by questions and system function. It leads into
the existing studies, pinned source and `/work/evidence.html`.

The evidence page preserves the complete former engineering sequence, including
CipherLoop → TraceForge, SHAD0W, AetherForge, applied work, research relationships,
notes/snapshot, ledger and registry. Its two generated slots remain deterministic
and render at authoring time. Data, maturity labels, source pins, case-study and
research pages, and deployment configuration are unchanged.

## Executed verification

| Command | Result |
| --- | --- |
| `npm run check` | Pass: formatting, six HTML pages, local links, syntax, data freshness, 17 data tests and frozen library contract |
| `npm run qa` | Pass: 65 page regression cases, nine library/door journeys, 156 preservation paths |
| `npm run qa:aetherforge` | Pass: 26 viewport/scenario/resilience cases |
| `npm run qa:live-system` | Pass: six expanded-layout, keyboard, network and accessibility cases |
| `git diff --check` | Pass |

The static contract checks all 78 frozen fragments, 89 URLs and 14 revision pins;
protected personal/study hashes; exact archive text; unique IDs and generated
slots; and exact native compatibility links. The independent browser suite
follows every frozen fragment with JS on/off and requests all 92 local reference
destinations, including fragment existence. All returned HTTP 200.

Legacy technical hashes use `location.replace` when JS is available. With JS
disabled, the targeted native link is visible and keyboard accessible. `#work`
keeps its new threshold and exposes a precise link to the original overview.
Deep links open native disclosures. AetherForge JS selects linked radio/case
records; the native fallback exposes a linked case alongside the current radio
selection so its content remains reachable and the controls still work.

Coverage includes 320, 390, 768, 1280 and 1440px; mobile navigation; visible focus;
skip links; all three door journeys; history; no-JS; reduced motion; blocked
scripts/fonts/artwork; 200% text at narrow widths and desktop; no horizontal
overflow; source-text fidelity; registry expansion; and zero runtime GitHub/JSON
requests. Automated axe audits report zero violations in their tested scopes.
Existing assertions followed the relocated material; none were relaxed to pass.

Recorded outputs: [page suite](portfolio-results.json),
[library](library-results.json), [preservation](preservation-results.json),
[AetherForge](aetherforge-results.json), [generated sections](live-system-results.json).

## Visual review and screenshots

Inspected actual threshold captures at all five widths, the desktop/mobile
library, authored opening and enlarged text. Reviewed hierarchy, rule alignment,
diagram scale, text measure, stacked entrances, native navigation and focus.
Desktop shows adjacent entrances; tablet uses short two-column spreads; mobile
stacks each complete entrance. No scroll reveal, transition dependency or heavy
visual library was introduced. Native disclosures retain their existing behavior.

Before images render frozen `30d9997` HTML/JS with the unchanged repository
CSS/assets. Before and after captures both load the existing web fonts. They are
browser renders, not constructed mockups.

| View | Desktop | Mobile |
| --- | --- | --- |
| Before homepage | [1440px](images/before-home-1440.png) | [390px](images/before-home-390.png) |
| After homepage | [1440px](images/after-home-1440.png) | [390px](images/after-home-390.png) |
| Previous engineering entrance | [1440px](images/before-work-1440.png) | [390px](images/before-work-390.png) |
| Three doors | [1440px](images/doors-1440.png) | [390px](images/doors-390.png) |
| Systems library | [1440px](images/library-1440.png) | [390px](images/library-390.png) |
| Library opening | [1440px](images/library-opening-1440.png) | [390px](images/library-opening-390.png) |

[200% text, 320px threshold](images/doors-text-200-320.png).

## Source and editorial limits

[Featured-source record](../../evidence/three-doors.md) pins Black Lantern to
`ab0b8c2`, SHAD0W to `ed773c5`, and Automated Social to `4c6ebc2`. Published
synthetic results, inspected source/tests, hypotheses and unverified live behavior
remain distinct. No project experiments were rerun for this website change.

Jay should review the new threshold/index wording, collection names and project
selection. His existing personal material remains unchanged. The diagrams are
conceptual aids, not telemetry or captured runs.

Local environment: Node `25.0.0`, npm `11.11.0`, installed Chrome through the
existing `CHROME_PATH` override. CI uses the declared Node 22 and pinned
Playwright Chromium. Initial sandboxed live-system QA was blocked only by the
existing Google Fonts request; rerunning with network permission passed without
changing assertions. Final full QA loaded the web fonts; fallback modes also pass.

Screen-reader and cross-browser testing were not performed. Remote availability
of every historical external URL was not batch retested; their original hrefs and
pins are preserved. Vercel team inspection was denied by the connector; the PR
records an actual preview link if GitHub supplies one. CI and hosted preview
status are recorded in the PR after the final push. No merge, production setting
change or manual production deployment is part of this work.
