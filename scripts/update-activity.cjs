// Anonymous, bounded, allowlisted metadata only. Never reads credentials or commit messages.
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const { load, validateActivity } = require('./lib/portfolio-data.cjs');
async function request(url, fetcher = fetch) {
    const response = await fetcher(url, {
        headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
        redirect: 'error',
        signal: AbortSignal.timeout(5000)
    });
    assert.equal(response.status, 200, 'GitHub request failed');
    assert.ok(response.headers.get('content-type')?.includes('application/json'), 'Expected JSON');
    assert.ok(Number(response.headers.get('content-length') || 0) <= 262144, 'Oversized response');
    let size = 0;
    const chunks = [];
    for await (const chunk of response.body) {
        size += chunk.length;
        assert.ok(size <= 262144, 'Oversized response');
        chunks.push(chunk);
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
async function refresh({ root = process.cwd(), fetcher = fetch, now = () => new Date().toISOString() } = {}) {
    const { config } = load(root, { validateSnapshot: false }); // Validate all editorial inputs before any network/write.
    const repositories = [];
    for (const slug of config.repositories) {
        const base = `https://api.github.com/repos/${slug}`;
        const repo = await request(base, fetcher);
        assert.equal(repo.private, false, 'Non-public repository rejected');
        assert.equal(repo.visibility, 'public', 'Non-public repository rejected');
        assert.equal(repo.full_name, slug, 'Repository identity mismatch');
        assert.equal(repo.html_url, `https://github.com/${slug}`);
        assert.ok(
            typeof repo.default_branch === 'string' && repo.default_branch.length > 0 && repo.default_branch.length <= 200,
            'Invalid default branch'
        );
        const commit = await request(`${base}/commits/${encodeURIComponent(repo.default_branch)}`, fetcher);
        repositories.push({
            slug,
            defaultBranch: repo.default_branch,
            headSha: commit.sha,
            pushedAt: repo.pushed_at,
            archived: repo.archived
        });
    }
    const candidate = { version: 1, generatedAt: now(), repositories };
    validateActivity(candidate, config);
    const target = path.join(root, 'data/activity.json');
    const temporary = `${target}.${process.pid}.tmp`;
    try {
        await fs.writeFile(temporary, JSON.stringify(candidate, null, 4) + '\n', { flag: 'wx' });
        await fs.rename(temporary, target);
    } finally {
        await fs.rm(temporary, { force: true });
    }
    return candidate;
}
if (require.main === module)
    refresh()
        .then(() => console.log('Public metadata snapshot refreshed. Run npm run data:render and review the diff.'))
        .catch(() => {
            // Do not echo untrusted response text or potentially private API details.
            console.error('Refresh rejected: unavailable, non-public or invalid GitHub data. Previous snapshot preserved.');
            process.exitCode = 1;
        });
module.exports = { refresh, request };
