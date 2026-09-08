const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const output = path.resolve(process.env.OBSERVER_OUTPUT || 'prototypes/observer/review/final');
const url = 'http://127.0.0.1:4188/prototypes/observer/';
const capture = process.env.OBSERVER_CAPTURE !== '0';
async function screenshot(target, options) {
    if (capture) await target.screenshot(options);
}
let server;
let browser;
async function main() {
    fs.mkdirSync(output, { recursive: true });
    server = spawn(process.execPath, ['scripts/serve.cjs'], { env: { ...process.env, PORT: '4188' }, stdio: ['ignore', 'pipe', 'pipe'] });
    await new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Preview startup timed out')), 8000);
        server.once('error', reject);
        server.stdout.once('data', () => {
            clearTimeout(timer);
            resolve();
        });
    });
    browser = await chromium.launch({ headless: true });
    const results = [];
    for (const width of [1440, 390, 320]) {
        const context = await browser.newContext({ viewport: { width, height: 900 }, isMobile: width < 600, hasTouch: width < 600 });
        const page = await context.newPage();
        const external = [];
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        await page.route('**/*', route => {
            if (!route.request().url().startsWith('http://127.0.0.1:4188/')) {
                external.push(route.request().url());
                return route.abort();
            }
            return route.continue();
        });
        await page.goto(url, { waitUntil: 'networkidle' });
        const button = page.locator('.observer-character');
        const toggle = page.locator('.observer-motion');
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
        assert.deepEqual(external, []);
        if (width !== 320) {
            await screenshot(page, { path: path.join(output, `desktop-or-mobile-${width}.png`) });
            await screenshot(button, { path: path.join(output, `character-${width}.png`) });
        }
        const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
        assert.deepEqual(
            axe.violations.map(v => v.id),
            []
        );
        const geometry = await page.evaluate(() => {
            const rect = selector => {
                const r = document.querySelector(selector).getBoundingClientRect();
                return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
            };
            const character = rect('.observer-mount');
            for (const selector of ['h1', '.ledger-hero__introduction']) {
                const text = rect(selector);
                if (
                    character.left < text.right &&
                    character.right > text.left &&
                    character.top < text.bottom &&
                    character.bottom > text.top
                )
                    throw new Error('Observer overlaps hero content');
            }
            return { heroTop: rect('h1').top, cipherLoopTop: rect('#cipherloop h2').top };
        });
        if (width === 1440) {
            await page.waitForFunction(
                () =>
                    document
                        .querySelector('.observer-eye')
                        .getAnimations()
                        .some(a => a.playState === 'running'),
                null,
                { timeout: 8500 }
            );
            await screenshot(page, { path: path.join(output, 'desktop-idle-blink.png') });
            await page.mouse.move(200, 380);
            await page.waitForTimeout(500);
            assert.match(await page.locator('.observer-pupil').first().getAttribute('style'), /translate\(-/);
            await screenshot(page, { path: path.join(output, 'desktop-gaze.png') });
            // Synthetic extremes exercise the clamp beyond the character's edge placement.
            for (const direction of [-1, 1]) {
                await page.locator('.ledger-hero').dispatchEvent('pointermove', {
                    pointerType: 'mouse',
                    clientX: direction * 10000,
                    clientY: direction * 10000,
                    buttons: 0
                });
                await page.waitForTimeout(350);
                const offsets = await page.locator('.observer-pupil').evaluateAll(es =>
                    es.map(e => {
                        const matrix = new DOMMatrix(getComputedStyle(e).transform);
                        return { x: matrix.m41, y: matrix.m42 };
                    })
                );
                offsets.forEach((p, i) => {
                    assert.ok(Math.abs(p.x) <= (i ? 4 : 7) + 0.001);
                    assert.ok(Math.abs(p.y) <= (i ? 2.6 : 4.55) + 0.001);
                    assert.equal(Math.sign(p.x), direction);
                });
            }
            await page.mouse.move(50, 30);
            await page.waitForFunction(() => {
                const m = new DOMMatrix(getComputedStyle(document.querySelector('.observer-pupil')).transform);
                return Math.abs(m.m41) + Math.abs(m.m42) < 0.02;
            });
            await page.keyboard.press('Tab');
            assert.equal(await page.locator(':focus').textContent(), 'Skip to content');
            await page.keyboard.press('Enter');
            assert.equal(await page.locator(':focus').getAttribute('id'), 'main');
            await button.focus();
            assert.notEqual(await button.evaluate(e => getComputedStyle(e).outlineStyle), 'none');
            await page.keyboard.press('Space');
            await page.waitForFunction(() =>
                document
                    .querySelector('.observer-eye')
                    .getAnimations()
                    .some(a => a.playState === 'running' && a.effect.getTiming().duration === 340)
            );
            await screenshot(page, { path: path.join(output, 'desktop-keyboard-greeting.png') });
        } else {
            await button.tap();
            await page.waitForFunction(() =>
                document
                    .querySelector('.observer-eye')
                    .getAnimations()
                    .some(a => a.playState === 'running' && a.effect.getTiming().duration === 340)
            );
            if (width === 390) await screenshot(page, { path: path.join(output, 'mobile-tap.png') });
        }
        await toggle.click();
        assert.equal(await toggle.textContent(), 'Resume motion');
        await page.waitForTimeout(400);
        assert.equal(await page.locator('.observer-head').evaluate(e => e.style.transform), 'rotate(0deg)');
        assert.equal(
            await page
                .locator('.observer-eye')
                .first()
                .evaluate(e => e.getAnimations().length),
            0
        );
        // Paused greeting must not animate; resume must restore activation.
        await button.click();
        assert.equal(
            await page
                .locator('.observer-eye')
                .first()
                .evaluate(e => e.getAnimations().length),
            0
        );
        await toggle.click();
        assert.equal(await toggle.textContent(), 'Pause motion');
        if (width < 600) await button.tap();
        else {
            await button.focus();
            await page.keyboard.press('Enter');
        }
        await page.waitForFunction(() =>
            document
                .querySelector('.observer-eye')
                .getAnimations()
                .some(a => a.playState === 'running' && a.effect.getTiming().duration === 340)
        );
        await page.waitForFunction(() => {
            const m = new DOMMatrix(getComputedStyle(document.querySelector('.observer-pupil')).transform);
            return Math.abs(m.m41) + Math.abs(m.m42) < 0.02;
        });
        await page.locator('.ledger-hero__introduction a').click();
        assert.equal(new URL(page.url()).hash, '#cipherloop');
        await page.emulateMedia({ reducedMotion: 'reduce' });
        // MediaQueryList change is delivered asynchronously by the browser.
        await page.waitForFunction(() => document.querySelector('.observer-character').disabled);
        assert.equal(await button.isDisabled(), true);
        assert.equal(await toggle.isHidden(), true);
        assert.deepEqual(errors, []);
        assert.deepEqual(external, []);
        results.push({
            width,
            overflow: false,
            externalRequests: external.length,
            axeViolations: axe.violations.length,
            interaction: 'pass',
            gazeBoundsAndNeutral: width === 1440 ? 'pass' : 'not applicable (touch)',
            pauseResume: 'pass',
            heroOverlap: false,
            geometry
        });
        await context.close();
    }
    for (const mode of ['no-js', 'reduced-motion']) {
        const context = await browser.newContext({
            viewport: { width: 390, height: 900 },
            javaScriptEnabled: mode !== 'no-js',
            reducedMotion: mode === 'reduced-motion' ? 'reduce' : 'no-preference'
        });
        const page = await context.newPage();
        await page.goto(url, { waitUntil: 'networkidle' });
        assert.equal(await page.locator('.observer-character').isDisabled(), true);
        assert.equal(await page.locator('.observer-motion').isHidden(), true);
        assert.equal(await page.locator('.observer-character svg').isVisible(), true);
        assert.equal(await page.locator('#cipherloop').isVisible(), true);
        await screenshot(page, { path: path.join(output, mode + '.png') });
        results.push({ mode, staticCharacter: 'pass' });
        await context.close();
    }
    if (capture) {
        const videoContext = await browser.newContext({
            viewport: { width: 1440, height: 900 },
            recordVideo: { dir: output, size: { width: 1440, height: 900 } }
        });
        const recording = await videoContext.newPage();
        await recording.goto(url, { waitUntil: 'networkidle' });
        await recording.waitForTimeout(700);
        await recording.mouse.move(240, 340, { steps: 25 });
        await recording.waitForTimeout(900);
        await recording.mouse.move(1380, 150, { steps: 35 });
        await recording.waitForTimeout(900);
        await recording.locator('.observer-character').focus();
        await recording.keyboard.press('Enter');
        await recording.waitForTimeout(1000);
        await recording.locator('.observer-motion').click();
        await recording.waitForTimeout(600);
        const video = recording.video();
        await videoContext.close();
        fs.renameSync(await video.path(), path.join(output, 'observer-interaction.webm'));
        const assets = await browser.newPage({ viewport: { width: 960, height: 340 } });
        await assets.goto(url + 'silhouettes.svg');
        await screenshot(assets, { path: path.join(output, 'silhouettes.png') });
        await assets.setViewportSize({ width: 640, height: 560 });
        await assets.goto(url + 'observer.svg');
        await screenshot(assets, { path: path.join(output, 'observer-static.png') });
        await assets.close();
    }
    await browser.close();
    server.kill();
    fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify(results, null, 2) + '\n');
    console.log(JSON.stringify(results, null, 2));
}
main().catch(async e => {
    console.error(e);
    await browser?.close();
    server?.kill();
    process.exitCode = 1;
});
