// ============================================
// MVL - Máquina de Vendas Lucrativas
// Landing Page JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    initScrollAnimations();
    initFAQAccordion();
    initFloatingCTA();
    initCounterAnimation();
    initParticles();
    initSmoothScroll();
    duplicateTestimonials();
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// FAQ ACCORDION
// ============================================
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
            });

            // Open clicked (if it wasn't already open)
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// ============================================
// FLOATING CTA (MOBILE)
// ============================================
function initFloatingCTA() {
    const floatingCta = document.getElementById('floatingCta');
    const heroSection = document.getElementById('hero');

    if (!floatingCta || !heroSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                floatingCta.classList.remove('visible');
            } else {
                floatingCta.classList.add('visible');
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(heroSection);
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}

// ============================================
// PARTICLE SYSTEM
// ============================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = window.innerWidth < 768 ? 20 : 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;

        Object.assign(particle.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: Math.random() > 0.5
                ? `rgba(249, 115, 22, ${Math.random() * 0.3 + 0.1})`
                : `rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `particleFloat ${Math.random() * 8 + 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            pointerEvents: 'none'
        });

        container.appendChild(particle);
    }

    // Add keyframe animation
    if (!document.getElementById('particleStyles')) {
        const style = document.createElement('style');
        style.id = 'particleStyles';
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% { 
                    transform: translate(0, 0) scale(1); 
                    opacity: 0.3; 
                }
                25% { 
                    transform: translate(${randomRange(-30, 30)}px, ${randomRange(-40, -10)}px) scale(1.2); 
                    opacity: 0.6; 
                }
                50% { 
                    transform: translate(${randomRange(-20, 20)}px, ${randomRange(-50, -20)}px) scale(0.8); 
                    opacity: 0.8; 
                }
                75% { 
                    transform: translate(${randomRange(-30, 30)}px, ${randomRange(-30, 0)}px) scale(1.1); 
                    opacity: 0.4; 
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 20;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// DUPLICATE TESTIMONIALS FOR INFINITE SCROLL
// ============================================
function duplicateTestimonials() {
    const track = document.querySelector('.testimonials__track');
    if (!track) return;

    const cards = track.innerHTML;
    track.innerHTML = cards + cards;
}

// ============================================
// VAGAS COUNTER (fake scarcity countdown)
// ============================================
(function vagasSimulation() {
    const vagasEl = document.getElementById('vagasCount');
    if (!vagasEl) return;

    // Randomly decrease every 30-90 seconds for effect
    setInterval(() => {
        const current = parseInt(vagasEl.textContent);
        if (current > 3) {
            vagasEl.textContent = current - 1;
            vagasEl.style.transform = 'scale(1.3)';
            vagasEl.style.color = '#ef4444';
            setTimeout(() => {
                vagasEl.style.transform = 'scale(1)';
                vagasEl.style.color = '';
            }, 500);
        }
    }, Math.random() * 60000 + 30000);
})();
