/* The radio/CSS instrument works without this optional enhancement. */
(() => {
    const instrument = document.querySelector('.af-instrument');
    if (!instrument) return;
    const status = instrument.querySelector('.af-announcement');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let transition;
    motion.addEventListener('change', () => {
        if (motion.matches) transition?.cancel();
    });
    instrument.querySelector('.af-selector').addEventListener('change', event => {
        const control = event.target;
        if (!control.matches('input[type="radio"]')) return;
        const panel = document.getElementById(control.getAttribute('aria-controls'));
        transition?.cancel();
        status.textContent = [
            panel.getAttribute('aria-label'),
            panel.querySelector('.af-verdict').textContent,
            panel.querySelector('.af-reason').textContent,
            panel.querySelector('.af-code').textContent,
            panel.querySelector('.af-active').textContent
        ]
            .map(text => text.trim().replace(/\s+/g, ' '))
            .join('. ');
        const path = panel.querySelector('.af-propagation span');
        if (!motion.matches && path.animate) {
            transition = path.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
                duration: 220,
                easing: 'ease-out'
            });
        }
    });
    function selectLinkedCase() {
        const id = location.hash.slice(1);
        const control = [...instrument.querySelectorAll('input[type="radio"]')].find(
            input => input.id === id || input.getAttribute('aria-controls') === id
        );
        if (!control) return;
        control.checked = true;
        control.dispatchEvent(new Event('change', { bubbles: true }));
        document.getElementById(id).scrollIntoView();
    }
    selectLinkedCase();
    instrument.dataset.permalinkReady = 'true';
    window.addEventListener('hashchange', selectLinkedCase);
})();
