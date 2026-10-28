# jaysystems.dev — static deployment

Repository: `jayjz/movingbytes-dev-v2`. Vercel project: `movingbytes-dev-v2`.

## Deployment assumptions

- Repository-root project, Framework preset **Other**.
- No build command; output directory `.`.
- `vercel.json` sets **`installCommand: ""`** so development tooling does not introduce a deployment install step. This is the documented static-config override ([Vercel reference](https://vercel.com/docs/project-configuration/vercel-json#installcommand)). Account settings were not accessed or changed; confirm the override in the next authorized deployment log.
- **Verified 2026-10-28:** Vercel project `movingbytes-dev-v2` production deployment metadata identifies GitHub repository `jayjz/movingbytes-dev-v2`, branch `main`, and commit `521568014f8de9a846858b4e88e4731db5b34922` (deployment `dpl_M9vdFMBSoKws5sVjGo28uLHN69ki`, state `READY`). Attached domains include `jaysystems.dev` and `www.jaysystems.dev`. Project metadata separately reports `live: false`, so this verification does not establish public reachability. Push, merge, promotion and production deployment require explicit authorization.

## Public routes and observed canonicalization

The following table is historical observation from September 2026, **not a current live recheck**. Run the hosted checker after any authorized production release before treating these responses as current.

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

### Research page addition — 2026-10-05

`research.html` declares canonical and OG URL `https://www.jaysystems.dev/research`.
The unchanged `cleanUrls: true` maps the physical page to `/research`; under the
[documented Vercel policy](https://vercel.com/docs/project-configuration/vercel-json#cleanurls),
`/research.html` should 308 to `/research`. Existing `trailingSlash: false` should
canonicalize `/research/` as well. Internal links use `/research.html` for portable
preview, which does not emulate those redirects.

No deployment configuration was changed for the October research-page work. The hosted checker includes all
three research route variants, its stylesheet and the favicon for the next
authorized release review. These new hosted responses are not yet verified;
local success and configuration inspection do not establish deployed behavior.

## Historical cache correction (September 2026)

Hosted `/css/style.css`, `/js/main.js`, and the original SVG returned **`public, max-age=31536000, immutable`** despite stable filenames. [Captured responses](docs/qa/cipherloop/hosted-before.json) establish the stale-client risk.

The relevant asset header now requests **`public, max-age=0, must-revalidate`**. This allows browser reuse with validation rather than pinning mutable bytes for a year. ETags permit conditional validation. Existing global security headers, clean URLs, trailing-slash policy and redirects are unchanged.

Old cached responses cannot be retroactively invalidated by a new header. Both pages therefore reference shared CSS/JS with the one-time version query **`?v=20260907-evidence`**. The source-derived diagrams use new filenames. This gives existing clients fresh asset URLs without a bundler or renaming/removing old public paths. After the header is deployed and verified, routine edits can use revalidation; retain this query value rather than generating a new one for every change. If immutable caching is reintroduced later, use reliably versioned content URLs with an explicit release policy.

The original September record stated that corrected headers and query behavior were not yet verified. This document has not rechecked their present production behavior; run `node scripts/check-hosted.cjs` against the live site to establish current responses. After a separately authorized release, check the new query URLs, their revalidation headers and conditional responses. A hard reload is not an adequate test of a returning visitor with a cached old asset.

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
