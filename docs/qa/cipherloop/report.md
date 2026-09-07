# CipherLoop evidence release — QA report

Release closeout: 2026-09-07. Branch: `feat/cipherloop-evidence-release` at `9a2b059`. No push, merge, or deployment was performed.

## Recorded source evidence

The committed [demonstration record](../../evidence/cipherloop/demonstration.md) documents an isolated Linux/Python 3.12.3 run against CipherLoop commit `f03a1e186e491cf24aa0f0e0671cac766c1fa8ab`: `python -m pytest -v -p no:cacheprovider tests` passed **20 tests in 2.32s**. The two fixture tests then passed in a fresh process in **1.18s**. The committed boundary-probe JSON records the supplementary offline observations. These Linux results were not rerun on this Windows checkout.

## Current Windows verification

- `npm.cmd ci` completed from the tracked `package-lock.json`: 18 packages installed; npm reported 0 vulnerabilities. The machine uses Node `v25.0.0`, outside the committed `>=22 <23` range, so this is a compatibility smoke result rather than supported-runtime certification.
- `npm.cmd run check` passed: Prettier, HTML validation, internal asset/fragment and six-source link audit, legacy redirect-definition audit, and JavaScript syntax checks.
- `npm.cmd run qa:install` installed Playwright Chromium; `npm.cmd run qa` passed on local preview. Both pages passed at 320, 390, 768, and 1440 CSS px with zero axe WCAG A/AA violations, no horizontal overflow, skip-link/fragment/navigation checks, no page errors, and reduced-motion checks. Both pages also passed at 390px with JavaScript disabled, no `IntersectionObserver`, blocked fonts, blocked diagram requests, reduced motion at load, and 200% root text.
- Fresh Windows QA results and screenshots were written only to ignored `test-results/portfolio/`. The local results recorded CLS 0 at every ordinary viewport; observed unthrottled local LCP ranged from 56–1224ms on the homepage and 76–80ms on the case study. These values are local smoke observations, not production or field-performance claims.
- Representative fresh desktop and mobile captures were visually inspected: homepage and case-study first viewports remain readable at 1440px and 390px, with no visible clipping or overlap.

The committed historical browser evidence remains in [browser/results.json](browser/results.json) and `browser/*.png`; it is distinct from the Windows run above.

## Public-route and deployment separation

`node scripts/check-hosted.cjs` performed a read-only check of the currently deployed site. It observed `jaysystems.dev` redirecting to `www`, `/index.html` and the CipherLoop `.html`/trailing-slash forms redirecting to clean URLs, and all three legacy `/work/*` routes redirecting to their intended GitHub repositories. The deployed CSS/JS and old SVG still returned `public, max-age=31536000, immutable`; the new `cipherloop-architecture.svg` returned 404. This confirms the branch cache/header change and new asset are **not deployed**.

Locally, `vercel.json` requests revalidation for mutable asset extensions, retains the security headers and six legacy redirect definitions, and the case-study canonical/Open Graph URL uses `https://www.jaysystems.dev/case-studies/cipherloop`. `npm run validate:links` confirms the local internal targets/fragments, six GitHub source destinations, contact address, and redirect definitions; it does not establish remote GitHub availability.

## Deployment-output review

Vercel deploys from the repository root with no build output directory. Tracked-file review found no `.env`, `.vercel`, credential/key, raw trace, HAR/PCAP, local environment, `node_modules`, or temporary-working-directory paths. The committed `docs/evidence/cipherloop/` material is intentionally sanitized evidence, not a source checkout or raw audit trace. `.gitignore` excludes the common sensitive/local categories; it does not hide the intended documentation.

## Remaining limitations

- Node 22 is the supported range; repeat the local tooling checks on Node 22 before treating this Windows run as environment certification.
- Browser coverage is headless Chromium only. No real-device, Safari, Firefox, screen-reader, 400% zoom, throttled-network, or deployed browser pass was performed.
- The proposed cache correction, new asset, and page content require a separately authorized deployment and post-deploy hosted check. Existing cached immutable responses cannot be retroactively changed.
- CipherLoop's recorded tests and probes do not establish live model, Docker, scanner, external-service, or general security behavior. See the demonstration record and claim ledger for scoped limits.
