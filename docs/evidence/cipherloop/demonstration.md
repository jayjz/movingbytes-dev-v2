# CipherLoop — deterministic evidence path

## Revision and environment

- Repository: `https://github.com/jayjz/CipherLoop.git`.
- Exact source commit: `f03a1e186e491cf24aa0f0e0671cac766c1fa8ab` (commit subject: `docs: update README to reflect AST validator, crash fallback, and telemetry`).
- Inspected 2026-09-07. The separate local source checkout was clean; `git ls-remote origin HEAD` returned the same SHA. Tests ran against a `git archive` export in `/tmp/cipherloop-evidence/source`, not against an assumed Repomix copy or mutable application tree.
- Supporting Repomix found at the source checkout's `repomix-output.xml`; SHA-256 `d2ba56da523baa8560011c85e13f16304120a45233e9f399be319409efcd944e`. Compared 35 source/test/fixture/spec/config text entries to Git: 34 matched with trailing whitespace ignored; README differed only in leading/trailing whitespace. This is a scoped comparison, not a claim that all snapshot content or working-tree files are identical. The packed source itself is not copied into this portfolio.
- Linux, Python **3.12.3**, pytest **9.1.1**, pluggy **1.6.0**; observed plugins langsmith **0.12.2**, anyio **4.15.1**. CipherLoop package **0.1.0**. LangGraph **1.2.11**, langchain-core **1.6.2**, Pydantic **2.13.5**, Docker SDK **7.2.0**. Complete observed installed dependencies: [python-dependencies.txt](python-dependencies.txt).
- Isolated virtual environment, project installed from the archive with its declared `[dev]` extra. CipherLoop declares minimum dependency versions, not a lockfile. Build isolation resolved its build backend separately; the observed freeze is an environment record, not an upstream lock or a hash-verified supply-chain artifact.
- The initial sandboxed dependency installation failed because network resolution was unavailable. Authorized dependency download then succeeded. Tests ran back inside the restricted environment with a minimal environment, dotenv disabled, and tracing disabled. No cloud credentials were read or supplied; tests construct dummy configuration internally. No live model requests, Docker runs, real scanners, exposed fixture web server, or generated host shell command was used.

## Existing suite: actual result

```text
python -m pytest -v -p no:cacheprovider tests
20 passed in 2.32s
exit status: 0
```

[Full captured output](pytest.txt). The displayed duration is the test runner's observed duration, not an audit-performance benchmark.

| Existing tests | Count | What actually ran | What it does not establish |
| --- | ---: | --- | --- |
| Compressor | 3 | Ranking ERROR before WARNING; character clipping; returned removal IDs | Full graph sweep, a live scanner, repeated-batch bounds, model context quality |
| Configuration | 5 | Missing-config rejection and provider-object construction | Credentials, provider availability, live model behavior |
| Positive/negative graph | 2 | Compiled graph routing, real AST validator, fixture text; real negative synthesis branch | ToolNode execution, Semgrep discovery, real compressor, cloud/Ollama, Docker; positive synthesis is mocked |
| Scanner wrapper | 4 | Mocked successful primary, primary exception/timeout, fallback exception; JSON result contract | Actual Semgrep/ripgrep coverage, implemented runtime timeout, fallback-to-compressor compatibility |
| Sandbox identity | 2 | Mocked Docker commands for reuse and replacement; expected read-only/network-none arguments | Running container invariants, symlink confinement, escape resistance, resource limits |
| Trajectory metadata | 1 | JSON metadata aggregation with supplied 120+80 and 30+20 counts → ratio 4.0 | Measured token savings, real trace replay, durable complete recording |
| Validator | 3 | Request-source variable flow to subprocess; constant-input rejection; finding shape | General correctness, alias resolution, sanitizers, all supported source/sink combinations |

The two fixture tests were also run alone in a fresh Python process, positive then negative, to check that the demonstration does not depend on the full suite's import order. [Actual pair output](fixture-tests.txt).

## One bounded demonstration

The vulnerable fixture is **read as text**, never served or executed. The graph test injects `[ERROR] app.py:10 - Command injection` through a mocked compressor. Its validator's file boundary is replaced with the real fixture contents. The real AST analysis traces:

```text
app.py:8:request.args.get
→ app.py:8:ip
→ app.py:10:subprocess.run
```

The positive graph test asserts exactly one internal `VERIFIED` result with those source/sink symbols and a report mentioning command injection. Its planner, local model, compressor, file-read boundary, and synthesizer are mocked. The local model returns no tool calls, so the sandbox-tools branch is bypassed.

The negative graph test injects a candidate at `app.py:11` in the safe fixture, whose subprocess command is a constant list. The real validator finds no recognized untrusted-source flow. The real synthesizer's empty-findings branch returns its fixed “No verified high-confidence vulnerabilities were found” text without invoking a model. Planner, local model, compressor, and file reads are still mocked. This is rejection of that fixture, not proof that the repository is safe or that sanitizers are understood.

