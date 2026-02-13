document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('js-ready');
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero') || document.querySelector('.page-header');

    let lastScrollY = window.scrollY;
    let ticking = false;

    if (navbar) {
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    const currentScrollY = window.scrollY;
                    const scrollThreshold = 50;

                    if (currentScrollY < scrollThreshold) {
                        navbar.classList.remove('scrolled', 'scrolled-visible');
                    } else {
                        navbar.classList.add('scrolled');

                        // Direction detection with 5px buffer
                        const scrollDelta = lastScrollY - currentScrollY;

                        if (scrollDelta > 5) {
                            navbar.classList.add('scrolled-visible');
                        } else if (scrollDelta < -5) {
                            navbar.classList.remove('scrolled-visible');
                        }
                    }

                    lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Unified Scroll Reveal Animation
    const scrollRevealThreshold = window.innerWidth < 768 ? 0.25 : 0.15;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: scrollRevealThreshold,
        rootMargin: '0px 0px -80px 0px' // Delay until element is well into viewport
    });

    const animationSelector = '.scroll-reveal, [class*="animate-fade-"]';
    document.querySelectorAll(animationSelector).forEach(el => observer.observe(el));
});
