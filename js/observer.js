(() => {
    'use strict';

    // The original loupe is decorative. Its complete static SVG is the fallback.
    // Only direct pointer/focus activity moves it; no idle loop or greeting UI.
    const hero = document.querySelector('.mastery-hero');
    const mount = hero?.querySelector('.observer-mount');
    const head = mount?.querySelector('.observer-head');
    const pupils = mount?.querySelectorAll('.observer-pupil');
    if (!head || !pupils?.length || !window.matchMedia) return;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let last = 0;
    const clamp = value => Math.max(-1, Math.min(1, value));

    function paint() {
        pupils.forEach((pupil, i) => {
            const range = i === 0 ? 7 : 4;
            pupil.style.transform = `translate(${x * range}px, ${y * range * 0.65}px)`;
        });
        head.style.transform = `rotate(${x * 1.6}deg)`;
    }
    function reset() {
        cancelAnimationFrame(frame);
        frame = 0;
        x = y = targetX = targetY = 0;
        paint();
    }
    function settle(time) {
        frame = 0;
        if (reduced.matches || document.hidden) return reset();
        const approach = 1 - Math.exp(-Math.min(time - last || 16, 50) / 105);
        last = time;
        x += (targetX - x) * approach;
        y += (targetY - y) * approach;
        paint();
        if (Math.abs(x - targetX) + Math.abs(y - targetY) > 0.002) frame = requestAnimationFrame(settle);
    }
    function look(nx, ny) {
        if (reduced.matches || document.hidden) return;
        targetX = clamp(nx);
        targetY = clamp(ny);
        if (!frame) {
            last = performance.now();
            frame = requestAnimationFrame(settle);
        }
    }
    function toward(clientX, clientY) {
        const bounds = mount.getBoundingClientRect();
        look((clientX - bounds.left - bounds.width / 2) / 350, (clientY - bounds.top - bounds.height / 2) / 240);
    }
    hero.addEventListener(
        'pointermove',
        event => {
            if (!fine.matches || event.pointerType === 'touch' || event.buttons || window.getSelection()?.toString()) return;
            toward(event.clientX, event.clientY);
        },
        { passive: true }
    );
    hero.addEventListener('pointerleave', () => look(0, 0));
    hero.addEventListener('pointercancel', reset);
    hero.addEventListener('focusin', event => {
        const bounds = event.target.getBoundingClientRect();
        toward(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
    });
    hero.addEventListener('focusout', () => look(0, 0));
    reduced.addEventListener('change', reset);
    fine.addEventListener('change', reset);
    document.addEventListener('visibilitychange', reset);
    window.addEventListener('pagehide', reset);
    window.addEventListener('pageshow', reset);
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(entries => {
            if (!entries[0].isIntersecting) reset();
        }).observe(mount);
    }
})();
