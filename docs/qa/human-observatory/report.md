# Human Observatory review

29 October 2026 · [PR #21](https://github.com/jayjz/movingbytes-dev-v2/pull/21).
Base `71ae4a234b234e2d25b52ade366bf404369bdd63`.
Branch `feat/human-observatory-art-direction`.

## Result and visual review

The opening now places the existing HVAC/construction background beside a large
serif name and the original Observer. The personal introduction and perspective
lead into Jonah; principles move to the archive entrance. Jonah becomes a warm,
full-width exhibition spread with a larger complete sculpture image, a separate
caption and a reader invitation. The same clay rule introduces Curiosity's deep
ink surface. Two entries follow: the TEMPER question/instrument and the field-work
observation. No hobby-feed entries or new research programs were invented.

All 220 original paragraphs are retained. A normalized-paragraph comparison found
no original paragraph rewritten or removed. The engineering archive through the
footer is byte-for-byte identical to the base. The field note keeps `owner-review`.
New section/navigation labels are editorial proposals. Jay should review the
existing proposed first-person copy and the artwork's new placement before
publication. No new personal photograph, first-person quotation or theology.

Actual Chromium screenshots inspected at **320, 390, 768, 1280 and 1440px**, plus
the joins between person/Jonah, Jonah/Curiosity and Curiosity/archive. The museum
image is uncropped; the source, date and later-reception distinction stay visible.
Desktop pairs a caption with a broad image; mobile reads title → image → caption
→ invitation. Model inputs, limits and source links remain present at every width.
The existing Google Fonts fallback was active in local captures (zero loaded font
faces); the new name, Jonah and Curiosity typography use the local Georgia serif.

Concrete refinements after inspection: inset the italic J after its overhang was
clipped at 1280px; remove a stranded caption comma; add and keyboard-test the
onward link into Curiosity; remove superseded responsive declarations. No new
runtime JavaScript, dependency, font request, image bytes or content fetch.

## Review images

| Width | Opening | Jonah | Curiosity |
| --- | --- | --- | --- |
| 320 | [Image](images/opening-320.png) | [Image](images/jonah-320.png) | [Image](images/curiosity-320.png) |
| 390 | [Image](images/opening-390.png) | [Image](images/jonah-390.png) | [Image](images/curiosity-390.png) |
| 768 | [Image](images/opening-768.png) | [Image](images/jonah-768.png) | [Image](images/curiosity-768.png) |
| 1280 | [Image](images/opening-1280.png) | [Image](images/jonah-1280.png) | [Image](images/curiosity-1280.png) |
| 1440 | [Image](images/opening-1440.png) | [Image](images/jonah-1440.png) | [Image](images/curiosity-1440.png) |

Compare the original [opening](images/before-opening-1440.png) and
[Jonah](images/before-jonah-1440.png). Transition captures:
[person/Jonah desktop](images/transition-now-1440.png),
[mobile](images/transition-now-390.png);
[Jonah/Curiosity desktop](images/transition-curiosity-1440.png),
[mobile](images/transition-curiosity-390.png);
[archive entrance desktop](images/transition-principles-1440.png),
[mobile](images/transition-principles-390.png).

Reproduce from the repository root:
`node docs/qa/human-observatory/capture.cjs test-results/human-review`.
Uses locked Playwright and the existing local static server, reduced motion and
a 1000px viewport height. The committed capture helper is review tooling only.

## Executed validation

| Command / check | Result |
| --- | --- |
| `npm run check` | Pass: formatting, HTML, internal assets/anchors, syntax, generated freshness, all 17 data tests |
| `npm run qa` | Pass: 52 page/viewport/fallback cases; 20 width-based axe audits, zero violations |
| `npm run qa:aetherforge` | Pass: 26 viewport/scenario/resilience checks |
| `npm run qa:live-system` | Pass: six expanded-layout, anchor, keyboard, network and accessibility checks |
| `git diff --check` | Pass |
| Capture helper | Pass at all five widths; no horizontal overflow; syntax check passed |
| Original-paragraph / archive comparison | 220 paragraphs retained; archive/footer unchanged |

[Recorded portfolio results](portfolio-results.json). Checks include native range
keys, pointer/touch, equality and empty acceptance, skip link, visible focus,
reduced motion, no JavaScript, missing images/scripts/Observer, 200% root text at
390px and 320px, project anchors, case-study navigation, registry disclosure and
zero runtime data requests. The new onward link also verifies keyboard entry and
browser Back. Its first test run added a history entry without restoring it;
the harness now goes Back and awaits the same original `#main` target before
the existing navigation assertions. No assertion was removed to fix that failure.

The entire diff was reviewed for unsupported claims, private material, unrelated
changes and preserved evidence. Only homepage markup/styles, its QA expectations,
the existing artwork attribution and review documents/images changed. Local home
CLS was 0 at all five widths. These are local Chromium observations, not field
performance or a guarantee of accessibility on every device.

## Evidence, preview and limits

[Direction, three wireframes and sources](../../human-observatory.md).
[Image rights and provenance](../../../assets/jonah/ATTRIBUTION.md).
The sole photograph is the existing 85,395-byte CC0 Cleveland Museum image,
1965.239, *Jonah Under the Gourd Vine*, 280–90 CE, John L. Severance Fund.
The museum's object-level public-domain status was rechecked. Artistic reception
is kept distinct from Scripture, archaeology and historical reconstruction.
No extra artwork or generated reconstruction is included.

TEMPER's metrics and unit-test fixture were reinspected through GitHub at
`0747730d18cdb692142d9c2b50f9e8bc1ff0c45f`. Inputs and arithmetic match the
[existing provenance record](../../threshold-instrument.md). This site's
interactive illustration is tested; TEMPER's Python tests and model experiments
were not rerun. BibleMap itself was read, not changed or experimentally tested.

Vercel's bot supplied the actual
[branch preview](https://movingbytes-dev-v2-git-feat-hum-94e173-elliotandersons-projects.vercel.app).
An HTTP request reaches Vercel login. The connector lacks the owning team's
scope; the local CLI has no credentials. No protection or access settings were
changed. Hosted end-to-end verification remains unperformed; local results must
not be described as hosted tests.

Native Chrome access timed out awaiting app approval. Automated 200% root-text
enlargement is covered; native browser zoom remains unverified. Physical devices,
Safari, Firefox and a screen reader were not exercised. Node here is 25.0.0;
the repository's supported CI runtime is Node 22. Local timings are diagnostic,
not field Core Web Vitals, emotional-response evidence or performance claims.

## Milestone checkpoints

Each milestone was immediately pushed and compared with remote HEAD.

| Milestone | SHA |
| --- | --- |
| M1 · direction/source inventory | `2a77e37151ee734def0e21b6612651dad15ce1d0` |
| M2 · personal opening/placement | `de1d98382eaa3ada17aadac9d2d73a71963b779b` |
| M3 · Jonah spread | `ce6a2b8a93f8e616e9c21fd2731a9a09035998ab` |
| M4 · curiosity | `1153f7b296ede3fa5e12cb17270d928a0474504c` |
| M5 · refinement/full review | Commit containing this report; exact SHA in the PR. |

No force push, main commit, merge or manual production deployment.
