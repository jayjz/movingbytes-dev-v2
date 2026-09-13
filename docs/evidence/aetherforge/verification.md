# Admission evidence · 13 September 2026

## Source boundary

Authoritative repository: `jayjz/aetherforge`, remote HEAD **`265c26769eba257ac40540a7e1da5378d7515532`**, confirmed with `git ls-remote origin HEAD`. The sibling checkout's HEAD matches, but it has unrelated edits in its dashboard and ADR. `git archive HEAD` exported committed files into `/tmp/aetherforge-instrument-source`; all execution used this export, never the dirty working files. No AetherForge source edits.

The implementation is a strategy-request control plane. `/system/strategy` checks the active lease, thermal lock and semaphore capacity, then acquires a slot and evaluates context and switching economics. A successful economic decision calls the engine; only a successful engine response updates `current_strategy`. The slot is released in `finally`. A refused strategy request does **not** mean that every workload or generation request is rejected.

- [Strategy route, server.py:177–226](https://github.com/jayjz/aetherforge/blob/265c26769eba257ac40540a7e1da5378d7515532/src/server.py#L177-L226)
- [Economic comparison, server.py:62–79](https://github.com/jayjz/aetherforge/blob/265c26769eba257ac40540a7e1da5378d7515532/src/server.py#L62-L79)
- [Schemas, server.py:136–147](https://github.com/jayjz/aetherforge/blob/265c26769eba257ac40540a7e1da5378d7515532/src/server.py#L136-L147)
- [Committed configuration](https://github.com/jayjz/aetherforge/blob/265c26769eba257ac40540a7e1da5378d7515532/config.yaml), [settings/defaults and YAML loader](https://github.com/jayjz/aetherforge/blob/265c26769eba257ac40540a7e1da5378d7515532/src/config.py)
- [Mock engine](https://github.com/jayjz/aetherforge/blob/265c26769eba257ac40540a7e1da5378d7515532/src/engines/mock_engine.py), [hardware monitor](https://github.com/jayjz/aetherforge/blob/265c26769eba257ac40540a7e1da5378d7515532/src/hardware_monitor.py)
- [Existing route tests](https://github.com/jayjz/aetherforge/blob/265c26769eba257ac40540a7e1da5378d7515532/tests/test_hypervisor.py)

## Four controlled cases

Each case starts with a fresh app lifespan, active `balanced` strategy and no lease. Request: `POST /system/strategy`, mode `high_fidelity`, `estimated_context_tokens=100`, no `context_text`. Baseline output is 2,000 tokens, thermal lock is false, five of five semaphore slots are available. Only the indicated constraint changes. “Admit” and “Reject” are editorial decision labels; adjacent codes and HTTP status are exact response values.

| Case | Change | Economic comparison, seconds | Exact response | Active strategy afterward |
| --- | --- | --- | --- | --- |
| Baseline | None | Stay 166.67 > switch 117.62 | HTTP 200, `status=strategy_applied` | `high_fidelity` |
| Short output | Expected output = 5 | Stay 0.42 < switch 6.79 | HTTP 200, `status=rejected`, `error=roi_negative` | `balanced` |
| Thermal lock | Lock forced true | Not evaluated | HTTP 503, `detail.error=thermal_lock_active`, Retry-After 10 | `balanced` |
| Queue full | Acquire all five semaphore slots | Not evaluated | HTTP 503, `detail.error=queue_saturated`, Retry-After 2 | `balanced` |

Baseline matches the first request in `test_gatekeeper_swap_matrix`. Short output is a **source-derived variant**, not its literal second request (the original test switches back to balanced after admission). Thermal/queue cases follow the existing tests' forced-state technique but hold the baseline payload constant. This isolates a single cause. [Probe](probe.py) and [captured JSON](scenarios.json) establish each displayed response, mode, input, status and estimate; [execution output](probe-output.txt) records the rerun of all five unchanged project tests.

Formula from `evaluate_swap`: stay = output / 12; switch = 6 + 0.5 + context × 0.0001 + output / 18. Committed YAML sets the 12/18 token-per-second estimates, 6-second reload estimate and 4,096-token safe-context ceiling. `src/config.py` supplies the 0.5-second I/O base, per-token coefficient and five-slot default. Values are **configuration estimates, not measured performance**. JSON includes hypothetical economics for blocked cases for reproducibility, but the UI correctly says those gates were not evaluated.

## Execution and isolation

Four route probes passed; all five existing tests passed under the same isolation. Used the existing sibling Python environment ([package versions](python-environment.txt)); no installation or dependency repair. Reproduce from a clean export of the pinned commit:

```sh
PYTHONDONTWRITEBYTECODE=1 timeout 45s /path/to/python -u /path/to/portfolio/docs/evidence/aetherforge/probe.py /tmp/scenarios.json
```

Working directory must be the source export so its committed `config.yaml` is loaded. The test uses real FastAPI handlers, `EconomicGatekeeper`, semaphore and `MockAetherEngine.apply_strategy`. It disables NVML access, provides a fail-if-used placeholder for the eagerly imported optional `llama_cpp` dependency, fixes mock random values, and replaces simulated sleep with a no-op. It does not replace the economic decision or the mock strategy-success implementation. Initial sandbox TestClient execution stalled; the bounded run outside the sandbox completed. Recorded warnings concern Starlette's httpx integration and already-imported anyio pytest rewriting.

## Limits and omitted paths

- The thermal lock is deliberately forced; the mock monitor reports 45°C in the raw response. This does not prove a measured thermal event or watchdog trip. The UI shows the lock and omits temperature entirely.
- Mock `apply_strategy` has a 5% random failure path even with `AETHER_CHAOS=false`; reproducibility requires the documented randomness patch. The success case is conditional on mock engine success.
- No physical GPU swap, recovery, model inference, hardware benchmark, production workload or hosted deployment was executed. The five-test result is a local isolated result, **not** a new hosted CI result. Historical failing CI remains historical; current hosted status was not rechecked.
- The context ceiling is a token guard, not a requested/available memory calculation. `/system/strategy` folds ceiling and same-mode rejection into `roi_negative`; `/generate` has a separate structured `context_exceeded` response. The instrument does not conflate these routes.
- Lease rejection, hardware failure, thermal watchdog hysteresis and generation-time behavior were inspected but are not additional interactive cases. Existing `test_failed_swap_retains_state` passed with its forced failure; this does not establish physical recovery.
- The configured strategy names describe source identifiers. They are not assertions about model quality, quantization level or verified GPU placement.
