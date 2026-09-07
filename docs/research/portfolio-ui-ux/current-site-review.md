# Current-site design review

Reviewed locally on 2026-09-07: `index.html`, `case-studies/cipherloop.html`, `css/style.css`, `docs/design-system.md`, `docs/project-evidence.md`, and CipherLoop QA records. This is a design assessment, not a new source audit or a claim about the deployed site.

## Retain

- **Systems Observatory identity:** the near-black, bone-white, restrained orange palette, large editorial display type, mono labels, technical borders, and one animated diagram rule form a coherent identity distinct from generic SaaS pages.
- **Flagship hierarchy:** CipherLoop receives substantially more space than the secondary project index. Its study has a direct homepage route, canonical metadata, source links, limitations, and a desktop sticky section index.
- **Evidence discipline:** source permalinks, declared mock boundaries, architecture diagrams labelled by scope, and recorded QA make the portfolio more credible than a generic feature list.
- **Static-first engineering:** semantic HTML, lightweight CSS/JS, no hidden reveal content, normal-flow header, no-JS usability, and the existing validation/browser-QA harness are all worth preserving.
- **Responsive intent:** deliberate mobile stacking, fluid display typography, 44px interaction targets, `prefers-reduced-motion`, and checks for doubled text/blocked assets directly support the stated direction.

## Improve when evidence and approved assets permit

- **First-viewport proposition:** “Intelligent systems. Real constraints.” is memorable but broad. A future content pass should test a tighter supporting sentence that names the work and signals the evidence-first posture before the visitor scrolls.
- **Project entry cards:** give each featured entry an at-a-glance role, problem/constraint, evidence maturity, and one appropriate artifact. The five secondary descriptions should remain scoped until independently verified; do not invent visual output for them.
- **Case-study skim layer:** preserve the current long evidence path but add a compact fact/evidence panel near the hero that lets a recruiter understand scope, role, revision, verification layer, and what remains untested in one glance.
- **Artifact strategy:** replace or supplement conceptual diagrams only with owner-approved, real screenshots, test outputs, code excerpts, or source-derived diagrams. Captions should state what each proves and what it does not.
- **Reading rhythm:** test whether repeated eyebrow/status patterns, long citation clusters, and dense evidence sections can be reduced into a clearer cadence without hiding limitations. Keep mono for metadata rather than long explanatory copy.
- **Contact path:** the header and footer contact link are already discoverable. A future design brief can decide whether a project-specific closing action should be “contact,” “view source,” or both based on audience intent.

## Do not change merely for novelty

- Do not add 3D canvases, continuous scroll effects, a framework, analytics/tracking, a carousel, or a novel cursor to imitate current portfolios.
- Do not replace the dark/orange identity unless a tested direction materially improves evidence hierarchy and reading.
- Do not use claims of reliability, production readiness, performance, customer use, or security outcomes beyond the evidence register.