Immutable source and test links are in [the claim ledger](../../project-evidence.md#cipherloop-source-backed-milestone--current-claim-ledger). No fabricated trace/dashboard is used. The path above comes from the actual AST probe result in [boundary-probe.json](boundary-probe.json).

## Additional offline boundary probes

[boundary-probe.py](boundary-probe.py) is a small portfolio-owned inspection script, separate from the existing CipherLoop tests. It imports the unchanged implementation and reads synthetic source strings/fixtures; it mocks scanner output and the validator's file boundary explicitly. No source code or source tests were changed.

Observed [results](boundary-probe.json):

- Applying the real `add_messages` reducer to the compressor's removal commands takes two active messages to zero. The existing compressor test only checks returned IDs; this probe closes that narrower evidence gap.
- Two `operator.add` batch updates leave two batches. Revalidating the same accumulated candidate emits the same finding ID again; no deduplication is present.
- A real fallback serializer fed one mocked ripgrep match returns one result. The real compressor retains **zero** candidates because no fallback severity is supplied. A structured scanner error is also not preserved by that compressor summary. These are source-project defects to address separately, not fixed here.
- Tainted list arguments with `shell=False` and taint wrapped in `shlex.quote` still match the AST pattern. An aliased sink and a source returned across functions do not match. These outputs demonstrate limits of name-based intra-procedural analysis, not exploitability assessments of the strings.

The first version of this supplementary harness tried to patch a method on a Pydantic tool instance and failed before producing results. The harness was corrected to replace the file-boundary object, matching the existing tests' approach. No upstream tests were changed; the final output is from the successful corrected probe.

## Reproduction

Run from a separate temporary development directory. Download/install steps require internet, but the tests themselves require no live services. Do not copy `.env` or other local files into the source export.

```sh
git clone https://github.com/jayjz/CipherLoop.git /tmp/cipherloop-reproduce
git -C /tmp/cipherloop-reproduce checkout --detach f03a1e186e491cf24aa0f0e0671cac766c1fa8ab
python3.12 -m venv /tmp/cipherloop-reproduce-venv
/tmp/cipherloop-reproduce-venv/bin/python -m pip install -c /absolute/path/to/portfolio/docs/evidence/cipherloop/python-dependencies.txt '/tmp/cipherloop-reproduce[dev]'
cd /tmp/cipherloop-reproduce
env -i PATH=/usr/bin:/bin PYTHON_DOTENV_DISABLED=1 PYTHONDONTWRITEBYTECODE=1 LANGCHAIN_TRACING_V2=false LANGSMITH_TRACING=false /tmp/cipherloop-reproduce-venv/bin/python -m pytest -v -p no:cacheprovider tests
env -i PATH=/usr/bin:/bin PYTHON_DOTENV_DISABLED=1 PYTHONDONTWRITEBYTECODE=1 LANGCHAIN_TRACING_V2=false LANGSMITH_TRACING=false /tmp/cipherloop-reproduce-venv/bin/python -m pytest -v -p no:cacheprovider tests/test_e2e_vulnerable.py tests/test_e2e_safe.py
env -i PATH=/usr/bin:/bin PYTHON_DOTENV_DISABLED=1 PYTHONDONTWRITEBYTECODE=1 /tmp/cipherloop-reproduce-venv/bin/python /absolute/path/to/portfolio/docs/evidence/cipherloop/boundary-probe.py
```

Replace `/absolute/path/to/portfolio` with the portfolio checkout path. Use an outbound-network-disabled environment for test execution when available. The provided dependency constraints reproduce observed installed versions where available; Python/platform/build-backend differences remain explicit environmental limitations.

## Next source-project milestone (not implemented here)

Add an explicit scan outcome contract carrying **complete / partial / failed**, scanner errors and fallback provenance through compression, validation and synthesis. Cover the real fallback → compressor → validator path with offline fixtures; deduplicate accepted findings and preserve evidence references across bounded state updates. Then add a separately authorized, resource/time-limited synthetic Docker integration test that asserts mount and networking invariants, offline rule availability and failure cleanup. Only after that should a bounded live model run become another evidence layer.

## Detailed inspection notes

These are findings from the recorded source, not additional test coverage. Immutable permalinks are in claim ledger entries CL-03–CL-10.

### Exact AST pattern scope

Source calls include the exact name `input`. Other sources use string-prefix matching against `request.args`, `request.form`, `request.values`, `request.json`, `request.get_json`, `sys.argv`, and `os.environ`, on dotted `Name`/`Attribute` expressions or call functions. This is not symbol resolution: a similarly prefixed name can match, and aliased imports are not reconstructed. Subscript expressions are reached through recursive traversal of their children.

The exact sink-name set is `subprocess.run`, `subprocess.call`, `subprocess.check_call`, `subprocess.check_output`, `subprocess.Popen`, `os.system`, `os.popen`, `eval`, and `exec`. Any positional or keyword argument containing recognized taint can match; command position, `shell` flags, execution reachability, and actual imports are not checked.

`Assign` and `AnnAssign` propagate to simple `Name` targets. Assigning a value without detected taint clears a previous name binding. Tuple unpacking, object/attribute storage, and `AugAssign` do not receive equivalent binding logic. Expression-child traversal can follow a tainted name inside an f-string, container, or call; it does not model the semantics of the surrounding operation. Function/async-function bodies are visited with a fresh binding map; parameters, return flows, globals and caller/callee relationships are not propagated across functions. Branches/loops are visited syntactically without a control-flow graph or path feasibility. There is no sanitization allowlist or sanitizer proof.

Only the first discovered trace at the requested sink line is returned. AST syntax errors, file-read exceptions/error text, absent matches, and malformed candidate strings all lead to omission. Candidate parsing uses a leading `[`, the exact delimiters `] ` and ` - `, and the final colon before an all-digit line number. Severity values outside CRITICAL/HIGH/MEDIUM/LOW/INFO become MEDIUM, including Semgrep ERROR/WARNING. The candidate's scanner-provided description becomes its vulnerability class. `evidence_snippet` serializes location references, not a captured source-code slice.

### Compression and recording details

ToolNode updates are reduced through `add_messages` and remain in active state for subsequent local-model calls. The compressor emits `RemoveMessage` for every message ID, not only tools; ID-less messages are skipped outside normal graph reduction. `compressed_findings` and `verified_findings` concatenate; all other fields overwrite. The validator reprocesses accumulated batches and emits already accepted IDs again. There is no bounded total-state invariant.

Semgrep summaries keep only WARNING/ERROR entries, sort ERROR first, and take five. Their serialized summary retains counts, formatted findings and a note, not the entire JSON. Valid JSON with an unexpected schema can raise non-JSONDecodeError exceptions; only malformed JSON decoding has an explicit error summary. Generic summaries retain source text snippets. The >3,000-character branch takes precedence over the 15-line branch, so those are not simultaneous caps.

The recorder's JSONL contains timestamps, run ID, step type and payload. Its calls occur in the compressor for raw tool messages/AI tool-call messages and in the validator for aggregate validation counts. There is no recorder call for every graph state, Markdown reflection write, planner response or synthesis result. Final metadata is written only after normal CLI completion, and it does not include the full final report or accepted finding list. There is no fsync, integrity hash, redaction, encryption, checkpoint restoration, or exception-safe finalization implemented here. The design separates a disk record from active state; it does not demonstrate a transactional write-ahead log.

### Runtime/tool boundary details

The tool-facing functions issue fixed argv lists to `container.exec_run` inside `cipherloop-sandbox`, with workdir `/workspace/target_repo`; there is no generic host-shell execution tool in that interface. Docker SDK and orchestration run on the host. POSIX path normalization replaces backslashes, joins/normalizes the workdir, and checks the lexical workdir prefix. It does not resolve symlinks in the mounted filesystem. Query/path arguments do not consistently have an option-ending `--`. These are boundaries to investigate separately, not demonstrated exploits.

New-container provisioning and Compose request a `:ro` target mount and no container networking. Existing-container reuse checks source and destination only; it does not check `RW`, network settings, image identity, or privilege flags. A fixed container name also couples runs. The Dockerfile uses a Python base with no non-root USER and installs Semgrep, bandit and detect-secrets without pinned versions; only Semgrep and generic shell tools are exposed in the inspected ToolNode. The remote Semgrep presets are not packaged offline. No explicit CPU, memory, PID, tool-duration, or local-loop limit is configured; no stop/remove cleanup runs after the audit. The tests only inspect mocked command construction.

The scanner wrapper tries Semgrep first, then treats prefixed tool errors, invalid JSON, declared crashes, unexpected return codes, populated errors, or exceptions as failures. Fallback uses broad rg patterns; its parser expects `path:line:snippet`. It translates rg exit code 1 into a successful no-match response; other prefixed tool errors raise. The wrapper catches fallback errors and returns a structured error object. Existing tests mock both boundaries, so real output parsing, single-file rg formatting, Docker integration and scanner rule availability remain untested by that suite. The supplemental probe covers one conventional rg-output shape and the missing-severity/error-loss boundary only.

### Completion/configuration details

Cloud clients are constructed when orchestrator nodes are imported. Settings validate the selected Anthropic/OpenAI/xAI model/key; Ollama requires a URL and model but does not restrict the URL to localhost. The local client is created lazily and cached. `.env.example` is configuration intent, not proof that any listed model is available. `Modelfile.coder` is a separate model artifact and does not establish what a real run used. The auxiliary `meta_loop.py` is a development-spec helper, not a node in the audited investigation graph; it was inspected, not executed.

The planner request uses target plus summary counts/accepted metadata, not the incoming high-level CLI plan or previous raw history. It increments `retries` once per planner invocation. Completion routing tests only the current instruction string and that count after validation. The configured dependency has its own graph recursion limit, but CipherLoop does not explicitly set a task budget. No source-level per-tool timeout is configured despite the wrapper's timeout-exception test. Prerequisite checks catch command failures but not missing executables uniformly; model, parsing, Docker, and recorder errors are not represented by a single run outcome contract. Uncaught errors can abort the stream before report/metadata finalization.
