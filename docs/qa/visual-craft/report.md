# Jaysystems visual craft review

29 October 2026. Baseline `origin/main`:
`6b025dce5bb11db899172de9c72d527f25b41707`. See the
[scoped direction and upstream principles](../../visual-craft.md).

## What changed and why

The first viewport retains Jay's large signature, Observer and personal opening.
The change concentrates on reading quality and the transition into technical
work. Homepage and library now share display, section, question, body, note and
caption roles. Main body is 18px at the default root size; door/evidence notes
are 16px, and the smallest changed instrument captions grow from 13px to 15px.
The existing palette, type families and requests are retained. Enlarged type
means some mobile navigation links wrap sooner; their order and targets remain.

The doors preserve their questions, prose, caveats and native links. Their
illustrations now use different topologies: a vertical authorization boundary
and a separate dotted observation path; a time boundary with a later opportunity
and a separate paper-risk gate; and a draft/revision/human handoff with no path
through the publishing boundary. The shaded regions reinforce those boundaries.
These are static conceptual reading aids, with adjacent text alternatives, not
captured runs or live status. The [unchanged source register](../../evidence/three-doors.md)
defines their evidence scope. No project experiments were rerun.

Jonah keeps its warm exhibition treatment and complete artwork. Curiosity now
starts with space and its existing dark ground rather than repeating the heavy
rust border. More room between the TEMPER discussion and working principles
lets the personal reflection resolve before the engineering entrances. No
reveals, new animations, runtime requests or dependencies were introduced.

## Actual visual iteration

The baseline captures showed repeated, sparse line-diagram silhouettes and small
supporting text. The [initial desktop](initial/doors-1440.jpg) and
[initial mobile](initial/doors-390.jpg) pass established distinct mechanisms and
larger notes, but retained unnecessary fixed question space and a narrow mobile
diagram cap. After inspecting these actual images, the final pass reduced the
question minimum from 4.7em to 3.6em, raised the mobile diagram cap from 18rem to
22rem, and moved the paper-risk diamond away from the bottom SVG edge. The
[final desktop](after/doors-1440.jpg) and [final mobile](after/doors-390.jpg)
captures show that refinement.

The first-viewport signature remains the dominant element at every width.
Desktop doors retain aligned reading columns, tablet uses paired explanation
columns, and mobile uses a single reading sequence. The stronger notes increase
the page length slightly; reducing necessary explanatory text was outside scope.
Hover emphasizes each destination rule; keyboard focus retains a visible outline.
The static mechanisms have the same meaning with reduced motion and without JS.

## Compare the captures

Open [the comparison viewer](compare.html) through the local preview for a view
and width selector. It opens each original image for inspection at full size.
Main comparison captures use Chrome 156, a 1000px viewport height and reduced
motion, fresh browser contexts, the same external font URLs, and decoded images.
All images are actual browser captures. Optional font loading can still select
system fallbacks on a cold visit; this pre-existing behavior remains.

| Width | Home first viewport | Library first viewport | Three doors |
| --- | --- | --- | --- |
| 320 | [Before](before/home-320-viewport.jpg) / [After](after/home-320-viewport.jpg) | [Before](before/library-320-viewport.jpg) / [After](after/library-320-viewport.jpg) | [Before](before/doors-320.jpg) / [After](after/doors-320.jpg) |
| 390 | [Before](before/home-390-viewport.jpg) / [After](after/home-390-viewport.jpg) | [Before](before/library-390-viewport.jpg) / [After](after/library-390-viewport.jpg) | [Before](before/doors-390.jpg) / [After](after/doors-390.jpg) |
| 768 | [Before](before/home-768-viewport.jpg) / [After](after/home-768-viewport.jpg) | [Before](before/library-768-viewport.jpg) / [After](after/library-768-viewport.jpg) | [Before](before/doors-768.jpg) / [After](after/doors-768.jpg) |
| 1280 | [Before](before/home-1280-viewport.jpg) / [After](after/home-1280-viewport.jpg) | [Before](before/library-1280-viewport.jpg) / [After](after/library-1280-viewport.jpg) | [Before](before/doors-1280.jpg) / [After](after/doors-1280.jpg) |
| 1440 | [Before](before/home-1440-viewport.jpg) / [After](after/home-1440-viewport.jpg) | [Before](before/library-1440-viewport.jpg) / [After](after/library-1440-viewport.jpg) | [Before](before/doors-1440.jpg) / [After](after/doors-1440.jpg) |

