# jaysystems.dev — static deployment

Repository: `jayjz/movingbytes-dev-v2`. Vercel project: `movingbytes-dev-v2`.

## Deployment assumptions

- Repository-root project, Framework preset **Other**.
- No build command; output directory `.`.
- `vercel.json` sets **`installCommand: ""`** so development tooling does not introduce a deployment install step. This is the documented static-config override ([Vercel reference](https://vercel.com/docs/project-configuration/vercel-json#installcommand)). Account settings were not accessed or changed; confirm the override in the next authorized deployment log.
- Existing documentation identifies `main` as the deployment branch. Push, merge, and deployment require explicit authorization; local validation does not authorize any of them.

## Public routes and observed canonicalization

Read-only checks on **2026-09-07**, before the source-backed milestone is deployed:

| Request | Observed response |
| --- | --- |
| `https://jaysystems.dev/` | 308 → `https://www.jaysystems.dev/` |
| `https://www.jaysystems.dev/` | 200 HTML |
| `/index.html` | 308 → `/` |
| `/case-studies/cipherloop` | 200 HTML |
| `/case-studies/cipherloop.html` | 308 → `/case-studies/cipherloop` |
| `/case-studies/cipherloop/` | 308 → `/case-studies/cipherloop` |
| `/work/aetherforge` | 301 → `https://github.com/jayjz/aetherforge` |
| `/work/unhinged` | 301 → `https://github.com/jayjz/unhinged-agent` |
| `/work/hvac-ops` | 301 → `https://github.com/jayjz/hvac-ops-agent` |

Each legacy `.html` route first returned a clean-URL 308 to its extensionless form, which returned the GitHub 301. All six explicit redirect definitions are preserved. Do not repurpose `/work/*` without an explicit migration.

Canonical and Open Graph URLs now use the observed `www` host, while source/email links remain unchanged. Internal links retain physical `.html` paths for portable static preview; Vercel canonicalizes them. The case-study route and previous assets remain available.

## Cache correction in this proposed diff

Hosted `/css/style.css`, `/js/main.js`, and the original SVG returned **`public, max-age=31536000, immutable`** despite stable filenames. [Captured responses](docs/qa/cipherloop/hosted-before.json) establish the stale-client risk.

The relevant asset header now requests **`public, max-age=0, must-revalidate`**. This allows browser reuse with validation rather than pinning mutable bytes for a year. ETags permit conditional validation. Existing global security headers, clean URLs, trailing-slash policy and redirects are unchanged.

Old cached responses cannot be retroactively invalidated by a new header. Both pages therefore reference shared CSS/JS with the one-time version query **`?v=20260907-evidence`**. The source-derived diagrams use new filenames. This gives existing clients fresh asset URLs without a bundler or renaming/removing old public paths. After the header is deployed and verified, routine edits can use revalidation; retain this query value rather than generating a new one for every change. If immutable caching is reintroduced later, use reliably versioned content URLs with an explicit release policy.

The corrected header and query behavior are **not yet verified on a deployment containing this diff**. After a separately authorized release, check the new query URLs, their revalidation headers and conditional responses. A hard reload is not an adequate test of a returning visitor with a cached old asset.

## Local and hosted checks

```sh
npm ci
npm run check
npm run qa:install
npm run qa
npm run dev
```

Local preview: `http://127.0.0.1:8000/` and `/case-studies/cipherloop.html`. Browser QA starts its own server, so it can run without `npm run dev`.

Read-only live verification (requires internet, does not deploy):

```sh
node scripts/check-hosted.cjs
```

Results go to ignored `test-results/hosted.json`. The script records both canonical and asset-query variants and every legacy route, without following redirects to external repositories. Compare the output against this table and the intended cache policy; the pre-release output cannot validate undeployed changes.

Before release, review the diff and [QA report](docs/qa/cipherloop/report.md). After release, rerun hosted checks and update the dated record. Never publish private source snapshots, `.env`, credentials, or raw sensitive audit traces in the static output.
