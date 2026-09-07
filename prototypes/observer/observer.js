(() => {
    'use strict';
    const mount = document.querySelector('.observer-mount');
    if (!mount || !window.matchMedia) return;
    const button = mount.querySelector('.observer-character');
    const toggle = mount.querySelector('.observer-motion');
    const head = mount.querySelector('.observer-head');
    const pupils = [...mount.querySelectorAll('.observer-pupil')];
    const eyes = [...mount.querySelectorAll('.observer-eye')];
    const hero = document.querySelector('.ledger-hero');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    let paused = false;
    let visible = true;
    let frame = 0;
    let blinkTimer = 0;
    let resetTimer = 0;
    let previousTime = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let animations = [];
    const enabled = () => !paused && !reduced.matches && visible && !document.hidden;
    const clamp = n => Math.max(-1, Math.min(1, n));

    function paint() {
        pupils.forEach((pupil, i) => {
            const range = i === 0 ? 7 : 4;
            pupil.style.transform = `translate(${x * range}px, ${y * range * 0.65}px)`;
        });
        head.style.transform = `rotate(${x * 1.6}deg)`;
    }
    function settle(time) {
        frame = 0;
        if (!enabled()) return;
        const dt = Math.min(time - previousTime || 16, 50);
        previousTime = time;
        const approach = 1 - Math.exp(-dt / 105);
        x += (targetX - x) * approach;
        y += (targetY - y) * approach;
        paint();
        if (Math.abs(x - targetX) + Math.abs(y - targetY) > 0.002) frame = requestAnimationFrame(settle);
    }
    function look(nx, ny) {
        if (!enabled()) return;
        targetX = clamp(nx);
        targetY = clamp(ny);
        if (!frame) {
            previousTime = performance.now();
            frame = requestAnimationFrame(settle);
        }
    }
    function cancelExpressions() {
        animations.forEach(animation => animation.cancel());
        animations = [];
    }
    function blink(greeting = false) {
        if (!enabled() || !eyes[0].animate) return;
        cancelExpressions();
        eyes.forEach((eye, i) => {
            animations.push(
                eye.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(.08)', offset: 0.4 }, { transform: 'scaleY(1)' }], {
                    duration: greeting ? 340 : 190,
                    delay: i * 25,
                    easing: 'ease-in-out'
                })
            );
        });
    }
    function scheduleBlink() {
        clearTimeout(blinkTimer);
        if (!enabled()) return;
        blinkTimer = setTimeout(
            () => {
                blink();
                scheduleBlink();
            },
            3600 + Math.random() * 3800
        );
    }
    function neutral() {
        clearTimeout(resetTimer);
        look(0, 0);
    }
    function configure() {
        clearTimeout(blinkTimer);
        clearTimeout(resetTimer);
        cancelAnimationFrame(frame);
        frame = 0;
        cancelExpressions();
        x = y = targetX = targetY = 0;
        paint();
        button.disabled = reduced.matches;
        button.setAttribute('aria-label', paused ? 'Greet the Observer (motion paused)' : 'Greet the Observer');
        toggle.hidden = reduced.matches;
        toggle.textContent = paused ? 'Resume motion' : 'Pause motion';
        scheduleBlink();
    }
    button.disabled = false;
    toggle.hidden = false;
    hero.addEventListener(
        'pointermove',
        event => {
            if (!fine.matches || event.pointerType === 'touch' || event.buttons || !enabled()) return;
            if (window.getSelection()?.toString()) return;
            const r = button.getBoundingClientRect();
            look((event.clientX - r.left - r.width / 2) / 350, (event.clientY - r.top - r.height / 2) / 240);
        },
        { passive: true }
    );
    hero.addEventListener('pointerleave', neutral);
    hero.addEventListener('pointercancel', neutral);
    hero.addEventListener('focusin', event => {
        if (event.target === toggle) return;
        const a = button.getBoundingClientRect();
        const b = event.target.getBoundingClientRect();
        look((b.left + b.width / 2 - a.left - a.width / 2) / 350, (b.top - a.top) / 240);
    });
    hero.addEventListener('focusout', neutral);
    button.addEventListener('click', () => {
        if (!enabled()) return;
        clearTimeout(resetTimer);
        look(-0.45, -0.25);
        blink(true);
        resetTimer = setTimeout(neutral, 700);
    });
    toggle.addEventListener('click', () => {
        paused = !paused;
        configure();
    });
    reduced.addEventListener('change', configure);
    fine.addEventListener('change', neutral);
    document.addEventListener('visibilitychange', configure);
    window.addEventListener('pagehide', () => {
        visible = false;
        configure();
    });
    window.addEventListener('pageshow', () => {
        visible = true;
        configure();
    });
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(
            entries => {
                visible = entries[0].isIntersecting;
                configure();
            },
            { threshold: 0.15 }
        ).observe(mount);
    }
    configure();
})();
