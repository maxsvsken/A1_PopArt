document.addEventListener('DOMContentLoaded', () => {

    // --- Burger Menu Logic ---
    const burger = document.getElementById('burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger) {
        burger.addEventListener('click', () => {
            // Just a simple toggle for mobile for now
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '-4px'; // align with border
                navLinks.style.right = '-4px';
                navLinks.style.background = '#FFFFFF';
                navLinks.style.border = '4px solid #111111';
                navLinks.style.padding = '20px';
                navLinks.style.gap = '20px';
                navLinks.style.boxShadow = '10px 10px 0px #111111';

                // Set z-index
                navLinks.style.zIndex = '999';
            }
        });
    }

    // --- Smooth Scroll for anchors ---
    document.querySelectorAll('.nav-btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }

                // Close menu on mobile
                if (window.innerWidth <= 900) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // --- Counter Animation for Stats ---
    const counters = document.querySelectorAll('.counter');
    const speed = 220; // Increased value makes it slower (more steps)

    const animateCounters = () => {
        counters.forEach(counter => {
            const animate = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace('%', '');

                // Lower inc to slow and higher to speed up
                const inc = target / speed;

                if (count < target) {
                    // count up and add %
                    counter.innerText = Math.ceil(count + inc) + '%';
                    setTimeout(animate, 10);
                } else {
                    counter.innerText = target + '%';
                }
            }
            animate();
        });
    }

    // Use Intersection Observer to trigger counter animation when in view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsStrip = document.querySelector('.stats-strip');
    if (statsStrip) {
        observer.observe(statsStrip);
    }
});
