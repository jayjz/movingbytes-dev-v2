# jaysystems.dev — Systems Observatory

Jay's engineering portfolio: AI systems, constrained compute, security tooling, and field software. Handwritten HTML, shared CSS, small progressive-enhancement JavaScript, and original SVG diagrams. **No framework, runtime npm dependencies, or application build step.**

## Pages and files

- `index.html`: hero, featured CipherLoop study, all six project source links, perspective, and contact.
- `case-studies/cipherloop.html`: source-backed engineering narrative; public clean URL `/case-studies/cipherloop`.
- `css/style.css`, `js/main.js`: shared visual foundation and optional, reduced-motion-aware figure accent. Native anchors and all essential content work without JavaScript.
- `assets/diagrams/`: original SVGs. Current CipherLoop diagrams derive from recorded source; the previous conceptual asset remains available for existing links.
- `docs/project-evidence.md`: immutable source permalinks, claim scope, results, and publication decisions.
- `docs/evidence/cipherloop/`: deterministic demonstration, sanitized test output, dependency record, and offline boundary probes. No source checkout, secrets, or raw audit traces are included.
- `scripts/`: development-only preview, static link validation, browser checks, and read-only hosted-response inspection.

CipherLoop is an **experimental framework**. Its case study distinguishes inspected implementation, deterministic mocked integration tests, and live behavior that has not been evaluated. Other projects retain snapshot-scoped descriptions; this milestone does not verify all six repositories.

| Project | Source |
| --- | --- |
| CipherLoop | [jayjz/CipherLoop](https://github.com/jayjz/CipherLoop) |
| Truck-Ready HVAC | [jayjz/truck-ready-hvac](https://github.com/jayjz/truck-ready-hvac) |
| AetherForge | [jayjz/aetherforge](https://github.com/jayjz/aetherforge) |
| Unhinged Agent | [jayjz/unhinged-agent](https://github.com/jayjz/unhinged-agent) |
| HVAC Ops | [jayjz/hvac-ops-agent](https://github.com/jayjz/hvac-ops-agent) |
| Fracture | [jayjz/fracture](https://github.com/jayjz/fracture) |

## Preview

Use Node **22**:

```sh
npm run dev
```

Open `http://127.0.0.1:8000/` or `http://127.0.0.1:8000/case-studies/cipherloop.html`. This preview needs no npm dependencies. Alternatively, `python3 -m http.server 8000 --bind 127.0.0.1` serves the same static files. Neither local server emulates Vercel redirects or cache headers.

## Reproducible validation

All npm packages are pinned **devDependencies** in `package.json`, with resolved dependencies in `package-lock.json`. From a fresh checkout:

```sh
npm ci
npm run check
npm run qa:install
npm run qa
```

`check` runs Prettier, HTML Validate, internal file/fragment checks, preserved-link/redirect checks, and JS syntax checks. `qa:install` downloads the Chromium revision used by pinned Playwright. On a clean Linux machine, browser system libraries may also be required: `npx playwright install --with-deps chromium` (may require administrator privileges).

`qa` starts its own local-only server on port **4173**, runs checks, saves screenshots/results to ignored `test-results/portfolio/`, and closes its browser/server. It covers desktop/mobile layout, axe scans, keyboard skip-link focus, fragment/history navigation, case-study links, reduced motion, no-JS, missing observer, blocked fonts/images, and enlarged text. These checks do not replace a screen-reader, cross-browser, or hosted assessment.

Optional overrides:

```sh
CHROME_PATH=/usr/bin/google-chrome npm run qa
PORTFOLIO_BASE_URL=http://127.0.0.1:8000 npm run qa
PORTFOLIO_QA_OUTPUT=/tmp/portfolio-review npm run qa
```

`CHROME_PATH` uses an existing browser and is less reproducible than pinned Chromium. `PORTFOLIO_BASE_URL` skips server startup and expects the local physical `.html` routes. `PLAYWRIGHT_BROWSERS_PATH` may point at a writable custom browser directory; use the same value during install and QA. Use the separate hosted check documented in [DEPLOY.md](DEPLOY.md) for real Vercel behavior.

CI uses `npm ci`, the same validation/browser commands, and uploads review artifacts. No build output is generated. Google Fonts remains external with optional display and system fallbacks; no analytics or trackers are added.

## Evidence and release review

- [CipherLoop demonstration and exact environment](docs/evidence/cipherloop/demonstration.md)
- [Source-backed milestone review](docs/qa/cipherloop/report.md)
- [Deployment and cache behavior](DEPLOY.md)

Current canonical host: [www.jaysystems.dev](https://www.jaysystems.dev/). Contact: [jay@jaysystems.dev](mailto:jay@jaysystems.dev) · [GitHub](https://github.com/jayjz). MIT license.
