const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const routes = ['ledger.html', 'field-notes.html', 'systems-index.html'];
const output = path.resolve(process.env.PROTOTYPE_OUTPUT || 'prototypes/portfolio-v3/screenshots/final');
let server;
function checkLocalLinks(route) {
    const file = path.join('prototypes', 'portfolio-v3', route);
    const html = fs.readFileSync(file, 'utf8');
    for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
        if (/^(https?:|mailto:|data:)/.test(value)) continue;
        const url = new URL(value, `http://local/${file.replaceAll('\\', '/')}`);
        const target = url.pathname.slice(1);
        assert.ok(fs.existsSync(target), `${route}: missing ${value}`);
        if (url.hash) {
            const targetHtml = fs.readFileSync(target, 'utf8');
            assert.ok(targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${route}: missing fragment ${value}`);
        }
    }
}
async function main() {
    fs.mkdirSync(output, { recursive: true });
    routes.forEach(checkLocalLinks);
    server = spawn(process.execPath, ['scripts/serve.cjs'], { env: { ...process.env, PORT: '4174' }, stdio: ['ignore', 'pipe', 'pipe'] });
    await new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('preview startup timed out')), 10000);
        server.once('error', reject);
        server.stdout.once('data', () => {
            clearTimeout(timer);
            resolve();
        });
    });
    const browser = await chromium.launch({ headless: true });
    const results = [];
    for (const route of routes) {
        for (const width of [320, 390, 768, 1440]) {
            const context = await browser.newContext({ viewport: { width, height: 900 } });
            const page = await context.newPage();
            const errors = [];
            page.on('pageerror', error => errors.push(error.message));
            const response = await page.goto(`http://127.0.0.1:4174/prototypes/portfolio-v3/${route}`, { waitUntil: 'networkidle' });
            assert.equal(response.status(), 200);
            assert.equal(
                await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
                true,
                `${route} overflow at ${width}`
            );
            await page.keyboard.press('Tab');
            assert.equal(await page.locator(':focus').textContent(), 'Skip to content');
            const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
            assert.deepEqual(
                axe.violations.map(v => v.id),
                [],
                `${route} axe violations at ${width}`
            );
            await page.emulateMedia({ reducedMotion: 'reduce' });
            assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
            if (width === 390 || width === 1440)
                await page.screenshot({ path: path.join(output, `${route.replace('.html', '')}-${width}.png`), fullPage: true });
            assert.deepEqual(errors, []);
            results.push({ route, width, axeViolations: axe.violations.length, result: 'pass' });
            await context.close();
        }
        const noJs = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
        const page = await noJs.newPage();
        await page.goto(`http://127.0.0.1:4174/prototypes/portfolio-v3/${route}`, { waitUntil: 'networkidle' });
        assert.equal(await page.locator('h1').isVisible(), true);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
        results.push({ route, mode: 'no-js', result: 'pass' });
        await noJs.close();
    }
    await browser.close();
    server.kill();
    fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify(results, null, 2) + '\n');
    console.log(JSON.stringify(results, null, 2));
}
main().catch(error => {
    console.error(error);
    server?.kill();
    process.exitCode = 1;
});
