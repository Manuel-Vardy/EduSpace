document.addEventListener('DOMContentLoaded', function () {
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
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: scrollRevealThreshold,
        rootMargin: '0px 0px -80px 0px' // Delay until element is well into viewport
    });

    const animationSelector = '.scroll-reveal, [class*="animate-fade-"]';
    document.querySelectorAll(animationSelector).forEach(el => observer.observe(el));

    // Generic Ticker Function for Testimonials and Partners
    const initTicker = (containerSelector, trackSelector, speed = 0.5) => {
        const container = document.querySelector(containerSelector);
        const track = document.querySelector(trackSelector);

        if (container && track) {
            let isInteracting = false;

            const step = () => {
                if (!isInteracting) {
                    container.scrollLeft += speed;

                    // Infinite Loop: Reset when half scrolled
                    if (container.scrollLeft >= track.scrollWidth / 2) {
                        container.scrollLeft = 0;
                    }
                }
                requestAnimationFrame(step);
            };

            // Start the loop
            requestAnimationFrame(step);

            // Interruption listeners
            const startInteracting = () => { isInteracting = true; };
            const endInteracting = () => {
                isInteracting = false;
                // Seamless loop snap-back
                if (container.scrollLeft >= track.scrollWidth / 2) {
                    container.scrollLeft -= track.scrollWidth / 2;
                }
            };

            container.addEventListener('mouseenter', startInteracting);
            container.addEventListener('mouseleave', endInteracting);
            container.addEventListener('touchstart', startInteracting, { passive: true });
            container.addEventListener('touchend', endInteracting, { passive: true });
            container.addEventListener('touchcancel', endInteracting, { passive: true });
        }
    };

    // Initialize Tickers
    initTicker('.testimonials-ticker-container', '.testimonials-ticker-track', 0.5);
    initTicker('.partners-ticker-container', '.partners-ticker-track', 0.4);
});
