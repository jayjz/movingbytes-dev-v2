# CipherLoop source-backed study — milestone plan

Portfolio baseline: `d9d72b97599f1147700565f4f5e38dc0215347e1`.
Source baseline: `jayjz/CipherLoop` at `f03a1e186e491cf24aa0f0e0671cac766c1fa8ab`, clean local checkout matching remote HEAD on 2026-09-07.

1. Inspect source, tests, fixtures, configuration and specifications. Compare the supporting Repomix against Git; record code/documentation discrepancies. Do not edit CipherLoop.
2. Install the archived source's declared development dependencies into `/tmp/cipherloop-evidence/venv`. Run unchanged tests with dummy configuration and disabled outbound network. Record exact environment and results, including evidence gaps. Use only static fixtures; no live LLM/Docker run is necessary.
3. Update `docs/project-evidence.md` and add a bounded demonstration record under this directory. Map claims to immutable source links. Document limitations separately from implemented/tested behavior.
4. Replace the editorial CipherLoop page and its shared conceptual SVG with a source-derived narrative and diagram. Change only the homepage flagship summary, relevant case-study styles/navigation, and evidence presentation. Retain all other project links and public routes.
5. Pin development-only npm tools and lock dependencies, make browser setup/server startup repeatable, update CI, README and DEPLOY. Inspect hosted canonicalization and caching; change only justified host/cache configuration or metadata, preserving all redirects.
6. Run validators, link checks, browser accessibility and resilience checks; inspect desktop/mobile captures. Record results and outstanding source/hosting limitations. Do not push, merge or deploy.
