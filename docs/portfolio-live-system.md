# Portfolio live system

## Plan and design brief

Baseline: `072dd5db2a08f46effbe9226916d6aa7e0384daa`, clean `main`.
Work branch: `feat/portfolio-live-system`. No deployment or main edits.
Audience: engineering reviewers deciding whether to inspect Jay's source and evidence.
Preserve the hero, CipherLoop → TraceForge story, SHAD0W study, AetherForge
instrument, and applied work. Add a compact thesis/focus band before the
flagship; place the semantic systems map, recent work, ledger and collapsed
registry after applied work. Retain existing palette, typography and native
links/details. Stack map lanes and ledger rows on narrow screens; no animation
or JavaScript required. Relationships must distinguish artifact handoffs from
editorial research connections. No new runtime dependencies or deployment build.

Milestones:
1. Curated registry/research and strict validation; bounded public snapshot updater.
2. Deterministic static rendering and responsive presentation.
3. Failure tests, existing checks/browser QA, evidence review, commit and feature push.

Affected: data/*.json, scripts/lib/*, updater/renderer/tests, index.html,
css/live-system.css, package scripts, QA assertions and these documentation records.

## Ownership and review

`projects.json`: manually reviewed descriptions, maturity, role, visibility,
selection, evidence scope/links and optional meaningful-update date. These are
pinned observations, never assertions about today's remote HEAD.
`research.json`: owner-curated thesis, focus, typed relationships, evidence
ledger and dated engineering notes. Machine-Native Systems uses only the
owner-supplied public positioning; its private repository is neither linked nor
queried. Never put confidential material anywhere in this static repository,
including a record marked private: the files themselves are publicly served.
`github.json`: explicit public repository allowlist (maximum 12).
`activity.json`: generated allowlisted metadata only; no descriptions, messages,
authors, source files, PR text, or inferred achievements. The latest default
branch SHA and repository push time indicate movement, not meaningful progress,
verification or a release. Push time can reflect another branch.

Run `npm run data:refresh` (anonymous GitHub REST, no token read) and then
`npm run data:render`. Review both JSON and HTML, run `npm run check`, and commit
on a feature branch. Rendering is also possible offline. `data:check` rejects
schema errors or stale generated HTML. A refresh never edits authored claims.
Each of at most 24 sequential requests has a 5-second total/body deadline and
256 KiB response limit. No retries, redirects, pagination or repository discovery.
One failure rejects the entire candidate; atomic rename preserves the previous
snapshot. Nonzero exit signals failure to tooling while the committed site stays
available. A never-refreshed snapshot is valid and explicitly labelled. Refresh can recover
a missing/malformed cache and accommodate an edited allowlist; rendering still
requires a complete validated snapshot.

No scheduled workflow is installed: unattended commits are unnecessary for this
static portfolio. A future read-only scheduled job can upload JSON/HTML as review
artifacts, with contents:read and no deployment or branch-write permissions.
Visitors make no GitHub or JSON requests. Committed HTML is the complete view;
GitHub outages, rate limits and disabled JavaScript do not affect it. The snapshot
date is always visible; metadata is never presented as live telemetry.

## Manual boundaries

Flagship layouts, case studies, claims, maturity promotions, evidence pins,
research relationships and meaningful recent-work notes remain editorial.
Metadata refreshes do not reconcile those claims with new HEADs. Reaudit source
and explicitly change pins before promoting new behavior. The reusable renderer
lives in scripts/lib because rendering at authoring time avoids a browser fetch
and duplicate fallback templates. Existing browser JS remains enhancement only.
