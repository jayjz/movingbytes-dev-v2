# Three directions — rendered comparison

2026-09-11. Rendered at 1440, 390 and 320 CSS px in local headless Chrome. Scores are design judgment, not measurements. All use original HTML/CSS and the existing Observer SVG; no copied reference asset. Static compositions deliberately establish pacing before animation.

| Direction | Desktop | Mobile | Live local prototype |
| --- | --- | --- | --- |
| A · Observatory Ledger | [1440](../../docs/qa/mastery/prototypes/ledger-1440-viewport.png) | [390 full page](../../docs/qa/mastery/prototypes/ledger-390.png) | [Ledger](http://127.0.0.1:8000/prototypes/mastery/ledger.html) |
| B · Field Instrument | [1440](../../docs/qa/mastery/prototypes/instrument-1440-viewport.png) | [390 full page](../../docs/qa/mastery/prototypes/instrument-390.png) | [Instrument](http://127.0.0.1:8000/prototypes/mastery/instrument.html) |
| C · Systems Narrative | [1440](../../docs/qa/mastery/prototypes/narrative-1440-viewport.png) | [390 full page](../../docs/qa/mastery/prototypes/narrative-390.png) | [Narrative](http://127.0.0.1:8000/prototypes/mastery/narrative.html) |

## Distinct design theses

**A — editorial, type first.** Two-line thesis and compact identity/Observer row; plain horizontal anchors. The pair gets one wide heading, then producer / capture boundary / evaluator, followed by evidence and limits. The bone file plate is the single contrast event. AetherForge leads a restrained text index. On mobile the flow becomes a sequential document; headline/intro stack below the small Observer. Rules mark chapter changes. Event-driven Observer gaze is the only proposed production motion. Low complexity: one homepage stylesheet, semantic flow, optional script. Risk: an overly broad manifesto and a repetitive three-column layout. Production should attach real fixture outcomes and explicit source links to distinguish this particular system.

**B — schematic first.** A narrow identity/reading rail stands beside a tall bone engineering plate. Inside it the pair becomes a large vertical sequence with metadata in a margin; Observer sits with the introduction. Plain document navigation. Secondary work remains a lower index. On mobile the rail becomes an introduction, then the diagram reads top to bottom. Hard surface changes, no scroll choreography. Medium complexity: label reflow, inverse-color focus/contrast, two nested grids. Strong technical artifact presence, but the margin labels and nested gray plate drift toward a generated documentation template. Too much space is spent explaining the diagram, too little identifying Jay's broader work.

**C — scenes first.** Giant three-verb thesis with explicit identity; compact work link names both projects. Ordinary anchors lead through a dark producer scene, full-width bone artifact scene, then dark evaluator scene. Observer is a quiet upper-edge signature. Each project gets a chapter; proof arrives in the evaluator scene. Mobile preserves the chapter sequence without pinning or parallax. Proposed motion, if ever added, is a single bounded line accent, never hidden content. Medium complexity; large type and inverse surfaces require zoom/contrast care. The static sequence is already too long. More motion would not repair its information delay.

All directions have semantic landmarks, visible focus and static/no-JS content. The tuner is opt-in at the end of prototype pages only; it adjusts display, section and Observer scale with no persistence. It is excluded from production. Initial C capture exposed a decorative pseudo-element extending beyond desktop width; scoped it away and rerendered before final review. A/B mobile flows need no horizontal panning.

## Severe scorecard

0 = fails, 5 = exceptional. For risk rows, **5 means lowest risk**. No automatic accessibility certification is implied by a design score.

| Criterion | A | B | C |
| --- | ---: | ---: | ---: |
| Immediate orientation | 4 | 3 | 3 |
| Senior-engineer credibility | 4 | 4 | 3 |
| Project scannability | 4 | 3 | 2 |
| Evidence visibility | 4 | 4 | 2 |
| Originality | 3 | 4 | 3 |
| Typography | 4 | 3 | 4 |
| Composition | 4 | 4 | 4 |
| Information density | 4 | 3 | 2 |
| Mobile composition | 4 | 3 | 3 |
| Motion restraint | 5 | 5 | 4 |
| Personality | 4 | 4 | 4 |
| Technical authenticity | 4 | 4 | 3 |
| Maintainability | 5 | 4 | 3 |
| Accessibility risk (low is good) | 4 | 3 | 3 |
| AI-slop risk (low is good) | 4 | 3 | 2 |
| **Total / 75** | **61** | **54** | **45** |

## Recommendation: A, Observatory Ledger

- Names Jay's role immediately and puts the paired flagship in the opening scan.
- Preserves the existing editorial identity while making the evidence relationship explicit.
- Gives one meaningful artifact the visual contrast, rather than decorating every project.
- Carries the same reading order to 320px without hiding project information.
- Integrates the original Observer without adding a greeting/control interface.
- Avoids B's documentation density and C's substantial delay before proof.
- Needs a real fixture-results excerpt and tighter capture-boundary wording before production.
- Fits a bounded static implementation with isolated styles and no new dependencies.

## Production slice acceptance

Implement A's opening, Observer and paired flagship only. Add the committed toy/safe outcomes with immutable provenance, identify the capture harness, and expose source/case-study routes. Refresh secondary copy and reorder AetherForge first; keep the lower-page layout and historical case study. Show Fracture as a small lab entry. No whole-site redesign or visual combination of B/C. Root selected this direction under the user's explicit authorization; no additional approval pause.
