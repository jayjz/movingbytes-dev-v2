# Project evidence register

This is a verification register, not a source of newly verified facts. Initial entries come from the supplied portfolio snapshot. Reinspect the current repositories before publishing case-study claims. Record the commit or date inspected, exact evidence, and remaining limitations. Do not silently promote README descriptions into demonstrated results.

## CipherLoop
Source: https://github.com/jayjz/CipherLoop
Snapshot status: Active development.
Snapshot description: local repository auditing with planner, local executor, and shared graph intended to preserve context over long investigations.
Verification needed: current implementation, actual execution boundaries, evidence storage, working audit paths, tests, reproducible findings, limitations, and screenshots.
Case-study status: unverified; do not claim production readiness or validated security findings.

## AetherForge
Source: https://github.com/jayjz/aetherforge
Snapshot status: Active development — mock path verified.
Snapshot description: local-agent control plane for consumer GPUs. Live 8 GB swap remains research.
Verification needed: current mock tests, real hardware behavior, scheduling/admission semantics, failure handling, and measured results.
Do not claim live GPU swapping is verified unless current evidence supports it.

## Truck-Ready HVAC
Source: https://github.com/jayjz/truck-ready-hvac
Snapshot status: Active development.
Snapshot description: parts staging and offline JSON/printable PDF checklists.
Verification needed: current workflow, exports, test coverage, actual field usage, and screenshots. Do not invent customer adoption or time savings.

## Unhinged Agent
Source: https://github.com/jayjz/unhinged-agent
Snapshot status: Proof of concept — software complete.
Snapshot description: private voice notes using a thin ESP32 client and local host; browser twin exists, physical hardware not yet verified in the snapshot.
Verification needed: current software tests, hardware status, privacy boundaries, audio pipeline, and reproducible demonstration.

## HVAC Ops
Source: https://github.com/jayjz/hvac-ops-agent
Snapshot status: Proof of concept — working demo.
Snapshot description: dispatch, inventory, and risk helpers using synthetic fallback and human approval before irreversible work.
Verification needed: current demo paths, data sources, approval boundaries, test results, and real-world deployment status.

## Fracture
Source: https://github.com/jayjz/fracture
Snapshot status: Scaffold / research harness.
Snapshot description: experiments with agent-graph failures and recovery.
Verification needed: implemented experiments, fixtures, metrics, results, and repeatability. Do not present it as a finished product.

## Evidence entry template
### Claim
- Proposed public wording:
- Repository and commit/date inspected:
- Evidence path or command:
- Observed result:
- Limitations:
- Verification status: verified / partially verified / unverified
- Approved for publication: yes / no

## Content rules
Use “prototype,” “research,” “mock path,” and “verified” precisely. Never fabricate metrics, users, customers, revenue, benchmark results, or live operational data. A GitHub link is a source pointer, not proof that every stated capability works. If evidence is missing, state the limitation or omit the claim.

## CipherLoop vertical slice — 2026-09-07

- Proposed public wording: “CipherLoop explores” repository investigation; the project brief describes a planner, local executor, and shared graph **intended** to carry context. Current execution paths and boundaries remain unverified.
- Repository and commit/date inspected: no source repository inspected in this milestone; existing portfolio snapshot and this evidence register read on 2026-09-07.
- Evidence path or command: local `docs/project-evidence.md` initial CipherLoop entry and baseline portfolio copy at `92eeb72`.
- Observed result: sufficient editorial context to build the layout and study outline, insufficient evidence to assert implemented capabilities.
- Limitations: no current tests, execution trace, security findings, privacy guarantee, performance result, or architecture mapping established.
- Verification status: unverified.
- Approved for publication: no verified technical capability wording approved. Both UI surfaces explicitly label the pending evidence; deployment remains a separate step.
- Illustration: original conceptual SVG, not an implementation diagram or telemetry. Its planning/inspection/evidence/review loop is an editorial model, not a new project claim.
