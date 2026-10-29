// Navigation, resilience and visual review for the homepage/library boundary.
const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const base = process.env.LIBRARY_BASE_URL || 'http://127.0.0.1:4189';
const out = path.resolve(process.env.LIBRARY_QA_OUTPUT || 'test-results/library');
let preview;
let browser;
const results = [];
(async () => {
    fs.mkdirSync(out, { recursive: true });
    if (!process.env.LIBRARY_BASE_URL) {
        preview = spawn(process.execPath, ['scripts/serve.cjs'], {
            env: { ...process.env, PORT: '4189' },
            stdio: ['ignore', 'pipe', 'pipe']
        });
        await new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error('Preview startup timed out')), 10000);
            preview.once('error', reject);
            preview.once('exit', code => reject(new Error(`Preview exited: ${code}`)));
            preview.stdout.once('data', () => {
                clearTimeout(timer);
                resolve();
            });
        });
    }
    browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
    for (const [label, route] of [
        ['home', '/'],
        ['library', '/work/'],
        ['archive', '/work/evidence.html']
    ]) {
        if (process.env.LIBRARY_QA_PAGE && process.env.LIBRARY_QA_PAGE !== label) continue;
        for (const [width, mode] of [
            ...[320, 390, 768, 1280, 1440].map(w => [w, 'normal']),
            [390, 'no-js'],
            [320, 'no-js'],
            [390, 'reduced-motion'],
            [320, 'large-text'],
            [390, 'large-text']
        ]) {
            const context = await browser.newContext({
                viewport: { width, height: 900 },
                javaScriptEnabled: mode !== 'no-js',
                reducedMotion: mode === 'normal' ? 'no-preference' : 'reduce'
            });
            const page = await context.newPage();
            const errors = [],
                failures = [],
                runtimeData = [];
            page.on('pageerror', e => errors.push(e.message));
            page.on('response', r => {
                if (r.url().startsWith(base) && r.status() >= 400) failures.push(r.url());
            });
            page.on('requestfailed', r => {
                if (r.url().startsWith(base)) failures.push(r.url());
            });
            page.on('request', r => {
                if (/api\.github\.com|\/data\/[^/]+\.json/.test(r.url())) runtimeData.push(r.url());
            });
            const response = await page.goto(base + route, { waitUntil: 'networkidle' });
            assert.equal(response.status(), 200, `${label}/${width}/${mode}`);
            if (mode === 'large-text') await page.addStyleTag({ content: 'html { font-size: 200%; }' });
            await page.evaluate(() => document.fonts.ready);
            assert.equal(await page.locator('h1').count(), 1);
            assert.equal(
                await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
                true,
                `${label} reflow ${width}/${mode}`
            );
            await page.keyboard.press('Tab');
            assert.equal(await page.locator(':focus').textContent(), 'Skip to content');
            await page.keyboard.press('Enter');
            assert.equal(await page.locator('#main').evaluate(el => el === document.activeElement), true);
            if (label === 'home') {
                assert.equal(await page.locator('.threshold-instrument').count(), 1);
                assert.equal(
                    await page.locator('.af-instrument, .evidence-flow, .decision-timeline, .fixture-table, .project-registry').count(),
                    0
                );
                assert.equal(await page.locator('.work-door').count(), 3);
                assert.equal(await page.locator('.work-door input, .work-door button, .work-door details').count(), 0);
                for (const collection of ['investigate', 'decide', 'coordinate']) {
                    const door = page.locator(`.door-link[href="/work/#${collection}"]`);
                    await door.focus();
                    assert.equal(await door.evaluate(el => getComputedStyle(el).outlineStyle), 'solid');
                    await page.keyboard.press('Enter');
                    await page.waitForURL(`**/work/#${collection}`);
                    assert.equal(await page.locator(`#${collection}`).isVisible(), true);
                    await page.goBack();
                }
            }
            if (label === 'archive') {
                assert.equal(await page.locator('.af-instrument').count(), 1);
                assert.equal(await page.locator('.project-registry details').count(), 10);
                assert.equal(await page.locator('.fixture-table').isVisible(), true);
            }
            if (label === 'library') {
                assert.equal(await page.locator('script').count(), 0, 'The collection index is static');
                assert.equal(await page.locator('.library-collection').count(), 3);
                assert.equal(await page.locator('[data-library-project]').count(), 10);
                for (const id of ['investigate', 'decide', 'coordinate', 'applied-field', 'open-questions', 'historical-work']) {
                    const link = page.locator(`.library-heading a[href="#${id}"]`);
                    await link.focus();
                    assert.equal(await link.evaluate(el => getComputedStyle(el).outlineStyle), 'solid');
                    await page.keyboard.press('Enter');
                    assert.equal(new URL(page.url()).hash, `#${id}`);
                    assert.equal(await page.locator(`#${id}`).isVisible(), true);
                }
                for (const collection of ['investigate', 'decide', 'coordinate']) {
                    for (const link of await page.locator(`#${collection} .collection-links a`).all()) {
                        const href = await link.getAttribute('href');
                        await link.focus();
                        await page.keyboard.press('Enter');
                        await page.waitForURL(base + href);
                        assert.equal(new URL(page.url()).pathname + new URL(page.url()).hash, href);
                        assert.equal(await page.locator(new URL(page.url()).hash || 'main').isVisible(), true);
                        await page.goBack();
                    }
                }
                assert.equal(await page.locator('#open-questions a[href="/research.html"]').count(), 1);
                assert.equal(await page.locator('#applied-field [data-library-project="truck-ready"]').count(), 1);
                assert.equal(await page.locator('#open-questions [data-library-project="temper"]').count(), 1);
            }
            if (mode !== 'no-js') {
                const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
                assert.deepEqual(
                    axe.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })),
                    [],
                    `${label} axe ${width}/${mode}`
                );
            }
            const geometry = await page.evaluate(() => ({
                sections: document.querySelectorAll('main > section').length,
                height: document.documentElement.scrollHeight,
                doorsHeight: document.querySelector('#work.work-doors')?.getBoundingClientRect().height || null
            }));
            // Stable captures show final composition; motion is tested separately.
            await page.emulateMedia({ reducedMotion: 'reduce' });
            await page.evaluate(() => scrollTo(0, 0));
            await page.screenshot({ path: path.join(out, `${label}-${width}-${mode}.png`), fullPage: true });
            if (label === 'home') {
                await page.locator('#work').screenshot({ path: path.join(out, `doors-${width}-${mode}.png`) });
                await page.locator('.library-invitation').scrollIntoViewIfNeeded();
                await page.screenshot({ path: path.join(out, `ending-${width}-${mode}.png`) });
            }
            assert.deepEqual(errors, [], `${label} script errors`);
            assert.deepEqual(failures, [], `${label} local resources`);
            assert.deepEqual(runtimeData, [], `${label} author-time data`);
            results.push({
                label,
                width,
                mode,
                ...geometry,
                localErrors: 0,
                runtimeDataRequests: 0,
                axeViolations: mode === 'no-js' ? null : 0
            });
            await context.close();
        }
    }
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(results, null, 2) + '\n');
    console.log(`Library navigation/resilience checks: ${results.length} passed. Captures: ${out}`);
})()
    .catch(error => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await browser?.close();
        preview?.kill();
    });
