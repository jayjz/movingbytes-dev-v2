# Portfolio mastery — source audit, 2026-09-11

Read-only audit of GitHub default branches, public feature branches where current work is ahead, pinned source files, tests, committed artifacts, and hosted Actions metadata. No repository mutation, test execution, model service, live scanner, hardware session, or deployment was performed. Local Git objects were exported to `/tmp/portfolio-source-audit/` at verified remote commits so dirty sibling worktrees were not mistaken for published source. GitHub API reads used the connected GitHub tool.

## Recommended hierarchy

1. **Flagship: CipherLoop + TraceForge** — strongest connected evidence story. An experimental agent implementation plus a separate offline evaluator with an independent two-fixture oracle and a successful hosted baseline workflow.
2. **Second major system: AetherForge** — real control-plane admission/rejection code and mock tests; physical GPU behavior remains research. Current hosted CI is failing before tests.
3. **Applied: Truck-Ready HVAC** — the clearest practical artifact: aggregate parts demand, stage available stock, identify pickup shortfall, export JSON/PDF. No adoption or field-result claim.
4. **Selected prototype: Unhinged Agent** — host/edge separation and barge-in cancellation, using the explicitly named hardware-prep branch for the stronger implementation. Hardware remains unverified.
5. **Secondary demo: Sightglass** — visible execution and human-review interface, backed by a mock warehouse and memory-only graph state. It is not a production authorization boundary.
6. **Applied recovery work: HVAC Ops** — feature branch makes inventory uncertainty and source status explicit. Prefer this narrow engineering decision to default-main marketing or outcome claims.
7. **Lab: Fracture** — runtime and benchmark harness still raise `NotImplementedError`. Do not give it flagship weight.

## Exact repository state

| Repository | Remote default branch and SHA | Additional current public work |
|---|---|---|
| CipherLoop | `main` · `f03a1e186e491cf24aa0f0e0671cac766c1fa8ab` | `feat/production-evidence-capture` · `37fcbe480f668605aee7e51b6f976c22331a6ad0`; local checkout matches this feature branch. |
| TraceForge | `main` · `25668c4db622a322b87271825ce68fd37390f3ec` | `feat/cipherloop-offline-baseline` is behind main by one merge commit. |
| aetherforge | `main` · `265c26769eba257ac40540a7e1da5378d7515532` | Named control-plane hardening branch is behind main by 19 commits; do not infer it is newer from its name. |
| truck-ready-hvac | `main` · `d1f4d53313c6a8a1a5c92cb12670e8f551bb8edb` | Only main returned. Local checkout is older. |
| unhinged-agent | `main` · `d38ad91cdf4464766421b3159b9495105555a92a` | `phase2/p0-hardware-prep` · `ea86997c18cc375ae3355c3321b792c21f8d3284`, 30 ahead / 4 behind main. |
| sightglass | `main` · `6343bab6230e106f3704eaeec099e8e7296acdd9` | Only main returned. Local checkout is older. |
| hvac-ops-agent | `main` · `9130ce8e2488f062a39dbd8d9ee64f63791e0e58` | `feat/m0-recovery` · `d5ec6235e9558af227e7381b9821b8dee0c95eda`, two commits ahead of main. |
| fracture | `main` · `300ef83a0ee999857189542bd836f215490da116` | Only main returned. |

## Flagship: publishable wording and visual

**Suggested thesis:** “Build agents whose work can be inspected independently.” This is a design/engineering direction, not a claim that all present production runs can already be evaluated.

**Suggested project line:** “CipherLoop records investigation evidence. TraceForge checks captured artifacts against an independent fixture oracle.”

**Required nearby scope:** “Two offline fixtures. Synthetic scanner responses. No live audit claim.”

**Suggested decision:** “Separate the system producing evidence from the code evaluating it.”

**Honest relationship diagram:**

```text
CipherLoop components        Offline capture harness        TraceForge
compressor + AST validator → JSONL + metadata + sidecars → adapter + fixture oracle
           + recorder                                ↓
                                         pass / mismatch / evidence error
```

Do not draw “current production agent → complete durable trace → general independent evaluation” as an implemented integration. TraceForge main pins old CipherLoop main and needs harness sidecars; the new production-contract branch is not yet accepted by that adapter. “Durable artifacts” is acceptable as persisted files but must not imply a crash-safe complete agent trace for old main.

