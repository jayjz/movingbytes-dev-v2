# jaysystems.dev — deploy

Static site. No build step.

## Local preview

```bash
cd movingbytes-dev-v2
python3 -m http.server 8000
```

## GitHub

Repo: [jayjz/movingbytes-dev-v2](https://github.com/jayjz/movingbytes-dev-v2)

Push to `main`. Vercel deploys from that branch.

## Vercel

Project: `movingbytes-dev-v2`

- Root directory: repository root
- Framework preset: Other
- Build command: none
- Output directory: `.`

Live: [jaysystems.dev](https://jaysystems.dev)

Old `/work/*.html` paths 301 to the matching GitHub repositories. See `vercel.json`.
