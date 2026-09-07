# jaysystems.dev

## Purpose
This repository is Jay's engineering portfolio. The site itself should
demonstrate strong frontend engineering, systems thinking, accessibility,
performance, and deliberate visual design.

## Design direction
Create a premium, cinematic "Systems Observatory" portfolio inspired by
the quality and motion language of modern editorial and motion-design sites.
Do not clone any reference site, copy its assets, or reproduce its layout
verbatim.

Visual identity:
- Near-black backgrounds
- Bone/white typography
- #ff5f1f as a restrained signal accent
- Oversized editorial typography
- Subtle technical grids and instrumentation
- Large project visuals and clear information hierarchy
- Motion that communicates system behavior

## Engineering constraints
- Preserve the existing static HTML/CSS/JavaScript architecture unless a
  specific requirement justifies introducing a build system or framework.
- Do not add React, Three.js, GSAP, or other large dependencies by default.
- Prefer semantic HTML, CSS, SVG, and small JavaScript modules.
- Preserve keyboard accessibility and reduced-motion support.
- Keep the site usable when JavaScript is unavailable.
- Avoid unnecessary network requests and third-party trackers.
- Do not invent project capabilities, metrics, screenshots, or verification
  claims. Use actual repository evidence.
- Do not modify deployment configuration without a documented reason.
- Do not push, merge, or deploy without explicit authorization.

## Workflow
- Inspect existing code before making architectural changes.
- For substantial work, create a plan and identify affected files.
- Implement in reviewable milestones.
- Run relevant validation after each milestone.
- Review diffs for unrelated changes.
- Report what changed, what was tested, and what remains unverified.
