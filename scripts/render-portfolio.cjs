const fs = require('node:fs/promises');
const prettier = require('prettier');
const assert = require('node:assert/strict');
const { load } = require('./lib/portfolio-data.cjs');
const { render } = require('./lib/render-portfolio.cjs');
const { renderLibrary } = require('./lib/render-library.cjs');
async function renderPage() {
    const data = load();
    const outputs = [];
    for (const [file, sections] of [
        ['work/evidence.html', render(data)],
        ['work/index.html', { library: renderLibrary(data) }]
    ]) {
        const original = await fs.readFile(file, 'utf8');
        let output = original;
        for (const [name, html] of Object.entries(sections)) {
            const pattern = new RegExp(`<!-- portfolio:${name}:start -->[\\s\\S]*?<!-- portfolio:${name}:end -->`, 'g');
            assert.equal([...output.matchAll(pattern)].length, 1, `${file}: expected one ${name} slot`);
            output = output.replace(pattern, () => `<!-- portfolio:${name}:start -->\n${html}\n<!-- portfolio:${name}:end -->`);
        }
        output = await prettier.format(output, { ...(await prettier.resolveConfig(file)), parser: 'html' });
        if (process.argv.includes('--check')) assert.equal(output, original, `${file}: generated HTML is stale: npm run data:render`);
        outputs.push([file, output]);
    }
    // Validate and format both pages before changing either published artifact.
    if (!process.argv.includes('--check')) for (const [file, output] of outputs) await fs.writeFile(file, output);
    console.log('Portfolio data and static sections: valid');
}
renderPage().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
});
