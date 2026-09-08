const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const assert = require('node:assert/strict');
const phase = process.env.PLACEMENT_PHASE || 'after';
const output = path.resolve('prototypes/observer/review/placement', phase);
(async () => {
    fs.mkdirSync(output, { recursive: true });
    const server = spawn(process.execPath, ['scripts/serve.cjs'], {
        env: { ...process.env, PORT: '4189' },
        stdio: ['ignore', 'pipe', 'pipe']
    });
    let browser;
    try {
        await new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error('Server timeout')), 8000);
            server.stdout.once('data', () => {
                clearTimeout(timer);
                resolve();
            });
            server.once('error', reject);
        });
        browser = await chromium.launch({ headless: true });
        const results = [];
        for (const width of [1280, 1440, 390, 320]) {
            for (const enlarged of [false, true]) {
                const page = await browser.newPage({ viewport: { width, height: 900 } });
                await page.goto('http://127.0.0.1:4189/prototypes/observer/', { waitUntil: 'networkidle' });
                if (enlarged) await page.addStyleTag({ content: 'html { font-size: 200%; }' });
                const geometry = await page.evaluate(() => {
                    const selectors = {
                        hero: '.ledger-hero',
                        identity: '.ledger-hero__identity',
                        headline: 'h1',
                        introduction: '.ledger-hero__introduction',
                        character: '.observer-mount',
                        caption: '.observer-caption',
                        cipherHeading: '#cipherloop h2',
                        cipherArticle: '#cipherloop'
                    };
                    const bounds = Object.fromEntries(
                        Object.entries(selectors).map(([key, selector]) => {
                            const r = document.querySelector(selector).getBoundingClientRect();
                            return [key, { x: r.x, y: r.y, width: r.width, height: r.height, bottom: r.bottom }];
                        })
                    );
                    const intersects = (a, b) => a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.bottom && a.bottom > b.y;
                    return {
                        ...bounds,
                        overflow: document.documentElement.scrollWidth > innerWidth,
                        overlap: ['identity', 'headline', 'introduction'].filter(key => intersects(bounds.character, bounds[key]))
                    };
                });
                if (phase !== 'before') {
                    assert.equal(geometry.overflow, false);
                    assert.deepEqual(geometry.overlap, []);
                }
                await page.screenshot({ path: path.join(output, `${width}${enlarged ? '-text-200' : ''}.png`), fullPage: enlarged });
                results.push({ width, enlarged, ...geometry });
                await page.close();
            }
        }
        fs.writeFileSync(path.join(output, 'geometry.json'), JSON.stringify(results, null, 2) + '\n');
        console.log(
            JSON.stringify(
                results.map(r => ({
                    width: r.width,
                    enlarged: r.enlarged,
                    heroBottom: r.hero.bottom,
                    intro: r.introduction,
                    character: r.character,
                    cipher: r.cipherHeading.y,
                    overflow: r.overflow,
                    overlap: r.overlap
                })),
                null,
                2
            )
        );
    } finally {
        await browser?.close();
        server.kill();
    }
})().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
