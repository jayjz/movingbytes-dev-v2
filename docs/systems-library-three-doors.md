# Three doors into the work

## Implementation checkpoint — current branch

The implementation task supersedes the older branch instructions below. Work
continues on `feat/systems-library-v2`, created from fetched main `30d9997`.
PR #22 is merged at that revision; PR #23 also brought in M1. The three M1 files
match exactly, so no duplicate cherry-pick was needed. The old branch remains
unchanged at `127b1951`. Clean setup was pushed and remote-verified at `30d9997`.

M2 replaces the homepage catalog with the shared three-door threshold. The
complete archive moved atomically to `work/evidence.html`, with its author-time
renderer and existing browser assertions following it. Static compatibility
entries preserve the old fragment entrances; automatic forwarding follows in M4.
Protected personal markup, archive text, all source URLs, studies and generated
slots pass the frozen contract. Five-width home/archive accessibility and overflow
checks pass; desktop/mobile screenshots were inspected. Baseline `npm run check`
and the original 53-case browser suite passed. Featured-source revisions and
limits are recorded in [three-doors.md](evidence/three-doors.md).

M2 pushed and remote-verified at `eba4462815a40e0ca3926d2be27013e317192a59`.
The relocated homepage and evidence browser suites also pass (18 and 12 cases).

M3 adds `/work/`: six collections, ten selected entries, native collection
anchors and direct study/source paths. It has no script, search, runtime data or
duplicated archive sections. Homepage navigation and the threshold lead into the
library; the evidence archive links back. `npm run check`, the frozen contract
and eight library browser cases pass, including no-JS, 200% text, keyboard,
accessibility and five viewport widths. Desktop/mobile screenshots inspected.

M3 pushed and remote-verified at `81efadfab404c15ba4d8f1b69cb05f17e7efb3d4`.

M4 adds progressive legacy forwarding, native fallback links and instrument
permalinks. The frozen inventory itself is unchanged. The checker now also
enforces exact compatibility links, all original URLs/pins and no duplicate IDs
or slots across the three pages. Independent browser verification passes 156
fragment paths (all 78 with JS on/off), all 89 retained URLs and 92 local HTTP
destinations. External href preservation does not establish current remote
availability. No maturity label, evidence text or source pin changed.

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
