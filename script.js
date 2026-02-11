document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    // Fallback for other pages or if button is missing
    const hero = document.querySelector('.hero') || document.querySelector('.page-header');

    let lastScrollY = window.scrollY;
    // Default trigger slightly deeper if no elements found to prevent immediate flicker
    let triggerPoint = 300;

    function updateTriggerPoint() {
        if (hero) {
            // Trigger after passing the entire hero/header section
            // This aligns with "Our Services" or the next content section
            triggerPoint = hero.offsetTop + hero.offsetHeight;
        }
    }

    // Calculate initial trigger point
    updateTriggerPoint();
    // Re-calculate on resize
    window.addEventListener('resize', updateTriggerPoint);

    window.addEventListener('scroll', function () {
        const currentScrollY = window.scrollY;

        // Logic:
        // 1. Above Trigger Point: Navbar determines its own fate (Absolute position). 
        //    It scrolls naturally with the page. We ensure '.scrolled' is removed so it's not fixed.
        // 2. Below Trigger Point:
        //    - Scrolling UP: Show navbar (Fixed, Dark Background -> add 'scrolled').
        //    - Scrolling DOWN: Hide navbar (Remove 'scrolled' -> reverts to Absolute/Hidden).

        // Activation threshold: after scrolling past the first 50px (height of top-bar + small buffer).
        const scrollThreshold = 50;

        if (currentScrollY < scrollThreshold) {
            navbar.classList.remove('scrolled', 'scrolled-visible');
        } else {
            // We are past original position, navbar becomes fixed (scrolled).
            navbar.classList.add('scrolled');

            // Check scroll direction for visibility
            if (currentScrollY < lastScrollY) {
                // Scrolling UP - Show fixed navbar
                navbar.classList.add('scrolled-visible');
            } else {
                // Scrolling DOWN - Hide fixed navbar
                navbar.classList.remove('scrolled-visible');
            }
        }

        lastScrollY = currentScrollY;
    });
});
