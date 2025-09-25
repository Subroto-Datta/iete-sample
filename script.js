document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);

    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('content-container');
    const threeCanvas = document.getElementById('three-canvas-container');
    const percentageText = document.getElementById('loading-percentage');
    const progressBar = document.getElementById('progress-bar');
    
    const loadingDuration = 3000;

    let currentPercentage = 0;
    const interval = setInterval(() => {
        if (++currentPercentage <= 100) {
            percentageText.textContent = `${currentPercentage}%`;
        } else {
            clearInterval(interval);
        }
    }, loadingDuration / 100);

    setTimeout(() => { progressBar.style.transform = 'scaleX(1)'; }, 50);

    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        splashScreen.addEventListener('animationend', () => {
            document.body.style.overflow = 'auto';
            mainContent.style.opacity = '1';
            threeCanvas.style.opacity = '1';
            initScrollAnimations();
        }, { once: true });
    }, loadingDuration);
    
    function initScrollAnimations() {
        // Welcome screen text split animation
        gsap.timeline({
            scrollTrigger: {
                trigger: '#welcome-screen',
                start: 'top top',
                end: '+=50%',
                scrub: 0.5,
                pin: true,
            }
        })
        .to(gsap.utils.toArray('.welcome-line')[0], { y: '-50vh', opacity: 0 }, 0)
        .to(gsap.utils.toArray('.welcome-line')[1], { y: '50vh', opacity: 0 }, 0);

        // Introduction section element reveal animation
        gsap.timeline({
            scrollTrigger: {
                trigger: '#introduction',
                start: 'top 70%',
                toggleActions: 'play none none reverse',
            }
        })
        .to('.intro-element', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Team section card reveal animation
        gsap.timeline({
            scrollTrigger: {
                trigger: '#team',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            }
        })
        .from('.team-card', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });

         // Renaissance section element reveal animation
         gsap.timeline({
            scrollTrigger: {
                trigger: '#renaissance',
                start: 'top 70%', // Start animation a bit earlier
                toggleActions: 'play none none reverse',
            }
        })
        .from('.renaissance-element', {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2, // Animates each element 0.2s after the previous one
            ease: 'power3.out'
        });

        // Handle the CTA button click with a simple smooth scroll
        document.querySelector('.cyber-btn').addEventListener('click', (e) => {
            e.preventDefault();
            gsap.to(window, {
                duration: 1, 
                scrollTo: '#renaissance', 
                ease: 'power2.inOut' 
            });
        });
          // About Us section scrollytelling animation
          gsap.timeline({
            scrollTrigger: {
                trigger: '#about-us',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            }
        })
        .from('.about-element', {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Animated statistics counter
        gsap.utils.toArray('.stat-number').forEach(element => {
            const finalValue = parseInt(element.getAttribute('data-final-value'), 10);
            
            gsap.fromTo(element, 
                { innerText: 0 }, 
                {
                    innerText: finalValue,
                    duration: 2.5,
                    ease: 'power2.out',
                    // Use snap to round to whole numbers
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%', // Start when the number is 85% from the top
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }
});