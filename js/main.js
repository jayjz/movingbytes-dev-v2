(() => {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    function initSmoothScroll() {
        $$('a[href^="#"]').forEach(link => {
            link.addEventListener('click', event => {
                const href = link.getAttribute('href');
                if (!href || href === '#') return;

                const target = $(href);
                if (!target) return;

                event.preventDefault();

                const header = $('.site-header');
                const headerOffset = header ? header.offsetHeight : 0;
                const y = target.getBoundingClientRect().top + window.scrollY - headerOffset - 16;

                window.scrollTo({
                    top: Math.max(0, y),
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            });
        });
    }

    function initReveal() {
        const cards = $$('.work-card');
        if (!cards.length) return;

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            cards.forEach(el => {
                el.classList.add('is-visible');
            });
            return;
        }

        document.documentElement.classList.add('js-reveal');

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        );

        cards.forEach(card => observer.observe(card));
    }

    initSmoothScroll();
    initReveal();
})();
