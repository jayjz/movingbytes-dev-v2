# Observer placement review

Baseline: `c5e9d64`. Character artwork, SVG markup, JavaScript behavior, hero copy,
CipherLoop entry, and all production files are unchanged.

The hero now uses a two-row grid: identity / Observer, then headline / introduction.
The Observer occupies the same column and readable measure as the introduction.
Its 144px artwork and adjacent caption/control share that reserved upper row.
Mobile uses a 96px character column beside identity, followed by full-width
headline and introduction rows. No absolute positioning or negative offsets remain.
The two existing wrapper divs use display: contents; DOM and keyboard order are unchanged.

## Measured before → after

Coordinates are CSS pixels in Chromium, with 900px viewport height. Bounds are
`x, y, width × height`; values rounded. The user's 1280px measurements reproduce locally.
The supplied article position (595px) differs from the heading position (630px).

| Width | Hero bottom | CipherLoop heading | Introduction bounds | Observer mount bounds |
| --- | --- | --- | --- | --- |
| 1280 | 517 → 535 | 630 → 648 | 795, 270, 432 × 199 → 795, 288, 432 × 199 | 1086, 93, 170 × 195 → 795, 137, 432 × 126 |
| 1440 | 542 → 560 | 655 → 673 | 880, 296, 432 × 199 → 880, 314, 432 × 199 | 1190, 93, 170 × 195 → 880, 137, 432 × 126 |
| 390 | 704 → 718 | 811 → 825 | 16, 444, 358 × 220 → 16, 458, 358 × 220 | 266, 129, 108 × 151 → 278, 157, 96 × 140 |
| 320 | 725 → 739 | 831 → 846 | 16, 438, 288 × 246 → 16, 453, 288 × 246 | 196, 129, 108 × 151 → 208, 157, 96 × 140 |

At 1280px the mount bottom changes from 288px to 263px, while the introduction
starts at 288px instead of 270px. Its full 432px measure is retained. The article
starts at 612px rather than 594px.
CipherLoop moves down only 18px on desktop and about 14px on mobile.

## Actual verification

- Placement captures/checks: 1280, 1440, 390, 320 × 900, at normal and 200% root text size.
- Before: caption/mount overlaps introduction at 1280px and at both enlarged desktop widths.
- After: all eight combinations pass character/text overlap and horizontal-overflow checks.
- Inspected the four normal-size after renders. Character and control form one compact
  group above the introduction; mobile gives them their own column, clear of text.
- Focused interaction runner: gaze bounds/neutral return, keyboard/touch greetings,
  pause/resume, reduced-motion change, no-JS fallback, anchors and visible focus.
- HTML validation, CSS/runner Prettier, JavaScript syntax, and diff whitespace checks.

Artifacts: `review/placement/before/`, `review/placement/after/`, and
`review/placement/interactions/results.json`. Both geometry JSON files include
caption, identity, headline, article and introduction bounds. Normal screenshots
are `1280.png`, `1440.png`, `390.png`, `320.png`; enlarged captures end in
`-text-200.png`. Older character recordings are retained as interaction references;
they show the previous placement.

Reproduce from the repo root with the existing pinned development dependencies:

```sh
node prototypes/observer/placement-qa.cjs
OBSERVER_CAPTURE=0 OBSERVER_OUTPUT=prototypes/observer/review/placement/interactions node prototypes/observer/qa.cjs
```

Recommendation: ready for placement approval. The first grid composition passed
without needing a second design correction. Keep the introduction measure and this
reserved character area. At 320px the CipherLoop heading still begins within the
900px viewport, while its explanation follows below it.

Limits: Chromium only; 200% root-font scaling is a text-reflow stress test, not a
complete browser-zoom or assistive-technology assessment. No production integration,
new motion, artwork changes, or research. The unrelated untracked pager-help file
remains untouched and excluded.
