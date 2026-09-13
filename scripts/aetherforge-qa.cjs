const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const evidence = require('../docs/evidence/aetherforge/scenarios.json');
const out = path.resolve(process.env.AETHERFORGE_QA_OUTPUT || 'test-results/aetherforge');
const base = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4187';
let preview;
let browser;
const results = [];

async function checkState(page, fixture) {
    const panel = page.locator(`#af-case-${fixture.id}`);
    assert.equal(await panel.isVisible(), true);
    assert.equal(await page.locator('.af-case:visible').count(), 1);
    const response = fixture.response.detail || fixture.response;
    assert.equal(await panel.locator('.af-code code').textContent(), response.error || response.status);
    assert.equal(await panel.locator('.af-code span').textContent(), `HTTP ${fixture.http_status}`);
    assert.equal(await panel.locator('.af-active code').textContent(), fixture.active_mode);
    const inputs = await panel.locator('dd').allTextContents();
    assert.deepEqual(
        inputs.map(text => text.trim().replace(/\s+/g, ' ')),
        [
            '100 / 4,096 tokens',
            `${fixture.request.expected_output_tokens.toLocaleString('en-US')} tokens`,
            fixture.thermal_lock ? 'Active' : 'Off',
            `${fixture.available_slots} / 5`
        ]
    );
    if (fixture.economic_gate_evaluated) {
        const times = await panel.locator('.af-comparison strong').allTextContents();
        assert.deepEqual(
            times.map(s => s.trim()),
            [`${fixture.stay_seconds.toFixed(2)} s`, `${fixture.switch_seconds.toFixed(2)} s`]
        );
    } else {
        assert.equal(await panel.locator('.af-gate-rule').textContent(), 'Economic gate not evaluated.');
        assert.ok((await panel.locator('.af-estimate').textContent()).includes(`Retry-After: ${fixture.retry_after} seconds`));
    }
    assert.equal(await panel.locator('.af-changed').count(), fixture.id === 'baseline' ? 0 : 1);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${fixture.id} page overflow`);
    const overflow = await panel
        .locator('*')
        .evaluateAll(elements => elements.filter(el => el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1).map(el => el.className));
    assert.deepEqual(overflow, [], `${fixture.id} internal overflow`);
}

(async () => {
    fs.mkdirSync(out, { recursive: true });
    if (!process.env.PORTFOLIO_BASE_URL) {
        preview = spawn(process.execPath, ['scripts/serve.cjs'], {
            env: { ...process.env, PORT: '4187' },
            stdio: ['ignore', 'pipe', 'pipe']
        });
        await new Promise((resolve, reject) => {
            preview.once('error', reject);
            preview.once('exit', code => reject(new Error(`Preview exited: ${code}`)));
            preview.stdout.once('data', resolve);
        });
    }
    browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
    for (const width of process.env.AETHERFORGE_QA_TEXT_ONLY ? [] : [1440, 1280, 768, 390, 320]) {
        const context = await browser.newContext({ viewport: { width, height: 1000 } });
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        await page.goto(base, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        await page.locator('#af-baseline').focus();
        assert.equal(
            await page
                .locator('.af-selector label')
                .first()
                .evaluate(el => getComputedStyle(el).outlineStyle),
            'solid'
        );
        for (const [i, fixture] of evidence.cases.entries()) {
            if (i > 0) await page.keyboard.press('ArrowRight');
            assert.equal(await page.locator(`#af-${fixture.id}`).isChecked(), true);
            await checkState(page, fixture);
            if (i > 0)
                assert.ok(
                    (await page.locator('.af-announcement').textContent()).includes(
                        fixture.response.detail?.error || fixture.response.error
                    )
                );
            const axe = await new AxeBuilder({ page })
                .include('#aetherforge')
                .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
                .analyze();
            assert.deepEqual(
                axe.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })),
                []
            );
            await page.locator('#aetherforge').screenshot({ path: path.join(out, `${width}-${fixture.id}.png`) });
            results.push({ width, scenario: fixture.id, keyboard: 'pass', sourceResponse: 'match', axeViolations: 0, overflow: false });
        }
        if (width === 1440) {
            await page.screenshot({ path: path.join(out, 'home-1440.png'), fullPage: true });
            await page.emulateMedia({ reducedMotion: 'reduce' });
            await page.keyboard.press('ArrowLeft');
            assert.equal(await page.locator('#aetherforge').evaluate(el => el.getAnimations({ subtree: true }).length), 0);
            await page.emulateMedia({ reducedMotion: 'no-preference' });
            await page.keyboard.press('ArrowLeft');
            assert.ok(await page.locator('#aetherforge').evaluate(el => el.getAnimations({ subtree: true }).length > 0));
            await page.emulateMedia({ reducedMotion: 'reduce' });
            // Media-query change events arrive asynchronously in the page.
            await page.waitForFunction(() => document.querySelector('#aetherforge').getAnimations({ subtree: true }).length === 0);
            await page.keyboard.press('Tab');
            assert.equal(await page.locator(':focus').textContent(), 'Swap matrix test');
        }
        assert.deepEqual(errors, []);
        await context.close();
    }
    const modes = process.env.AETHERFORGE_QA_TEXT_ONLY
        ? ['text-200-390', 'text-200-320']
        : ['no-js', 'blocked-script', 'touch', 'reduced-at-load', 'text-200-390', 'text-200-320'];
    for (const mode of modes) {
        const context = await browser.newContext({
            viewport: { width: mode.endsWith('320') ? 320 : 390, height: 900 },
            javaScriptEnabled: mode !== 'no-js',
            hasTouch: mode === 'touch',
            isMobile: mode === 'touch',
            reducedMotion: mode === 'reduced-at-load' ? 'reduce' : 'no-preference'
        });
        if (mode === 'blocked-script') await context.route('**/js/aetherforge.js', route => route.abort());
        const page = await context.newPage();
        await page.goto(base, { waitUntil: 'networkidle' });
        if (mode.startsWith('text-200')) await page.addStyleTag({ content: 'html { font-size: 200%; }' });
        for (const fixture of evidence.cases) {
            const label = page.locator(`label:has(#af-${fixture.id})`);
            if (mode === 'touch') await label.tap();
            else await label.click();
            await checkState(page, fixture);
            if (mode === 'reduced-at-load')
                assert.equal(await page.locator('#aetherforge').evaluate(el => el.getAnimations({ subtree: true }).length), 0);
        }
        // Axe's injected asynchronous engine cannot run with JS disabled.
        if (mode !== 'no-js') {
            const axe = await new AxeBuilder({ page })
                .include('#aetherforge')
                .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
                .analyze();
            assert.deepEqual(
                axe.violations.map(v => v.id),
                []
            );
        }
        // Axe may move focus while auditing focusable offscreen content.
        await page.locator('#af-queue').focus();
        if (mode.startsWith('text-200')) {
            const skip = await page.locator('.skip-link').evaluate(el => ({
                focused: el === document.activeElement,
                bottom: el.getBoundingClientRect().bottom
            }));
            assert.equal(skip.focused, false);
            assert.ok(skip.bottom <= 0, 'Unfocused skip link must stay outside the viewport');
            await page.locator('.af-gate:visible').scrollIntoViewIfNeeded();
            await page.screenshot({ path: path.join(out, `${mode}-viewport.png`) });
        }
        await page.locator('#aetherforge').screenshot({ path: path.join(out, `${mode}.png`) });
        results.push({ mode, allFourScenarios: 'pass', axeViolations: mode === 'no-js' ? 'not run: JS disabled' : 0, overflow: false });
        await context.close();
    }
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(results, null, 2) + '\n');
    console.log(`AetherForge: ${results.length} viewport/scenario and resilience checks passed.`);
})()
    .catch(error => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await browser?.close();
        preview?.kill();
    });
