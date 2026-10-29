---
name: visual-critique
description: Critique and refine rendered website craft using real before/after browser screenshots. Use for typography, rhythm, composition, density, originality and repetitive layouts; not for source-only review or information architecture migrations.
---

# Visual critique

Use the existing [frontend-design](../frontend-design/SKILL.md) for direction and
[portfolio-qa](../portfolio-qa/SKILL.md) for functional verification; do not copy
their workflows. Read the current brief and AGENTS.md before judging aesthetics.

Require actual browser captures before making visual conclusions. Record the
baseline revision, route, viewport, fonts/network conditions and motion mode.
Capture the first viewport and full page at 320, 390, 768, 1280 and 1440px, plus
close views of changed components. Use identical settings for before and after.
If browser capture is unavailable, report that limitation; source inspection
cannot satisfy this skill.

Inspect the images, not only browser assertions. Review display/body hierarchy,
line breaks, text measure, contrast, small copy, vertical rhythm, alignment,
mobile spacing and density. Identify repeated silhouettes, equal card grids or
diagram treatments that obscure differences in the subject. Explain what makes
the page specific to its owner, respecting the brief's established identity.

Write a concrete finding with a capture path, location, visible problem and
proposed refinement. Implement at least one justified visual iteration, then
recapture and inspect the same views. A passing report alone is insufficient.
Preserve authored wording and evidence boundaries unless separately authorized.

Include hover, keyboard focus, enlarged text, reduced motion and no-JS views.
Record which were manually inspected versus checked by automation. Deliver a
linked before/after comparison, actual iteration rationale, remaining aesthetic
limitations and relevant QA results. Do not claim screenshot review from a file
list or infer aesthetic success from passing tests.
