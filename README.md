# jaysystems.dev — Systems Observatory

Jay's engineering portfolio: backend and AI infrastructure around explicit contracts, execution state, and failure boundaries. Handwritten HTML, shared CSS, small progressive-enhancement JavaScript, and original SVG diagrams. **No framework, runtime npm dependencies, or application build step.**

## Pages and files

- `index.html`: hand-designed flagship stories, generated focus/map/ledger/registry sections, capability summaries, perspective, and employment contact.
- `research.html`: authored Machine-Native Systems program, canonical `/research`; working position, experiment progression, frontier, durable questions, limits and pinned evidence. Enter from the homepage's Now section. No page JavaScript or runtime data fetching.
- `case-studies/cipherloop.html`: current production-v2 introduction and preserved historical `f03a1e1` study; public clean URL `/case-studies/cipherloop`.
- `case-studies/shadow.html`: causality, lifecycle, paper-risk admission, and data replay; public clean URL `/case-studies/shadow`.
- `css/style.css`, `js/main.js`: shared visual foundation and optional, reduced-motion-aware figure accent. Native anchors and all essential content work without JavaScript.
- `css/research.css`: editorial research layout using the shared palette, fonts and focus/reduced-motion foundation.
- `assets/diagrams/`: original SVGs. Current CipherLoop diagrams derive from recorded source; the previous conceptual asset remains available for existing links.
- `docs/project-evidence.md`: immutable source permalinks, claim scope, results, and publication decisions.
- `docs/evidence/cipherloop/`: deterministic demonstration, sanitized test output, dependency record, and offline boundary probes. No source checkout, secrets, or raw audit traces are included.
- `scripts/`: development-only preview, static link validation, browser checks, and read-only hosted-response inspection.

CipherLoop is an **experimental framework**. Its case study distinguishes inspected implementation, deterministic mocked integration tests, and live behavior that has not been evaluated. All projects carry bounded revision and maturity descriptions in the [14 September evidence register](docs/evidence/project-evidence-2026-09-14.md). Source tests were not rerun in this portfolio pass.

