// Local-only static preview. Vercel headers and redirects are tested separately.
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = process.cwd();
const port = Number(process.env.PORT || 8000);
const types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.json': 'application/json',
    '.txt': 'text/plain'
};
const server = http.createServer(async (req, res) => {
    try {
        const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
        let file = path.resolve(root, '.' + pathname);
        if (pathname.endsWith('/')) file = path.join(file, 'index.html');
        file = await fs.realpath(file);
        if (!file.startsWith(root + path.sep)) throw new Error('Outside preview root');
        const body = await fs.readFile(file);
        res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
        res.end(body);
    } catch {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});
server.listen(port, '127.0.0.1', () => console.log(`Portfolio preview: http://127.0.0.1:${port}`));
