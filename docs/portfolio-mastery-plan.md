# Portfolio mastery pass — 2026-09-11

Audience: senior engineers, hiring managers and founders deciding whether to inspect Jay's work.
Deliverable: three rendered directions, a scored selection, and one tested homepage opening/flagship slice.

## Repository and instruction audit

- Initial clean checkout: `feat/cipherloop-evidence-release`, `0d0fedc`; local `main` was stale at `d9d72b9`, cached origin/main at `78a77b1`.
- GitHub read-only API confirms default main `cf7276b2175923df8e2749c89dce14cb6a1d41f4`, merging Observer PR #10. API compare from local `95abf40530e7a96247b3f954ec5043857670bc93` reports one merge commit and **zero changed files**. New work branch `design/portfolio-mastery` starts from this identical source tree. No fetch, pull or merge needed.
- The two listed /tmp worktrees are absent/prunable. They were left alone. Cached dev diverges from cached main by 65 main-only / 2 dev-only commits; it is not an implementation base.
- Ledger is production; Observer is isolated under prototypes. TraceForge and Sightglass are absent from the original homepage. All other secondary entries use unverified snapshot copy.
- Read AGENTS, local config, both skills, design system, evidence register, redesign and implementation records, verification, past QA, source, Observer, deployment docs, scripts and CI.
- Historical approval gates and design-only handoffs are superseded by the user's explicit authorization to compare, choose and implement. Old verification command examples are superseded by package scripts/CI. Existing evidence remains historical, not newly rerun. Existing typography and architecture remain suitable.
- Reuse the existing research log and add a small current reference review, per the user's efficiency constraint. No new framework, dependencies, generated raster artwork, deployment changes or external messages.

## Reviewable milestones and affected files

1. Baseline: run documented preview; capture 1440, 1280, 768, 390, 320; run existing checks. Save review artifacts under `docs/qa/mastery/`.
2. Evidence: inspect current project source/tests and revisions; append dated evidence register. Two read-only agents cover project evidence and reference/Observer review.
3. Design: three distinct static prototypes under `prototypes/mastery/`: editorial ledger, field instrument, cinematic narrative. Render desktop/mobile, score all requested criteria, choose one in `prototypes/mastery/REVIEW.md`.
4. Slice: edit `index.html`, bounded homepage CSS and Observer JS; preserve case-study implementation. Refresh the transition/index copy to avoid stale claims without rebuilding the lower page.
5. Verify: `npm run check`, `npm run qa`, focused Observer/browser resilience, source/route checks, screenshots and diff review. Extend existing QA selectors only where the new artifact requires it.

## Design brief

Lead with Jay / software engineer, constrained systems and field background. Make the paired flagship and its source paths visible early. Public wording must distinguish source inspection, committed evidence and tests run in this session. The paired diagram must name the capture boundary and independent oracle; avoid implying a live connection or exhaustive trajectory.

Retain near-black, bone, orange and the existing font stack. Choose a composition after rendering, not three color variants. Small Observer retains the approved SVG identity; motion is bounded and optional. Primary scan path: identity → project question → mechanism → evidence and limit → case study/source. Mobile must prioritize this same sequence without a full-screen introduction.

Acceptance: no clipped content or horizontal overflow at required widths, no hidden essential content, visible keyboard focus, static no-JS/reduced-motion states, understandable artifact without animation. Scope stops after a convincing opening and flagship section with a coherent transition.
