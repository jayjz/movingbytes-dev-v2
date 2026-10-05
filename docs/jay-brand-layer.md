# Jay brand layer

Branch: `design/jay-brand-layer`. Baseline: clean local and remote main
`b123e5cddedbed15a925c1d81d2125b405d930f9`, confirmed 2026-10-04.

## Implementation brief

Audience: recruiters, engineering reviewers and collaborators deciding whether
Jay's judgment and work are relevant to them. Lead with Jay, field perspective,
working principles and current questions; retain an immediate route to work.
The HVAC/construction background is already public in the homepage. Principles
are owner-directed beliefs, not scientific findings. Now questions derive from
the public research thesis, focus and TEMPER scope; no new results are asserted.

Hierarchy: hero → perspective → principles → Now → selected work and capabilities
→ research focus, systems map, engineering updates, evidence ledger and registry
→ contact. Existing IDs and generated slots remain intact. The focus slot moves
with its existing content; the renderer and all data remain unchanged.

Visual direction: retain Observatory fonts, near-black/bone palette and orange
signals. Make Jay the largest hero word, give principles numbered editorial rows,
and use questions as feature headings. Evidence headings and spacing become
quieter without reducing readability or hiding evidence. Single-column narrow
layouts follow DOM order; no fixed hero height, new motion or visual cards.

Milestones:
1. Baseline static/browser checks and captures; hierarchy, authored copy and CSS.
2. Source-native Observer lens favicon on all three public HTML pages; QA coverage.
3. Required regression suites, desktop/mobile capture review, claim/diff review,
   coherent feature-branch commit and authorized feature-branch push.

Affected: index.html, css/home.css, css/live-system.css, favicon.svg,
case-studies/{cipherloop,shadow}.html (icon only), existing link/browser QA scripts,
and this brief/QA record. No production JavaScript, data, dependency, renderer,
case-study body, route or deployment configuration changes are planned.

## Content ownership

Jay owns the durable hero, perspective and principles directly in index.html.
The `#now` section is also hand-authored there, outside generated slots. Edit its
focus paragraph/questions when priorities change; no required cadence or
automatically updated date. Research and GitHub metadata retain their existing
separate ownership documented in portfolio-live-system.md.

Acceptance: identity/perspective/principles/Now precede repository architecture;
selected-work/email paths remain obvious; original technical content, evidence
and IDs survive; favicon renders at 16px; no-JS/reduced-motion, keyboard, 320/390px,
desktop and enlarged text checks pass. No new runtime requests or dependencies.
No new Now route, publishing system, private source access, merge or deployment.

Actual validation and remaining limits will be recorded in
`docs/qa/jay-brand-layer.md` after execution.