The same folders contain full-page captures, Jonah/Curiosity/principles transition
views, all three hover/focus states, no-JS, normal motion and 200% root text at
390px. Focus component crops exclude the surrounding page margin; the outline
continues outside those crop bounds. Responsive and interaction assertions are
recorded in [before/results.json](before/results.json) and
[after/results.json](after/results.json). Final main text and link hashes match
the baseline at every width. The images were visually inspected, with particular
attention to mobile reading measure, tablet paired layouts, intact artwork,
desktop hierarchy and the differing mechanism silhouettes.

## Measured performance

Lighthouse 13.0.1 / Chrome 156, three runs per route/profile per revision (24
runs total). Median values below; all individual measurements, settings and
resource-type weights are retained in [baseline](before/lighthouse.json) and
[candidate](after/lighthouse.json) projections. The machine-readable
[comparison](performance-comparison.json) includes deltas and budget flags.

| Route / profile | Performance before → after | LCP before → after | Transfer before → after | Requests |
| --- | --- | --- | --- | --- |
| Home / mobile | 98 → 98 | 2031 → 2028ms | 477419 → 479376 B (+0.41%) | 14 → 14 |
| Home / desktop | 98 → 98 | 899 → 850ms | 477419 → 479376 B (+0.41%) | 14 → 14 |
| Library / mobile | 99 → 99 | 1657 → 1654ms | 147875 → 148788 B (+0.62%) | 9 → 9 |
| Library / desktop | 100 → 100 | 522 → 523ms | 147875 → 148788 B (+0.62%) | 9 → 9 |

Accessibility is 100, CLS is 0 and lab TBT is 0ms in every before/after run.
There are no failed accessibility audits, recorded network errors or Lighthouse
warnings. No provisional regression trigger was crossed. The small timing
differences are within the scope of local lab variability and are not evidence
of a field speed improvement. Image, font and application JavaScript assets are
unchanged; added payload is static markup and CSS. No field INP is available.

## Reproduce

Start `node scripts/serve.cjs` (port 8000), then run
`node scripts/visual-craft.cjs before`, `initial` or `after` at the respective
revision. Set `CHROME_PATH` if using installed Chrome. A final capture requires
the baseline result manifest to compare text and links. Keep the baseline
checkout/server separate when collecting candidate data.

For performance, temporarily install Lighthouse 13.0.1 outside project
dependencies, set `LIGHTHOUSE_CLI` to its `cli/index.js`, and run
`node scripts/craft-performance.cjs before` / `after`. Set `PORTFOLIO_BASE_URL`
to the respective local server. The runner retains full Lighthouse JSON under
ignored `test-results/craft-performance/` and commits the measurement/settings
projection in each capture folder. It uses fresh Lighthouse storage, the default
simulated mobile profile and desktop preset, three sequential runs per route
and profile. The local server uses no-store and no compression. Transfer bytes
therefore describe this local server, not production CDN delivery.

## Verification

- `npm run check`: pass, including formatting, HTML, internal links, syntax,
  generated-section freshness, 17 data tests and the protected-content contract.
- `npm run qa`: pass. The [portfolio results](portfolio-results.json) cover five
  routes across five widths and the existing resilience modes, with zero axe
  violations in tested views. The [library results](library-results.json) cover
  nine responsive/accessibility/native-navigation cases. The
  [preservation results](preservation-results.json) cover 156 JS/no-JS fragment
  paths, 89 original URLs and 92 local destinations.
- `npm run qa:aetherforge`: pass, [26 viewport/scenario/resilience cases](aetherforge-results.json).
- `npm run qa:live-system`: pass, six expanded-layout, anchor, keyboard, network
  and accessibility cases ([results](live-system-results.json)).
- `node scripts/visual-craft.cjs after`: pass at all five widths, with matching
  rendered text/link hashes, no overflow or page errors, and checked focus,
  normal/reduced motion, no-JS and enlarged-text views.
- Official skill quick validation: all three skills pass. Every relative skill
  reference resolves. These skills were exercised in this task: screenshot-led
  iteration, bounded mechanism diagrams and paired lab measurements.
- `git diff --check` and staged whitespace checks: pass. No existing assertions
  were changed. The initial Windows CRLF formatting/freshness failures were
  resolved by LF normalization of working copies, producing no unrelated patch.

## Scope and limitations

Existing protected authored sections, Sinai original/image handling, source
revision pins, data files, generated HTML, routes and case studies are preserved.
The existing frontend-design installation changes and skills-lock.json were
present before this task and are excluded from its commits.

Visual inspection and automated keyboard interaction do not constitute testing
with a physical mobile device, a screen reader, Safari or Firefox. Local tooling
uses Node 24.21.0; repository CI specifies Node 22. No production deployment or
manual promotion is part of this work. No field INP/RUM data was supplied or
available to these audits; lab TBT must not be called INP. Runtime project claims
and external source availability have not been revalidated.
