# Jay brand layer — validation and copy

Date: 2026-10-04. Branch: `design/jay-brand-layer`.
Baseline: clean local/remote main `b123e5cddedbed15a925c1d81d2125b405d930f9`.
No merge, main modification or deployment. Feature-branch push is owner-authorized.

## Hierarchy and visual review

Hero → Perspective → Working principles → Now → compact engineering capabilities
and selected work → public research focus/systems map/recent engineering work/
evidence ledger/registry/GitHub snapshot → contact.

Jay is the largest hero word. The Observer, fonts, palette and restrained orange
remain. Desktop uses asymmetric text columns; mobile follows the same source
order. Principles use numbered rows and rules, not cards. Project questions are
large headings; names are secondary labels. Evidence headings and section spacing
are quieter, with body text, caveats and interactions retained. No new motion.
Now is directly editable HTML outside generated slots; no route or publishing
system was added.

Inspected actual 320/390px opening captures, desktop hero/perspective/principles/
selected-work captures, mobile principles/Now, and favicon captures. Focused 200% text and no-JS viewport captures were also inspected. A visual
review found that enlarged text left too little width beside principle numbers
and split the hero word “engineering”. Container queries now move numbers above
the text and adjust the headline only when the available measure is small.
Fresh captures show readable whole-word wrapping; normal desktop is unchanged. Element screenshots
can paint the fixed skip link within a tall captured element, as in previous QA
records. Actual unfocused geometry is asserted offscreen by the browser suites;
this capture artifact does not justify changing production focus behavior.

## Exact authored copy

Hero:

> Jay
>
> Systems engineering, grounded in field work.
>
> I’m a software engineer with a background in HVAC and construction. I build
> backend and AI infrastructure, with an interest in intelligent systems where
> authority, state, and evidence remain explicit.

Role line: “Software engineer / Backend & AI infrastructure”.
Actions: “Selected work” and “Email Jay”. Navigation: Perspective, Principles,
Now, Work, Contact. The name/headline have an explicit separating space in HTML
for their accessible name.

Perspective (existing heading retained: “Engineering starts outside the demo.”):

> My background is in HVAC and construction: crews, job sites, and work that has
> to hold up beyond ideal conditions. Hidden state, unclear handoffs, and failures
> have consequences in field work. That perspective informs how I approach software.
>
> I care about explicit contracts, visible execution state, and failure handling
> that preserves what happened. The work below shows how I explore those concerns—and
> what remains unverified.

“How I think” / “Working principles”:

> These are my current engineering principles: ideas I use to guide decisions and
> continue to question.

1. **Intelligence may be probabilistic; authority should be explicit.** Separate
   what a system proposes from what it is allowed to do.
2. **Actions should leave inspectable evidence.** Decisions and outcomes should
   remain understandable outside the process that produced them.
3. **Failure should preserve useful state.** Leave enough context to understand
   what happened and decide what comes next.
4. **Boundaries should preserve meaning.** Make consequential exchanges explicit
   without unnecessarily constraining intelligence inside the boundary.

“Current thinking” / “Now”:

> I’m exploring reliable intelligent systems: how semantic boundaries, explicit
> authority, and independently readable evidence can make their behavior easier
> to inspect.

“Questions I’m working through”:

- How can a proposed action, an admitted action, and an observed result stay distinct?
- What evidence is sufficient to accept a decision?
- When should a learned decision abstain or escalate?

These derive from existing public `research.json`: thesis; the first focus item;
TEMPER → TraceForge relationship; and the second focus item. They are questions,
not experimental findings. Field background was already public; no new personal
history, credentials or outcome claims were introduced.

Selected-work headings:

- “Can an investigation be checked independently?” / CipherLoop → TraceForge.
- “When is a decision allowed to act?” / SHAD0W.
- “When should a system admit more work?” / secondary AetherForge identification.

The first two questions were already present; their hierarchy was reversed.
Existing capabilities copy and all technical body content remain unchanged.

Metadata description:
“Jay is a software engineer with a field-work background, building backend and AI
infrastructure around explicit authority, state, and evidence.”
OG/Twitter description:
“Systems engineering, grounded in field work. Backend and AI infrastructure with
explicit authority, state, and evidence.” Existing technical title is retained.

## Favicon

`favicon.svg` uses a 32-unit viewBox, near-black rounded background, chamfered bone
housing, dark ring, light lens, dark aperture and orange side pivot. All geometry
is filled; no gradients, tiny stand or handle. Every public page declares the same
root-relative SVG icon with type `image/svg+xml` and sizes `any`.

Inspected an actual 16×16 Chrome raster, its enlarged nearest-neighbor preview,
and 16/32px rendered views. The lens/aperture and orange pivot remain legible.
Browser QA checks the icon reference on all three pages and its successful SVG
response. Static link validation requires the declaration and resolves the asset.
No raster-production pipeline exists in the repository; PNG/touch variants were
omitted rather than introducing tooling solely for optional assets. No OG image
or image-generation dependency was introduced. Browser chrome selection in Safari
and saved-home-screen behavior were not tested.

## Changed files

index.html; css/home.css; css/live-system.css; favicon.svg;
case-studies/cipherloop.html; case-studies/shadow.html;
scripts/check-links.cjs; scripts/portfolio-qa.cjs; docs/jay-brand-layer.md;
docs/qa/jay-brand-layer.md.

## Executed validation

Baseline `npm run check`: passed. Baseline `npm run qa`: 39 checks passed, recorded
in `test-results/brand-baseline/`. Browser suites required escalation to start the
local server/Chrome after sandbox startup failed; no application failure implied.

Final implementation:

- `npm run check`: passed (formatting, HTML, links, JS syntax, data validation,
  generated HTML freshness and data tests).
- `CHROME_PATH=/opt/google/chrome/chrome PORTFOLIO_QA_OUTPUT=test-results/jay-brand npm run qa`:
  39 page/viewport/resilience checks passed. Five widths on homepage and both case
  studies; keyboard/history, study links, reduced motion, no-JS, blocked assets,
  touch, missing Observer and 200% text at 320/390. Zero axe violations in audited
  scenarios; no page errors or horizontal overflow. Added personal-hierarchy,
  first-viewport GitHub-link absence and favicon assertions.
- `CHROME_PATH=/opt/google/chrome/chrome npm run qa:aetherforge`:
  26 viewport/scenario/resilience checks passed; all four scenarios retain their
  source-response matches and keyboard/no-JS behavior.
- `CHROME_PATH=/opt/google/chrome/chrome npm run qa:live-system`:
  6 expanded-layout checks passed; all ten registry records and metadata snapshot
  open by keyboard; legacy anchors, no-JS, 200% text, axe and network checks pass.
- `git diff --check`: passed.
- Preservation audit against main: every original ID and distinct external URL
  retained; both generated slots byte-identical; proof figures, outcomes/results,
  AetherForge instrument and footer unchanged apart from surrounding whitespace.
  Both case studies differ only by the favicon declaration. Data, renderer,
  production JS, dependencies and deployment config are unchanged.

Ignored local artifacts: `test-results/jay-brand/`,
`test-results/live-system-focused/`, `test-results/aetherforge/`.
Logs: `/tmp/jay-brand-{baseline-qa,final-check,qa,aetherforge,live-system}.log`.
The focused capture helper first found the regression preview already stopped;
it was rerun with its own disposable server. This was not a product defect.

Limits: Chrome only; no Safari/Firefox or assistive-technology session, no actual
400% browser zoom, no hosted-release verification, no source-project tests or
capability re-audit. Local measurements and captures are review artifacts, not
production reliability/performance results. No merge or deployment was performed.
