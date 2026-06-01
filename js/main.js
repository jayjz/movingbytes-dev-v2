(() => {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    /*
     * Smooth anchor scrolling
     */
    function initSmoothScroll() {
        $$('a[href^="#"]').forEach(link => {
            link.addEventListener('click', event => {
                const href = link.getAttribute('href');
                if (!href || href === '#') return;

                const target = $(href);
                if (!target) return;

                event.preventDefault();

                const nav = $('.site-nav');
                const navOffset = nav ? nav.offsetHeight : 0;
                const y = target.getBoundingClientRect().top + window.pageYOffset - navOffset - 16;

                window.scrollTo({
                    top: y,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            });
        });
    }

    /*
     * Scroll reveal with stagger
     */
    function initReveal() {
        const items = $$('.work-featured, .work-card, .capability, .principle, .contact-action, .hero__rail-item');
        if (!items.length) return;

        items.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(32px)';
            el.dataset.revealIndex = i;
        });

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const index = parseInt(el.dataset.revealIndex || '0', 10);
                const delay = Math.min(index * 60, 300);
                
                el.style.transition = prefersReducedMotion
                    ? 'none'
                    : `opacity 900ms cubic-bezier(0.19, 1, 0.22, 1) ${delay}ms, transform 900ms cubic-bezier(0.19, 1, 0.22, 1) ${delay}ms`;
                
                requestAnimationFrame(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
                
                obs.unobserve(el);
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        });

        items.forEach(el => observer.observe(el));
    }

    /*
     * Kinetic hero parallax
     */
    function initHeroParallax() {
        if (prefersReducedMotion || isTouchDevice) return;
        
        const hero = $('.hero');
        const title = $('.hero__title');
        const copy = $('.hero__copy');
        const rail = $('.hero__rail');
        const particles = $('#particles');
        
        if (!hero || !title) return;
        
        let ticking = false;
        
        function updateParallax() {
            const rect = hero.getBoundingClientRect();
            const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
            const eased = 1 - Math.pow(1 - progress, 3);
            
            if (title) {
                title.style.transform = `translateY(${eased * -30}px)`;
                title.style.opacity = String(1 - eased * 0.15);
            }
            if (copy) copy.style.transform = `translateY(${eased * -15}px)`;
            if (rail) rail.style.transform = `translateY(${eased * -20}px)`;
            if (particles) particles.style.transform = `translateY(${eased * 40}px)`;
            
            ticking = false;
        }
        
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', onScroll, { passive: true });
        updateParallax();
    }

    /*
     * Enhanced custom cursor with magnetic effect
     */
    function initCursor() {
        if (prefersReducedMotion || isTouchDevice) return;

        const cursor = $('.cursor');
        const dot = $('.cursor-dot', cursor || document);
        const ring = $('.cursor-ring', cursor || document);
        const trail = $('.cursor-trail');

        if (!cursor || !dot || !ring) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;
        let dotX = mouseX;
        let dotY = mouseY;
        let rafId = null;
        let magneticTarget = null;

        function onMove(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }

        function tick() {
            // Magnetic attraction to interactive elements
            let targetX = mouseX;
            let targetY = mouseY;
            
            if (magneticTarget) {
                const rect = magneticTarget.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const dist = Math.hypot(mouseX - centerX, mouseY - centerY);
                const maxDist = Math.max(rect.width, rect.height) * 0.8;
                
                if (dist < maxDist) {
                    const pull = 1 - (dist / maxDist);
                    targetX = mouseX + (centerX - mouseX) * pull * 0.15;
                    targetY = mouseY + (centerY - mouseY) * pull * 0.15;
                }
            }
            
            dotX += (targetX - dotX) * 0.35;
            dotY += (targetY - dotY) * 0.35;
            ringX += (targetX - ringX) * 0.12;
            ringY += (targetY - ringY) * 0.12;
            
            dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
            ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
            
            rafId = window.requestAnimationFrame(tick);
        }

        document.addEventListener('mousemove', onMove, { passive: true });
        
        $$('a, button, .work-card, .work-featured, .contact-action').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                magneticTarget = el;
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                magneticTarget = null;
            });
        });

        // Trail effect
        if (trail) {
            let trailPoints = [];
            const maxTrail = 8;
            
            function updateTrail() {
                trailPoints.unshift({ x: dotX, y: dotY });
                if (trailPoints.length > maxTrail) trailPoints.pop();
                
                trail.innerHTML = trailPoints.map((p, i) => 
                    `<div style="position:absolute;left:${p.x}px;top:${p.y}px;width:2px;height:2px;
                     background:rgba(255,255,255,${0.15 - i * 0.015});border-radius:50%;
                     transform:translate(-50%,-50%);pointer-events:none"></div>`
                ).join('');
            }
            
            setInterval(updateTrail, 32);
        }

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

    /*
     * Subtle particles
     */
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

        window.addEventListener('mousemove', e => {
            pointerX = e.clientX;
            pointerY = e.clientY;
        }, { passive: true });

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

    /*
     * Keyboard nav helper
     */
    function initInputMode() {
        document.addEventListener('keydown', e => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }

    initSmoothScroll();
    initReveal();
    initHeroParallax();
    initCursor();
    initParticles();
    initInputMode();
})();