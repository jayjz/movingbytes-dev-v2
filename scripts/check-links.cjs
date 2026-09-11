const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = process.cwd();
const pages = [
    'index.html',
    ...fs
        .readdirSync('case-studies')
        .filter(f => f.endsWith('.html'))
        .map(f => `case-studies/${f}`)
];
for (const file of pages) {
    const html = fs.readFileSync(file, 'utf8');
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
    'hvac-ops-agent',
    'fracture'
]) {
    assert.ok(homepage.includes(`href="https://github.com/jayjz/${repo}"`), `Missing source: ${repo}`);
}
assert.ok(homepage.includes('mailto:jay@jaysystems.dev'));
const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
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
console.log('Internal assets/fragments, eight project sources, contact, and legacy redirect definitions: pass');
