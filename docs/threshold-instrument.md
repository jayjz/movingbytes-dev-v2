# TEMPER threshold instrument provenance

Source inspected 29 October 2026 at immutable revision
`0747730d18cdb692142d9c2b50f9e8bc1ff0c45f` through the GitHub integration:

- [Definitions](https://github.com/jayjz/TEMPER/blob/0747730d18cdb692142d9c2b50f9e8bc1ff0c45f/src/temper/evaluation/metrics.py)
- [Unit-test inputs and expected values](https://github.com/jayjz/TEMPER/blob/0747730d18cdb692142d9c2b50f9e8bc1ff0c45f/tests/unit/test_metrics.py)

The illustration uses the four synthetic inputs from `test_selective_risk` and
`test_risk_coverage_curve` (not the separate coverage-only test, whose second
confidence is 0.85). Inputs are confidence `[0.95, 0.90, 0.60, 0.40]`, prediction
`[1, 0, 1, 0]`, reference `[1, 1, 1, 0]`. A–D are local display labels.

Acceptance is confidence greater than or equal to threshold. Coverage divides
accepted count by four. Selective risk divides accepted errors by accepted
count. The source rejects an empty accepted set; the interface shows Undefined,
not zero. Percentages are rounded to one decimal place when necessary.

| Threshold | Accepted | Coverage | Selective risk |
| --- | --- | --- | --- |
| 0.00 / 0.40 | 4 | 100% | 25% |
| 0.60 | 3 | 75% | 33.3% |
| 0.80 / 0.90 | 2 | 50% | 50% |
| 0.95 | 1 | 25% | 0% |
| 1.00 | 0 | 0% | Undefined |

These are explanatory calculations over test inputs, not recorded model
predictions, a deployment or an experimental rerun. No model inference,
calibration result, cost or reliability benefit is claimed. TEMPER's Python
tests and experiments were not run for this change.

Static HTML contains all four inputs, acceptance at 0.80, both readings and the
explanation. JavaScript reads the inputs from HTML and reveals a native range
only after initialization. Mouse, touch, arrow keys, Home and End operate the
same control. Updates are immediate with a polite text status; no animation is
used, so reduced motion has the same interaction. No requests or telemetry are
made by the instrument. Existing archive instruments are unchanged.
