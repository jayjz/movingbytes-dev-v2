// Reproducible visual evidence; run against a local server before and after edits.
const { chromium } = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const label = process.argv[2];
assert.match(label || '', /^(before|initial|after)$/);
const out = `docs/qa/visual-craft/${label}`;
const base = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:8000';
const hash = value => createHash('sha256').update(value).digest('hex');
(async () => {
    fs.mkdirSync(out, { recursive: true });
    const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
    try {
        const results = [];
        for (const width of [320, 390, 768, 1280, 1440]) {
            const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
            const page = await context.newPage();
            const errors = [];
            page.on('pageerror', e => errors.push(e.message));
            for (const [route, name] of [
                ['/', 'home'],
                ['/work/', 'library']
            ]) {
                await page.goto(base + route, { waitUntil: 'networkidle' });
                await page.evaluate(() => document.fonts.ready);
                // Decode lazy images without moving the viewport used for first-view comparison.
                await page.locator('img').evaluateAll(images =>
                    Promise.all(
                        images.map(img => {
                            img.loading = 'eager';
                            return img.decode().catch(() => {});
                        })
                    )
                );
                await page.screenshot({ path: `${out}/${name}-${width}-viewport.jpg`, type: 'jpeg', quality: 75 });
                await page.screenshot({ path: `${out}/${name}-${width}-full.jpg`, fullPage: true, type: 'jpeg', quality: 65 });
                assert.equal(
                    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
                    true,
                    `${name}/${width} overflow`
                );
                if (name === 'home') {
                    await page.locator('#work').screenshot({ path: `${out}/doors-${width}.jpg`, type: 'jpeg', quality: 80 });
                    for (const id of ['now', 'curiosity', 'principles']) {
                        await page.locator(`#${id}`).evaluate(el => el.scrollIntoView());
                        await page.screenshot({ path: `${out}/${id}-${width}.jpg`, type: 'jpeg', quality: 70 });
                    }
                }
                const signature = await page.evaluate(() => ({
                    text: document.querySelector('main').innerText.replace(/\s+/g, ' ').trim(),
                    links: [...document.querySelectorAll('a')].map(a => a.getAttribute('href'))
                }));
                results.push({
                    name,
                    width,
                    textHash: hash(signature.text),
                    linksHash: hash(JSON.stringify(signature.links)),
                    errors: [...errors]
                });
                assert.deepEqual(errors, []);
            }
            await context.close();
        }
        for (const mode of ['normal', 'no-js', 'text-200']) {
            const context = await browser.newContext({ viewport: { width: 390, height: 1000 }, javaScriptEnabled: mode !== 'no-js' });
            const page = await context.newPage();
            await page.goto(base, { waitUntil: 'networkidle' });
            if (mode === 'text-200') await page.addStyleTag({ content: 'html {font-size: 200%}' });
            assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${mode} overflow`);
            await page.screenshot({ path: `${out}/home-390-${mode}.jpg`, fullPage: true, type: 'jpeg', quality: 65 });
            if (mode === 'normal') {
                for (const [i, link] of (await page.locator('.door-link').all()).entries()) {
                    await link.focus();
                    assert.equal(await link.evaluate(el => getComputedStyle(el).outlineStyle), 'solid');
                    await page
                        .locator('.system-door')
                        .nth(i)
                        .screenshot({ path: `${out}/focus-${i}.jpg`, type: 'jpeg', quality: 80 });
                    await link.evaluate(el => el.blur());
                    await link.hover();
                    await page
                        .locator('.system-door')
                        .nth(i)
                        .screenshot({ path: `${out}/hover-${i}.jpg`, type: 'jpeg', quality: 80 });
                }
                await page.emulateMedia({ reducedMotion: 'reduce' });
                assert.equal(
                    await page
                        .locator('.door-mechanism')
                        .evaluateAll(nodes => nodes.every(node => node.getAnimations({ subtree: true }).length === 0)),
                    true
                );
            }
            await context.close();
        }
        fs.writeFileSync(`${out}/results.json`, JSON.stringify({ chrome: browser.version(), base, height: 1000, results }, null, 2) + '\n');
        if (label === 'after') {
            const before = JSON.parse(fs.readFileSync('docs/qa/visual-craft/before/results.json')).results;
            assert.deepEqual(
                results.map(({ name, width, textHash, linksHash }) => ({ name, width, textHash, linksHash })),
                before.map(({ name, width, textHash, linksHash }) => ({ name, width, textHash, linksHash })),
                'Rendered text and link destinations must stay unchanged'
            );
        }
        console.log(`${label}: both routes captured at five widths, interactions and fallback modes checked.`);
    } finally {
        await browser.close();
    }
})().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
