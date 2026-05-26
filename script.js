document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    document.querySelectorAll('a[href*="#"]:not([href^="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const url = new URL(this.href);
            if (url.hash && url.pathname === window.location.pathname) {
                e.preventDefault();
                const targetElement = document.querySelector(url.hash);
                if (targetElement) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        let currentSectionId = '';
        const navHeight = document.querySelector('.navbar').offsetHeight;
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top - navHeight - 100;
            if (sectionTop <= 0) {
                currentSectionId = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes('#' + currentSectionId)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    target.classList.add('visible');
                    const onTransitionEnd = function(event) {
                        if (event.propertyName === 'transform') {
                            target.style.transitionDelay = '';
                            target.removeEventListener('transitionend', onTransitionEnd);
                        }
                    };
                    target.addEventListener('transitionend', onTransitionEnd);
                }
            });
        }, observerOptions);

        setTimeout(function() {
            document.querySelectorAll('.section-title').forEach(function(el) {
                observer.observe(el);
            });

            document.querySelectorAll('.skill-card').forEach(function(el, index) {
                el.style.transitionDelay = (index * 0.08) + 's';
                observer.observe(el);
            });

            document.querySelectorAll('.project-card').forEach(function(el, index) {
                el.style.transitionDelay = (index * 0.1) + 's';
                observer.observe(el);
            });
        }, 100);
    } else {
        document.querySelectorAll('.section-title, .skill-card, .project-card').forEach(function(el) {
            el.classList.add('visible');
        });
    }

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
        lastScroll = currentScroll;
    });

    const bubbles = document.querySelectorAll('.bubble');
    const particlesContainer = document.getElementById('particles-container');
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const bubbleStates = {
        'bubble-1': { targetX: 0, targetY: 0, x: 0, y: 0, vx: 0, vy: 0, alive: true, size: 80 },
        'bubble-2': { targetX: 0, targetY: 0, x: 0, y: 0, vx: 0, vy: 0, alive: true, size: 60 }
    };

    bubbles.forEach((bubble, index) => {
        const rect = bubble.getBoundingClientRect();
        const key = index === 0 ? 'bubble-1' : 'bubble-2';
        bubbleStates[key].x = rect.left;
        bubbleStates[key].y = rect.top;
    });

    function createParticles(x, y, bubbleSize, isBlue) {
        const particleCount = 12;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 8 + 3;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            const color1 = isBlue ? 'rgba(100, 200, 255' : 'rgba(200, 100, 255';
            particle.style.background = color1 + ', ' + (Math.random() * 0.6 + 0.4) + ')';
            particle.style.boxShadow = '0 0 10px ' + color1 + ', 0.8)';
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const speed = Math.random() * 6 + 4;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            
            particlesContainer.appendChild(particle);
<<<<<<< HEAD
            
=======

>>>>>>> origin/main
            let px = x;
            let py = y;
            let pvx = vx;
            let pvy = vy;
            
            function animateParticle() {
                px += pvx;
                py += pvy;
                pvy += 0.2;
                pvx *= 0.98;
                
                particle.style.left = px + 'px';
                particle.style.top = py + 'px';
                particle.style.opacity = parseFloat(particle.style.opacity || 1) - 0.02;
                
                if (parseFloat(particle.style.opacity) > 0) {
                    requestAnimationFrame(animateParticle);
                } else {
                    particle.remove();
                }
            }
            animateParticle();
        }
    }

    bubbles.forEach((bubble, index) => {
        bubble.addEventListener('click', function(e) {
            e.stopPropagation();
            const key = index === 0 ? 'bubble-1' : 'bubble-2';
            const isBlue = index === 0;
            
            if (bubbleStates[key].alive) {
                const rect = bubble.getBoundingClientRect();
                createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, bubbleStates[key].size, isBlue);
                
<<<<<<< HEAD
                    bubble.style.animation = 'none';
=======
                bubble.style.animation = 'none';
>>>>>>> origin/main
                bubble.style.opacity = '0';
                bubble.style.transform = 'scale(0)';
                bubbleStates[key].alive = false;
                
                setTimeout(() => {
                    bubbleStates[key].alive = true;
                    bubble.style.opacity = '1';
                    bubble.style.animation = index === 0 ? 'float 6s ease-in-out infinite' : 'float 8s ease-in-out infinite reverse';
                    const initialPos = index === 0 ? { x: '10%', y: '20%' } : { x: 'auto', y: '60%', right: '10%' };
                    bubble.style.left = initialPos.x || 'auto';
                    bubble.style.top = initialPos.y || 'auto';
                    if (initialPos.right) bubble.style.right = initialPos.right;
                }, 3000);
            }
        });
    });

    function animateBubbles() {
        bubbles.forEach((bubble, index) => {
            const key = index === 0 ? 'bubble-1' : 'bubble-2';
            
            if (bubbleStates[key].alive) {
                const rect = bubble.getBoundingClientRect();
                const distance = Math.sqrt(Math.pow(mouseX - rect.left - rect.width / 2, 2) + Math.pow(mouseY - rect.top - rect.height / 2, 2));
                
                if (distance < 300) {
                    const angle = Math.atan2(mouseY - (rect.top + rect.height / 2), mouseX - (rect.left + rect.width / 2));
                    const speed = (300 - distance) / 300 * 2;
                    
                    bubbleStates[key].vx = Math.cos(angle) * speed;
                    bubbleStates[key].vy = Math.sin(angle) * speed;
                } else {
                    bubbleStates[key].vx *= 0.95;
                    bubbleStates[key].vy *= 0.95;
                }
                
                bubbleStates[key].x += bubbleStates[key].vx;
                bubbleStates[key].y += bubbleStates[key].vy;
                
                if (bubbleStates[key].x < 0) bubbleStates[key].x = window.innerWidth;
                if (bubbleStates[key].x > window.innerWidth) bubbleStates[key].x = 0;
                if (bubbleStates[key].y < 0) bubbleStates[key].y = window.innerHeight;
                if (bubbleStates[key].y > window.innerHeight) bubbleStates[key].y = 0;
            }
        });
        
        requestAnimationFrame(animateBubbles);
    }
    
    animateBubbles();

    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.position = 'absolute';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            if (!this.style.position || this.style.position === 'static') {
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
            }
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

});
