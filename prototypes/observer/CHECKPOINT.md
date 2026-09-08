# Observer verification checkpoint

Continues the prototype at `5e5dd71`, based on main
`78a77b19287b5309eef06725f4bde7411fb2b699`. No design or runtime changes.

## Follow-up

- Retained the already committed wait for the asynchronous reduced-motion event.
- Corrected the idle-blink timeout argument position in Playwright's waitForFunction.
- Added `OBSERVER_CAPTURE=0` to run checks without replacing valid media.
- Asserted actual greeting animations, pause/resume, neutral return, and synthetic
  extreme-pointer bounds (7/4 SVG units horizontally, 4.55/2.6 vertically).
- Checked that the character does not overlap the headline or introduction,
  and that external requests remain absent after interaction.

## Actual results

The focused Chromium run passed at 1440×900, 390×900, and 320×900:
bounded pointer gaze and neutral return on desktop; Space/Enter and touch greetings;
pause cancels motion, resume restores it; hero anchor and skip-link activation;
visible focus; reduced-motion change; no overflow, hero overlap, external requests,
or page errors. Axe reported zero violations at all three widths.
No-JavaScript and initial reduced-motion checks passed at 390×900.

HTML validation, Prettier checks, JavaScript syntax, and git diff --check passed.
Raw results: `review/checkpoint/results.json`.

Reproduce from the repository root after installing the existing pinned dev tools:

```sh
OBSERVER_CAPTURE=0 OBSERVER_OUTPUT=prototypes/observer/review/checkpoint node prototypes/observer/qa.cjs
```

This session reused the existing node_modules through NODE_PATH and cached
Chromium through PLAYWRIGHT_BROWSERS_PATH; no dependency installation occurred.
The original capture mode remains available by omitting OBSERVER_CAPTURE.

## Visual judgment

Reused and inspected the final desktop/mobile rest, gaze, keyboard greeting,
touch greeting, no-JS, reduced-motion, and enlarged static captures.
The chamfered housing, carry loop, unequal eyes, orange pivot, and fixed stand
remain identifiable at small size. The short aperture closure reads as a blink;
the grounded body avoids the appearance of a floating widget.

The upper-right identity-row perch stays clear of reading and link areas.
It does consume some vertical space: CipherLoop's title begins at approximately
655px on desktop and 811px on mobile. Both titles and the complete hero action
remain in the 900px viewport; on mobile, most of the project explanation follows
below the fold. This is a visible placement trade-off, not an interaction defect.

Recommendation: ready for owner visual approval. Retain the small identity-row
placement; do not enlarge it into a competing hero illustration. No additional
effects or character redesign recommended at this checkpoint.

## Preserved artifacts and limits

Media under `review/final/` was not regenerated:

- `desktop-or-mobile-1440.png`, `desktop-or-mobile-390.png`
- `desktop-gaze.png`, `desktop-keyboard-greeting.png`, `mobile-tap.png`
- `no-js.png`, `reduced-motion.png`, `observer-static.png`
- `observer-interaction.webm`

Chromium with emulated touch only; no physical-device, Safari/Firefox, manual
screen-reader, or production-performance certification. The local prototype uses
system font fallbacks and makes no external font requests. No new source audit,
reference research, or production integration was performed.

An unrelated untracked root filename containing a commit-message fragment was
inspected: it contains less pager help text. It is preserved and excluded.
