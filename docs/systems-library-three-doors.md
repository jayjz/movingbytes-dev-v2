# Three doors into the work

## Baseline and dependency

Started from fetched `origin/main` at `41d7e49` on 29 October 2026. Clean working
tree. PR #22 was OPEN at inspection, with original head `310bb69`. Created and
pushed `feat/systems-library-three-doors` from main, then cherry-picked its six
commits with `-x`, preserving the original author and provenance. Carried-forward
head `9fdd021a499d7a8e76d3522d66d9b6579116b50e` is the preservation baseline.
This PR depends on the owner-authored material in
[PR #22](https://github.com/jayjz/movingbytes-dev-v2/pull/22); review that dependency
before merging. No existing branch is rewritten, merged or deployed.

The task's branch and push instructions supersede the frontend-design skill's
older branch name and the QA skill's review-only push restriction. Authored
opening, Sinai, Jonah, Curiosity/TEMPER, field note, principles and contact are
protected. Navigation labels and library summaries are new editorial proposals;
repository metadata and limits stay curated separately.

## Visual process, before implementation

**Visual thesis:** A quiet editorial threshold in ink, bone and signal orange
connects Jay's personal world to three distinct ways of reading his systems.

Homepage: existing Jay → Perspective/Sinai → Jonah/sculpture/reflection →
Curiosity/intelligence/TEMPER/field note → existing principles → three entrances
and a complete-library invitation → existing contact.

Library: a short orientation → Investigation and evidence → Decisions and
authority → Coordination and infrastructure → Applied field systems → Research
and open questions → Historical work → direct access to the full evidence
archive. The existing CipherLoop, SHAD0W and research studies retain their URLs.
`work/evidence.html` holds the relocated technical material, including AetherForge,
relationships, notes, snapshot, ledger and registry. `/work/` is the index, not a
second unstructured archive. Native static files preserve portable previewing.

Two concepts:

1. **Three spreads:** one short horizontal editorial spread per mechanism,
   alternating diagram and title. Strong individual presence, but longer reading
   flow and harder comparison.
2. **A shared threshold:** three adjacent typographic entrances, each with its own
   small static mechanism: saved-record handoff, authority gates, branching
   admission. A common baseline and quiet rules connect them without card chrome.

Select **the shared threshold**. Visitors can scan all three questions together;
mobile becomes three compact ordered entrances. Existing identity, imagery and
fonts stay intact. The diagrams describe relationships, never simulated results.
TEMPER remains the homepage's only substantive technical instrument.

Interaction: existing TEMPER input feedback; a restrained link-arrow movement
on hover/focus; native disclosure state in the deeper evidence. Motion respects
reduced-motion preferences. No scroll reveals or transition dependency.

## Three bounded design insights

1. Compose around one job and one clear action per section, using the existing
   visual language instead of adding components. Reviewed the
   [OpenAI frontend skill](https://www.skills.sh/openai/skills/frontend-skill) and
   [frontend article](https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4).
   The supplied article URL used `5.4` and returned 404; the official `5-4` URL
   was located and read. No skill installation.
2. Static mechanism marks and sparse type can create distinct entrances without
   another image or interactive panel. Reviewed only the landing selections at
   [Minimal Gallery](https://minimal.gallery/) and [Codrops](https://tympanus.net/codrops/);
   no gallery crawl, copied artwork or additional framework.
3. Make state changes understandable first; animate only a small affordance with
   opacity/transform when motion is allowed. Reviewed
   [Chrome motion guidance](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/motion).

## Preservation map and implementation plan

The frozen [machine-readable inventory](systems-library-inventory.json) records
every original fragment, source/evidence/asset URL, revision pin, generated slot,
instrument, protected-content hash and unchanged study hash before relocation.

| Old homepage location | New location | Preservation method |
| --- | --- | --- |
| `#top`, `#about`, `#sinai-sketch` | Unchanged | Protected markup hash |
| `#now`, `#jonah`, `#jonah-reflection` | Unchanged | Protected markup hash + verbatim browser checks |
| `#curiosity`, `#intelligence-reflection`, `#model-question`, `#field-note` | Unchanged | Protected markup hash + TEMPER fixture checks |
| `#principles`, `#contact` | Unchanged | Protected markup hash |
| `#work` | Three doors on home; former overview at `work/evidence.html#work` | Existing general entrance preserved |
| `#cipherloop`, `#shadow` | `work/evidence.html` with the same fragments | Compatibility anchors and explicit onward links |
| `#engineering-details`, `#cipherloop-details`, `#shadow-details` | `work/evidence.html`, same fragments | Full walkthrough, oracles and timeline retained |
| `#projects`, `#aetherforge`, every `#af-*` | `work/evidence.html`, same fragments | Radio/CSS instrument and optional JS retained |
| `#applied`, `#unhinged`, `#truck-ready` | `work/evidence.html`, same fragments | Full records retained |
| Generated `focus` and `system` slots | `work/evidence.html` | One author-time rendering of each slot |
| `#systems-map`, `#recent-work`, `#evidence-ledger`, `#project-registry`, `#research`, all registry/archive fragments | `work/evidence.html`, same fragments | Deterministic data, disclosure access and compatibility links |
| Existing case-study and research pages; legacy `/work/*` redirects | Unchanged | Link/route assertions and frozen hashes |

Old homepage fragments will have a native fallback link to the precise new
location. A small progressive enhancement follows that link on incoming hashes;
no-JS visitors see and can follow it. Known internal links point directly to their
new destination where appropriate. No runtime GitHub or JSON fetching.

Milestones (each inspected, checked, committed, pushed, remote HEAD verified):

- M1: this inventory, IA, preservation map and direction; baseline checks/captures.
- M2: three homepage entrances and a concise ending; move technical markup into
  its evidence shell atomically so the intermediate commit retains all evidence.
- M3: separate library index and data-backed collections with direct study links.
- M4: full legacy-fragment navigation and preservation regression checks.
- M5: responsive refinement, accessibility, all existing checks, screenshot review.

Baseline tooling: installed locked development tools; local Node `24.21.0` differs
from declared Node 22, so CI must confirm the supported runtime. Initial check
found CRLF formatting in four files carried from #22; normalize those working
copies to LF without changing Git content before establishing baseline success.

## Checkpoints

Setup pushed and verified at `9fdd021a499d7a8e76d3522d66d9b6579116b50e`.
Continue only on `feat/systems-library-three-doors`. Never merge or manually deploy.

M1 validation: `npm run check` passes including 17 data tests outside the sandbox.
Frozen inventory: 78 fragments, 89 URLs, 14 revision pins, 16 top-level sections.
Baseline browser captures are in `test-results/three-doors-baseline/`; inspected
the 390px opening, 390px systems map and 768px artifact handoff. The repeated
technical sequence is visibly a different reading task from the personal opening.
The existing full homepage browser suite is still running at this checkpoint.

M1 pushed and remote HEAD verified: `127b1951e956e3abb5f1a7d6550d524b299a2198`.
Baseline browser suite subsequently completed: five widths and 13 fallback/input
modes passed, zero axe violations, measured local CLS 0 at each normal width.

M2: replaced 11 consecutive technical sections with one shared threshold and a
complete-library invitation; homepage top-level section count is now 6. The full
technical block moved atomically to `work/evidence.html`. A navigable initial
`work/index.html` keeps every new entrance functional before collection refinement.
All archive text, source/evidence URLs, 14 source revision pins, 78 destination
fragments, authored markup and existing study hashes pass preservation checks.
Existing engineering browser assertions now target the archive; they were moved,
not dropped. Author-time generation targets the relocated slots. Native legacy
fragment fallback links exist; automatic forwarding is M4.

M2 checks: `npm run check`, `git diff --check`, and 30 new route/resilience browser
cases pass (three pages; all five widths; no-JS at 320/390; reduced motion; 200%
text at 320/390). Zero axe violations in all script-enabled cases, no failed local
resources or runtime metadata requests. Reviewed `doors-1440-normal.png` and
`doors-390-normal.png` in `test-results/library-m2/`. Further density refinement
and full instrument/regression suites are scheduled for M5.

M2 pushed and remote HEAD verified: `c1ca8df42b4ed13ab78e9695151d368cbe4b660c`.

M3: the index now offers three primary collections and three secondary groups.
CipherLoop/TraceForge are featured for the implemented producer/artifact/reader
handoff and recorded offline replay; SHAD0W for availability, eligibility and
separate paper-risk admission; AetherForge for bounded mock-mode admission and
its recorded probes. These choices represent distinct mechanisms, not claims
about current attention, project scale or maturity. Unhinged is related
device-boundary work, with no implied integration. Truck-Ready stays in applied
field systems with its CSV regression explicit. TEMPER and Machine-Native Systems
remain research; earlier prototypes retain experimental status.

The generated index contains one summary per public curated project. Full
registry records are generated only once in the evidence archive. Collection
ordering is editorial and never comes from activity. Added one data test for
complete public coverage, no duplicate summaries, unchanged limits, independence
from activity, privacy filtering and escaped text. Both output pages are validated
before rendering writes either one; homepage authored content has no generated slot.

M3 checks: `npm run check` passes with 18 data tests and the preservation contract.
Ten focused library browser cases pass, covering five widths, no-JS at 320/390,
reduced motion, 200% text, all six collection anchors and all six primary study/
detail links by keyboard. Zero axe violations, local resource failures or runtime
metadata requests. Reviewed the 1440px and 390px full-library captures in
`test-results/library-m3/`. Browser automation initially needed an explicit wait
for keyboard navigation; fixed the wait and reran successfully.
