document.addEventListener('DOMContentLoaded', () => {

    // Loader fade out + pop in homepage
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.pointerEvents = 'none';
            document.body.classList.add('loaded');
        }, 2500); // Loader animation duration
    }

    // Ripple Effect
    const homepageHero = document.getElementById('home'); // Target the header with id="home"
    if (homepageHero) {
        homepageHero.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.classList.add('ripple-circle');

            // Append to the ripple-container within the hero
            const rippleContainer = this.querySelector('.ripple-container');
            if (rippleContainer) {
                rippleContainer.appendChild(ripple);

                // Position the ripple at the click location relative to the ripple-container
                const rect = rippleContainer.getBoundingClientRect();
                ripple.style.left = (e.clientX - rect.left) + 'px';
                ripple.style.top = (e.clientY - rect.top) + 'px';

                // Remove the ripple after its animation finishes
                ripple.addEventListener('animationend', function() {
                    ripple.remove();
                });
            }
        });
    }

    // Light/Dark mode toggle
    const modeToggle = document.getElementById('mode-toggle');
    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                modeToggle.textContent = '☀️';
            } else {
                modeToggle.textContent = '🌙';
            }
        });
    }

    // Back to Top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
    }

    // Chart.js for Stats Section
    const ctx = document.getElementById('salesChart');
    if (ctx) { // Ensure canvas element exists
        const salesChart = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Monthly Sales (Units)',
                    data: [120, 150, 180, 220, 280, 350, 400],
                    backgroundColor: 'rgba(233, 30, 99, 0.2)',
                    borderColor: 'rgba(233, 30, 99, 1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 8
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#555' }
                    },
                    x: {
                        ticks: { color: '#555' }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#e91e63',
                            font: { size: 16 }
                        }
                    }
                }
            }
        });
    }

    // Customer Section Logic
    const customerSection = document.getElementById('customers');
    if (customerSection) {
        const logoGridContainer = customerSection.querySelector('.logo-grid-container');
        const customerCtaWrapper = customerSection.querySelector('.customer-cta-wrapper');
        const ctaTextSpan = document.getElementById('ctaText');
        const ctaFullText = "Meet our customers "; // Space at the end for the arrow
        let textIndex = 0;

        // Array of your customer logo image filenames
        // IMPORTANT: Replace these with actual paths to your logo images in the 'logos' folder
        const customerLogos = [
            'logos/logo-brex.png', // Example placeholder, replace with your image
            'logos/logo-runway.png', // Example placeholder
            'logos/logo-supercell.png', // Example placeholder
            'logos/logo-retool.png', // Example placeholder
            'logos/logo-openai.png', // Example placeholder
            'logos/logo-cashapp.png' // Example placeholder
        ];

        let currentLogoSet = [];
        const logosPerSet = 4; // Display 4 logos at a time
        const fadeDuration = 500; // milliseconds for fade in/out
        const displayDuration = 3000; // milliseconds logos are visible before changing

        function displayNextLogoSet() {
            // Clear existing logos
            logoGridContainer.innerHTML = '';
            currentLogoSet = [];

            // Pick 'logosPerSet' random unique logos
            const shuffledLogos = [...customerLogos].sort(() => 0.5 - Math.random());
            const selectedLogos = shuffledLogos.slice(0, logosPerSet);

            // Create and append logo elements
            selectedLogos.forEach((logoSrc, index) => {
                const img = document.createElement('img');
                img.src = logoSrc;
                img.alt = `Customer Logo ${index + 1}`;
                img.classList.add('customer-logo');
                logoGridContainer.appendChild(img);
                currentLogoSet.push(img);

                // Trigger fade-in after a slight delay
                setTimeout(() => {
                    img.classList.add('visible');
                }, index * 150); // Staggered fade-in
            });
        }

        function typeCtaText() {
            if (textIndex < ctaFullText.length) {
                ctaTextSpan.textContent += ctaFullText.charAt(textIndex);
                textIndex++;
                setTimeout(typeCtaText, 70); // Typing speed
            } else {
                // Once typing is done, slide in the button
                // On mobile, the button might already be visible due to CSS media query
                setTimeout(() => {
                    customerCtaWrapper.classList.add('active');
                }, 500); // Delay before button slides in
            }
        }

        // Initial display of logos and start the typing effect
        displayNextLogoSet();
        typeCtaText();

        // Set interval to change logo sets
        setInterval(() => {
            // First, fade out current logos
            currentLogoSet.forEach(img => {
                img.classList.remove('visible');
            });

            // After fade out, display new set
            setTimeout(() => {
                displayNextLogoSet();
            }, fadeDuration);

        }, displayDuration + fadeDuration); // Total time before next change
    }

    // Initialize AOS (Animate On Scroll)
    AOS.init();
});