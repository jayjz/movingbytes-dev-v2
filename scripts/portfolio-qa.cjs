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
    let researchArgument;
    for (const [label, route] of [
        ['research', '/research.html'],
        ['home', '/'],
        ['case', '/case-studies/cipherloop.html'],
        ['shadow', '/case-studies/shadow.html']
    ]) {
        if (process.env.PORTFOLIO_QA_PAGE && process.env.PORTFOLIO_QA_PAGE !== label) continue;
        for (const width of [320, 390, 768, 1280, 1440]) {
            const context = await browser.newContext({ viewport: { width, height: 900 } });
            const page = await context.newPage();
            const errors = [];
            const researchRequests = [];
            const localFailures = [];
            page.on('pageerror', error => errors.push(error.message));
            if (label === 'research') {
                page.on('request', request => researchRequests.push(request.url()));
                page.on('requestfailed', request => {
                    if (request.url().startsWith(base)) localFailures.push(request.url());
                });
                page.on('response', response => {
                    if (response.url().startsWith(base) && response.status() >= 400) localFailures.push(response.url());
                });
            }
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
            assert.equal(await page.locator('link[rel="icon"]').getAttribute('href'), '/favicon.svg');
            const icon = await page.request.get(base + '/favicon.svg');
            assert.equal(icon.status(), 200);
            assert.ok(icon.headers()['content-type'].includes('image/svg+xml'));
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
                const opening = await page.evaluate(() => {
                    const ids = [
                        'top',
                        'work',
                        'shadow',
                        'about',
                        'principles',
                        'now',
                        'engineering-details',
                        'projects',
                        'systems-map',
                        'recent-work',
                        'evidence-ledger',
                        'project-registry'
                    ];
                    const sections = [...document.querySelectorAll('main > section')];
                    return {
                        order: ids.map(id => sections.indexOf(document.getElementById(id))),
                        githubInOpening: document.querySelectorAll('.site-header a[href*="github.com"], #top a[href*="github.com"]').length
                    };
                });
                assert.ok(
                    opening.order.every((n, i, list) => n >= 0 && (i === 0 || n > list[i - 1])),
                    'Identity leads directly to both selected projects; detailed evidence follows the overview'
                );
                assert.equal(opening.githubInOpening, 0);
                assert.equal(await page.locator('#work .project-summary').count(), 1);
                assert.equal(await page.locator('#shadow .project-summary').count(), 1);
                assert.equal(await page.locator('#work .evidence-flow').count(), 0);
                assert.equal(await page.locator('#engineering-details .evidence-flow').count(), 1);
                assert.equal(await page.locator('h1 .hero-name').textContent(), 'Jay');
                assert.equal(await page.locator('.hero-projects').count(), 0);
                assert.equal(await page.locator('#principles li').count(), 4);
                assert.equal(await page.locator('#now li').count(), 3);
                assert.equal(await page.locator('.mastery-intro a[href="#work"]').count(), 1);
                for (const repo of [
                    'CipherLoop',
                    'TraceForge',
                    'truck-ready-hvac',
                    'aetherforge',
                    'unhinged-agent',
                    'sightglass',
                    'SHAD0W',
                    'evidence-strategy-skills',
                    'fracture'
                ]) {
                    assert.ok((await page.locator(`a[href="https://github.com/jayjz/${repo}"]`).count()) >= 1);
                }
                const action = page.locator('.mastery-intro .ledger-link');
                await action.focus();
                assert.equal(await action.evaluate(el => getComputedStyle(el).outlineStyle), 'solid');
                if (width === 1440) {
                    await page.locator('.mastery-hero').dispatchEvent('pointermove', {
                        clientX: -10000,
                        clientY: -10000,
                        pointerType: 'mouse',
                        buttons: 0
                    });
                    await page.waitForFunction(() => {
                        const matrix = new DOMMatrix(getComputedStyle(document.querySelector('.observer-pupil')).transform);
                        return matrix.e < -6.9;
                    });
                    const offsets = await page.locator('.observer-pupil').evaluateAll(pupils =>
                        pupils.map(el => {
                            const matrix = new DOMMatrix(getComputedStyle(el).transform);
                            return { x: matrix.e, y: matrix.f };
                        })
                    );
                    offsets.forEach((offset, i) => {
                        assert.ok(Math.abs(offset.x) <= (i === 0 ? 7 : 4));
                        assert.ok(Math.abs(offset.y) <= (i === 0 ? 4.55 : 2.6));
                    });
                    await page.locator('.mastery-hero').dispatchEvent('pointerleave');
                    await page.waitForFunction(
                        () => Math.abs(new DOMMatrix(getComputedStyle(document.querySelector('.observer-pupil')).transform).e) < 0.02
                    );
                }
                const overlap = await page.evaluate(() => {
                    const mount = document.querySelector('.observer-mount').getBoundingClientRect();
                    return ['h1', '.mastery-intro', '.mastery-identity p'].some(selector => {
                        const text = document.querySelector(selector).getBoundingClientRect();
                        return mount.left < text.right && mount.right > text.left && mount.top < text.bottom && mount.bottom > text.top;
                    });
                });
                assert.equal(overlap, false, `Observer overlaps text at ${width}`);
                for (const id of ['focus-title', 'systems-map', 'recent-work', 'evidence-ledger', 'project-registry']) {
                    assert.equal(await page.locator(`#${id}`).isVisible(), true);
                }
                const registry = page.locator('#registry-temper');
                await registry.locator('summary').focus();
                await page.keyboard.press('Enter');
                assert.equal(await registry.locator('.registry-body').isVisible(), true);
                assert.ok((await registry.textContent()).includes('not executed'));
                await page.keyboard.press('Enter');
                const snapshot = page.locator('.metadata-snapshot');
                await snapshot.locator('summary').focus();
                await page.keyboard.press('Enter');
                assert.equal(await snapshot.locator('li').count(), JSON.parse(fs.readFileSync('data/activity.json')).repositories.length);
                await snapshot.locator('summary').focus();
                await page.keyboard.press('Enter');

                await page.locator('.site-nav a[href="#work"]').click();
                await page.waitForFunction(() => location.hash === '#work');
                await page.goBack();
                assert.equal(new URL(page.url()).hash, '#main');
                await page.locator('.featured a[href="/case-studies/cipherloop.html#current-contract"]').click();
                assert.equal(new URL(page.url()).pathname, '/case-studies/cipherloop.html');
                assert.equal(new URL(page.url()).hash, '#current-contract');
                await page.goBack();
                await page.locator('.shadow-feature a[href="/case-studies/shadow.html"]').click();
                assert.equal(new URL(page.url()).pathname, '/case-studies/shadow.html');
                await page.goBack();
                await page.locator('#now a[href="/research.html"]').click();
                assert.equal(new URL(page.url()).pathname, '/research.html');
                await page.goBack();
                assert.equal(await page.locator('.mastery-intro a[href^="mailto:"]').isVisible(), true);
                assert.equal(await page.locator('#contact h2').isVisible(), true);
            } else if (label === 'case') {
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
            if (label === 'shadow') {
                await page.locator('.case-nav a[href="#evidence"]').click();
                await page.waitForFunction(() => location.hash === '#evidence');
            }
            if (label === 'research') {
                const argument = await page.locator('main').innerText();
                researchArgument ??= argument;
                assert.equal(argument, researchArgument, 'Same research argument at every width');
                assert.equal(await page.locator('.research-spine > li').count(), 4);
                assert.equal(await page.locator('.research-questions > li').count(), 5);
                assert.ok((await page.locator('#e7-1').innerText()).includes('D / inconclusive'));
                assert.ok((await page.locator('#frontier').innerText()).includes('Not run'));
                assert.equal(await page.locator('script[src]').count(), 0);
                assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://www.jaysystems.dev/research');
                for (const anchor of await page.locator('.research-contents a').all()) {
                    const href = await anchor.getAttribute('href');
                    await anchor.focus();
                    assert.equal(await anchor.evaluate(el => getComputedStyle(el).outlineStyle), 'solid');
                    await page.keyboard.press('Enter');
                    await page.waitForFunction(hash => location.hash === hash, href);
                    assert.equal(await page.locator(href).isVisible(), true);
                }
                assert.ok(
                    (await page.locator('#evidence a[href*="github.com/jayjz/machine-native-systems"]').count()) >= 10,
                    'Canonical evidence remains inspectable'
                );
                assert.deepEqual(
                    researchRequests.filter(url => /api\.github\.com|\/data\/.*\.json|\.js(?:\?|$)/.test(url)),
                    []
                );
                for (const href of ['/index.html#work', '/index.html#top']) {
                    await page.locator(`.site-header a[href="${href}"]`).click();
                    assert.equal(new URL(page.url()).hash, href.split('.html')[1]);
                    await page.goBack();
                }
                assert.deepEqual(localFailures, []);
            }
            if (label === 'home' || label === 'shadow') {
                assert.equal(await page.locator('.decision-timeline li').count(), 4);
                assert.equal(await page.locator('.timeline-rejected').isVisible(), true);
            }
            await page.emulateMedia({ reducedMotion: 'reduce' });
            assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
            if (label === 'home') {
                await page.waitForFunction(() => getComputedStyle(document.querySelector('.observer-head')).transform === 'none');
                assert.equal(await page.locator('.observer-mount').evaluate(el => el.getAnimations({ subtree: true }).length), 0);
            }
            if (label === 'case')
                assert.equal(await page.locator('.system-figure').evaluate(el => getComputedStyle(el, '::after').animationName), 'none');
            await page.emulateMedia({ reducedMotion: 'no-preference' });
            await page.goto(base + route, { waitUntil: 'networkidle' });
            if (width === 320 || width === 390 || width === 1440 || (label === 'research' && width === 768)) {
                await page.screenshot({ path: path.join(out, `after-${label}-${width}.png`), fullPage: true });
                await page.screenshot({ path: path.join(out, `viewport-${label}-${width}.png`) });
                if (label === 'home') {
                    for (const section of [
                        'about',
                        'principles',
                        'now',
                        'systems-map',
                        'recent-work',
                        'evidence-ledger',
                        'project-registry'
                    ]) {
                        await page.locator(`#${section}`).screenshot({ path: path.join(out, `${section}-${width}.png`) });
                    }
                }
                const featureVisual =
                    label === 'home'
                        ? '.evidence-flow'
                        : label === 'shadow'
                          ? '.decision-timeline'
                          : label === 'research'
                            ? '.research-spine'
                            : '.system-figure';
                await page.locator(featureVisual).screenshot({ path: path.join(out, `diagram-${label}-${width}.png`) });
                if (label === 'research') {
                    for (const id of ['position', 'e4', 'e4-1', 'e7', 'e7-1', 'frontier', 'questions', 'limits', 'evidence']) {
                        await page.locator(`#${id}`).screenshot({ path: path.join(out, `${id}-research-${width}.png`) });
                    }
                }
                if (label === 'case') await page.locator('.evidence-output').screenshot({ path: path.join(out, `evidence-${width}.png`) });
            }
            assert.deepEqual(errors, []);
            results.push({ page: label, width, axeViolations: axe.violations.length, ...metrics });
            await context.close();
        }
        const modes =
            label === 'research'
                ? ['no-js', 'blocked-fonts', 'reduced-at-load', 'large-text', 'large-text-320', 'offline']
                : [
                      'no-js',
                      'no-observer',
                      'blocked-fonts',
                      'reduced-at-load',
                      'blocked-image',
                      'large-text',
                      'large-text-320',
                      ...(label === 'home' ? ['blocked-character-script', 'missing-character', 'touch'] : [])
                  ];
        for (const mode of modes) {
            const context = await browser.newContext({
                viewport: { width: mode === 'large-text-320' ? 320 : 390, height: 844 },
                javaScriptEnabled: mode !== 'no-js' && mode !== 'offline',
                hasTouch: mode === 'touch',
                isMobile: mode === 'touch',
                reducedMotion: mode === 'reduced-at-load' ? 'reduce' : 'no-preference'
            });
            if (mode === 'no-observer')
                await context.addInitScript(() => {
                    delete window.IntersectionObserver;
                });
            if (mode === 'blocked-fonts') await context.route('https://fonts.**/*', route => route.abort());
            if (mode === 'offline') await context.route('https://**/*', route => route.abort());
            if (mode === 'blocked-image') await context.route('**/assets/diagrams/**', route => route.abort());
            if (mode === 'blocked-character-script') await context.route('**/js/observer.js', route => route.abort());
            if (mode === 'missing-character')
                await context.route(base + '/', async route => {
                    const response = await route.fetch();
                    const html = (await response.text()).replace(/<div class="observer-mount"[\s\S]*?<\/div>/, '');
                    await route.fulfill({ response, body: html });
                });
            const page = await context.newPage();
            const errors = [];
            page.on('pageerror', error => errors.push(error.message));
            await page.goto(base + route, { waitUntil: 'networkidle' });
            if (mode.startsWith('large-text')) await page.addStyleTag({ content: 'html { font-size: 200%; }' });
            assert.equal(await page.locator('h1').isVisible(), true);
            if (label === 'home') {
                for (const id of ['about', 'principles', 'now']) assert.equal(await page.locator(`#${id}`).isVisible(), true);
                assert.equal(await page.locator('.evidence-flow').isVisible(), true);
                assert.equal(await page.locator('#systems-map').isVisible(), true);
                assert.equal(await page.locator('#evidence-ledger').isVisible(), true);
                assert.equal(await page.locator('.fixture-table').isVisible(), true);
                if (mode.startsWith('large-text')) {
                    assert.equal(
                        await page.evaluate(() => {
                            const brand = document.querySelector('.brand').getBoundingClientRect();
                            const nav = document.querySelector('.site-nav').getBoundingClientRect();
                            return brand.bottom <= nav.top;
                        }),
                        true,
                        'Enlarged brand overlaps navigation'
                    );
                    assert.equal(await page.locator('.fixture-cell-label').first().isVisible(), true);
                    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
                    assert.deepEqual(
                        axe.violations.map(violation => violation.id),
                        [],
                        `${mode} accessibility`
                    );
                }
                if (mode !== 'missing-character') assert.equal(await page.locator('.observer-mount svg').isVisible(), true);
                if (mode === 'touch') {
                    await page.locator('.mastery-hero').dispatchEvent('pointermove', { pointerType: 'touch', clientX: 0, clientY: 0 });
                    assert.equal(
                        await page
                            .locator('.observer-pupil')
                            .first()
                            .evaluate(el => new DOMMatrix(getComputedStyle(el).transform).e),
                        0
                    );
                }
            }
            if (label === 'research') {
                assert.equal(await page.locator('main').innerText(), researchArgument, `Full research argument in ${mode}`);
                assert.equal(await page.locator('.research-spine > li').count(), 4);
                assert.equal(await page.locator('#frontier').isVisible(), true);
                assert.equal(await page.locator('#limits').isVisible(), true);
                if (mode.startsWith('large-text')) {
                    assert.equal(
                        await page
                            .locator('.brand__name')
                            .evaluate(el => el.scrollWidth <= el.clientWidth && el.scrollHeight <= el.clientHeight),
                        true,
                        'Research brand must contain enlarged text'
                    );
                    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
                    assert.deepEqual(
                        axe.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })),
                        [],
                        `${mode} research axe`
                    );
                }
                if (mode === 'reduced-at-load') {
                    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
                    assert.equal(await page.locator('main').evaluate(el => el.getAnimations({ subtree: true }).length), 0);
                }
                for (const anchor of await page.locator('.research-contents a').all()) {
                    await anchor.focus();
                    await page.keyboard.press('Enter');
                    assert.equal(new URL(page.url()).hash, await anchor.getAttribute('href'));
                }
                await page.locator('.brand').focus();
                await page.keyboard.press('Enter');
                await page.waitForURL('**/index.html#top');
                assert.equal(new URL(page.url()).pathname, '/index.html');
                await page.goBack();
                await page.goto(base + route, { waitUntil: 'networkidle' });
                if (mode.startsWith('large-text')) await page.addStyleTag({ content: 'html { font-size: 200%; }' });
            }
            if (label === 'home' || label === 'shadow') {
                assert.equal(await page.locator('.decision-timeline').isVisible(), true);
                const bounds = await page.locator('.decision-timeline li').evaluateAll(items =>
                    items.map(el => {
                        const r = el.getBoundingClientRect();
                        return { left: r.left, right: r.right };
                    })
                );
                assert.ok(
                    bounds.every(r => r.left >= 0 && r.right <= (mode === 'large-text-320' ? 320 : 390)),
                    'Timeline reflow'
                );
            }
            if (label === 'case')
                assert.equal(
                    await page.locator('.system-figure img').evaluate(el => el.complete && el.naturalWidth > 0),
                    mode !== 'blocked-image'
                );
            assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
            await page.keyboard.press('Tab');
            await page.keyboard.press('Enter');
            assert.equal(await page.locator('#main').evaluate(el => el === document.activeElement), true);
            if (label === 'home') {
                const temperSummary = page.locator('#registry-temper summary');
                await temperSummary.focus();
                await page.keyboard.press('Enter');
                assert.equal(await page.locator('#registry-temper .registry-body').isVisible(), true);
                await page.keyboard.press('Enter');
            }
            assert.equal(await page.locator('a[href="mailto:datawizardpros@gmail.com"]').first().isVisible(), true);
            if (label === 'home')
                assert.equal(
                    await page.locator('.work-card').evaluateAll(cards => cards.every(el => getComputedStyle(el).opacity === '1')),
                    true
                );
            results.push({ page: label, mode, result: 'pass' });
            assert.deepEqual(errors, [], `${label} page errors in ${mode}`);
            if (label === 'home') await page.screenshot({ path: path.join(out, `${mode}-home.png`), fullPage: true });
            if (label === 'research') {
                await page.goto(base + route, { waitUntil: 'networkidle' });
                if (mode.startsWith('large-text')) await page.addStyleTag({ content: 'html { font-size: 200%; }' });
                await page.screenshot({ path: path.join(out, `${mode}-research.png`), fullPage: true });
                await page.screenshot({ path: path.join(out, `${mode}-research-viewport.png`) });
                for (const id of ['position', 'frontier', 'limits']) {
                    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
                    await page.screenshot({ path: path.join(out, `${mode}-${id}-research-viewport.png`) });
                }
            }
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
