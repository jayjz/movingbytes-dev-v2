const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { load, validateProjects, validateResearch, validateActivity, validateConfig } = require('./lib/portfolio-data.cjs');
const { render } = require('./lib/render-portfolio.cjs');
const { refresh, request } = require('./update-activity.cjs');
const baseline = load();
const clone = value => structuredClone(value);
const jsonResponse = body => new Response(JSON.stringify(body), { headers: { 'content-type': 'application/json' } });
function fakeFetch(change = () => {}) {
    const calls = [];
    const fetcher = async (url, options) => {
        calls.push(url);
        assert.equal(options.redirect, 'error');
        assert.ok(options.signal instanceof AbortSignal);
        assert.equal(options.headers.Authorization, undefined);
        const slug = new URL(url).pathname.split('/').slice(2, 4).join('/');
        let body = url.includes('/commits/')
            ? { sha: 'a'.repeat(40), commit: { message: 'MUST NOT BECOME COPY' } }
            : {
                  full_name: slug,
                  private: false,
                  visibility: 'public',
                  html_url: `https://github.com/${slug}`,
                  default_branch: 'main',
                  pushed_at: '2026-09-20T00:00:00Z',
                  archived: false,
                  description: 'MUST NOT BECOME COPY'
              };
        body = change(body, calls.length) || body;
        return jsonResponse(body);
    };
    return { fetcher, calls };
}
async function fixture(t) {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'portfolio-data-'));
    await fs.cp('data', path.join(root, 'data'), { recursive: true });
    t.after(() => fs.rm(root, { recursive: true, force: true }));
    return root;
}
test('curated registry and relationships are valid; rendering is deterministic and escaped', () => {
    assert.deepEqual(render(baseline), render(clone(baseline)));
    const data = clone(baseline);
    data.research.thesis.name = '<script>alert("bad")</script>';
    assert.ok(render(data).focus.includes('&lt;script&gt;'));
    assert.ok(!render(data).focus.includes('<script>'));
    for (const state of ['experimental', 'implemented', 'verified', 'historical', 'unverified'])
        assert.ok(render(data).system.includes(`state-${state}`));
});
test('reject unknown fields, dangling references, unsafe links and invalid maturity', () => {
    const p = clone(baseline.projects);
    p.projects[0].status = 'production-ready';
    assert.throws(() => validateProjects(p));
    p.projects[0] = clone(baseline.projects.projects[0]);
    p.projects[0].evidence[0].url = 'javascript:alert(1)';
    assert.throws(() => validateProjects(p));
    const r = clone(baseline.research);
    r.relationships[0].to = 'missing';
    assert.throws(() => validateResearch(r, baseline.projects));
    const c = clone(baseline.config);
    c.repositories.push('jayjz/not-registered');
    assert.throws(() => validateConfig(c, baseline.projects));
    const a = { version: 1, generatedAt: null, repositories: [], secret: 'no' };
    assert.throws(() => validateActivity(a, baseline.config));
});
test('private records cannot expose repository identifiers or enter output/allowlist', () => {
    const p = clone(baseline.projects);
    const record = p.projects[0];
    record.visibility = 'private';
    assert.throws(() => validateProjects(p));
    record.repository = null;
    record.revision = null;
    record.evidence = [];
    validateProjects(p);
    assert.throws(() => validateConfig(baseline.config, p));
    assert.throws(() => validateResearch(baseline.research, p));
});
test('successful refresh is bounded, allowlisted, deterministic and writes metadata only', async t => {
    const root = await fixture(t);
    const fake = fakeFetch();
    const now = () => '2026-10-03T12:00:00.000Z';
    const snapshot = await refresh({ root, fetcher: fake.fetcher, now });
    assert.equal(fake.calls.length, baseline.config.repositories.length * 2);
    assert.deepEqual(
        snapshot.repositories.map(r => r.slug),
        baseline.config.repositories
    );
    const first = await fs.readFile(path.join(root, 'data/activity.json'), 'utf8');
    assert.ok(!first.includes('MUST NOT BECOME COPY'));
    await refresh({ root, fetcher: fakeFetch().fetcher, now });
    assert.equal(await fs.readFile(path.join(root, 'data/activity.json'), 'utf8'), first);
});
for (const scenario of [
    'offline',
    'timeout',
    'rate-limit',
    'malformed-json',
    'private',
    'identity',
    'missing-sha',
    'invalid-date',
    'oversized',
    'partial-failure'
]) {
    test(`refresh preserves previous valid snapshot byte-for-byte: ${scenario}`, async t => {
        const root = await fixture(t);
        await refresh({ root, fetcher: fakeFetch().fetcher, now: () => '2026-10-03T12:00:00.000Z' });
        const target = path.join(root, 'data/activity.json');
        const before = await fs.readFile(target, 'utf8');
        let fetcher;
        if (scenario === 'offline')
            fetcher = async () => {
                throw new Error('Network unavailable');
            };
        if (scenario === 'timeout')
            fetcher = async () => {
                throw new DOMException('Deadline', 'TimeoutError');
            };
        if (scenario === 'rate-limit') fetcher = async () => new Response('{}', { status: 403 });
        if (scenario === 'malformed-json') fetcher = async () => new Response('{bad', { headers: { 'content-type': 'application/json' } });
        if (scenario === 'oversized') fetcher = async () => jsonResponse({ payload: 'a'.repeat(262145) });
        if (!fetcher)
            fetcher = fakeFetch((body, n) => {
                if (scenario === 'private' && n === 1) body.private = true;
                if (scenario === 'identity' && n === 1) body.full_name = 'jayjz/other';
                if (scenario === 'missing-sha' && n === 2) delete body.sha;
                if (scenario === 'invalid-date' && n === 1) body.pushed_at = '2026-02-30T00:00:00Z';
                if (scenario === 'partial-failure' && n === 4) throw new Error('Later repository failed');
            }).fetcher;
        await assert.rejects(refresh({ root, fetcher, now: () => '2026-10-03T13:00:00.000Z' }));
        assert.equal(await fs.readFile(target, 'utf8'), before);
        assert.deepEqual(
            (await fs.readdir(path.join(root, 'data'))).filter(f => f.endsWith('.tmp')),
            []
        );
    });
}
test('redirect and invalid content type rejected before persistence', async () => {
    await assert.rejects(request('https://api.github.com/repos/jayjz/TEMPER', async () => new Response('', { status: 301 })));
    await assert.rejects(request('https://api.github.com/repos/jayjz/TEMPER', async () => new Response('{}')));
});
test('allowlist changes can replace an older snapshot without fetching removed repositories', async t => {
    const root = await fixture(t);
    const config = clone(baseline.config);
    config.repositories = [config.repositories[0], 'jayjz/fracture'];
    await fs.writeFile(path.join(root, 'data/github.json'), JSON.stringify(config));
    const fake = fakeFetch();
    const snapshot = await refresh({ root, fetcher: fake.fetcher, now: () => '2026-10-03T12:00:00.000Z' });
    assert.deepEqual(
        snapshot.repositories.map(r => r.slug),
        config.repositories
    );
    assert.equal(fake.calls.length, 4);
    load(root);
});
test('first successful refresh can recover a missing or malformed cache; empty snapshot renders offline', async t => {
    const root = await fixture(t);
    const target = path.join(root, 'data/activity.json');
    await fs.writeFile(target, '{bad');
    await refresh({ root, fetcher: fakeFetch().fetcher, now: () => '2026-10-03T12:00:00.000Z' });
    load(root);
    await fs.rm(target);
    await refresh({ root, fetcher: fakeFetch().fetcher, now: () => '2026-10-03T12:00:00.000Z' });
    load(root);
    const data = clone(baseline);
    data.activity = { version: 1, generatedAt: null, repositories: [] };
    validateActivity(data.activity, data.config);
    assert.ok(render(data).system.includes('No successful refresh yet'));
});
