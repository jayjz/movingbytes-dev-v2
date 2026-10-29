# Authored reflections and Sinai artwork

Baseline: `565a16125927caf171288253edb263e243b8fc00` on
`feat/authored-reflections-and-sketch`; existing PR #22. The source writing in
`reflections-2026-10-29.md` and the two supplied images are owner-authored material.
The project archive, research evidence, fixture instrument and revision pins are
supporting evidence and remain outside this editorial change.

## Placement and scope

Two bounded arrangements were considered within the existing Human Observatory:
an image below the right-hand Perspective copy, or a wider figure below both
Perspective columns. Choose the wider figure: it gives the full drawing room,
with its credit and symbolic subject alongside it on desktop and below it on
mobile. The existing first viewport, Observer, navigation and type system remain.
No new route, font, effect, framework or publishing system is needed.

1. Artwork: introduce the complete 1042 × 851 WebP in Perspective, credit Jay,
   describe the tablets and calf as a personal exploration of symbolic duality,
   and link the original PNG. Use intrinsic dimensions and lazy loading.
2. Jonah: feature the supplied two-sentence excerpt within the warm Jonah spread.
   A native details disclosure gives access to the full original reflection,
   including spelling and punctuation, without JavaScript. Label it as Jay's
   personal interpretation; keep the museum and historical context separate.
3. Intelligence: show the complete supplied thesis before TEMPER as Jay's
   personal question. Preserve the limited synthetic instrument and its evidence
   boundaries; it does not establish the broader thesis.
4. QA: extend existing browser checks for verbatim text, native disclosure,
   intact image geometry/loading/fallback, keyboard access and reflow. Review
   desktop, tablet, 390px and 320px captures, reduced motion, no JS and 200% text.

Each milestone gets a separate commit and push, followed by remote SHA
verification. Update PR #22 and leave it ready for Jay's review. No merge or
manual production deployment. User-requested branch and pushes take precedence
over older branch/review-only instructions in the repository skills.

## Editorial review

Jay supplied the quoted writing and selected excerpt. No polishing or historical
correction is applied to his words. New artwork caption, attribution, disclosure
label, interpretation note, thesis framing and arrangement are editorial
proposals for Jay's approval before publication. The artwork is never cropped,
reconstructed, generated or presented as workspace photography.

## Baseline checks

The initial formatting check reported 30 files because this Windows checkout used
CRLF while Prettier requires LF. Normalizing through the pinned formatter produced
no tracked diff. The installed local runtime is Node 24.21.0; CI requests Node 22.
Browser QA uses the installed Chrome executable through `CHROME_PATH`.
