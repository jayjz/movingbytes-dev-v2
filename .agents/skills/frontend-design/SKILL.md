---
name: frontend-design
description: Design or substantially revise the jaysystems.dev homepage with distinctive, human-centered editorial visual direction. Use for the identity-first pivot, layout, typography, imagery, and responsive implementation; not for routine bug fixes.
---

# Jaysystems frontend design

Read `AGENTS.md`, the actual homepage/CSS, the existing brand assets, and the reviewed design brief before changing code. This skill applies to the identity-first pivot; the older `portfolio-design` skill is intended for evidence-backed portfolio case studies, not this homepage direction.

## Method
1. Extract the concrete content: Jay's HVAC/construction troubleshooting experience; present interests in model behavior and agent infrastructure; BibleMap's Jonah experience. Do not invent autobiographical anecdotes, quotes or theological positions.
2. Sketch two genuinely different homepage compositions using the existing content and design constraints. Select one and briefly justify its first viewport, visual hierarchy, typography, imagery and navigation.
3. Retain the established near-black/off-white/orange identity where useful, but avoid a repetitive grid of software project cards. Make the human perspective visible before the archive.
4. Feature BibleMap/Jonah. Feature a second agent/model investigation only after inspecting real source evidence and its limitations. Never fabricate live data, screenshots or test outcomes.
5. Implement in semantic static HTML/CSS and minimal progressive enhancement. Preserve existing URLs and technical evidence sections; no new framework, CMS, dashboard, or content automation.
6. Review actual desktop/mobile screenshots if browser tooling exists. Iterate on concrete problems: hierarchy, text measure, content density, focus/keyboard, reflow, readability, reduced motion and no-JS.
7. Keep proposed editorial copy clearly distinguishable from owner-approved personal writing. Report any wording that should be reviewed by Jay.

## Design guardrails
- Design from subject matter, not generic AI SaaS templates or stock dashboard treatments.
- Use typography and whitespace purposefully; avoid decorative ALL-CAPS labels, gratuitous numbering, placeholder graphics and animated section reveals.
- Concentrate visual novelty into one meaningful element rather than layering effects.
- Never sacrifice navigability, contrast, accessible text, or loading performance.
- Use the existing `portfolio-qa` skill and repository validation scripts for final testing.

## Version-control resilience
After each coherent milestone that leaves the repository in a reviewable state, commit and push to `feat/jaysystems-identity-pivot`. Never push to `main`. If tests fail, report the failure and either fix it before pushing or label the commit explicitly as work-in-progress. No merges or manual production promotions.
