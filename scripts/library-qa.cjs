// Editorial index, native navigation and reflow. Preservation coverage is separate.
const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { spawn } = require('node:child_process');
const base = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4203';
const out = process.env.LIBRARY_QA_OUTPUT || 'test-results/systems-library';
let browser, preview;
(async () => {
    fs.mkdirSync(out, { recursive: true });
    if (!process.env.PORTFOLIO_BASE_URL) {
        preview = spawn(process.execPath, ['scripts/serve.cjs'], {
            env: { ...process.env, PORT: '4203' },
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
    for (const [width, mode] of [
        ...[320, 390, 768, 1280, 1440].map(w => [w, 'normal']),
        [390, 'no-js'],
        [320, 'text-200'],
        [390, 'text-200']
    ]) {
        const context = await browser.newContext({
            viewport: { width, height: 1000 },
            javaScriptEnabled: mode !== 'no-js',
            reducedMotion: 'reduce'
        });
        const page = await context.newPage();
        const errors = [],
            dataRequests = [];
        page.on('pageerror', e => errors.push(e.message));
        page.on('request', r => {
            if (/api\.github\.com|\/data\/.*\.json/.test(r.url())) dataRequests.push(r.url());
        });
        assert.equal((await page.goto(base + '/work/', { waitUntil: 'networkidle' })).status(), 200);
        if (mode === 'text-200') await page.addStyleTag({ content: 'html {font-size:200%}' });
        assert.equal(await page.locator('.library-collection').count(), 6);
        assert.equal(await page.locator('.library-entry').count(), 10);
        assert.equal(await page.locator('.project-registry, .af-instrument, .metadata-snapshot, script').count(), 0);
        assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://www.jaysystems.dev/work');
        assert.equal(
            await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
            true,
            `Library overflow ${width}/${mode}`
        );
        await page.keyboard.press('Tab');
        assert.equal(await page.locator(':focus').textContent(), 'Skip to content');
        await page.keyboard.press('Enter');
        assert.equal(await page.locator('#main').evaluate(el => el === document.activeElement), true);
        for (const link of await page.locator('.library-contents a[href^="#"]').all()) {
            await link.focus();
            assert.equal(await link.evaluate(el => getComputedStyle(el).outlineStyle), 'solid');
            const href = await link.getAttribute('href');
            await page.keyboard.press('Enter');
            assert.equal(new URL(page.url()).hash, href);
            assert.equal(await page.locator(href).isVisible(), true);
        }
        let violations = null;
        if (mode !== 'no-js') {
            violations = (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations.map(
                v => ({ id: v.id, targets: v.nodes.map(n => n.target) })
            );
            assert.deepEqual(violations, []);
        }
        await page.locator('h1').scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${out}/library-${width}-${mode}.png`, fullPage: true });
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: `${out}/library-viewport-${width}-${mode}.png` });
        const archiveLink = page.locator('.library-full-record');
        await archiveLink.focus();
        await page.keyboard.press('Enter');
        await page.waitForURL('**/work/evidence.html');
        assert.equal(await page.locator('.project-registry details').count(), 10);
        await page.locator('.site-header a[href="/work/"]').click();
        await page.waitForURL('**/work/');
        assert.deepEqual(errors, []);
        assert.deepEqual(dataRequests, []);
        results.push({ width, mode, collections: 6, entries: 10, keyboard: 'pass', overflow: false, axeViolations: violations });
        await context.close();
    }
    fs.writeFileSync(`${out}/results.json`, JSON.stringify(results, null, 2) + '\n');
    console.log(`Library: ${results.length} responsive, accessibility and native-navigation checks pass.`);
})()
    .catch(e => {
        console.error(e);
        process.exitCode = 1;
    })
    .finally(async () => {
        await browser?.close();
        preview?.kill();
    });
