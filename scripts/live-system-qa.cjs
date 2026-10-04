// Focused review of generated sections, expanded evidence, and zero runtime data access.
const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const out = 'test-results/live-system-focused';
const base = 'http://127.0.0.1:4199';
let browser;
let preview;
(async () => {
    fs.mkdirSync(out, { recursive: true });
    preview = spawn(process.execPath, ['scripts/serve.cjs'], { env: { ...process.env, PORT: '4199' }, stdio: ['ignore', 'pipe', 'pipe'] });
    await new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Preview startup timed out')), 10000);
        preview.once('error', reject);
        preview.once('exit', code => {
            clearTimeout(timer);
            reject(new Error(`Preview exited: ${code}`));
        });
        preview.stdout.once('data', () => {
            clearTimeout(timer);
            resolve();
        });
    });
    browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
    const results = [];
    for (const [width, mode] of [
        [320, 'normal'],
        [390, 'normal'],
        [768, 'normal'],
        [1440, 'normal'],
        [320, 'large-text'],
        [390, 'no-js']
    ]) {
        const context = await browser.newContext({
            viewport: { width, height: 900 },
            javaScriptEnabled: mode !== 'no-js',
            reducedMotion: 'reduce'
        });
        // Blocking these must have no effect: there should be no requests at all.
        await context.route('**/api.github.com/**', route => route.abort());
        await context.route('**/data/*.json', route => route.abort());
        const page = await context.newPage();
        const errors = [],
            failures = [],
            badResponses = [],
            dataRequests = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('console', message => {
            if (message.type() === 'error') errors.push(message.text());
        });
        page.on('requestfailed', request => failures.push({ url: request.url(), error: request.failure()?.errorText }));
        page.on('response', response => {
            if (response.status() >= 400) badResponses.push({ url: response.url(), status: response.status() });
        });
        page.on('request', request => {
            if (/api\.github\.com|\/data\/.*\.json/.test(request.url())) dataRequests.push(request.url());
        });
        await page.goto(base, { waitUntil: 'networkidle' });
        if (mode === 'large-text') await page.addStyleTag({ content: 'html { font-size: 200%; }' });
        for (const id of ['research', 'evidence-strategy', 'fracture', 'sightglass']) {
            await page.goto(`${base}/#${id}`);
            assert.equal(await page.locator(`#${id}`).isVisible(), true, `Legacy anchor ${id}`);
        }
        for (const details of await page.locator('.project-registry details, .metadata-snapshot').all()) {
            await details.locator('summary').focus();
            await page.keyboard.press('Enter');
            assert.notEqual(await details.getAttribute('open'), null);
        }
        assert.equal(await page.locator('.registry-body:visible').count(), 10);
        assert.equal(
            await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
            true,
            `Expanded overflow ${width}/${mode}`
        );
        let violations = null;
        if (mode !== 'no-js') {
            const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
            violations = axe.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) }));
            assert.deepEqual(violations, []);
        }
        await page.locator('#main').focus();
        const skip = await page
            .locator('.skip-link')
            .evaluate(el => ({ focused: el === document.activeElement, bottom: el.getBoundingClientRect().bottom }));
        assert.equal(skip.focused, false);
        assert.ok(skip.bottom <= 0, 'Unfocused skip link must be outside viewport');
        for (const selector of ['.live-focus', '#systems-map', '#recent-work', '#evidence-ledger', '#project-registry']) {
            await page.locator(selector).screenshot({ path: `${out}/${selector.replace(/^[.#]/, '')}-${width}-${mode}.png` });
        }
        await page.locator('#systems-map').scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${out}/map-viewport-${width}-${mode}.png` });
        assert.deepEqual(dataRequests, []);
        assert.deepEqual(
            failures.filter(f => f.url.startsWith(base)),
            []
        );
        assert.deepEqual(
            badResponses.filter(f => f.url.startsWith(base)),
            []
        );
        results.push({ width, mode, errors, failures, badResponses, dataRequests, axeViolations: violations, overflow: false });
        await context.close();
    }
    fs.writeFileSync(`${out}/results.json`, JSON.stringify(results, null, 2) + '\n');
    assert.ok(
        results.every(r => r.errors.length === 0 && r.failures.length === 0 && r.badResponses.length === 0),
        'Inspect recorded console/network failures'
    );
    console.log('Six expanded-layout, anchor, keyboard, network and accessibility checks passed.');
})()
    .catch(error => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await browser?.close();
        preview?.kill();
    });
