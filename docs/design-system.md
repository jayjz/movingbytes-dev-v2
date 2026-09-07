# Design system — owner direction

Status: initial design direction, not a completed specification. Codex should propose refinements and verify them in the browser. Do not treat illustrative values as measured requirements.

## Identity
Systems Observatory. The site should feel like an engineered instrument with editorial confidence, not a simulated operating system or a generic AI product landing page.

## Color
Preserve the existing orange `#ff5f1f` as a signal accent. Start from the current dark palette, then refine contrast and hierarchy. Use orange for primary actions, active signals, meaningful diagram paths, and sparing emphasis. Do not make every border, heading, or decorative element orange. Avoid relying on color alone to communicate status.

## Typography
Use the existing Space Grotesk and JetBrains Mono initially. Introduce another font only with a clear visual and performance rationale. Use oversized, tight editorial display typography, readable body text, and small mono labels for meaningful metadata. Avoid tiny body text and overly long lines. Test line breaks rather than hard-coding desktop-only typography.

## Layout
Prefer generous negative space, clear content hierarchy, and large project imagery. Use a restrained grid that adapts to viewport width. The hero should have a strong focal point and legible copy. Featured work should receive substantially more visual weight than research entries. Mobile layouts should be composed deliberately rather than simply shrinking desktop arrangements.

## Imagery
Use original diagrams, real project screenshots, or owner-approved assets. Decorative visuals must be identifiable as illustrations. Never invent screenshots of working software or present synthetic metrics as measured data. Optimize assets and provide meaningful alternative text where applicable.

## Motion
Use motion to express system relationships and guide attention. Favor transform and opacity animation, bounded pointer effects, and short, intentional transitions. Avoid scroll hijacking, perpetual high-contrast motion, and effects that obstruct interaction. Reduced-motion users receive equivalent information without decorative movement. Essential text is visible before JavaScript initializes.

## Candidate hero copy
“I build systems that survive reality.”
Supporting direction: agent architectures, local AI, security tooling, and field software built around real constraints.
This is proposed copy, not approved final copy. Verify the professional positioning and refine for clarity rather than adding hype.

## Candidate visual
An abstract execution topology using labeled nodes and connecting paths. It may illustrate planning, execution, evidence, and validation, but must not imply a specific project's exact architecture without source verification. If metadata is decorative, label it as illustrative or omit it.

## Interaction constraints
All controls must be keyboard operable with visible focus. Links must have meaningful labels. Hover-only information must have a keyboard/touch equivalent. Do not replace the native cursor or add magnetic interactions unless they improve usability and are tested across input types.

## Design review questions
Does the first viewport communicate a clear identity? Is the flagship memorable? Is the typography readable? Does motion explain something? Does mobile feel intentionally composed? Does the page still work without animation? Are the technical claims credible? Is the implementation simpler than an equally effective alternative?
