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
            }
        });
    }, {
        threshold: scrollRevealThreshold,
        rootMargin: '0px 0px -80px 0px' // Delay until element is well into viewport
    });

    const animationSelector = '.scroll-reveal, [class*="animate-fade-"]';
    document.querySelectorAll(animationSelector).forEach(el => observer.observe(el));

    // Testimonial Ticker Interactive Auto-Scroll
    const tickerContainer = document.querySelector('.testimonials-ticker-container');
    const tickerTrack = document.querySelector('.testimonials-ticker-track');

    if (tickerContainer && tickerTrack) {
        let isInteracting = false;
        let scrollSpeed = 0.5; // Pixels per frame

        const step = () => {
            if (!isInteracting) {
                tickerContainer.scrollLeft += scrollSpeed;

                // Infinite Loop: Reset when half scrolled
                // We scroll the container, and the track contains two identical sets.
                // Reset to 0 when we've scrolled past the first set.
                if (tickerContainer.scrollLeft >= tickerTrack.scrollWidth / 2) {
                    tickerContainer.scrollLeft = 0;
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
            // If user swiped past the halfway point, snap them back to the first set
            // so the loop remains infinite and seamless.
            if (tickerContainer.scrollLeft >= tickerTrack.scrollWidth / 2) {
                tickerContainer.scrollLeft -= tickerTrack.scrollWidth / 2;
            }
        };

        tickerContainer.addEventListener('mouseenter', startInteracting);
        tickerContainer.addEventListener('mouseleave', endInteracting);
        tickerContainer.addEventListener('touchstart', startInteracting, { passive: true });
        tickerContainer.addEventListener('touchend', endInteracting, { passive: true });
        tickerContainer.addEventListener('touchcancel', endInteracting, { passive: true });
    }
});
