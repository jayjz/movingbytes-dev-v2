const fs = require('node:fs/promises');
const prettier = require('prettier');
const assert = require('node:assert/strict');
const { load } = require('./lib/portfolio-data.cjs');
const { render } = require('./lib/render-portfolio.cjs');
async function renderPage() {
    const sections = render(load());
    const original = await fs.readFile('index.html', 'utf8');
    let output = original;
    for (const [name, html] of Object.entries(sections)) {
        const pattern = new RegExp(`<!-- portfolio:${name}:start -->[\\s\\S]*?<!-- portfolio:${name}:end -->`, 'g');
        assert.equal([...output.matchAll(pattern)].length, 1, `Expected one ${name} slot`);
        output = output.replace(pattern, () => `<!-- portfolio:${name}:start -->\n${html}\n<!-- portfolio:${name}:end -->`);
    }
    output = await prettier.format(output, { ...(await prettier.resolveConfig('index.html')), parser: 'html' });
    if (process.argv.includes('--check')) assert.equal(output, original, 'Generated HTML is stale: npm run data:render');
    else await fs.writeFile('index.html', output);
    console.log('Portfolio data and static sections: valid');
}
renderPage().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
});
