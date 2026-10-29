# Editorial / museum / observatory

29 October 2026 · baseline `a21372f361083a7d265fc340648f351edb230cec`.
Branch: `feat/editorial-immersive-observatory`.

## Direction

Keep the identity-first order, existing authored writing, Observer, lens favicon,
near-black `#0a0a0c`, bone `#f2eee6`, and signal orange `#ff5f1f`.
Keep the static architecture, navigation, evidence pins and generated archive.
The current repeated heading/copy grids make distinct subjects feel alike.
Jonah's cream text panel invites reading but has no visual encounter with the story.
TEMPER's three questions can become understandable through one small threshold instrument.

Three compositions (reading order runs downward):

```text
A · Editorial dominant       B · Museum dominant        C · Selected combination
Jay / large name             Jay / brief introduction   Jay / name + serif question
Perspective | principles     [large Jonah artwork]      Perspective | quiet principles
Jonah / typographic spread   Story / reading invitation [Jonah artwork + title]
Model question / text        Model / small footnote     Reading invitation + context
Field note / archive         Perspective / archive      TEMPER / one instrument
                                                       Field note / archive
```

Choose C, with A's editorial opening. B makes the artwork the site's identity;
A alone does too little to distinguish the explorations. Jonah gets the major
image moment; the model question gets one explanatory interaction. Neither
occupies the personal opening. No animated reveals or scroll hijacking.

Typography: retain Space Grotesk for the name, navigation and body; introduce
the already-used system Georgia serif in the questioning line, selected section
titles and field note. JetBrains Mono is reserved for source/measurement labels.
No additional font requests. Long copy stays near 55–65 characters per line.
Use unequal columns, wider section intervals, quiet rules and a single warm
artwork surface. Mobile gets an intentional vertical reading order.

## Bounded references

Reviewed mkdir as a directory index, Minimal Gallery's current selection, and
Codrops' current features. Two specific references informed the decision:

- [Eli Horn](https://elihorn.ca/), found through
  [Minimal Gallery](https://minimal.gallery/): the homepage isolates the person's
  name and one idea with a single entrance. Learn from its restraint and clear
  author presence; do not reuse its quotation or layout.
- [Atelier UI, Jérémie Nallet / Codrops](https://tympanus.net/codrops/2026/10/21/atelier-ui-webgl-dom/):
  a large title followed by a major image establishes a deliberate visual event.
  Take that hierarchy, not its WebGL, React, smooth scrolling or distortion.

Source pages retrieved through Firecrawl. Local reference screenshot attempts
are supplementary; no third-party artwork or code is copied from these sites.

## Implementation sequence and boundaries

1. This direction and baseline record.
2. Editorial typography, spacing and composition; retain authored wording.
3. Inspect BibleMap's actual image catalog, rights and assets; reuse one image
   with explicit attribution and reception/history distinction.
4. Inspect pinned TEMPER source/tests. A tiny source-fixture threshold explorer
   must identify synthetic unit-test inputs, not imply experimental results.
   Keep the full inputs and default explanation readable without JavaScript.
5. Browser review at 320, 390, 768, 1280 and 1440; full existing checks and scoped
   interaction checks; fix verified regressions and record limitations.

Authored HTML remains separate from generated data. No new autobiographical
claims, theological position, metrics, routes, framework, CMS, trackers or
deployment changes. Existing proposed personal voice still needs Jay's review
before publication. Each numbered step is committed and immediately pushed;
remote HEAD is checked before the next step.

## Baseline verification

Locked dependencies installed. Local Node 25.0.0 differs from the declared Node
22 engine; CI remains the authoritative supported-runtime check. Windows Git
checked out CRLF despite Prettier requiring LF. Local normalization leaves the
Git content unchanged. After normalization `npm run check` passes, including
all 17 data tests. Baseline home QA passes at all five widths and all ten
fallback/input modes, with zero axe violations. Actual 1440px opening and
exploration screenshots inspected in `test-results/editorial-baseline/`.
