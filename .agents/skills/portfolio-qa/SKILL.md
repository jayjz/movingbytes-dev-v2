---
name: portfolio-qa
description: Verify the jaysystems.dev portfolio after UI, content, routing, or motion changes. Use for browser QA, accessibility review, performance checks, and release-readiness reports. Do not use as a substitute for implementation or to claim tests that were not run.
---

# Portfolio QA

Read `AGENTS.md`, `docs/portfolio-redesign.md`, and `docs/verification.md` before reviewing the site.

1. Inspect the actual working tree and identify changed pages, styles, scripts, and routes.
2. Run the relevant repository validation commands. If dependencies are unavailable, report the limitation rather than silently installing unrelated tooling.
3. When browser tooling is available, inspect representative desktop/mobile layouts, navigation, keyboard interaction, reduced-motion behavior, and important routes. Capture screenshots if supported.
4. Check essential content without JavaScript where feasible. Review contrast, accessible names, focus visibility, and overflow.
5. Verify substantive project claims against the evidence register and current source repositories when the task includes content review.
6. Report findings ordered by severity, with file/route, reproduction steps, observed behavior, and suggested fix. Distinguish verified failures from risks and untested areas.
7. Do not modify production code during a review-only request. Do not push, merge, or deploy.

The user's current task takes precedence over this skill's workflow. Keep the review proportional to the scope of the change.
