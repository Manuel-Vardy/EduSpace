document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero') || document.querySelector('.page-header');

    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                const currentScrollY = window.scrollY;
                const scrollThreshold = 50;

                if (currentScrollY < scrollThreshold) {
                    navbar.classList.remove('scrolled', 'scrolled-visible');
                } else {
                    navbar.classList.add('scrolled');

                    // Direction detection with 5px buffer to prevent jitter on mobile devices
                    const scrollDelta = lastScrollY - currentScrollY;

                    if (scrollDelta > 5) {
                        // Scrolling UP - Show fixed navbar
                        navbar.classList.add('scrolled-visible');
                    } else if (scrollDelta < -5) {
                        // Scrolling DOWN - Hide fixed navbar
                        navbar.classList.remove('scrolled-visible');
                    }
                }

                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Handle scroll-reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
});