**Useful source-derived visual proof:** a compact, real baseline table, with a source link and fixture label:

| Offline fixture | Candidates | Accepted by CipherLoop validator | Rejected | TraceForge fixture result |
|---|---:|---:|---:|---|
| toy | 1 | 1 | 0 | pass |
| safe | 1 | 0 | 1 | pass |

The safe case passing means that rejecting its supplied candidate agrees with the independent fixture oracle. It does not mean a repository was scanned and certified safe. This data is committed at [evaluation.json](https://github.com/jayjz/TraceForge/blob/25668c4db622a322b87271825ce68fd37390f3ec/tests/fixtures/cipherloop/artifacts/evaluation.json); expected outcomes live separately in [manifest.json](https://github.com/jayjz/TraceForge/blob/25668c4db622a322b87271825ce68fd37390f3ec/tests/fixtures/cipherloop/manifest.json).

### CipherLoop

- **Main mechanism:** six-node LangGraph investigation loop, tool-output compression, narrow Python AST candidate validation, selected message recording in JSONL, summary metadata. [graph.py](https://github.com/jayjz/CipherLoop/blob/f03a1e186e491cf24aa0f0e0671cac766c1fa8ab/src/cipherloop/orchestrator/graph.py), [compressor.py](https://github.com/jayjz/CipherLoop/blob/f03a1e186e491cf24aa0f0e0671cac766c1fa8ab/src/cipherloop/executor/compressor.py), [validator.py](https://github.com/jayjz/CipherLoop/blob/f03a1e186e491cf24aa0f0e0671cac766c1fa8ab/src/cipherloop/executor/validator.py), [trajectory.py](https://github.com/jayjz/CipherLoop/blob/f03a1e186e491cf24aa0f0e0671cac766c1fa8ab/src/cipherloop/core/trajectory.py).
- **Stronger work in progress:** new public feature branch adds a versioned lifecycle, contiguous event sequence, flush/fsync on each append, metadata ledger hash/event count, atomic metadata replacement, and failure/interruption capture. Source and failure tests support describing these as implemented branch work. [recorder at 37fcbe4](https://github.com/jayjz/CipherLoop/blob/37fcbe480f668605aee7e51b6f976c22331a6ad0/src/cipherloop/core/trajectory.py), [trajectory tests](https://github.com/jayjz/CipherLoop/blob/37fcbe480f668605aee7e51b6f976c22331a6ad0/tests/test_trajectory.py), [CLI evidence tests](https://github.com/jayjz/CipherLoop/blob/37fcbe480f668605aee7e51b6f976c22331a6ad0/tests/test_production_evidence.py).
- **Limit:** experimental framework; internal `VERIFIED` is a narrow AST pattern outcome, not exploitability certification. Main does not persist every graph event or guarantee failure finalization. Feature-contract completeness does not imply complete audit coverage, resume support, or downstream TraceForge integration. No hosted Actions runs returned for main. The existing portfolio's old CL source pin is still main, not simply stale; the case study should retain its revision scope.

### TraceForge

- **Implemented:** strict adapter rejects malformed/incomplete/duplicated/inconsistent artifacts and normalizes captured evidence. It imports no CipherLoop modules. The separate evaluator compares counts and exact source/sink/path against a fixture manifest, keeping mismatch separate from missing evidence. [adapter](https://github.com/jayjz/TraceForge/blob/25668c4db622a322b87271825ce68fd37390f3ec/src/traceforge/adapters/cipherloop.py), [evaluator](https://github.com/jayjz/TraceForge/blob/25668c4db622a322b87271825ce68fd37390f3ec/src/traceforge/evaluation/cipherloop_baseline.py), [contract](https://github.com/jayjz/TraceForge/blob/25668c4db622a322b87271825ce68fd37390f3ec/src/traceforge/evaluation/baseline_contract.py).
- **Independence scope:** evaluation code and oracle are separate from CipherLoop runtime code. Capture harness invokes real CipherLoop compressor, validator, reducer, recorder with synthetic scanner outputs and fixture read boundaries. No planner, live model, scanner, Docker daemon, or fixture application runs. [harness](https://github.com/jayjz/TraceForge/blob/25668c4db622a322b87271825ce68fd37390f3ec/scripts/generate_cipherloop_baseline.py).
- **Strongest current verification:** [hosted baseline run 34390717464](https://github.com/jayjz/TraceForge/actions/runs/34390717464) succeeded on exact main `25668c4` on 2026-09-09. Read job metadata confirms successful pinned-source install, focused tests/lint, and generate/evaluate without credentials. This supersedes the pinned documentation's statement that hosted CI had not run. The docs record 62 local focused tests; this audit did not independently extract a hosted test count or rerun tests.
- **Limits:** experimental two-fixture baseline; no general detection accuracy, cost/token savings, recovery score, safety score, or model-quality measurement. Artifact hashes are consistency/integrity checks against trusted contracts, not producer authentication. New production ledgers are not integrated. Current fixture raw/compressed counts are 120/153, so these tiny inputs expand; do not imply compression gains.

## Other systems

| Project | Supported concise wording | Strongest source/test evidence | Limit / maturity | Truthful visual |
|---|---|---|---|---|
| AetherForge | “A control plane that can reject an agent's infrastructure request.” | [server.py](https://github.com/jayjz/aetherforge/blob/265c26769eba257ac40540a7e1da5378d7515532/src/server.py) implements context ceiling, swap ROI decision, queue/thermal rejection, and failure-state preservation. [test_hypervisor.py](https://github.com/jayjz/aetherforge/blob/265c26769eba257ac40540a7e1da5378d7515532/tests/test_hypervisor.py) exercises mock route decisions and forced failures. | Mock control-plane implementation; physical GPU swap/recovery remains research. [Latest CI](https://github.com/jayjz/aetherforge/actions/runs/32665128807) failed during dependency installation; tests skipped. Do not publish “current CI verified.” | A source-derived admission decision tree: context → expected benefit → queue/thermal gate → apply or reject. Label mock path, no fake live telemetry. |
| Truck-Ready HVAC | “Jobs and stock become one pre-departure parts checklist.” | [core.py](https://github.com/jayjz/truck-ready-hvac/blob/d1f4d53313c6a8a1a5c92cb12670e8f551bb8edb/src/truck_ready/core.py) aggregates demand by SKU across jobs, stages available units, splits pickup shortfall, sorts urgency; [tests](https://github.com/jayjz/truck-ready-hvac/blob/d1f4d53313c6a8a1a5c92cb12670e8f551bb8edb/tests/test_core.py). [JSON export](https://github.com/jayjz/truck-ready-hvac/blob/d1f4d53313c6a8a1a5c92cb12670e8f551bb8edb/src/truck_ready/export.py), [PDF adapter](https://github.com/jayjz/truck-ready-hvac/blob/d1f4d53313c6a8a1a5c92cb12670e8f551bb8edb/src/truck_ready/pdf.py). | Implemented focused application; no field/customer outcomes verified. Per-job readiness is against stock snapshot; aggregate checklist is the cross-job view. [Latest CI](https://github.com/jayjz/truck-ready-hvac/actions/runs/30720954028) fails Ruff on Python 3.11 and 3.12; pytest skipped. | Actual seeded PDF/checklist if generated offline with provenance; otherwise diagram of stock vs aggregated demand. Never invent completed field usage. |
| Unhinged Agent | “A thin voice client with a cancellable host-side turn.” | Stronger public branch: [ESPHome bridge](https://github.com/jayjz/unhinged-agent/blob/ea86997c18cc375ae3355c3321b792c21f8d3284/services/esphome_bridge.py), [rapid barge-in test](https://github.com/jayjz/unhinged-agent/blob/ea86997c18cc375ae3355c3321b792c21f8d3284/tests/test_esphome_bridge_stress.py), [FSM](https://github.com/jayjz/unhinged-agent/blob/ea86997c18cc375ae3355c3321b792c21f8d3284/core/fsm.py). New wake event cancels processing task, clears buffer, transitions to listening. Shared audio/LLM services avoid loading second instances; buffers capped. | Phase 2 hardware-prep branch, diverged from main. Mocked bridge tests exist; not rerun. Physical wake/STT/LLM/TTS loop, acoustics, barge-in latency, hardware deployment remain unchecked in [status](https://github.com/jayjz/unhinged-agent/blob/ea86997c18cc375ae3355c3321b792c21f8d3284/PROJECT_STATUS.md). Avoid “software complete” blanket claim. | State transition with a wake/interrupt edge and host/edge boundary; label source-derived, no fabricated latency. |
| Sightglass | “A prototype for inspecting a job as it moves through a graph.” | [graph builder](https://github.com/jayjz/sightglass/blob/6343bab6230e106f3704eaeec099e8e7296acdd9/backend/app/graph/builder.py) uses MemorySaver and pause before HITL; [SSE API](https://github.com/jayjz/sightglass/blob/6343bab6230e106f3704eaeec099e8e7296acdd9/backend/main.py) streams node transitions; [warehouse](https://github.com/jayjz/sightglass/blob/6343bab6230e106f3704eaeec099e8e7296acdd9/backend/app/services/db.py) is an in-memory mock catalog. | Demo. No repository tests found in inspected current tree. `approved` resume value is accepted but ignored; `approved=false` still resumes. `/api/sync` echoes payload without persistence. Do not claim secure authorization, durable graph recovery, production inventory, or working offline synchronization. | Honest screenshot of the demo with mock-data label, or SSE node transition diagram. |
| HVAC Ops | “Dispatch assessment that keeps unknown stock distinct from zero stock.” | Use named recovery branch: [parts calculation](https://github.com/jayjz/hvac-ops-agent/blob/d5ec6235e9558af227e7381b9821b8dee0c95eda/core/agents/specialists/parts_availability_checker.py), [behavior tests](https://github.com/jayjz/hvac-ops-agent/blob/d5ec6235e9558af227e7381b9821b8dee0c95eda/tests/test_m01_assessment_semantics.py), [orchestrator](https://github.com/jayjz/hvac-ops-agent/blob/d5ec6235e9558af227e7381b9821b8dee0c95eda/core/orchestrator.py). Source/readiness/assessment/action states distinct, absent SKU unknown, zero stock shortage, missing BOM preserved. | Recovery branch ahead of default main, not deployment. [ledger](https://github.com/jayjz/hvac-ops-agent/blob/d5ec6235e9558af227e7381b9821b8dee0c95eda/docs/CLAIMS.md) records 33 local tests and locked install/smokes; not rerun here. No live Mongo or side-effect adapters. Default-main E2E test merely constructs result models and repeats invented benefits; do not treat it as integration evidence. No hosted main run returned. | Known-zero / absent / shortage state table from actual test fixtures. Proposals and exports, not executed orders/messages. |
| Fracture | “Research scaffold for controlled agent-graph failures.” | [runtime](https://github.com/jayjz/fracture/blob/300ef83a0ee999857189542bd836f215490da116/src/fracture/core/runtime.py) and [evaluation harness](https://github.com/jayjz/fracture/blob/300ef83a0ee999857189542bd836f215490da116/src/fracture/evaluation/harness.py) explicitly raise `NotImplementedError`; [test](https://github.com/jayjz/fracture/blob/300ef83a0ee999857189542bd836f215490da116/tests/test_injectors.py) only checks intensity-bound construction. | Scaffold; no executed topology matrix, recovery measurement, or benchmark artifact established. Existing injector sketches do not make the runtime implemented. | Small text lab entry or explicitly labeled planned topology sketch; no results graph. |

## Key credibility corrections

- Keep the CipherLoop case study as a historical source-pinned study unless doing a separate evidence refresh; current homepage pairing can point to TraceForge and clearly name the fixture baseline.
- Do not flatten feature branch work into main or deployment status. Stronger CipherLoop, Unhinged, and HVAC Ops claims need the branch/revision scope.
- Replace “proof of concept — software complete” for Unhinged with “voice-system prototype” or “hardware-prep prototype.”
- Avoid default-main HVAC Ops claims of 30–50% downtime reduction, inventory improvement, routing efficiency, “live synchronization,” and orders/messages executed. Current recovery work explicitly disowns them.
- Preserve distinction between independent evaluator code and independent real-world validation. Only the former, with an independent fixture oracle, is established.
- All screenshots/visuals should distinguish source-derived illustration, fixture output, and live run. The pairing is strongest when its exact boundary is visible in one short line.

## Verification scope

Inspected current remote branch metadata for all eight repositories; exact default SHAs above; branch comparisons for relevant feature work; source and tests; TraceForge committed baseline outputs; hosted Actions run/job status for TraceForge, AetherForge, and Truck-Ready. No new project test pass is claimed. No private credentials or expensive model services used. No sibling source changed.
