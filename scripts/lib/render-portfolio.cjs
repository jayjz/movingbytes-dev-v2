const escape = value =>
    String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const a = (url, label) => `<a href="${escape(url)}">${escape(label)}</a>`;
const badge = status => `<span class="evidence-state state-${status}">${escape(status)}</span>`;
function render({ projects: registry, research, activity }) {
    const projects = registry.projects.filter(p => p.visibility === 'public');
    const project = id => projects.find(p => p.id === id);
    const projectLinks = ids => ids.map(id => a(`#registry-${id}`, project(id).name)).join(' · ');
    const focus = `<section class="live-focus" aria-labelledby="focus-title"><div class="container">
        <div><p class="eyebrow">Current focus / ${escape(research.thesis.name)}</p><h2 id="focus-title">${escape(research.thesis.statement)}</h2>
        <p class="live-muted">${escape(research.thesis.scope)}</p></div>
        <div class="focus-notes">${research.focus.map(f => `<article><h3>${escape(f.title)}</h3><p>${escape(f.text)}</p><p class="live-meta">${projectLinks(f.projects)}</p></article>`).join('')}</div>
        <nav class="live-nav" aria-label="Portfolio system"><a href="#systems-map">Systems map ↘</a><a href="#recent-work">Recent work ↘</a><a href="#evidence-ledger">Evidence ledger ↘</a><a href="#project-registry">Project registry ↘</a></nav>
        </div></section>`;
    const map = `<section id="systems-map" class="section live-system" aria-labelledby="systems-title"><div class="container">
        <p class="eyebrow">Systems map / authored relationships</p><h2 id="systems-title">Different systems. Shared questions.</h2>
        <p class="live-lead">${escape(research.thesis.name)} is the research direction. The systems below explore evidence, authority and bounded execution at different layers.</p>
        <ol class="system-lanes">${research.relationships.map((r, i) => `<li class="system-lane lane-${r.kind}"><span class="live-meta">0${i + 1} / ${escape({ artifact: 'Artifact handoff', theme: 'Shared design concern', question: 'Research question' }[r.kind])}</span><h3>${projectLinks([r.from, r.to])}</h3><p>${escape(r.label)}</p>${a(r.evidence, 'Relationship evidence ↗')}</li>`).join('')}</ol>
        <p class="live-muted">Only the artifact handoff describes an implemented connection. Shared concerns and research questions do not imply runtime dependencies.</p>
        </div></section>`;
    const recent = `<section id="recent-work" class="section live-system" aria-labelledby="recent-title"><div class="container"><p class="eyebrow">Recent work / selected movement</p><h2 id="recent-title">What changed, and what it means.</h2>
        <p class="live-lead">Curated engineering notes explain meaningful changes. The separate GitHub snapshot reports repository metadata only.</p>
        <ol class="work-notes">${[...research.notes]
            .sort((x, y) => y.date.localeCompare(x.date))
            .map(
                n =>
                    `<li><p class="live-meta"><time datetime="${n.date}">${n.date}</time> · Curated note</p><h3>${a(n.url, n.title)}</h3><p>${escape(n.text)}</p><p class="live-meta">${projectLinks(n.projects)}</p></li>`
            )
            .join('')}</ol>
        <details class="metadata-snapshot"><summary>Generated GitHub snapshot · ${activity.generatedAt ? escape(activity.generatedAt.slice(0, 10)) : 'not collected'}</summary><p class="live-muted">${activity.generatedAt ? `Collected ${escape(activity.generatedAt)}. Stored snapshot; not live status.` : 'No successful refresh yet. Curated notes and evidence remain available.'} Push times may include other branches. No claims or verification status are derived from this metadata.</p>
        <ul>${activity.repositories.map(r => `<li>${a(`https://github.com/${r.slug}/commit/${r.headSha}`, `${r.slug.split('/')[1]} · ${r.headSha.slice(0, 7)}`)}<span>Repository pushed <time datetime="${r.pushedAt}">${r.pushedAt.slice(0, 10)}</time>${r.archived ? ' · Archived on GitHub' : ''}</span></li>`).join('')}</ul></details></div></section>`;
    const ledger = `<section id="evidence-ledger" class="section live-system" aria-labelledby="ledger-title"><div class="container"><p class="eyebrow">Evidence ledger / bounded observations</p><h2 id="ledger-title">Status belongs to a claim.</h2><p class="live-lead">Experimental marks an investigation. Implemented means source exists. Verified is scoped to a recorded check. Historical is a frozen result. Unverified remains an open question.</p>
        <ul class="evidence-ledger">${research.ledger.map(e => `<li>${badge(e.status)}<div><h3>${a(`#registry-${e.project}`, project(e.project).name)}</h3><p>${escape(e.text)}</p>${a(e.url, 'Inspect evidence and limits ↗')}</div></li>`).join('')}</ul></div></section>`;
    const archive = `<section id="project-registry" class="section live-system" aria-labelledby="registry-title"><div class="container"><p id="research" class="eyebrow">Project registry / experimental → applied → earlier research</p><h2 id="registry-title">The wider body of work.</h2><p class="live-lead">Pinned descriptions and maturity are curated independently of GitHub activity. Open a record for its role, source and limitations.</p>
        <div class="project-registry">${projects.map(p => `<details id="registry-${p.id}"><summary><span${p.selection === 'archive' ? ` id="${p.id}"` : ''}>${escape(p.name)}</span><span class="live-meta">${escape(p.category)} / ${escape(p.selection)}</span>${badge(p.status)}</summary><div class="registry-body"><p>${escape(p.description)}</p><p><strong>System role:</strong> ${escape(p.role)}</p><p class="live-muted">${escape(p.limits)}</p><p class="live-meta">Public source · Pinned revision <code>${p.revision.slice(0, 7)}</code>${p.lastMeaningfulUpdate ? ` · Meaningful update ${escape(p.lastMeaningfulUpdate)}` : ''}</p><p>${a(p.repository.url, `${p.name} repository ↗`)} · ${p.evidence.map(e => a(e.url, e.label)).join(' · ')}</p></div></details>`).join('')}</div></div></section>`;
    return { focus, system: map + recent + ledger + archive };
}
module.exports = { render, escape };
