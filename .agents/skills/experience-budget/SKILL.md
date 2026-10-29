---
name: experience-budget
description: Measure website experience cost against an existing baseline with Lighthouse and browser regression audits. Use for frontend performance and accessibility changes; never treat local lab measurements as field Core Web Vitals.
---

# Experience budget

Read AGENTS.md, package.json and [verification guidance](../../../docs/verification.md).
Complement [portfolio-qa](../portfolio-qa/SKILL.md); do not replace its functional
or accessibility checks. Measure the existing site before choosing a budget.

Record revision, route, Chrome/Lighthouse versions, device profile, viewport,
throttling, network/font conditions, cache policy and run count. Use the same
conditions for baseline and candidate, at least three Lighthouse runs per route
and device profile. Compare medians and retain individual results so variability
is visible. Audit homepage and library; measure changed deeper routes when needed.
Use a temporary tool installation if absent; do not add a runtime dependency.

Track lab LCP, CLS, performance/accessibility scores, TBT, transferred bytes,
request count and image/font/CSS/JS weight. Identify failed audits and resource
errors. Report controlled local results as lab results. TBT is not INP. Track
INP only from available real-user measurements (CrUX or actual RUM), recording
population and reporting window; otherwise write 'field INP unavailable'. Do not
add tracking infrastructure just to fill that gap.

Before implementation agree or state a provisional regression budget based on
the measured baseline. Flag median LCP increases over max(10%, 100ms), CLS
increases over 0.02, performance-score drops over 5 points, any accessibility
regression, or transferred-byte increases over 10%. Treat these as review
triggers, not universal quality thresholds. Investigate outliers and distinguish
measurement noise, failed requests and content changes; never silently discard
poor runs or weaken existing assertions to pass.

Run the relevant existing browser checks for overflow, keyboard/focus, routes,
no-JS, reduced motion, console errors and unwanted network requests. Compare
asset weight and review actual images with [visual-critique](../visual-critique/SKILL.md).
Deliver baseline/candidate medians and deltas, raw report paths, budget findings,
accessibility results and limitations. Never claim field performance, production
parity or manual assistive-technology review from a local Lighthouse report.
