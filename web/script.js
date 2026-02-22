/* ============================================
   DUNE.X — Website Interactions
   "Future your Performance."
   ============================================ */

(function () {
    'use strict';

    // ---- DOM Elements ----
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.menu-link');
    const fadeElements = document.querySelectorAll('.fade-up');
    const sections = document.querySelectorAll('.section');
    const specNumbers = document.querySelectorAll('.spec-number[data-target]');

    // ---- Navigation Scroll State ----
    let lastScrollY = 0;

    function handleNavScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 80) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }

        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ---- Menu Toggle ----
    let menuOpen = false;

    function toggleMenu() {
        menuOpen = !menuOpen;

        navToggle.classList.toggle('nav-toggle--active', menuOpen);
        menuOverlay.classList.toggle('menu-overlay--active', menuOpen);
        document.body.style.overflow = menuOpen ? 'hidden' : '';
    }

    navToggle.addEventListener('click', toggleMenu);

    menuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (menuOpen) {
                toggleMenu();
            }
        });
    });

    // ---- Scroll-Triggered Fade Animations ----
    const fadeObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    fadeElements.forEach(function (el) {
        fadeObserver.observe(el);
    });

    // ---- Section Background Parallax + Reveal ----
    const sectionObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });

    // ---- Parallax on Scroll ----
    function handleParallax() {
        const scrollY = window.scrollY;

        sections.forEach(function (section) {
            var bg = section.querySelector('.section-bg img');
            if (!bg) return;

            var rect = section.getBoundingClientRect();
            var sectionTop = rect.top;
            var sectionHeight = rect.height;

            if (sectionTop < window.innerHeight && sectionTop > -sectionHeight) {
                var progress = (window.innerHeight - sectionTop) / (window.innerHeight + sectionHeight);
                var offset = (progress - 0.5) * 60;
                bg.style.transform = 'scale(1.05) translateY(' + offset + 'px)';
            }
        });
    }

    window.addEventListener('scroll', handleParallax, { passive: true });

    // ---- Animated Stat Counters ----
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        specNumbers.forEach(function (el) {
            var target = parseFloat(el.dataset.target);
            var isDecimal = el.dataset.decimal === 'true';
            var duration = 2000;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);

                // Ease out cubic
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = target * eased;

                if (isDecimal) {
                    el.textContent = current.toFixed(1);
                } else {
                    el.textContent = Math.floor(current);
                }

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    if (isDecimal) {
                        el.textContent = target.toFixed(1);
                    } else {
                        el.textContent = target;
                    }
                }
            }

            requestAnimationFrame(step);
        });
    }

    var specsSection = document.getElementById('specs');
    if (specsSection) {
        var specsObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounters();
                    }
                });
            },
            { threshold: 0.3 }
        );

        specsObserver.observe(specsSection);
    }

    // ---- Keyboard: Escape closes menu ----
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menuOpen) {
            toggleMenu();
        }
    });

})();
