// Browser verification uses the frozen inventory, independently of the static checker.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { spawn } = require('node:child_process');
const inventory = require('../docs/systems-library-inventory.json');
const base = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4204';
const out = process.env.PRESERVATION_QA_OUTPUT || 'test-results/library-preservation';
let browser, preview;
(async () => {
    fs.mkdirSync(out, { recursive: true });
    if (!process.env.PORTFOLIO_BASE_URL) {
        preview = spawn(process.execPath, ['scripts/serve.cjs'], {
            env: { ...process.env, PORT: '4204' },
            stdio: ['ignore', 'pipe', 'pipe']
        });
        await new Promise((resolve, reject) => {
            preview.once('error', reject);
            preview.once('exit', code => reject(new Error(`Preview exited: ${code}`)));
            preview.stdout.once('data', resolve);
        });
    }
    browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
    const results = [];
    for (const javaScriptEnabled of [true, false]) {
        const context = await browser.newContext({ viewport: { width: 390, height: 900 }, javaScriptEnabled, reducedMotion: 'reduce' });
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        for (const { id, destination } of inventory.fragments) {
            await page.goto(`${base}/#${id}`, { waitUntil: 'load' });
            if (destination.startsWith('work/')) {
                if (!javaScriptEnabled || id === 'work') {
                    const onward = page.locator(`#${id} a[href="/${destination}"]`);
                    assert.equal(await onward.isVisible(), true, `Native compatibility link: ${id}`);
                    await onward.focus();
                    assert.equal(await onward.evaluate(el => getComputedStyle(el).outlineStyle), 'solid');
                    await page.keyboard.press('Enter');
                }
                await page.waitForURL(`${base}/${destination}`);
                assert.equal(await page.locator(`[id="${id}"]`).count(), 1);
                assert.equal(await page.locator(`[id="${id}"]`).isVisible(), true, `Visible destination: ${id}, JS ${javaScriptEnabled}`);
                if (javaScriptEnabled && /^af-(?:case-)?(?:baseline|short|thermal|queue)$/.test(id)) {
                    const scenario = id.replace(/^af-(?:case-)?/, '');
                    assert.equal(await page.locator(`#af-${scenario}`).isChecked(), true);
                    assert.equal(await page.locator('.af-case:visible').count(), 1);
                    // A permalink must not trap subsequent native radio interaction.
                    await page.locator('label:has(#af-queue)').click();
                    assert.equal(await page.locator('#af-case-queue').isVisible(), true);
                    assert.equal(await page.locator('.af-case:visible').count(), 1);
                }
            } else {
                assert.equal(new URL(page.url()).pathname, '/');
                assert.equal(await page.locator(`[id="${id}"]`).count(), 1);
            }
            results.push({ id, destination, javaScriptEnabled, result: 'pass' });
        }
        assert.deepEqual(errors, []);
        await context.close();
    }
    const context = await browser.newContext();
    const page = await context.newPage();
    const raw = [],
        local = new Set();
    for (const route of ['/', '/work/', '/work/evidence.html']) {
        await page.goto(base + route, { waitUntil: 'load' });
        const references = await page
            .locator('[href], [src]')
            .evaluateAll(elements =>
                elements.flatMap(el =>
                    ['href', 'src']
                        .filter(attr => el.hasAttribute(attr))
                        .map(attr => ({ raw: el.getAttribute(attr), resolved: new URL(el.getAttribute(attr), document.baseURI).href }))
                )
            );
        raw.push(...references.map(r => r.raw));
        for (const ref of references) if (ref.resolved.startsWith(base + '/')) local.add(ref.resolved);
    }
    const normalize = url => (/^(?:https?:|mailto:|#|\/)/.test(url) ? url : '/' + url);
    for (const url of inventory.links) assert.ok(raw.map(normalize).includes(normalize(url)), `Browser lost original URL: ${url}`);
    const destinations = [];
    for (const url of local) {
        const response = await page.request.get(url);
        assert.equal(response.status(), 200, `Migrated local reference: ${url}`);
        const hash = new URL(url).hash;
        if (hash) assert.ok((await response.text()).includes(`id="${decodeURIComponent(hash.slice(1))}"`), `Destination fragment: ${url}`);
        destinations.push({ url: url.slice(base.length), status: response.status() });
    }
    await context.close();
    fs.writeFileSync(
        `${out}/results.json`,
        JSON.stringify(
            {
                fragments: results,
                originalURLs: inventory.links.length,
                localDestinations: destinations,
                externalAvailability: 'Original hrefs retained; remote availability is not retested.'
            },
            null,
            2
        ) + '\n'
    );
    console.log(
        `Preservation: ${results.length} fragment paths, ${inventory.links.length} original URLs and ${destinations.length} local destinations pass.`
    );
})()
    .catch(e => {
        console.error(e);
        process.exitCode = 1;
    })
    .finally(async () => {
        await browser?.close();
        preview?.kill();
    });
