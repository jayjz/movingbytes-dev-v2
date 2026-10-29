# Visual craft iteration

Baseline: `origin/main` at `6b025dce5bb11db899172de9c72d527f25b41707`, verified
with fetch and ls-remote on 29 October 2026. Branch: `feat/visual-craft`.
The pre-existing uncommitted upstream frontend-design installation is preserved
and excluded from this task's commits. Obsolete branch-specific push directions
and historical portfolio migration plans do not apply to this iteration.

## Direction and scope

Keep Jay's personal frontispiece, authored writing, Sinai artwork, Jonah edition,
Curiosity/TEMPER instrument, principles, three doors and library in their current
order. Change presentation, not information architecture, claims or evidence.

Retain the palette: ground `#0a0a0c`, panel `#101114`, bone `#f2eee6`, secondary
`#adaeb7`, signal `#ff5f1f`, with Jonah's existing paper and ink unchanged.
Retain Georgia for literary display, Space Grotesk for prose and JetBrains Mono
for actual mechanism annotations. No added font request or runtime dependency.
Use shared display/section/body/note type roles, readable notes, short measures
and deliberate section spacing. Keep left alignment and current responsive grids.

The three doors remain compact reading aids and native navigation:

```text
Black Lantern           SHAD0W                    Automated Social
request | authorization availability -> eligible draft -> bound revision
        | effect        time boundary            review -> human decision ||
separate observation    independent risk gate     publishing remains separate
```

Distinct topology carries the difference; identical animated flow diagrams would
flatten it. Keep static illustrative states and let hover/focus emphasize the
destination rather than pretending to execute the mechanism. Existing adjacent
prose and [source register](evidence/three-doors.md) remain authoritative.

## Upstream principles

Reviewed the full [Anthropic frontend-design skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)
on 29 October 2026 via its raw source. Applicable principles: ground choices in
the subject; use a deliberate type scale and readable measures; let structure
communicate meaning; avoid repeated card treatments and generic section reveals;
concentrate novelty; inspect screenshots and remove unnecessary decoration.
The near-black/orange palette is intentional existing identity. This task does
not adopt upstream suggestions as grounds to replace that identity or rewrite
Jay's words. The installed frontend-design skill already covers general art
direction, so the three new skills cover critique, mechanism explanation and
measurement without duplicating it.

## Implementation plan

1. Validate and push the three focused skills as a foundation milestone.
2. Capture both routes at 320, 390, 768, 1280 and 1440px and establish lab costs.
3. Refine shared type roles, three mechanism SVGs and section pacing.
4. Inspect initial captures, implement a justified refinement and recapture.
5. Run all existing checks, compare lab performance and preservation, push and
   verify remote HEAD, then open one draft PR with captures and limitations.

Provisional budget: investigate median LCP growth over max(10%, 100ms), CLS
growth over 0.02, performance-score loss over 5 points, any accessibility loss,
or transfer growth over 10%. These are regression triggers, not field targets.
