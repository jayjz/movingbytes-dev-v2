// Read-only live response capture. No deployment or external redirect following.
const fs = require('node:fs');
const path = require('node:path');
const routes = [
    '/',
    '/index.html',
    '/case-studies/cipherloop',
    '/case-studies/cipherloop.html',
    '/case-studies/cipherloop/',
    '/case-studies/shadow',
    '/case-studies/shadow.html',
    '/case-studies/shadow/',
    '/css/style.css',
    '/css/style.css?v=20260907-evidence',
    '/js/main.js',
    '/js/main.js?v=20260907-evidence',
    '/assets/diagrams/investigation-topology.svg',
    '/assets/diagrams/cipherloop-architecture.svg',
    '/work/aetherforge',
    '/work/aetherforge.html',
    '/work/unhinged',
    '/work/unhinged.html',
    '/work/hvac-ops',
    '/work/hvac-ops.html'
];
(async () => {
    const responses = [];
    for (const url of ['https://jaysystems.dev/', ...routes.map(route => 'https://www.jaysystems.dev' + route)]) {
        const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
        const headers = {};
        for (const name of ['location', 'cache-control', 'content-type', 'etag', 'age', 'server', 'x-vercel-cache']) {
            if (response.headers.has(name)) headers[name] = response.headers.get(name);
        }
        const entry = { url, status: response.status, headers };
        responses.push(entry);
        await response.body?.cancel();
        console.log(JSON.stringify(entry));
    }
    const output = path.resolve(process.env.HOSTED_QA_OUTPUT || 'test-results/hosted.json');
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(
        output,
        JSON.stringify(
            { checked_at: new Date().toISOString(), note: 'Read-only deployed responses. Local changes may not be deployed.', responses },
            null,
            2
        ) + '\n'
    );
})().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
