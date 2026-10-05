# Machine-Native Systems page — claim and QA record

Date: 2026-10-05. Branch: `feat/research-program-page`.
Portfolio baseline: `0696f49915b6ec6ad0a2a01581e630d8a88a05f7`, merged Jay brand layer.
Canonical editorial source: `jayjz/machine-native-systems` at
`393a2ceb7c8372e4e020c81c782af1c12ade96bb`.
Accumulated research reviewed by that summary:
`2b9a04cf0920b54f7b994e2e2b67b5707d5192e6` (confirmed ancestor).

## Delivered reading path

Opening question/definition → personal motivation → falsifiable working position
→ E4/E4.1/E7/E7.1 experiment spine → diagnosis before redesign → five durable
questions → visible limits → canonical evidence and full revision pins.

The research page is fully authored semantic HTML. Its CSS inherits the existing
near-black/bone/orange palette, Space Grotesk/JetBrains Mono, rules, native focus
and reduced-motion foundation. There is no production JavaScript, runtime data
fetch, framework, copied research archive or generated research prose. The lens
mark appears once in the byline and as the existing favicon. Results are editorial
rows with Test / Observation / Revision labels, not invented charts or telemetry.

Homepage integration is one link after the three authored Now questions. The
existing five-link personal navigation already occupies a narrow row/wrap; a
sixth item would crowd that opening. Now is the relevant deliberate entry point.
The research header and footer return to Jay/home; header and evidence section
return to selected work. Homepage copy, all generated slots/data, both case-study
bodies, original project links, production scripts and deployment configuration are preserved.

## Claim-by-claim review

