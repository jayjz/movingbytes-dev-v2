# JAYSYSTEMS identity pivot

Branch: `feat/jaysystems-identity-pivot`. Audited baseline:
`d49621c0a1a831dc6a83c5a8785a294a9494e243`, 28 October 2026.

## Two compositions considered

**A — Personal frontispiece (selected).** A large Jay signature and a short
human introduction share a spacious opening with the small existing Observer.
Perspective and compact working principles precede two unequal explorations:
a broad Jonah reading invitation, followed by a narrower model-behavior question.
A short field note bridges into the quieter engineering archive. Navigation:
Explorations, About, Archive, Contact. Bone typography and the existing restrained
orange signal retain the Observatory identity. One original typographic Jonah
composition provides the visual emphasis without inventing a screenshot.

**B — Reading desk.** A narrow personal masthead above a full-width Jonah feature,
with model questions and a field note in an adjacent marginal column. This puts
reading first but makes Jay's introduction too easy to miss and crowds narrow
screens. Keep the single reading invitation from this option, not its columns.

## Content and architecture

- Manually authored HTML owns the hero, perspective, principles, current questions,
  feature introductions, field note, and contact. Proposed first-person wording
  requires Jay's editorial review before publication. No autobiographical episode,
  expertise claim, theological position, or universal thesis is invented.
- Preserve the near-black/bone/orange palette, existing fonts, Observer, favicon,
  static architecture, public routes, legacy IDs and all evidence.
- Keep generated slots, curated data, revision pins, and refresh boundaries intact.
  Move their visual priority below the personal introduction and current work.
- Jonah is a Scripture/creative reading experience. Its actual deployment is
  `https://biblemap-pink.vercel.app/jonah/`, identified in BibleMap's existing
  `docs/jonah-irreplaceable.md` production record (24 October). Recheck the URL;
  the initial web fetch in this environment could not retrieve it.
- TEMPER is eligible as a bounded second feature: inspect the existing pinned
  metrics and unit-test source at `0747730d18cdb692142d9c2b50f9e8bc1ff0c45f`.
  Source includes coverage, selective risk, calibration error and risk/coverage
  functions. Tests specify hand-calculated cases and empty-acceptance rejection.
  This is source inspection, not a rerun or evidence of cost/reliability gains.
- Keep the existing CipherLoop, SHAD0W, AetherForge instruments and wider registry
  available as an archive; preserve their evidence caveats and case-study links.

## Checkpoints

A. This audit and design direction.
B. Personal hero, introduction, principles and homepage ordering.
C. Jonah, bounded model investigation and a specific field observation.
D. Typography, archive restraint and responsive refinements.
E. Regression checks and a review record; one draft PR to main. Stop there.

Review and stage only intended files at each step. Persist each checkpoint on
the existing remote branch before beginning the next. No force push, new branch,
merge, deployment configuration change or manual production promotion.

## Baseline evidence and environment

No existing local checkout was found. Source was retrieved through the connected
GitHub integration. Original commit, tree and retrieved blob hashes were verified
while restoring this exact branch locally. Historical screenshot/video blobs,
the older portfolio-design skill and local Codex configuration remain tracked
but omitted from the working tree. They are not deleted or changed.

`npm ci --ignore-scripts --no-audit --no-fund` succeeded with the lockfile intact.
Local Node is 24.21.0; the project/CI requests Node 22. Formatting, HTML, internal
links, syntax, generated-section freshness and `git diff --check` passed.
`npm run check` reaches the data suite but the default subprocess runner fails
with `spawn EPERM`. All 17 unchanged data tests pass using
`node --test --test-isolation=none scripts/portfolio-data.test.cjs`.
Baseline `npm run qa` fails at preview subprocess launch with `spawn EPERM`.
No baseline screenshots or browser-passing claim are made.

Command-line Git cannot connect through the configured proxy at 127.0.0.1.
The authorized GitHub integration will persist equivalent fast-forward
checkpoints with an expected-head check, and each remote head will be verified.
This transport difference must be explicit in the delivery report.
