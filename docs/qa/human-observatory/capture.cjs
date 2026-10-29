const { chromium } = require('playwright');
const { spawn } = require('node:child_process');
const fs = require('node:fs/promises');
const out = process.argv[2] || 'test-results/human-review';
(async () => {
    const server = spawn(process.execPath, ['scripts/serve.cjs'], { env: { ...process.env, PORT: '4180' }, stdio: 'ignore' });
    let browser;
    try {
        for (let i = 0; i < 30; i++) {
            try {
                await fetch('http://127.0.0.1:4180');
                break;
            } catch {
                await new Promise(r => setTimeout(r, 100));
            }
        }
        browser = await chromium.launch({ headless: true });
        await fs.mkdir(out, { recursive: true });
        for (const width of [320, 390, 768, 1280, 1440]) {
            const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
            await page.goto('http://127.0.0.1:4180', { waitUntil: 'networkidle' });
            await page.screenshot({ path: `${out}/opening-${width}.png` });
            for (const id of ['top', 'about', 'jonah', 'curiosity', 'model-question', 'field-note']) {
                const el = page.locator(`#${id}`);
                if (await el.count()) await el.screenshot({ path: `${out}/${id}-${width}.png` });
            }
            for (const id of ['now', 'curiosity', 'principles']) {
                const el = page.locator(`#${id}`);
                if (await el.count()) {
                    const y = await el.evaluate(el => el.getBoundingClientRect().top + scrollY);
                    await page.evaluate(y => scrollTo(0, Math.max(0, y - 250)), y);
                    await page.screenshot({ path: `${out}/transition-${id}-${width}.png` });
                }
            }
            console.log(JSON.stringify({ width, overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth) }));
            await page.close();
        }
    } finally {
        await browser?.close();
        server.kill();
    }
})().catch(e => {
    console.error(e);
    process.exitCode = 1;
});
