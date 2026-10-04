const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const states = ['experimental', 'implemented', 'verified', 'historical', 'unverified'];
const slugPattern = /^jayjz\/[A-Za-z0-9_.-]+$/;
const shaPattern = /^[a-f0-9]{40}$/;
function object(value, keys) {
    assert.ok(value && typeof value === 'object' && !Array.isArray(value), 'Expected object');
    assert.deepEqual(Object.keys(value).sort(), keys.split(' ').sort(), 'Unexpected or missing fields');
}
function text(value) {
    assert.ok(typeof value === 'string' && value.trim().length > 0 && value.length <= 1200, 'Invalid text');
}
function list(value, max = 40) {
    assert.ok(Array.isArray(value) && value.length <= max, 'Invalid list');
}
function date(value) {
    assert.ok(
        typeof value === 'string' &&
            /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z)?$/.test(value) &&
            Number.isFinite(Date.parse(value)),
        'Invalid date'
    );
    assert.equal(new Date(value).toISOString().slice(0, 10), value.slice(0, 10), 'Invalid calendar date');
}
function link(value) {
    text(value);
    assert.ok(
        /^\/(?:docs|case-studies)\/[\w/.-]+(?:#[\w-]+)?$/.test(value) || /^https:\/\/github\.com\/jayjz\/[\w./-]+(?:#[\w-]+)?$/.test(value),
        'Unsafe link'
    );
    assert.ok(!value.includes('..'), 'Unsafe path');
}
function version(value) {
    assert.equal(value.version, 1);
}
function validateConfig(config, registry) {
    object(config, 'version repositories');
    version(config);
    list(config.repositories, 12);
    assert.ok(config.repositories.length > 0);
    assert.equal(new Set(config.repositories).size, config.repositories.length);
    for (const slug of config.repositories) {
        assert.match(slug, slugPattern);
        assert.ok(
            registry.projects.some(p => p.visibility === 'public' && p.repository?.slug === slug),
            'Repository must be public and registered'
        );
    }
}
function validateProjects(registry) {
    object(registry, 'version projects');
    version(registry);
    list(registry.projects);
    const ids = new Set();
    for (const p of registry.projects) {
        object(
            p,
            'id name repository category status description role visibility selection revision evidence limits' +
                ('lastMeaningfulUpdate' in p ? ' lastMeaningfulUpdate' : '')
        );
        assert.match(p.id, /^[a-z][a-z0-9-]*$/);
        assert.ok(!ids.has(p.id));
        ids.add(p.id);
        for (const key of ['name', 'description', 'role', 'limits']) text(p[key]);
        assert.ok(['public', 'private'].includes(p.visibility));
        if (p.visibility === 'private') {
            assert.equal(p.repository, null, 'Private repository identifiers must not enter public data');
            assert.equal(p.revision, null);
            assert.deepEqual(p.evidence, []);
        } else {
            object(p.repository, 'slug url');
            assert.match(p.repository.slug, slugPattern);
            assert.equal(p.repository.url, `https://github.com/${p.repository.slug}`);
            assert.match(p.revision, shaPattern);
            list(p.evidence);
            assert.ok(p.evidence.length);
            for (const e of p.evidence) {
                object(e, 'label url');
                text(e.label);
                link(e.url);
            }
        }
        assert.ok(['experimental', 'applied', 'research'].includes(p.category));
        assert.ok(states.includes(p.status));
        assert.ok(['featured', 'supporting', 'archive'].includes(p.selection));
        if ('lastMeaningfulUpdate' in p) date(p.lastMeaningfulUpdate);
    }
}
function validateResearch(research, registry) {
    object(research, 'version thesis focus relationships ledger notes');
    version(research);
    object(research.thesis, 'name statement scope');
    Object.values(research.thesis).forEach(text);
    const reference = id =>
        assert.ok(
            registry.projects.some(p => p.id === id && p.visibility === 'public'),
            'Unknown or private project'
        );
    const references = ids => {
        list(ids, 6);
        assert.ok(ids.length);
        ids.forEach(reference);
    };
    list(research.focus, 3);
    for (const f of research.focus) {
        object(f, 'title text projects');
        text(f.title);
        text(f.text);
        references(f.projects);
    }
    list(research.relationships, 12);
    for (const r of research.relationships) {
        object(r, 'from to kind label evidence');
        reference(r.from);
        reference(r.to);
        assert.notEqual(r.from, r.to);
        assert.ok(['artifact', 'theme', 'question'].includes(r.kind));
        text(r.label);
        link(r.evidence);
    }
    list(research.ledger, 12);
    for (const e of research.ledger) {
        object(e, 'project status text url');
        reference(e.project);
        assert.ok(states.includes(e.status));
        text(e.text);
        link(e.url);
    }
    list(research.notes, 6);
    for (const n of research.notes) {
        object(n, 'date projects title text url');
        date(n.date);
        references(n.projects);
        text(n.title);
        text(n.text);
        link(n.url);
    }
}
function validateActivity(activity, config) {
    object(activity, 'version generatedAt repositories');
    version(activity);
    list(activity.repositories, 12);
    if (activity.generatedAt === null) {
        assert.deepEqual(activity.repositories, []);
        return;
    }
    date(activity.generatedAt);
    assert.deepEqual(
        activity.repositories.map(r => r.slug),
        config.repositories,
        'Snapshot must cover the ordered allowlist'
    );
    for (const r of activity.repositories) {
        object(r, 'slug defaultBranch headSha pushedAt archived');
        assert.match(r.slug, slugPattern);
        text(r.defaultBranch);
        assert.match(r.headSha, shaPattern);
        date(r.pushedAt);
        assert.equal(typeof r.archived, 'boolean');
        assert.ok(Date.parse(r.pushedAt) <= Date.parse(activity.generatedAt), 'Future push time');
    }
}
function load(root = process.cwd(), { validateSnapshot = true } = {}) {
    const read = name => JSON.parse(fs.readFileSync(path.join(root, 'data', `${name}.json`), 'utf8'));
    const data = {
        projects: read('projects'),
        research: read('research'),
        config: read('github'),
        activity: validateSnapshot ? read('activity') : null
    };
    validateProjects(data.projects);
    validateConfig(data.config, data.projects);
    validateResearch(data.research, data.projects);
    if (validateSnapshot) validateActivity(data.activity, data.config);
    return data;
}
module.exports = { states, object, date, validateProjects, validateConfig, validateResearch, validateActivity, load };
