// Run from repository root with `npm run dev` already serving port 8000.
// Captures prototypes by default; `final` captures production. Baseline is preserved.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

(async () => {
    const phase = process.argv[2] || 'prototypes';
    assert.ok(['prototypes', 'final'].includes(phase));
    const browser = await chromium.launch({
        ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
        headless: true
    });
    try {
        const out = path.resolve('docs/qa/mastery', phase);
        fs.mkdirSync(out, { recursive: true });
        const results = [];
        for (const route of phase === 'prototypes' ? ['ledger', 'instrument', 'narrative'] : ['home']) {
            for (const width of phase === 'prototypes' ? [1440, 390, 320] : [1440, 1280, 768, 390, 320]) {
                const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
                await page.goto(`http://127.0.0.1:8000/${route === 'home' ? '' : `prototypes/mastery/${route}.html`}`, {
                    waitUntil: 'networkidle'
                });
                if (phase === 'prototypes') {
                    await page.locator('.tuner summary').click();
                    const input = page.locator('[data-token="--display-scale"]');
                    await input.press('End');
                    assert.equal(await page.evaluate(() => document.documentElement.style.getPropertyValue('--display-scale')), '1.1');
                    await input.press('ArrowLeft');
                    await input.press('ArrowLeft');
                    await page.locator('.tuner summary').click();
                }
                await page.evaluate(() => scrollTo(0, 0));
                const geometry = await page.evaluate(() => ({
                    overflow: document.documentElement.scrollWidth > innerWidth,
                    workY: document.querySelector('#work').getBoundingClientRect().top,
                    h1: document.querySelector('h1').innerText
                }));
                assert.equal(geometry.overflow, false, `${route} overflow at ${width}`);
                await page.screenshot({ path: path.join(out, `${route}-${width}.png`), fullPage: true });
                await page.screenshot({ path: path.join(out, `${route}-${width}-viewport.png`) });
                if (phase === 'final' && width === 320) {
                    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
                    await page.screenshot({ path: path.join(out, 'text-200-viewport.png') });
                    await page.locator('.fixture-table').screenshot({ path: path.join(out, 'text-200-fixtures.png') });
                }
                results.push({ route, width, ...geometry });
                await page.close();
            }
        }
        fs.writeFileSync(path.join(out, 'geometry.json'), JSON.stringify(results, null, 2) + '\n');
        console.log(JSON.stringify(results, null, 2));
    } finally {
        await browser.close();
    }
})().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
