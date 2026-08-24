(() => {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    function initSmoothScroll() {
        $$('a[href^="#"]').forEach(link => {
            link.addEventListener('click', event => {
                const href = link.getAttribute('href');
                if (!href || href === '#') return;

                if (link.hasAttribute('data-systems-open') || href === '#systems') return;

                const target = $(href);
                if (!target) return;

                event.preventDefault();

                const nav = $('.site-nav');
                const navOffset = nav ? nav.offsetHeight : 0;
                const y = target.getBoundingClientRect().top + window.scrollY - navOffset - 16;

                window.scrollTo({
                    top: y,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            });
        });
    }

    function initReveal() {
        const cards = $$('.work-card, .capability-card, .principle, .contact-link');
        if (!cards.length) return;

        cards.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = prefersReducedMotion
                ? 'none'
                : 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)';
        });

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    obs.unobserve(entry.target);
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        );

        cards.forEach(card => observer.observe(card));
    }

    function initCursor() {
        if (prefersReducedMotion || isTouchDevice) return;

        const cursor = $('.cursor');
        const dot = $('.cursor-dot', cursor || document);
        const ring = $('.cursor-ring', cursor || document);

        if (!cursor || !dot || !ring) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;
        let rafId = null;

        function onMove(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        }

        function tick() {
            ringX += (mouseX - ringX) * 0.16;
            ringY += (mouseY - ringY) * 0.16;
            ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
            rafId = window.requestAnimationFrame(tick);
        }

        document.addEventListener('mousemove', onMove, { passive: true });

        $$('a, button, .work-card, .contact-link, .deep-dive-trigger, .glossary-link').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

        tick();

        document.addEventListener('visibilitychange', () => {
            if (document.hidden && rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            } else if (!document.hidden && !rafId) {
                tick();
            }
        });
    }

    function initParticles() {
        if (prefersReducedMotion) return;

        const canvas = $('#particles');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        let particles = [];
        let rafId = null;
        let pointerX = -9999;
        let pointerY = -9999;

        const particleCount = () => {
            const area = window.innerWidth * window.innerHeight;
            if (area < 500000) return 22;
            if (area < 900000) return 32;
            return 42;
        };

        function resize() {
            width = window.innerWidth;
            height = Math.max(window.innerHeight, canvas.parentElement?.offsetHeight || window.innerHeight);

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            particles = Array.from({ length: particleCount() }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.18,
                vy: (Math.random() - 0.5) * 0.18,
                r: Math.random() * 1.8 + 0.6,
                a: Math.random() * 0.28 + 0.08
            }));
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const dx = pointerX - p.x;
                const dy = pointerY - p.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < 14000) {
                    p.vx -= dx * 0.00001;
                    p.vy -= dy * 0.00001;
                }

                p.x += p.vx;
                p.y += p.vy;

                p.vx *= 0.995;
                p.vy *= 0.995;

                if (p.x < -20) p.x = width + 20;
                if (p.x > width + 20) p.x = -20;
                if (p.y < -20) p.y = height + 20;
                if (p.y > height + 20) p.y = -20;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 245, 212, ${p.a})`;
                ctx.fill();
            }

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        const alpha = (1 - dist / 110) * 0.045;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            rafId = requestAnimationFrame(draw);
        }

        window.addEventListener(
            'mousemove',
            e => {
                pointerX = e.clientX;
                pointerY = e.clientY;
            },
            { passive: true }
        );

        window.addEventListener('mouseleave', () => {
            pointerX = -9999;
            pointerY = -9999;
        });

        window.addEventListener('resize', resize, { passive: true });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden && rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            } else if (!document.hidden && !rafId) {
                draw();
            }
        });

        resize();
        draw();
    }

    function initInputMode() {
        document.addEventListener('keydown', e => {
            if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
        });
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }

    /*
     * Systems Glossary Panel & Semantic Bridge
     */
    function initSystemsPanel() {
        const panel = document.getElementById('systems-panel');
        const trigger = document.getElementById('systems-trigger');
        if (!panel || !trigger) return;

        let lastFocus = null;
        let isOpen = false;

        const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        function getFocusable() {
            return Array.from(panel.querySelectorAll(focusableSelector)).filter(
                el => !el.hasAttribute('disabled') && el.getClientRects().length > 0
            );
        }

        function openPanel() {
            if (isOpen) return;
            isOpen = true;
            lastFocus = document.activeElement;

            panel.removeAttribute('hidden');
            document.documentElement.style.overflow = 'hidden';

            requestAnimationFrame(() => {
                panel.classList.add('is-open');
                const focusables = getFocusable();
                if (focusables.length) focusables[0].focus();
            });
        }

        function closePanel() {
            if (!isOpen) return;
            isOpen = false;

            panel.classList.remove('is-open');
            document.documentElement.style.overflow = '';

            const onTransitionEnd = event => {
                if (event.target !== panel && event.target !== panel.querySelector('.systems-panel__content')) return;
                panel.setAttribute('hidden', '');
                panel.removeEventListener('transitionend', onTransitionEnd);
            };
            panel.addEventListener('transitionend', onTransitionEnd);

            setTimeout(() => {
                if (!isOpen) {
                    panel.setAttribute('hidden', '');
                    panel.removeEventListener('transitionend', onTransitionEnd);
                }
            }, 500);

            if (lastFocus && typeof lastFocus.focus === 'function') {
                lastFocus.focus();
            } else {
                trigger.focus();
            }
        }

        trigger.addEventListener('click', e => {
            e.preventDefault();
            openPanel();
        });

        // Semantic Bridge: Inline Glossary Links
        document.addEventListener('click', e => {
            const link = e.target.closest('.glossary-link');
            if (!link) return;

            e.preventDefault();
            const targetId = link.getAttribute('data-target');

            openPanel();

            const searchInput = document.getElementById('glossary-search');
            if (searchInput) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
            }

            requestAnimationFrame(() => {
                const targetEntry = document.getElementById(targetId);
                if (targetEntry) {
                    setTimeout(() => {
                        targetEntry.scrollIntoView({
                            behavior: prefersReducedMotion ? 'auto' : 'smooth',
                            block: 'center'
                        });
                        targetEntry.classList.add('is-highlighted');
                        setTimeout(() => targetEntry.classList.remove('is-highlighted'), 2500);
                    }, 100);
                }
            });
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Enter' && document.activeElement.classList.contains('glossary-link')) {
                document.activeElement.click();
            }

            const isMod = e.metaKey || e.ctrlKey;
            if (isMod && (e.key === 'k' || e.key === 'K')) {
                const tag = (e.target && e.target.tagName) || '';
                if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return;
                e.preventDefault();
                isOpen ? closePanel() : openPanel();
            }

            if (e.key === 'Escape' && isOpen) {
                e.preventDefault();
                closePanel();
            }
        });

        panel.addEventListener('click', e => {
            if (e.target.closest('[data-systems-close]')) {
                e.preventDefault();
                closePanel();
            }
        });

        panel.addEventListener('keydown', e => {
            if (!isOpen || e.key !== 'Tab') return;
            const focusables = getFocusable();
            if (!focusables.length) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        });
    }

    function initGlossarySearch() {
        const searchInput = document.getElementById('glossary-search');
        const items = document.querySelectorAll('.glossary-item');
        if (!searchInput) return;

        searchInput.addEventListener('input', e => {
            const query = e.target.value.toLowerCase().trim();
            items.forEach(item => {
                const text = item.innerText.toLowerCase();
                const tags = (item.getAttribute('data-tags') || '').toLowerCase();
                if (text.includes(query) || tags.includes(query)) {
                    item.classList.remove('is-hidden');
                } else {
                    item.classList.add('is-hidden');
                }
            });
        });
    }

    function initViewTransitions() {
        document.addEventListener('click', e => {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;

            const panel = document.getElementById('systems-panel');
            if (panel && panel.classList.contains('is-open')) {
                e.preventDefault();
                panel.classList.remove('is-open');
                document.documentElement.style.overflow = '';

                setTimeout(() => {
                    panel.setAttribute('hidden', '');
                    window.location.href = href;
                }, 300);
            }
        });
    }

    document.addEventListener('click', e => {
        if (e.target.classList.contains('code-copy-btn')) {
            const container = e.target.closest('.code-reveal__content, .code-block__body');
            const pre = container ? container.querySelector('pre') : null;
            if (!pre) return;

            navigator.clipboard.writeText(pre.innerText).then(() => {
                const original = e.target.innerText;
                e.target.innerText = 'Copied!';
                setTimeout(() => {
                    e.target.innerText = original;
                }, 2000);
            });
        }
    });

    initSmoothScroll();
    initReveal();
    initCursor();
    initParticles();
    initInputMode();
    initSystemsPanel();
    initGlossarySearch();
    initViewTransitions();
})();
