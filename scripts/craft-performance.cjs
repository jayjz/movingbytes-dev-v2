// Temporary Lighthouse installation is supplied by path; no project dependency.
const fs = require('node:fs');
const { spawnSync } = require('node:child_process');
const assert = require('node:assert/strict');
const label = process.argv[2];
assert.match(label || '', /^(before|after)$/);
const cli = process.env.LIGHTHOUSE_CLI;
assert.ok(cli, 'Set LIGHTHOUSE_CLI to a temporary Lighthouse 13.0.1 CLI installation');
const out = `docs/qa/visual-craft/${label}`;
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync(`test-results/craft-performance/${label}`, { recursive: true });
const reports = [];
for (const [route, name] of [
    ['/', 'home'],
    ['/work/', 'library']
]) {
    for (const profile of ['mobile', 'desktop']) {
        for (let run = 1; run <= 3; run++) {
            const file = `test-results/craft-performance/${label}/${name}-${profile}-${run}.json`;
            const result = spawnSync(
                process.execPath,
                [
                    cli,
                    (process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:8000') + route,
                    '--quiet',
                    '--only-categories=performance,accessibility',
                    '--output=json',
                    `--output-path=${file}`,
                    '--chrome-flags=--headless --no-sandbox',
                    ...(profile === 'desktop' ? ['--preset=desktop'] : [])
                ],
                { env: process.env, encoding: 'utf8', timeout: 180000 }
            );
            assert.equal(result.status, 0, result.stderr || result.error?.message);
            const r = JSON.parse(fs.readFileSync(file));
            assert.ok(!r.runtimeError, JSON.stringify(r.runtimeError));
            const a = r.audits;
            reports.push({
                name,
                profile,
                run,
                lighthouse: r.lighthouseVersion,
                userAgent: r.userAgent,
                settings: r.configSettings,
                fetched: r.fetchTime,
                performance: r.categories.performance.score * 100,
                accessibility: r.categories.accessibility.score * 100,
                lcpMs: a['largest-contentful-paint'].numericValue,
                cls: a['cumulative-layout-shift'].numericValue,
                tbtMs: a['total-blocking-time'].numericValue,
                bytes: a['total-byte-weight'].numericValue,
                requests: a['network-requests'].details.items.length,
                assets: a['resource-summary'].details.items,
                failedAccessibility: r.categories.accessibility.auditRefs.filter(ref => a[ref.id].score === 0).map(ref => ref.id),
                networkErrors: a['network-requests'].details.items
                    .filter(item => item.statusCode >= 400 || item.statusCode === -1)
                    .map(item => ({ url: item.url, status: item.statusCode })),
                warnings: r.runWarnings
            });
            fs.writeFileSync(
                `${out}/lighthouse.json`,
                JSON.stringify({ fieldINP: 'unavailable; lab TBT is not INP', reports }, null, 2) + '\n'
            );
            console.log(
                `${label}/${name}/${profile}/${run}: performance ${reports.at(-1).performance}, LCP ${Math.round(reports.at(-1).lcpMs)}ms`
            );
        }
    }
}
if (label === 'after') {
    const before = JSON.parse(fs.readFileSync('docs/qa/visual-craft/before/lighthouse.json')).reports;
    const median = values => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
    const metrics = ['performance', 'accessibility', 'lcpMs', 'cls', 'tbtMs', 'bytes', 'requests'];
    const comparison = [];
    for (const name of ['home', 'library']) {
        for (const profile of ['mobile', 'desktop']) {
            const b = before.filter(r => r.name === name && r.profile === profile);
            const a = reports.filter(r => r.name === name && r.profile === profile);
            assert.equal(b.length, 3);
            assert.equal(a.length, 3);
            const baseline = Object.fromEntries(metrics.map(key => [key, median(b.map(r => r[key]))]));
            const candidate = Object.fromEntries(metrics.map(key => [key, median(a.map(r => r[key]))]));
            const delta = Object.fromEntries(metrics.map(key => [key, candidate[key] - baseline[key]]));
            const flags = [];
            if (delta.lcpMs > Math.max(baseline.lcpMs * 0.1, 100)) flags.push('LCP regression');
            if (delta.cls > 0.02) flags.push('CLS regression');
            if (delta.performance < -5) flags.push('Performance score regression');
            if (a.some(r => r.accessibility < baseline.accessibility)) flags.push('Accessibility regression');
            if (candidate.bytes > baseline.bytes * 1.1) flags.push('Transfer weight regression');
            comparison.push({ name, profile, baseline, candidate, delta, flags });
        }
    }
    fs.writeFileSync('docs/qa/visual-craft/performance-comparison.json', JSON.stringify(comparison, null, 2) + '\n');
    console.log(JSON.stringify(comparison, null, 2));
}
