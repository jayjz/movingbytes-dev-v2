---
name: mechanism-storytelling
description: Turn source-backed technical mechanisms into accessible visual explanations using semantic HTML, SVG and CSS. Use for bounded diagrams and navigation cues; not for invented telemetry, claims or elaborate simulators.
---

# Mechanism storytelling

Read AGENTS.md, the surrounding writing and pinned source evidence. For each
visual relationship, record its source and revision, what it communicates and
what it does not establish. The local [three-door source register](../../../docs/evidence/three-doors.md)
is the starting point for the homepage mechanisms; follow its primary links
when adding behavior beyond the existing reviewed explanation.

Keep these categories separate in the implementation record and captions:

- Observed effects: actual recorded runs, with provenance and limits. Source
  inspection and passing mocked tests are not a reproduced effect.
- Source-derived behavior: control flow or contracts visible in pinned code.
- Illustrative states: conceptual geometry or sample values, explicitly labeled
  as illustrations rather than captured execution or live state.

Choose the smallest explanation of the meaningful boundary, sequence or handoff.
Make different mechanisms visually distinct through topology and composition,
not arbitrary color. Keep navigation as native links; never make reading depend
on running a simulation. Prefer semantic HTML and lightweight inline SVG/CSS;
add JavaScript only for a necessary interaction that native controls cannot serve.

Provide the explanation in adjacent prose. Mark redundant SVG decorative with
aria-hidden and focusable=false, or provide a meaningful accessible name and
description for a substantive standalone figure. Do not encode meaning only in
color, hover or motion. Match focus and hover cues without adding tab stops to
decorative shapes. Any motion must explain a real concept, be bounded and have
an equivalent static reduced-motion state. Preserve all content without JS.

Use [visual-critique](../visual-critique/SKILL.md) to inspect real desktop/mobile
captures, then [portfolio-qa](../portfolio-qa/SKILL.md) to verify keyboard,
reflow, reduced motion, no-JS, links and routes. Report source boundaries,
illustrative choices and unverified runtime behavior explicitly.
