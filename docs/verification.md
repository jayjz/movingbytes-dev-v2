# Portfolio verification and release criteria

## Baseline
Before implementation, record the current commit, relevant files, existing validation results, and representative desktop/mobile screenshots if browser tools are available. Establish performance measurements before setting budgets. Document unavailable tools rather than inventing results.

## Existing checks
The supplied baseline CI runs Prettier and HTML Validate. Inspect the actual workflow and use its current commands. The baseline commands are:

```sh
prettier --check "index.html" "css/**/*.css" "js/**/*.js"
html-validate index.html
```

If the implementation adds pages, update validation coverage intentionally. Do not assume the original CI checks new pages automatically.

## Functional acceptance
- Homepage and every internal case-study route load correctly.
- Existing public routes and redirects are preserved or deliberately migrated.
- Navigation, source links, email links, and skip link work.
- No important content is inaccessible without JavaScript.
- No essential interaction depends solely on hover or animation.
- No unexpected horizontal overflow at representative mobile widths.

## Accessibility acceptance
- Semantic headings, landmarks, and accessible names are meaningful.
- Keyboard navigation and visible focus work.
- Reduced-motion mode removes nonessential animation without hiding content.
- Text and interactive elements meet applicable WCAG 2.2 AA contrast requirements.
- Images and diagrams have appropriate text alternatives or are marked decorative.
- Automated checks are supplemented with manual keyboard and browser review.

## Visual acceptance
Inspect representative desktop and mobile sizes. Check hero hierarchy, typography, navigation, project composition, image cropping, long text, and motion fallbacks. Compare screenshots with the baseline and design brief. Do not claim visual verification unless screenshots or a browser were actually inspected.

## Performance acceptance
Measure before setting budgets. Review image formats/sizes, font loading, JavaScript cost, layout stability, and animation behavior. Use current Core Web Vitals guidance as context, not an invented measured result. Prefer simpler implementations when visual quality is equivalent.

## Content acceptance
Every substantive technical claim is backed by current repository evidence or clearly labeled as planned/experimental. No fake telemetry, fabricated metrics, or unsupported production claims. Project statuses and source links are accurate.

## Release gate
Review the diff, run relevant checks, inspect browser results where possible, and document known limitations. Deployment is a separate authorized step. Do not push or merge merely because checks pass.
