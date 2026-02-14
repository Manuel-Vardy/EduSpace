// EduSpace Main Script

// Immediately add js-enabled class to ensure CSS hides elements before they are scrolled into view
document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation - Robust Version
    // Select any element that has 'scroll-reveal' class OR starts with 'animate-' OR has 'mobile-border-pulse'
    const revealElements = document.querySelectorAll('.scroll-reveal, [class*="animate-"], .mobile-border-pulse');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;

                // Add visible class to the element itself
                target.classList.add('visible');

                // Check if it's a specific animation class element
                // The CSS hides .animate-fade-up:not(.visible), so adding .visible fixes it.

                // ALSO: If this is a container (like .scroll-reveal), find inner animated children and reveal them
                // This handles the case: <div class="scroll-reveal"><h3 class="animate-fade-down">...</h3></div>
                const innerAnimated = target.querySelectorAll('[class*="animate-"]');
                innerAnimated.forEach(child => {
                    child.classList.add('visible');
                });

                // Optional: Stop observing once revealed
                observer.unobserve(target);
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Reduced threshold for better sensitivity
        rootMargin: "0px" // Trigger immediately when it enters viewport
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Handle Hero Section Specifically (Bootstrap Carousel)
    const heroCarouselEl = document.getElementById('heroCarousel');
    if (heroCarouselEl) {
        // Initialize Bootstrap Carousel
        const carousel = new bootstrap.Carousel(heroCarouselEl, {
            interval: 6000,
            pause: false
        });

        // Trigger initial slide animations
        const initialActive = heroCarouselEl.querySelector('.carousel-item.active');
        if (initialActive) {
            const animatedChildren = initialActive.querySelectorAll('[class*="animate-"]');
            animatedChildren.forEach(child => child.classList.add('visible'));
        }
    }

    // 3. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
            if (scrollTop < lastScrollTop) {
                // Scrolling Up
                navbar.classList.add('scrolled-visible');
            } else {
                // Scrolling Down
                navbar.classList.remove('scrolled-visible');
            }
        } else {
            navbar.classList.remove('scrolled', 'scrolled-visible');
        }

        lastScrollTop = scrollTop;
    });

    // 4. Mobile Menu Toggle
    const menuToggle = document.querySelector('.navbar-toggler');
    const navContent = document.getElementById('navbarNav');

    if (menuToggle && navContent) {
        const bsCollapse = new bootstrap.Collapse(navContent, {
            toggle: false
        });

        menuToggle.addEventListener('click', () => {
            bsCollapse.toggle();
        });
    }

    // 5. Number Counter Animation for About Page Stats
    const countElements = document.querySelectorAll('.stat-number[data-target]');

    if (countElements.length > 0) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const targetValue = parseInt(target.getAttribute('data-target'));
                    const duration = 2000;
                    let startTime = null;

                    const animate = (timestamp) => {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        const currentCount = Math.floor(progress * targetValue);

                        target.textContent = currentCount;

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            target.textContent = targetValue;
                        }
                    };

                    requestAnimationFrame(animate);
                    countObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        countElements.forEach(el => countObserver.observe(el));
    }
});


// 3. Testimonials Auto-Scroll with Step-based Pause
const tickerContainer = document.querySelector('.testimonials-ticker-container');
if (tickerContainer) {
    let scrollAmount = 0;
    let isPaused = false;
    const speed = 0.5; // Pixels per frame

    function scrollTicker() {
        if (!isPaused) {
            tickerContainer.scrollLeft += speed;

            // Infinite Loop Logic: If scrolled past half (duplicate set starts), reset
            // Note: We assume the content is duplicated 50/50
            if (tickerContainer.scrollLeft >= tickerContainer.scrollWidth / 2) {
                tickerContainer.scrollLeft = 0;
            }
        }
        requestAnimationFrame(scrollTicker);
    }

    // Start Scroll
    scrollTicker();

    // Pause on Interaction
    tickerContainer.addEventListener('mouseenter', () => isPaused = true);
    tickerContainer.addEventListener('mouseleave', () => isPaused = false);
    tickerContainer.addEventListener('touchstart', () => isPaused = true, { passive: true });
    tickerContainer.addEventListener('touchend', () => setTimeout(() => isPaused = false, 1000), { passive: true });
    // Note: setTimeout on touchend gives user time to finish swipe before auto-scroll fights back
}
