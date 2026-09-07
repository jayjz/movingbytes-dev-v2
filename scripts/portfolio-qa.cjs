// Development-only browser smoke checks. npm ci && npm run qa:install && npm run qa.
const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const base = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4173';
const out = path.resolve(process.env.PORTFOLIO_QA_OUTPUT || 'test-results/portfolio');
let preview;
let browser;
async function startPreview() {
    if (process.env.PORTFOLIO_BASE_URL) return;
    preview = spawn(process.execPath, ['scripts/serve.cjs'], { env: { ...process.env, PORT: '4173' }, stdio: ['ignore', 'pipe', 'pipe'] });
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
}

fs.mkdirSync(out, { recursive: true });

(async () => {
    await startPreview();
    browser = await chromium.launch({ ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}), headless: true });
    const results = [];
    for (const [label, route] of [
        ['home', '/'],
        ['case', '/case-studies/cipherloop.html']
    ]) {
        for (const width of [320, 390, 768, 1440]) {
            const context = await browser.newContext({ viewport: { width, height: 900 } });
            const page = await context.newPage();
            const errors = [];
            page.on('pageerror', error => errors.push(error.message));
            await page.addInitScript(() => {
                window.layoutShift = 0;
                window.lcp = 0;
                new PerformanceObserver(list =>
                    list.getEntries().forEach(e => {
                        if (!e.hadRecentInput) window.layoutShift += e.value;
                    })
                ).observe({ type: 'layout-shift', buffered: true });
                new PerformanceObserver(list =>
                    list.getEntries().forEach(e => {
                        window.lcp = e.startTime;
                    })
                ).observe({ type: 'largest-contentful-paint', buffered: true });
            });
            const response = await page.goto(base + route, { waitUntil: 'networkidle' });
            assert.equal(response.status(), 200);
            await page.evaluate(() => document.fonts.ready);
            assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${label} overflow ${width}`);
            const metrics = await page.evaluate(() => ({
                lcpMs: Math.round(window.lcp),
                cls: window.layoutShift,
                resourceBytes: performance.getEntriesByType('resource').reduce((n, e) => n + e.transferSize, 0),
                fonts: document.fonts.check('16px "Space Grotesk"'),
                fontFaces: document.fonts.size
            }));
            await page.keyboard.press('Tab');
            assert.equal(await page.locator(':focus').textContent(), 'Skip to content');
            await page.keyboard.press('Enter');
            await page.waitForFunction(() => location.hash === '#main' && document.activeElement.id === 'main');
            const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
            assert.deepEqual(
                axe.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })),
                [],
                `${label} axe ${width}`
            );
            if (label === 'home') {
                for (const repo of ['CipherLoop', 'truck-ready-hvac', 'aetherforge', 'unhinged-agent', 'hvac-ops-agent', 'fracture']) {
                    assert.equal(await page.locator(`a[href="https://github.com/jayjz/${repo}"]`).count(), 1);
                }
                await page.locator('.site-nav a[href="#work"]').click();
                await page.waitForFunction(() => location.hash === '#work');
                await page.goBack();
                assert.equal(new URL(page.url()).hash, '#main');
                await page.locator('.featured a[href="/case-studies/cipherloop.html"]').click();
                assert.equal(new URL(page.url()).pathname, '/case-studies/cipherloop.html');
                await page.goBack();
            } else {
                const summary = page.locator('.diagram-equivalent summary');
                await summary.focus();
                await page.keyboard.press('Enter');
                assert.equal(await page.locator('.diagram-equivalent').getAttribute('open'), '');
                assert.equal(await page.locator('.diagram-equivalent ol').isVisible(), true);
                await page.keyboard.press('Enter');
                assert.equal(await page.locator('.diagram-equivalent').getAttribute('open'), null);
                await page.locator('.case-nav a[href="#evidence"]').click();
                await page.waitForFunction(() => location.hash === '#evidence');
                await page.waitForTimeout(800);
                assert.ok(await page.locator('#evidence').evaluate(el => el.getBoundingClientRect().top >= 0));
            }
            await page.emulateMedia({ reducedMotion: 'reduce' });
            assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
            if (label === 'case')
                assert.equal(await page.locator('.system-figure').evaluate(el => getComputedStyle(el, '::after').animationName), 'none');
            await page.emulateMedia({ reducedMotion: 'no-preference' });
            await page.goto(base + route, { waitUntil: 'networkidle' });
            if (width === 390 || width === 1440) {
                await page.screenshot({ path: path.join(out, `after-${label}-${width}.png`), fullPage: true });
                await page.screenshot({ path: path.join(out, `viewport-${label}-${width}.png`) });
                const featureVisual = label === 'home' ? '.context-record' : '.system-figure';
                await page.locator(featureVisual).screenshot({ path: path.join(out, `diagram-${label}-${width}.png`) });
                if (label === 'case') await page.locator('.evidence-output').screenshot({ path: path.join(out, `evidence-${width}.png`) });
            }
            assert.deepEqual(errors, []);
            results.push({ page: label, width, axeViolations: axe.violations.length, ...metrics });
            await context.close();
        }
        for (const mode of ['no-js', 'no-observer', 'blocked-fonts', 'reduced-at-load', 'blocked-image', 'large-text']) {
            const context = await browser.newContext({
                viewport: { width: 390, height: 844 },
                javaScriptEnabled: mode !== 'no-js',
                reducedMotion: mode === 'reduced-at-load' ? 'reduce' : 'no-preference'
            });
            if (mode === 'no-observer')
                await context.addInitScript(() => {
                    delete window.IntersectionObserver;
                });
            if (mode === 'blocked-fonts') await context.route('https://fonts.**/*', route => route.abort());
            if (mode === 'blocked-image') await context.route('**/assets/diagrams/**', route => route.abort());
            const page = await context.newPage();
            await page.goto(base + route, { waitUntil: 'networkidle' });
            if (mode === 'large-text') await page.addStyleTag({ content: 'html { font-size: 200%; }' });
            assert.equal(await page.locator('h1').isVisible(), true);
            if (label === 'home') assert.equal(await page.locator('.context-record').isVisible(), true);
            if (label === 'case')
                assert.equal(
                    await page.locator('.system-figure img').evaluate(el => el.complete && el.naturalWidth > 0),
                    mode !== 'blocked-image'
                );
            assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
            await page.keyboard.press('Tab');
            await page.keyboard.press('Enter');
            assert.equal(await page.locator('#main').evaluate(el => el === document.activeElement), true);
            assert.equal(await page.locator('a[href="mailto:jay@jaysystems.dev"]').first().isVisible(), true);
            if (label === 'home')
                assert.equal(
                    await page.locator('.work-card').evaluateAll(cards => cards.every(el => getComputedStyle(el).opacity === '1')),
                    true
                );
            results.push({ page: label, mode, result: 'pass' });
            await context.close();
        }
    }
    await browser.close();
    browser = null;
    preview?.kill();
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(results, null, 2) + '\n');
    console.log(JSON.stringify(results, null, 2));
})().catch(async error => {
    console.error(error);
    await browser?.close();
    preview?.kill();
    process.exitCode = 1;
});