| Project | Source |
| --- | --- |
| CipherLoop | [jayjz/CipherLoop](https://github.com/jayjz/CipherLoop) |
| Truck-Ready HVAC | [jayjz/truck-ready-hvac](https://github.com/jayjz/truck-ready-hvac) |
| AetherForge | [jayjz/aetherforge](https://github.com/jayjz/aetherforge) |
| Unhinged Agent | [jayjz/unhinged-agent](https://github.com/jayjz/unhinged-agent) |
| TraceForge | [jayjz/TraceForge](https://github.com/jayjz/TraceForge) |
| SHAD0W | [jayjz/SHAD0W](https://github.com/jayjz/SHAD0W) |
| TEMPER | [jayjz/TEMPER](https://github.com/jayjz/TEMPER) |
| Evidence Strategy Skills | [jayjz/evidence-strategy-skills](https://github.com/jayjz/evidence-strategy-skills) |
| Sightglass | [jayjz/sightglass](https://github.com/jayjz/sightglass) |
| Fracture | [jayjz/fracture](https://github.com/jayjz/fracture) |

## Updating portfolio data

See [data ownership and refresh model](docs/portfolio-live-system.md). Edit
`data/projects.json` and `data/research.json` for curated metadata and evidence;
keep flagship stories and case studies authored. The public-only allowlist lives
in `data/github.json`. Refresh metadata and render the two marked HTML regions:

```sh
npm run data:refresh
npm run data:render
npm run check
```

Refresh needs network access but no token. Rendering and the served site work
offline. A failed refresh preserves the previous snapshot. Commit the reviewed
JSON and HTML together on a feature branch; no scheduled writes or deployments
are configured. New GitHub metadata never changes claims, maturity or evidence
pins. [TEMPER evidence scope](docs/evidence/portfolio-live-system.md).

Research copy is maintained directly in `research.html`, outside generated slots.
Its editorial source is the public summary pinned to
`393a2ceb7c8372e4e020c81c782af1c12ade96bb`; review a new canonical summary and its
evidence explicitly before changing claims or the frontier. Metadata refresh does
not update this page. See the [research brief](docs/research-program-page.md) and
[claim/QA record](docs/qa/research-program-page.md).

`npm run qa:live-system` checks the new sections, expanded records, preserved
anchors, console/network failures, and no runtime data fetches. The existing
`npm run qa:aetherforge` checks the retained admission instrument.

## Preview

Use Node **22**:

```sh
npm run dev
```

Open `http://127.0.0.1:8000/` or `http://127.0.0.1:8000/case-studies/cipherloop.html`. This preview needs no npm dependencies. Alternatively, `python3 -m http.server 8000 --bind 127.0.0.1` serves the same static files. Neither local server emulates Vercel redirects or cache headers.

Research preview: `http://127.0.0.1:8000/research.html`. Production uses `/research`
through the existing Vercel clean-URL policy; portable preview uses physical paths.

## Reproducible validation

All npm packages are pinned **devDependencies** in `package.json`, with resolved dependencies in `package-lock.json`. From a fresh checkout:

```sh
npm ci
npm run check
npm run qa:install
npm run qa
```

`check` runs Prettier, HTML Validate, internal file/fragment checks, preserved-link/redirect checks, JS syntax checks, data validation, generated-HTML freshness, and updater failure tests. `qa:install` downloads the Chromium revision used by pinned Playwright. On a clean Linux machine, browser system libraries may also be required: `npx playwright install --with-deps chromium` (may require administrator privileges).

`qa` starts its own local-only server on port **4173**, runs checks, saves screenshots/results to ignored `test-results/portfolio/`, and closes its browser/server. It covers desktop/mobile layout, axe scans, keyboard skip-link focus, fragment/history navigation, case-study links, reduced motion, no-JS, missing observer, blocked fonts/images, and enlarged text. These checks do not replace a screen-reader, cross-browser, or hosted assessment.

Optional overrides:

```sh
CHROME_PATH=/usr/bin/google-chrome npm run qa
PORTFOLIO_BASE_URL=http://127.0.0.1:8000 npm run qa
PORTFOLIO_QA_OUTPUT=/tmp/portfolio-review npm run qa
PORTFOLIO_QA_PAGE=research npm run qa
```

`CHROME_PATH` uses an existing browser and is less reproducible than pinned Chromium. `PORTFOLIO_BASE_URL` skips server startup and expects the local physical `.html` routes. `PLAYWRIGHT_BROWSERS_PATH` may point at a writable custom browser directory; use the same value during install and QA. Use the separate hosted check documented in [DEPLOY.md](DEPLOY.md) for real Vercel behavior.

`PORTFOLIO_QA_PAGE` optionally limits an iteration to one page label (`research`,
`home`, `case`, `shadow`). Default QA still covers every page. Research coverage
adds the complete argument in no-JS/offline modes, contents navigation, both home
return paths, 200% text and evidence/frontier structure. Final verification uses
the default full suite.

CI uses `npm ci`, the same validation/browser commands, and uploads review artifacts. No build output is generated. Google Fonts remains external with optional display and system fallbacks; no analytics or trackers are added.

## Evidence and release review

- [CipherLoop demonstration and exact environment](docs/evidence/cipherloop/demonstration.md)
- [Source-backed milestone review](docs/qa/cipherloop/report.md)
- [Deployment and cache behavior](DEPLOY.md)

Current canonical host: [www.jaysystems.dev](https://www.jaysystems.dev/). Contact: [datawizardpros@gmail.com](mailto:datawizardpros@gmail.com) · [GitHub](https://github.com/jayjz). MIT license.

## Hireability verification

See [local implementation and QA](docs/qa/hireability-2026-09-14.md). Browser coverage includes all three pages at 320, 390, 768, 1280, and 1440 pixels, with timeline reflow and 200% text modes. The new SHAD0W route is listed in the hosted checker for verification after a separately authorized deployment. HVAC Ops remains in legacy redirects but is no longer featured.
