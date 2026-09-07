# Portfolio redesign — Systems Observatory

## Objective
Turn jaysystems.dev into a flagship engineering artifact that communicates technical depth, visual taste, and the ability to make complex systems understandable. The site should feel premium without becoming slow, inaccessible, or dependent on decorative effects.

## Audience and primary task
The primary audience is engineers, technical hiring managers, collaborators, and potential clients. Within the first viewport, visitors should understand what Jay builds and find a clear path to substantial work. A visitor should be able to understand a flagship project without first reading its GitHub repository.

## Positioning
Jay builds intelligent systems for constrained environments: agent architectures, local AI, security tooling, and field software. His HVAC and construction experience informs his engineering philosophy; it does not restrict the scope of his work. Use accurate, verified professional descriptions rather than inventing credentials or titles.

## Visual direction
Systems Observatory: industrial instrumentation meets cinematic editorial design. Near-black surfaces, bone-white typography, restrained orange signals, generous negative space, large project visuals, precise metadata, and architectural diagrams. References inform composition, pacing, and interaction quality, not copied layouts or assets.

Reference to inspect: https://motionsites.ai/?prompt=systema
Other MotionSites references may be added by the owner. If a reference cannot be accessed, request a screenshot or use the written brief; do not claim to have inspected it.

Avoid generic AI gradients, excessive glassmorphism, fake dashboards, decorative terminal spam, and animations that conceal content.

## Proposed homepage hierarchy
1. Hero: a memorable engineering statement, clear role/focus, primary work CTA, secondary contact CTA, and subtle system visualization.
2. Featured system: CipherLoop is the initial candidate, subject to source verification and evidence availability. Large visual, problem, constraints, architecture preview, accurate status, case-study CTA, source CTA.
3. Selected systems: AetherForge, Truck-Ready HVAC, and Unhinged Agent are initial candidates. Use large editorial sections with varied composition, not six equal cards.
4. Research lab: smaller experiments and early-stage work, including Fracture and HVAC Ops where appropriate.
5. Engineering philosophy: field experience, constrained compute, unreliable networks, evidence, and failure modes.
6. Current work: concise, manually maintainable, dated if necessary. Do not fabricate live activity.
7. Contact: direct email and source/profile links.

Project ordering is a design proposal, not a claim that one system is more complete or valuable than another. Revisit it after reviewing source evidence.

## Flagship case study
Create a reusable case-study structure: problem, audience/use case, constraints, architecture, key decisions, implementation, failure modes, evidence, current status, next steps, and source. Provide an understandable overview before deep technical detail. Separate demonstrated results from intended capabilities. Show actual diagrams, code excerpts, screenshots, or reproducible outputs where available.

## Motion principles
Motion communicates causality, hierarchy, or navigation. Prefer SVG topology animation, restrained reveal transitions, diagram progression, and subtle hover/focus feedback. Avoid scroll hijacking and essential content that requires animation. Respect reduced-motion preferences and provide static fallbacks. Do not introduce heavy animation libraries by default.

## Technical direction
Preserve the existing static architecture initially. Refactor into maintainable modules when justified by the implementation. Do not manufacture a component framework merely to imitate React. Establish a browser and performance baseline before choosing budgets. Maintain responsive design, semantic structure, progressive enhancement, and existing deployment behavior.

## Success criteria
The first viewport has a distinctive identity and clear CTA. The flagship tells a credible engineering story. Projects have accurate statuses and evidence-backed claims. Navigation, keyboard access, reduced motion, responsive layouts, and non-JavaScript content work. No horizontal overflow or broken routes. Validation passes, and browser results are inspected at desktop and mobile sizes when tooling is available.

## Delivery sequence
Audit and plan → visual foundation → homepage hero → featured system → reusable case study → selected systems and lab → motion polish → browser verification → performance/accessibility review → authorized deployment.

The first audit must produce `docs/implementation-plan.md` without modifying application code or overwriting owner-authored guidance.
