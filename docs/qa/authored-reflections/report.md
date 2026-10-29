# Authored reflections and artwork review

29 October 2026 · [PR #22](https://github.com/jayjz/movingbytes-dev-v2/pull/22).
Baseline `565a16125927caf171288253edb263e243b8fc00`.
Branch `feat/authored-reflections-and-sketch`.

## Delivered and editorial choices

The existing Perspective section introduces Jay's original Sinai drawing in a
wide figure. Desktop pairs the complete image with its caption; tablet and mobile
stack them. The supplied 1042 × 851 WebP is 205,458 bytes, uses intrinsic dimensions,
lazy loading and asynchronous decoding, and has a descriptive alternative. No
crop, filter, generated replacement or workspace-photography framing is applied.
The 1,613,832-byte original PNG stays available through an explicit link and is
not automatically requested. The local preview now serves WebP as `image/webp`.

The exact selected Jonah excerpt replaces the earlier generic invitation heading.
The full two-paragraph original is available in a native details disclosure,
including spelling, punctuation and interpretations. A separate contextual note
identifies Jay's personal reading and directs historical context to the reader.
The museum image, provenance, historical date and reading-experience link remain.

The complete intelligence thesis precedes TEMPER as a visible, attributed personal
question. A separate note limits TEMPER to model decisions; it is not evidence
for the broader thesis. No claim is made that a general orchestrator exists or
that an intelligence trend was measured here. Existing fixture inputs, controls,
calculations, source pins and limitations are unchanged.

Jay should approve the artwork caption/alt wording, placement and scale, the
reflection attribution/disclosure/context labels and the thesis framing before
publication. The supplied quotations are preserved rather than polished. No
new historical or theological verification is implied. Existing proposed hero
copy and field-note approval status remain as they were.

## Visual review

Actual Chrome captures were inspected at 320, 390, 768, 1280 and 1440px. The
drawing retains its complete frame; the caption and original-file link reflow
without horizontal scrolling. The warm Jonah spread and deep-ink Curiosity
section keep their existing typography, materials and navigation.

| Material              | Desktop                                 | Mobile                                | Additional sizes                                           |
| --------------------- | --------------------------------------- | ------------------------------------- | ---------------------------------------------------------- |
| Sinai drawing         | [1440](images/sketch-1440.png)          | [390](images/sketch-390.png)          | [320](images/sketch-320.png), [768](images/sketch-768.png) |
| Jonah and excerpt     | [1440](images/jonah-1440.png)           | [390](images/jonah-390.png)           |                                                            |
| Full Jonah reflection | [1440](images/reflection-open-1440.png) | [390](images/reflection-open-390.png) |                                                            |
| Intelligence thesis   | [1440](images/intelligence-1440.png)    | [390](images/intelligence-390.png)    |                                                            |

Full local captures are in `test-results/authored-final/`; the unchanged-homepage
baseline captures are in `test-results/authored-baseline/`. Those directories are
ignored review artifacts. The representative images above are committed for PR
review.

Additional resilience views: [200% text / full reflection at 320px](images/reflection-open-large-text-320.png),
[200% text / drawing at 320px](images/sketch-large-text-320.png), and
[blocked WebP / alternative and original link](images/sketch-blocked-authored-image.png).

## Validation

| Check                     | Result                                                                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run check`           | Pass: formatting, HTML, local links/assets/fragments, syntax, generated freshness and all 17 data tests                                                      |
| `npm run qa`              | Pass: 53 page/viewport/fallback cases; 20 whole-page width-based axe audits and scoped authored-material audits, zero violations                             |
| `npm run qa:aetherforge`  | Pass: 26 viewport/scenario/resilience checks                                                                                                                 |
| `npm run qa:live-system`  | Pass: six expanded-layout, anchor, keyboard, network and accessibility checks                                                                                |
| `git diff --check`        | Pass                                                                                                                                                         |
| Baseline scope comparison | Opening/navigation and principles/archive/footer unchanged; case studies, data, research, JavaScript, supplied assets and deployment configuration unchanged |

The new checks compare browser text with each paragraph of the owner-authored
source, normalizing only layout whitespace. They verify actual image decoding,
intrinsic/rendered proportions against the original PNG, alt text, original-file
content and MIME type, lazy loading and absence of automatic PNG requests. They
exercise Enter/Space disclosure access, focus visibility, expanded reflow, image
failure fallback and scoped accessibility audits of the new material.

The first full run stopped on a Chromium element-screenshot stability timeout in
the no-JavaScript/normal-motion case. The isolated native disclosure assertions
passed. That case now captures the full page with the reflection open, retaining
normal motion and every content/keyboard assertion. No production behavior or
test expectation was weakened to accommodate the capture.

The initial checkout used CRLF while the pinned formatter requires LF. Local
normalization produced no unrelated content changes. Local tooling ran on Node
24.21.0 and installed Chrome; the existing GitHub CI requests Node 22. These are
local browser checks, not field performance, hosted verification or exhaustive
assistive-technology testing. External evidence destinations were preserved and
checked structurally; their remote availability and source experiments were not
retested. No dependencies or deployment settings changed.

Recorded results: [portfolio](portfolio-results.json),
[AetherForge](aetherforge-results.json), [generated sections](live-system-results.json).
The homepage's recorded initial CLS was 0 at all five widths. These local
measurements are not production performance claims.

## Milestone history

Each implementation commit was pushed separately and verified using
`git ls-remote origin refs/heads/feat/authored-reflections-and-sketch`:

1. Artwork: `b3b55d85d615ebedab8371329cf0fbb5fff07b15`.
2. Jonah: `d37721dcbb528eb00636330321204a2e69cbba02`.
3. Intelligence: `c7478ea9024d5be0c199bf3f4aee477a1d859845`.
4. Responsive/accessibility QA: the commit containing this report and its review
   artifacts; its SHA is recorded in PR #22 after remote verification.

No merge or manual production deployment is part of this work.
