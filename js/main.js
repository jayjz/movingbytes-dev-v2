(() => {
    'use strict';

    function followFragment() {
        let id;
        try {
            id = decodeURIComponent(location.hash.slice(1));
        } catch {
            return;
        }
        const target = id && document.getElementById(id);
        if (!target) return;
        // The visible native link is also the no-JS compatibility path.
        const onward = target.matches('.legacy-entry') && target.querySelector('a');
        if (onward) {
            location.replace(onward.href);
            return;
        }
        for (let ancestor = target; ancestor; ancestor = ancestor.parentElement) {
            if (ancestor.tagName === 'DETAILS') ancestor.open = true;
        }
        target.scrollIntoView();
    }
    followFragment();
    window.addEventListener('hashchange', followFragment);

    // Native anchors retain focus, fragments, and history. Content never waits for JS.
    if (!('IntersectionObserver' in window) || !window.matchMedia) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const figures = document.querySelectorAll('[data-signal]');
    let observer;

    function configureMotion() {
        observer?.disconnect();
        figures.forEach(figure => figure.classList.remove('is-observed'));
        if (motion.matches) return;

        observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-observed');
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.2 }
        );
        figures.forEach(figure => observer.observe(figure));
    }

    configureMotion();
    motion.addEventListener('change', configureMotion);
})();