Primary authority for all result/position/limit prose is
[PUBLIC_RESEARCH_SUMMARY.md](https://github.com/jayjz/machine-native-systems/blob/393a2ceb7c8372e4e020c81c782af1c12ade96bb/PUBLIC_RESEARCH_SUMMARY.md).
The following deeper files verified context, wording and links; their inspection
does not constitute experimental reproduction.

| Page claim | Context checked | Editorial boundary retained |
| --- | --- | --- |
| Program definition | Summary opening; README | A public program combining literature synthesis and bounded comparisons, not a finished theory. |
| Why Jay investigates | Existing homepage background/principles; summary's boundary/permission/outcome question | First-person editorial synthesis of already public field background; no new credential, result or personal history. |
| Current position | Summary current position; HYPOTHESES H1 and disconfirmation | Explicit consequential semantics remain falsifiable; internal representation remains free; information/integration costs can defeat the position. |
| E4 | experiments/e4-boundary/RESULTS.md observations, interpretation and confounds | Full controlled prose/JSON/hybrid tie; compact loses distinctions under optimistic defaults; no typed superiority. |
| E4.1 | experiments/e4-1/RESULTS.md observations and counterevidence | Fail-closed avoids duplicates at useful-completion cost; alternatives + attempt + status is minimal only among tested omissions, relative to consumer, fixtures, oracle and receipt model. |
| E7 | experiments/e7/RESULTS.md observations, falsification and adaptive deviation | Rich context wins here; hybrid contains ignored contradictory facts; implemented inventory-first adaptive retrieval changes no decision; economical sufficiency weakened here, no universal boundary failure. |
| E7.1 | experiments/e7-1/RESULTS.md observations/verdict/audit/limits; POSTRUN_AUDIT.json | Fixed supporting facts and masking support causal bundle interference in several configurations; pooled D remains visible; mechanism/sole cause/universal shortcut learning unresolved. |
| Masking | E7.1 full-40 useful completion and OOD masking discussion | Some useful completion decreases; no deployment remedy. |
| Frontier | Summary frontier; E7.1 final proposed diagnostic | E7.2 has not run; confidence/presence controls proposed; no context-recovery or escape-hatch architecture validated. |
| Five durable questions | Summary durable questions; RESEARCH_QUESTIONS | Information, transition/authority ownership, independent outcomes, uncertainty/dependence, coordination/cost remain questions. |
| Limits | Summary major limitations; all RESULTS | Small same-author worlds, bounded statistical families, familiar vocabulary under novelty, uncalibrated probabilities, trusted stores, correlated crossed executions; no general-LLM/open-world/production/lifecycle-cost advantage. |
| Provenance | Summary final paragraph; E7.1 VALIDATION.md and PUBLICATION.json; Git ancestry | Public merge and accumulated-research revisions distinguished; local prepublication SHAs not substituted for canonical published ancestry. |

Searched the full page for proven/superiority/shortcut/recovery/LLM/production/
independence/causality/minimum/verdict language. All such claims retain the above
qualifications. Permission, receipts and determinism are explicitly insufficient
to establish semantic correctness or deployment reliability. The two model
families are not presented as general LLMs. No activity metadata informed claims.

All nine distinct pinned GitHub evidence-file URLs returned HTTP 200 in direct
read-only HEAD checks: summary, four RESULTS, questions, hypotheses, postrun audit,
publication ancestry. The E7.2 fragment matches the canonical RESULTS heading.
Git checkout and source-path inspection provide the same immutable-file mapping.

## Baseline and iteration

Before implementation: `npm run check` passed; portfolio QA passed 39 scenarios;
AetherForge passed 26; live-system passed six. Mobile/desktop opening captures
were inspected in `test-results/research-baseline/`.

Focused iteration: research's five widths and six resilience modes passed. HTML
validation first caught an inappropriate aria-label on a paragraph; the label
was removed. A keyboard navigation assertion initially ran before navigation
completed; explicit URL waiting corrected the harness. No existing assertion was
weakened. Visual review found a narrow-container CSS ordering issue that reduced
frontier heading emphasis; the cascade was corrected before final regression.

Sandbox restrictions initially blocked portfolio preview startup; the same QA
commands were rerun with approved server/browser permissions. This was an
execution-environment limitation, not a site defect.

## Final verification

- `npm run check`: pass, including research formatting/HTML, all internal
  assets/fragments, immutable research pin policy, canonical/clean-URL assumptions,
  JS syntax, generated-section freshness and data tests.
- `CHROME_PATH=/opt/google/chrome/chrome npm run qa`: 50 scenarios pass on all
  four pages. Five widths per page: 320, 390, 768, 1280, 1440. All original
  scenarios remain, with 11 research scenarios added; zero axe violations in
  audited scenarios, no page errors or document overflow. Keyboard skip/focus,
  contents anchors, history, homepage → research, home/work return, physical
  routes, favicon response and absence of research JS/GitHub/data requests pass.
- `CHROME_PATH=/opt/google/chrome/chrome npm run qa:aetherforge`: 26 scenarios
  pass, including keyboard/scenario response matching and resilience.
- `CHROME_PATH=/opt/google/chrome/chrome npm run qa:live-system`: six expanded
  layout/anchor/keyboard/network/accessibility scenarios pass.
- `git diff --check`: pass.
- Preservation comparison: all existing homepage IDs and external URLs retained;
  both case studies, shared/home/live-system CSS, all four data files, production
  JavaScript and vercel.json are byte-identical to baseline. GitHub confirms the
  research repository is public with default branch main; detached source tree
  remains clean. Remote portfolio main was rechecked and still equals baseline.

Research modes verify the complete argument is identical across widths, no-JS,
blocked fonts, reduced motion, 200% text at 320/390, and simulated offline (all
external resources blocked, page JavaScript disabled). Reduced motion has no
active main animation. Axe also scans both research enlarged-text scenarios.
All evidence statuses use words, and essential content is visible static HTML.

Manual visual inspection of actual browser captures covered 320/390/768/1440
openings, position labels, experiment rows (including E7.1's visible D), desktop
and mobile frontier, durable questions, limits, evidence/revision pins, no-JS,
offline, both enlarged-text openings, and the homepage Now entrance. Case-study
regression openings were inspected too. Narrow columns follow reading order;
the experiment arc and frontier retain distinct emphasis without charts/cards.

Visual review of the full suite's 200% capture exposed the inherited 40px brand
box cramping enlarged `jay` text. Research-only CSS now uses 2.5rem dimensions;
the existing harness asserts that the enlarged mark contains its text. After
that final scoped change, static validation and all 11 research scenarios were
rerun successfully. Fresh 320/390 enlarged-text captures were inspected and show
the corrected mark. Homepage/case-study styles were not changed.

Some tall element captures paint the fixed skip link inside the capture, as in
the brand-layer QA record. Actual viewport captures show it offscreen until
focused; no production hiding workaround was introduced. Keyboard activation
and visible focus pass the browser harness.

Ignored local artifacts: `test-results/research-baseline/` (baseline),
`test-results/portfolio/` (full 50-scenario run), `test-results/research-focused/`
(final research rerun/captures), `test-results/aetherforge/` and
`test-results/live-system-focused/`. These are local browser review artifacts,
not research results or production performance claims.

Changed files: research.html, css/research.css, index.html, package.json,
scripts/check-links.cjs, scripts/check-hosted.cjs, scripts/portfolio-qa.cjs,
README.md, DEPLOY.md, docs/research-program-page.md, and this QA record.

## Routing and remaining limits

Physical local route: `/research.html`. Canonical/OG: `/research`. Existing
`cleanUrls: true` and `trailingSlash: false` are asserted by static validation;
[Vercel's clean-URL documentation](https://vercel.com/docs/project-configuration/vercel-json#cleanurls)
supports the physical-file mapping and extension redirect. The hosted checker
includes the three research variants for a future authorized release. Production
route/redirect responses are not claimed as verified; no merge or deployment.

Chrome-only browser coverage; no screen-reader session, Safari/Firefox review or
actual OS/browser 400% zoom. 200% root text and 320px reflow are tested. Optional
Google Fonts remain external with fallbacks; external resources blocked in the
offline scenario. No research experiment or source test was rerun in this
portfolio implementation; canonical records were read and claims reviewed.
