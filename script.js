// ================================
// GSAP Animation Setup
// ================================

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ================================
// DOM Content Loaded
// ================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initPreloader();
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initServiceCards();
    initPortfolioFilters();
    initTestimonialSlider();
    initContactForm();
    initSmoothScrolling();
    initScrollToTop();
    initParallaxEffects();
    initCounterAnimations();
    initMobileNavigation();
    
    // Initialize WOW effects
    setTimeout(() => {
        initMagneticButtons();
        initSocialHoverEffects();
        initInteractiveParticles();
        initScrollRevealAnimations();
        initAdvancedHoverEffects();
    }, 500);
    
    // Refresh ScrollTrigger after all animations are set up
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
});

// ================================
// Preloader Animation
// ================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const logoAnimate = document.querySelector('.logo-animate');
    const loadingProgress = document.querySelector('.loading-progress');
    
    if (!preloader || !logoAnimate || !loadingProgress) return;
    
    const tl = gsap.timeline();
    
    // Logo animation
    tl.to(logoAnimate, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    });
    
    // Loading bar animation
    tl.to(loadingProgress, {
        width: "100%",
        duration: 2,
        ease: "power2.inOut"
    }, "-=0.5");
    
    // Hide preloader
    tl.to(preloader, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.5,
        onComplete: () => {
            preloader.style.display = 'none';
            // Start hero animations after preloader
            startHeroAnimations();
        }
    });
}

// ================================
// Navigation
// ================================
function initNavigation() {
    const nav = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!nav) return;
    
    // Navbar scroll effect
    ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: { className: "scrolled", targets: nav }
    });
    
    // Active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');
                
                // Smooth scroll to target
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: { y: targetElement, offsetY: 80 },
                    ease: "power2.inOut"
                });
            }
        });
    });
    
    // Update active link on scroll
    ScrollTrigger.batch("section", {
        onEnter: (elements) => {
            const currentSection = elements[0];
            const currentId = currentSection.getAttribute('id');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ================================
// Mobile Navigation
// ================================
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ================================
// Hero Section Animations
// ================================
function initHeroAnimations() {
    // Create timeline but don't start it yet
    window.heroTimeline = gsap.timeline({ paused: true });
}

function startHeroAnimations() {
    const heroLines = document.querySelectorAll('.hero-line');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    const heroScroll = document.querySelector('.hero-scroll');
    
    if (!window.heroTimeline) return;
    
    const tl = window.heroTimeline;
    
    // Typewriter effect pour le premier titre
    if (heroLines[0]) {
        initTypewriter(heroLines[0], "We Create");
    }
    
    // Animate hero lines with spectacular effects
    tl.to(heroLines[0], {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
    });
    
    // Effet spectaculaire pour "Exceptional"
    tl.to(heroLines[1], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        onComplete: () => {
            if (heroLines[1]) {
                heroLines[1].style.textShadow = "0 0 30px rgba(79,172,254,0.5), 0 0 60px rgba(79,172,254,0.3)";
            }
        }
    }, "-=0.8");
    
    // Word reveal effect pour le dernier titre
    tl.to(heroLines[2], {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        onStart: () => initWordReveal(heroLines[2])
    }, "-=0.5");
    
    // Animate subtitle with wave effect
    tl.to(heroSubtitle, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        onStart: () => initTextWave(heroSubtitle)
    }, "-=0.3");
    
    // Animate CTA buttons with bounce
    tl.to(heroCta, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
    }, "-=0.3");
    
    // Animate scroll indicator
    tl.to(heroScroll, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.2");
    
    // Magnetic cursor effect
    initMagneticCursor();
    
    // Play the timeline
    tl.play();
}

// ================================
// Typewriter Effect
// ================================
function initTypewriter(element, text) {
    if (!element) return;
    
    element.textContent = '';
    element.style.borderRight = '3px solid rgba(255,255,255,0.8)';
    element.style.whiteSpace = 'nowrap';
    element.style.overflow = 'hidden';
    
    let i = 0;
    const typeSpeed = 100;
    
    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, typeSpeed);
        } else {
            // Remove cursor after typing
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    typeChar();
}

// ================================
// Word Reveal Effect
// ================================
function initWordReveal(element) {
    if (!element) return;
    
    const text = element.textContent;
    const words = text.split(' ');
    element.innerHTML = '';
    
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(100%) rotateX(-90deg)';
        element.appendChild(span);
        
        gsap.to(span, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.7)"
        });
    });
}

