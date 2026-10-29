// Frozen pre-migration inventory and preservation checks. No network access.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const { execFileSync } = require('node:child_process');
const inventoryPath = 'docs/systems-library-inventory.json';
const baseline = '9fdd021a499d7a8e76d3522d66d9b6579116b50e';
const digest = text => createHash('sha256').update(text.replace(/\r\n/g, '\n').replace(/\s+/g, ' ').trim()).digest('hex');
function element(html, id) {
    const start = new RegExp(`<([a-z][a-z0-9-]*)\\b[^>]*\\bid="${id}"[^>]*>`, 'i').exec(html);
    assert.ok(start, `Missing element: ${id}`);
    const tags = new RegExp(`</?${start[1]}\\b[^>]*>`, 'gi');
    tags.lastIndex = start.index;
    let depth = 0;
    for (let tag; (tag = tags.exec(html));) {
        depth += tag[0].startsWith('</') ? -1 : 1;
        if (depth === 0) return html.slice(start.index, tags.lastIndex);
    }
    throw new Error(`Unclosed element: ${id}`);
}
const links = html => [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1]);
const ids = html => [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
function topSections(html) {
    const main = element(html, 'main');
    const result = [];
    let depth = 0;
    for (const match of main.matchAll(/<\/?section\b[^>]*>/g)) {
        if (match[0].startsWith('</')) depth--;
        else {
            if (depth === 0) result.push(/\bid="([^"]+)"/.exec(match[0])?.[1] || /aria-labelledby="([^"]+)"/.exec(match[0])?.[1]);
            depth++;
        }
    }
    return result;
}
if (process.argv.includes('--capture')) {
    assert.equal(execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), baseline, 'Capture only the frozen baseline');
    assert.ok(!fs.existsSync(inventoryPath), 'Never overwrite the preservation inventory');
    const html = fs.readFileSync('index.html', 'utf8');
    const boundary = html.indexOf('<section id="work"');
    const end = html.indexOf('</main>');
    const archive = html.slice(boundary, end);
    const protectedIds = ['top', 'about', 'now', 'curiosity', 'principles', 'contact'];
    const inventory = {
        baseline,
        mainBaseline: '41d7e49',
        authoredDependency: 'https://github.com/jayjz/movingbytes-dev-v2/pull/22',
        authoredOriginalHead: '310bb69acba54bf69e236dad8c15610729f1b565',
        topSections: topSections(html),
        fragments: ids(html).map(id => ({
            id,
            destination: archive.includes(`id="${id}"`) ? `work/evidence.html#${id}` : `index.html#${id}`
        })),
        links: [...new Set(links(html))],
        archiveLinks: [...new Set(links(archive))],
        archiveTextHash: digest(archive.replace(/<[^>]*>/g, ' ')),
        revisionPins: [...new Set([...html.matchAll(/\/(?:blob|commit)\/([a-f0-9]{40})/g)].map(m => m[1]))],
        generatedSlots: [...html.matchAll(/<!-- portfolio:([^:]+):start -->/g)].map(m => m[1]),
        instruments: ['#curiosity .threshold-instrument', '#aetherforge .af-selector'],
        protected: Object.fromEntries(protectedIds.map(id => [id, digest(element(html, id))])),
        caseStudies: Object.fromEntries(
            ['case-studies/cipherloop.html', 'case-studies/shadow.html', 'research.html'].map(file => [
                file,
                digest(fs.readFileSync(file, 'utf8'))
            ])
        ),
        accessibilityContracts: [
            'scripts/portfolio-qa.cjs',
            'scripts/aetherforge-qa.cjs',
            'scripts/live-system-qa.cjs',
            'scripts/check-links.cjs',
            'scripts/portfolio-data.test.cjs'
        ]
    };
    fs.writeFileSync(inventoryPath, JSON.stringify(inventory, null, 4) + '\n');
    console.log(
        `Captured ${inventory.fragments.length} fragments, ${inventory.links.length} URLs, ${inventory.revisionPins.length} revision pins, ${inventory.topSections.length} homepage sections.`
    );
} else {
    const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
    const home = fs.readFileSync('index.html', 'utf8');
    const evidence = fs.readFileSync('work/evidence.html', 'utf8');
    const files = { 'index.html': home, 'work/evidence.html': evidence };
    const library = fs.readFileSync('work/index.html', 'utf8');
    for (const [file, html] of Object.entries({ ...files, 'work/index.html': library }))
        assert.equal(new Set(ids(html)).size, ids(html).length, `Duplicate IDs: ${file}`);
    for (const { id, destination } of inventory.fragments) {
        const file = destination.split('#')[0];
        assert.ok(ids(files[file]).includes(id), `Lost fragment ${id}: ${destination}`);
        if (file !== 'index.html') {
            const compatibility = element(home, id);
            assert.ok(links(compatibility).includes('/' + destination), `Missing exact native compatibility link: ${id}`);
        }
    }
    for (const [id, hash] of Object.entries(inventory.protected))
        assert.equal(digest(element(home, id)), hash, `Protected authored material changed: ${id}`);
    for (const [file, hash] of Object.entries(inventory.caseStudies))
        assert.equal(digest(fs.readFileSync(file, 'utf8')), hash, `Existing study changed: ${file}`);
    for (const url of inventory.archiveLinks) {
        const migrated = /^(?:https?:|mailto:|#|\/)/.test(url) ? url : '/' + url;
        assert.ok(links(evidence).includes(migrated), `Lost archive URL: ${url}`);
    }
    const normalize = url => (/^(?:https?:|mailto:|#|\/)/.test(url) ? url : '/' + url);
    const currentLinks = links(home + evidence).map(normalize);
    for (const url of inventory.links) assert.ok(currentLinks.includes(normalize(url)), `Lost original URL: ${url}`);
    for (const revision of inventory.revisionPins)
        assert.ok((home + evidence).includes(revision), `Lost original revision pin: ${revision}`);
    const archive = evidence.slice(evidence.indexOf('<section id="work"'), evidence.indexOf('</main>'));
    assert.equal(digest(archive.replace(/<[^>]*>/g, ' ')), inventory.archiveTextHash, 'Archive text changed during relocation');
    for (const name of inventory.generatedSlots) {
        assert.equal(
            [...`${home}${evidence}${library}`.matchAll(new RegExp(`<!-- portfolio:${name}:start -->`, 'g'))].length,
            1,
            `Duplicate or missing generated slot: ${name}`
        );
    }
    assert.equal((home.match(/class="threshold-instrument"/g) || []).length, 1);
    assert.ok(!home.includes('af-instrument'), 'AetherForge must live in the library');
    console.log(
        `Preserved ${inventory.fragments.length} fragments, all archive URLs/text, protected content, studies and unique generated slots. Homepage sections: ${inventory.topSections.length} → ${topSections(home).length}.`
    );
}
module.exports = { element, topSections };
