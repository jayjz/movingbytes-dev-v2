const { escape } = require('./render-portfolio.cjs');
// Editorial grouping is deliberate. Activity metadata never chooses collections.
const collections = [
    {
        id: 'investigate',
        label: 'Investigation and evidence',
        question: 'Can an agent’s investigation remain independently inspectable?',
        mechanism: ['Producer', 'Saved evidence', 'Independent reader'],
        overview:
            'CipherLoop produces an execution record. TraceForge reads the ledger and metadata without importing the producer’s runtime.',
        scope: 'Recorded offline ingestion uses scripted tool responses. Integrity checks establish neither live security-detection accuracy nor target safety.',
        projects: ['cipherloop', 'traceforge'],
        study: '/case-studies/cipherloop.html#current-contract',
        studyLabel: 'Read the investigation study',
        detail: 'cipherloop-details',
        detailLabel: 'Artifact walkthrough and historical controls'
    },
    {
        id: 'decide',
        label: 'Decisions and authority',
        question: 'When is a decision authorized to become an action?',
        mechanism: ['Observation available', 'Signal created', 'Execution eligible', 'Risk admitted'],
        overview:
            'SHAD0W separates chronological availability, simulation lifecycle and an independent paper-risk gate. Eligibility alone does not grant execution authority.',
        scope: 'Pinned source and regression tests were inspected, not rerun for the site. This is a technical research simulator; profitability and live-capital trading are unverified.',
        projects: ['shadow'],
        study: '/case-studies/shadow.html',
        studyLabel: 'Read the decision study',
        detail: 'shadow-details',
        detailLabel: 'Inspect the execution timeline'
    },
    {
        id: 'coordinate',
        label: 'Coordination and infrastructure',
        question: 'How can agent workloads meet constrained compute?',
        mechanism: ['Request', 'Lease / thermal / capacity gates', 'Admit or reject'],
        overview:
            'AetherForge checks bounded admission and switching economics before a strategy is applied. A capacity rejection supplies a retry interval; permission to retry is not a successful admission.',
        scope: 'Four controlled mock probes and five route tests were recorded. Physical GPU fast-swap behavior, hardware recovery and performance benefits remain unverified.',
        projects: ['aetherforge', 'unhinged'],
        study: '/work/evidence.html#aetherforge',
        studyLabel: 'Explore the admission instrument',
        detail: 'unhinged',
        detailLabel: 'A related device-boundary prototype'
    }
];
function renderLibrary({ projects: registry, research }) {
    const projects = registry.projects.filter(p => p.visibility === 'public');
    const project = id => projects.find(p => p.id === id);
    const summary = id => {
        const p = project(id);
        if (!p) return '';
        return `<li data-library-project="${escape(p.id)}"><div class="library-project__heading"><h3><a href="/work/evidence.html#registry-${escape(p.id)}">${escape(p.name)}</a></h3><span class="live-meta">${escape(p.status)}</span></div><p>${escape(p.role)}</p><p class="library-project__limit">${escape(p.limits)}</p></li>`;
    };
    const primary = collections
        .map(
            (c, i) =>
                `<section id="${c.id}" class="library-collection" aria-labelledby="${c.id}-title"><header class="collection-heading"><p class="door-number">0${i + 1} / ${escape(c.id)}</p><h2 id="${c.id}-title">${escape(c.label)}</h2><p class="collection-question">${escape(c.question)}</p></header><div class="collection-body"><ol class="collection-path" aria-label="Mechanism">${c.mechanism.map(m => `<li>${escape(m)}</li>`).join('')}</ol><p class="collection-overview">${escape(c.overview)}</p><ul class="library-projects">${c.projects.map(summary).join('')}</ul><p class="collection-scope">${escape(c.scope)}</p><div class="collection-links"><a class="ledger-link" href="${c.study}">${c.studyLabel} <span aria-hidden="true">↗</span></a><a href="/work/evidence.html#${c.detail}">${c.detailLabel} →</a></div></div></section>`
        )
        .join('');
    return `${primary}<div class="library-secondary"><section id="applied-field" aria-labelledby="applied-field-title"><p class="editorial-label">Beyond the three doors</p><h2 id="applied-field-title">Applied field systems</h2><p>Explicit state, carried into preparation for physical work.</p><ul class="library-projects">${summary('truck-ready')}</ul><a href="/work/evidence.html#truck-ready">Read the field-system record →</a></section><section id="open-questions" aria-labelledby="open-questions-title"><p class="editorial-label">Research</p><h2 id="open-questions-title">Research and open questions</h2><ul class="library-projects">${summary('temper')}<li><div class="library-project__heading"><h3><a href="/research.html">${escape(research.thesis.name)}</a></h3><span class="live-meta">research</span></div><p>${escape(research.thesis.statement)}</p><p class="library-project__limit">An engineering direction, not a scientific result. The full study distinguishes recorded experiments, inconclusive results and work not run.</p></li></ul><a href="/index.html#model-question">Return to the TEMPER exploration →</a></section><section id="historical-work" aria-labelledby="historical-title"><p class="editorial-label">Earlier investigations</p><h2 id="historical-title">Historical work</h2><p>Prototypes and methods retained with their original limits.</p><ul class="library-projects">${['evidence-strategy', 'fracture', 'sightglass'].map(summary).join('')}</ul></section></div>`;
}
module.exports = { renderLibrary };
