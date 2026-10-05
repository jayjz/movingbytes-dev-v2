const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = process.cwd();
const pages = [
    'index.html',
    'research.html',
    ...fs
        .readdirSync('case-studies')
        .filter(f => f.endsWith('.html'))
        .map(f => `case-studies/${f}`)
];
for (const file of pages) {
    const html = fs.readFileSync(file, 'utf8');
    assert.ok(
        html.includes('<link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any"'),
        `${file}: missing shared Observer favicon`
    );
    for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
        if (/^(https?:|mailto:|data:)/.test(value)) continue;
        const url = new URL(value, `http://local/${file}`);
        const target = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
        assert.ok(fs.existsSync(path.join(root, target)), `${file}: missing ${value}`);
        if (url.hash) {
            const targetHtml = fs.readFileSync(target, 'utf8');
            assert.ok(targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${file}: missing fragment ${value}`);
        }
    }
}
const homepage = fs.readFileSync('index.html', 'utf8');
for (const repo of [
    'CipherLoop',
    'TraceForge',
    'truck-ready-hvac',
    'aetherforge',
    'unhinged-agent',
    'sightglass',
    'SHAD0W',
    'evidence-strategy-skills',
    'fracture'
]) {
    assert.ok(homepage.includes(`href="https://github.com/jayjz/${repo}"`), `Missing source: ${repo}`);
}
assert.ok(homepage.includes('mailto:jay@jaysystems.dev'));
const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
assert.equal(config.cleanUrls, true, '/research depends on the existing cleanUrls mapping');
assert.equal(config.trailingSlash, false);
assert.ok(homepage.includes('href="/research.html"'), 'Homepage research entrance');
const research = fs.readFileSync('research.html', 'utf8');
assert.ok(research.includes('<link rel="canonical" href="https://www.jaysystems.dev/research"'));
assert.ok(research.includes('href="/index.html#work"'), 'Research return to selected work');
assert.ok(!research.includes('<script'), 'Research must remain authored static HTML');
const researchRevision = '393a2ceb7c8372e4e020c81c782af1c12ade96bb';
for (const [, url] of research.matchAll(/href="(https:\/\/github\.com\/jayjz\/machine-native-systems[^\"]*)"/g)) {
    assert.ok(
        url === 'https://github.com/jayjz/machine-native-systems' ||
            url.includes(`/blob/${researchRevision}/`) ||
            url.endsWith(`/commit/${researchRevision}`) ||
            url.endsWith('/commit/2b9a04cf0920b54f7b994e2e2b67b5707d5192e6'),
        `Unreviewed research evidence revision: ${url}`
    );
}
for (const [slug, repo] of [
    ['aetherforge', 'aetherforge'],
    ['unhinged', 'unhinged-agent'],
    ['hvac-ops', 'hvac-ops-agent']
]) {
    for (const suffix of ['', '.html']) {
        assert.ok(
            config.redirects.some(
                r => r.source === `/work/${slug}${suffix}` && r.destination === `https://github.com/jayjz/${repo}` && r.statusCode === 301
            ),
            `Legacy redirect changed: ${slug}${suffix}`
        );
    }
}
console.log('Internal assets/fragments, nine project sources, contact, and legacy redirect definitions: pass');