// ================================
// Text Wave Effect
// ================================
function initTextWave(element) {
    if (!element) return;
    
    const text = element.textContent;
    const chars = text.split('');
    element.innerHTML = '';
    
    chars.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        element.appendChild(span);
        
        gsap.to(span, {
            opacity: 1,
            y: 0,
            duration: 0.05,
            delay: index * 0.02,
            ease: "power2.out",
            onComplete: () => {
                gsap.to(span, {
                    y: -5,
                    duration: 0.3,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut",
                    delay: 0.5
                });
            }
        });
    });
}

// ================================
// Magnetic Cursor Effect
// ================================
function initMagneticCursor() {
    // Skip on mobile
    if (window.innerWidth <= 768) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'magnetic-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Grow cursor on interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .service-card, .portfolio-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 100%)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, rgba(79,172,254,0.8) 0%, rgba(79,172,254,0.3) 100%)';
        });
    });
}

// ================================
// Interactive Particles on Mouse Move
// ================================
function initInteractiveParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection || window.innerWidth <= 768) return;
    
    let particles = [];
    const maxParticles = 15;
    
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(79,172,254,0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${x}px;
            top: ${y}px;
        `;
        
        document.body.appendChild(particle);
        
        gsap.to(particle, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            opacity: 0,
            scale: 0,
            duration: 2,
            ease: "power2.out",
            onComplete: () => {
                particle.remove();
            }
        });
        
        particles.push(particle);
        
        if (particles.length > maxParticles) {
            const oldParticle = particles.shift();
            if (oldParticle && oldParticle.parentNode) {
                oldParticle.remove();
            }
        }
    }
    
    let lastTime = 0;
    heroSection.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime > 50) {
            if (Math.random() < 0.3) {
                createParticle(e.clientX, e.clientY);
            }
            lastTime = now;
        }
    });
}

// ================================
// Advanced Scroll Reveal Animations
// ================================
function initScrollRevealAnimations() {
    // Staggered text reveal for section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        const text = title.textContent;
        const words = text.split(' ');
        title.innerHTML = words.map(word => `<span class="word-reveal-scroll">${word}</span>`).join(' ');
        
        const wordSpans = title.querySelectorAll('.word-reveal-scroll');
        
        gsap.set(wordSpans, { 
            opacity: 0, 
            y: 50,
            rotateX: -90
        });
        
        ScrollTrigger.create({
            trigger: title,
            start: "top 80%",
            onEnter: () => {
                gsap.to(wordSpans, {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out"
                });
            }
        });
    });
    
    // Advanced portfolio item animations
    gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
        gsap.set(item, { 
            opacity: 0,
            scale: 0.8,
            rotateY: 45
        });
        
        ScrollTrigger.create({
            trigger: item,
            start: "top 85%",
            onEnter: () => {
                gsap.to(item, {
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    duration: 1,
                    delay: index * 0.1,
                    ease: "back.out(1.7)"
                });
            }
        });
    });
}

// ================================
// Advanced Hover Effects
// ================================
function initAdvancedHoverEffects() {
    // Advanced service card effects
    document.querySelectorAll('.service-card').forEach(card => {
        const icon = card.querySelector('.service-icon svg');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                rotationY: 5,
                rotationX: 5,
                scale: 1.02,
                duration: 0.5,
                ease: "power2.out"
            });
            
            if (icon) {
                gsap.to(icon, {
                    scale: 1.2,
                    rotation: 360,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });
            
            if (icon) {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (x - centerX) / 10;
            
            gsap.to(card, {
                rotationX: -rotateX,
                rotationY: rotateY,
                duration: 0.2,
                ease: "power2.out"
            });
        });
    });
    
    // Advanced button ripple effect
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: rgba(255,255,255,0.6);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                transform: translate(-50%, -50%);
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            gsap.to(ripple, {
                scale: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => ripple.remove()
            });
        });
    });
}

// ================================
// Scroll-based Animations
// ================================
function initScrollAnimations() {
    // Section headers
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Section subtitles
    gsap.utils.toArray('.section-subtitle').forEach(subtitle => {
        gsap.to(subtitle, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
                trigger: subtitle,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// ================================
// Service Cards with Tilt Effect
// ================================
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Animate cards on scroll
    gsap.to(serviceCards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.services-grid',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
}

// ================================
// Portfolio Filters
// ================================
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Animate portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    gsap.to(item, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(item, {
                        opacity: 0.3,
                        scale: 0.8,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
            });
        });
    });
}

// ================================
// Testimonial Slider
// ================================
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let autoPlayInterval;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            gsap.set(slide, { opacity: 0, y: 20 });
        });
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Animate slide in
        gsap.to(slides[index], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        setTimeout(startAutoPlay, 3000);
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        setTimeout(startAutoPlay, 3000);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopAutoPlay();
            setTimeout(startAutoPlay, 3000);
        });
    });
    
    // Initialize
    showSlide(0);
    startAutoPlay();
    
    // Pause on hover
    const testimonialsContainer = document.querySelector('.testimonials-container');
    if (testimonialsContainer) {
        testimonialsContainer.addEventListener('mouseenter', stopAutoPlay);
        testimonialsContainer.addEventListener('mouseleave', startAutoPlay);
    }
}

// ================================
// Contact Form
// ================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    if (!form) return;
    
    // Animate form elements on scroll
    gsap.to('.form-group', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.contact-form',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
    
    // Floating label animation
    inputs.forEach(input => {
        const label = input.closest('.form-group').querySelector('.form-label');
        const underline = input.closest('.form-group').querySelector('.form-underline');
        
        input.addEventListener('focus', () => {
            if (label) {
                gsap.to(label, {
                    top: -10,
                    left: 15,
                    fontSize: '0.75rem',
                    color: '#4facfe',
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            if (underline) {
                gsap.to(underline, {
                    scaleX: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
        
        input.addEventListener('blur', () => {
            if (!input.value && label) {
                gsap.to(label, {
                    top: 18,
                    left: 20,
                    fontSize: '1rem',
                    color: '#6b7280',
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            if (underline) {
                gsap.to(underline, {
                    scaleX: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add loading state
        form.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
            form.classList.remove('loading');
            
            // Show success message
            gsap.to(form, {
                opacity: 0.7,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    alert('Message sent successfully! We\'ll get back to you soon.');
                    form.reset();
                    
                    // Reset floating labels
                    inputs.forEach(input => {
                        const label = input.closest('.form-group').querySelector('.form-label');
                        if (label) {
                            gsap.set(label, {
                                top: 18,
                                left: 20,
                                fontSize: '1rem',
                                color: '#6b7280'
                            });
                        }
                    });
                }
            });
        }, 2000);
    });
}

// ================================
// Smooth Scrolling
// ================================
function initSmoothScrolling() {
    const scrollButtons = document.querySelectorAll('[data-scroll]');
    
    scrollButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('data-scroll');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: { y: targetElement, offsetY: 80 },
                    ease: "power2.inOut"
                });
            }
        });
    });
}

// ================================
// Scroll to Top
// ================================
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (!scrollToTopBtn) return;
    
    // Show/hide button based on scroll position
    ScrollTrigger.create({
        start: "top -300",
        end: 99999,
        onUpdate: ({ isActive }) => {
            if (isActive) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
    });
    
    // Smooth scroll to top
    scrollToTopBtn.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: 0 },
            ease: "power2.inOut"
        });
    });
}

// ================================
// Parallax Effects
// ================================
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
        gsap.to(element, {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
    
    // Hero particles parallax
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = 0.5 + (index * 0.1);
        gsap.to(particle, {
            y: -100 * speed,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
}

// ================================
// Counter Animations
// ================================
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const endValue = parseInt(counter.getAttribute('data-count'));
        let currentValue = 0;
        
        const updateCounter = () => {
            const increment = endValue / 60;
            currentValue += increment;
            
            if (currentValue >= endValue) {
                currentValue = endValue;
                counter.textContent = Math.floor(currentValue) + (endValue === 98 ? '%' : '+');
            } else {
                counter.textContent = Math.floor(currentValue) + (endValue === 98 ? '%' : '+');
                requestAnimationFrame(updateCounter);
            }
        };
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 85%",
            onEnter: () => {
                updateCounter();
            },
            onLeaveBack: () => {
                currentValue = 0;
                counter.textContent = '0' + (endValue === 98 ? '%' : '+');
            }
        });
    });
}

// ================================
// Magnetic Button Effect
// ================================
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(button, {
                x: x * 0.1,
                y: y * 0.1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
}

// ================================
// Social Media Hover Effects
// ================================
function initSocialHoverEffects() {
    const socialLinks = document.querySelectorAll('.social-link, .footer-social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                scale: 1.15,
                rotation: 10,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// ================================
// Resize Handler
// ================================
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// ================================
// Performance Optimization
// ================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized resize handler
const debouncedResize = debounce(() => {
    ScrollTrigger.refresh();
}, 250);

window.addEventListener('resize', debouncedResize);
