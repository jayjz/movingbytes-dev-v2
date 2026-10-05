# Research program page — implementation brief

Date: 2026-10-05. Branch: `feat/research-program-page`.
Portfolio baseline: `0696f49915b6ec6ad0a2a01581e630d8a88a05f7` (remote main,
including merged Jay brand PR #15). Initial tree was clean; local main was behind.
The feature branch was fast-forwarded to this exact baseline before changes.

## Audience, source and scope

A first-time technical visitor should understand Jay's question, why he is
investigating it, how negative evidence narrowed the position, and what remains
unresolved. The repository remains the canonical research record; this is an
authored reading interface, not generated activity or another registry.

Primary editorial source: `jayjz/machine-native-systems/PUBLIC_RESEARCH_SUMMARY.md`
at `393a2ceb7c8372e4e020c81c782af1c12ade96bb`. The summary reviews accumulated
research through `2b9a04cf0920b54f7b994e2e2b67b5707d5192e6`; ancestry was checked.
A disposable detached checkout was read without changing research files.
README, RESEARCH_QUESTIONS, HYPOTHESES, all four RESULTS, and E7.1 audit,
validation/publication material were also read to verify context and links.
No source-project experiments or reproduction checks are claimed for this pass.

## Direction and plan

The owner already specified the Observatory identity and an editorial research
spine. Use a ruled public notebook: large opening question, short orientation,
explicit epistemic labels, four substantial experiment rows, a spacious frontier,
five durable questions, visible limits and a compact evidence path. This adapts
the existing type/rule system without introducing a new visual direction.

1. Add physical `research.html`, canonical `/research`, metadata, favicon and
   shared CSS; a small dedicated stylesheet, no production JavaScript.
2. Keep the opening argument fully static. Explain producer/consumer and boundary
   terminology before it matters. Use text and source links, not fabricated charts.
3. Place one concise entrance in the homepage's authored Now section. The current
   five-link personal navigation already wraps at narrow measures; avoid adding a
   sixth item. Research's header links to Jay/home, selected work and contact.
4. Extend existing format/HTML/link/browser/hosted checks to cover this page.
   Keep all existing assertions and regression routes.
5. Review every claim against the pinned summary; run all required checks and
   inspect browser captures; record findings, commit and push the feature branch.

Desktop: asymmetric opening and marginal section labels; experiment question and
test/observation/revision occupy distinct columns. Narrow/enlarged text: same DOM
order, single readable column, no fixed heights or mandatory line breaks.
Navigation uses native anchors with visible focus. Status is written in words,
never conveyed by color alone. No motion is added; reduced-motion foundation
remains shared. System font fallbacks keep the page usable offline.

## Content ownership and acceptance

All research page prose and the Now entrance are hand-authored HTML, outside
renderer slots. Review a new pinned summary explicitly before updating results or
frontier; metadata refresh cannot rewrite them. Show the full reviewed source
revision in the evidence section. Do not copy raw archives or source checkout
into the public portfolio.

Preserve E4's full-format tie; E4.1's conditional minimum and safety/usefulness
tradeoff; E7's rich-context advantage and failed use of available hybrid facts;
E7.1's causal interference in several configurations alongside pooled D and
mechanism confounds. E7.2 is proposed/unrun. Limits remain visible.

Acceptance: static checks and all three existing browser suites; 320/390/768/1280/
1440 widths; keyboard/skip/focus/anchor/history; no-JS, blocked fonts/offline,
reduced motion, 200% text, axe and no overflow; physical route, favicon, homepage
entrance, home/work return and immutable evidence paths. Actual hosted clean-URL
behavior stays unverified until a separately authorized release.

## Reviewed design and routing references

Reviewed 2026-10-05: current HTML/CSS, both case studies, design-system,
portfolio-redesign, verification, brand-layer brief and QA, and existing scripts.
These establish the inherited visual direction; no broad trend research or
unrelated portfolio redesign is needed for this bounded extension.

- W3C WAI, [Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html):
  reviewed criterion/intent for 200% text without losing content or functionality.
- W3C WAI, [Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html):
  reviewed narrow reading without two-dimensional scrolling.
- Vercel, [cleanUrls](https://vercel.com/docs/project-configuration/vercel-json#cleanurls):
  reviewed static HTML mapping and extension-to-clean-URL 308 behavior. Existing
  `cleanUrls: true` supports `/research`; no configuration change is needed.

Baseline results and final claim/visual review: [QA record](qa/research-program-page.md).
