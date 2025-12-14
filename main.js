
// ===== ANIMATIONS ET EFFETS VISUELS =====

class PortfolioAnimations {
    constructor() {
        this.initialized = false;
        this.animations = new Map();
        this.init();
    }

    init() {
        if (this.initialized) return;
        
        this.setupFloatingElements();
        this.setupTypewriterEffect();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupParticleEffect();
        
        this.initialized = true;
        console.log('🎨 Animations initialisées');
    }

    setupFloatingElements() {
        // Animation pour les éléments flottants
        const floatElements = document.querySelectorAll('.animate-float');
        floatElements.forEach(el => {
            const speed = el.dataset.speed || 3;
            el.style.animationDuration = `${speed}s`;
        });

        // Animation au survol
        const hoverFloatElements = document.querySelectorAll('.hover-lift');
        hoverFloatElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.transform = 'translateY(-10px) scale(1.05)';
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupTypewriterEffect() {
        const typewriterEl = document.querySelector('.animate-typing');
        if (!typewriterEl) return;

        const texts = [
            "Développeur Python",
            "Expert Django & Flask",
            "Créateur de solutions web"
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriterEl.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterEl.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                // Pause à la fin de l'écriture
                isDeleting = true;
                setTimeout(typeWriter, 2000);
                return;
            }
            
            if (isDeleting && charIndex === 0) {
                // Passer au texte suivant
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
            
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeWriter, speed);
        }
        
        // Démarrer l'effet
        setTimeout(typeWriter, 1000);
    }

    setupScrollAnimations() {
        // Animation de révélation au scroll
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Animation pour les pourcentages de compétences
                    if (entry.target.classList.contains('skill-percent')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(el => revealObserver.observe(el));
    }

    animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000; // 2 secondes
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.round(current) + '%';
        }, 16);
    }

    setupHoverEffects() {
        // Effet de glow au survol
        const glowElements = document.querySelectorAll('.glow-effect');
        
        glowElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.boxShadow = '0 0 40px rgba(22, 101, 52, 0.6)';
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.boxShadow = '0 0 20px rgba(22, 101, 52, 0.3)';
            });
        });

        // Effet de parallax au survol
        const parallaxElements = document.querySelectorAll('.parallax-hover');
        
        parallaxElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth) * 20 - 10;
                const y = (e.clientY / window.innerHeight) * 20 - 10;
                el.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
                el.style.transition = 'transform 0.5s ease';
            });
        });
    }

    setupParticleEffect() {
        // Effet de particules pour la section hero
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        // Créer quelques particules flottantes
        for (let i = 0; i < 15; i++) {
            this.createParticle(heroSection);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Position aléatoire
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, #166534, #10b981);
            border-radius: 50%;
            opacity: ${Math.random() * 0.3 + 0.1};
            left: ${posX}%;
            top: ${posY}%;
            animation: floatParticle ${duration}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
            z-index: 1;
        `;
        
        container.appendChild(particle);
        
        // Ajouter l'animation CSS
        if (!document.querySelector('#particle-animation')) {
            const style = document.createElement('style');
            style.id = 'particle-animation';
            style.textContent = `
                @keyframes floatParticle {
                    0%, 100% { 
                        transform: translate(0, 0) rotate(0deg);
                    }
                    25% { 
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 50 - 25}px) rotate(90deg);
                    }
                    50% { 
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 50 - 25}px) rotate(180deg);
                    }
                    75% { 
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 50 - 25}px) rotate(270deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Animation de chargement de page
    setupPageTransition() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // Animation de bienvenue
            setTimeout(() => {
                const welcomeEl = document.createElement('div');
                welcomeEl.className = 'welcome-message';
                welcomeEl.innerHTML = `
                    <div class="welcome-content">
                        <h3>Bienvenue !</h3>
                        <p>Merci de visiter mon portfolio</p>
                    </div>
                `;
                document.body.appendChild(welcomeEl);
                
                setTimeout(() => welcomeEl.remove(), 3000);
            }, 1000);
        });
    }

    // Animation pour les formulaires
    setupFormAnimations() {
        const inputs = document.querySelectorAll('.form-input');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    // Animation de confettis pour le succès
    static showConfetti() {
        const confettiCount = 100;
        const colors = ['#166534', '#059669', '#10b981', '#34d399'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * window.innerWidth;
            const duration = Math.random() * 3 + 2;
            
            confetti.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                top: -20px;
                left: ${posX}px;
                border-radius: ${size < 10 ? '50%' : '4px'};
                opacity: ${Math.random() * 0.8 + 0.2};
                animation: fall ${duration}s linear forwards;
                z-index: 9999;
                pointer-events: none;
            `;
            
            document.body.appendChild(confetti);
            
            // Nettoyer après l'animation
            setTimeout(() => confetti.remove(), duration * 1000);
        }
        
        // Ajouter l'animation CSS si nécessaire
        if (!document.querySelector('#confetti-animation')) {
            const style = document.createElement('style');
            style.id = 'confetti-animation';
            style.textContent = `
                @keyframes fall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                    }
                    100% {
                        transform: translateY(${window.innerHeight}px) rotate(${Math.random() * 720}deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Animation de vibration pour attirer l'attention
    static vibrate(element, intensity = 5) {
        const originalTransform = element.style.transform;
        let position = 0;
        
        const vibrateInterval = setInterval(() => {
            position = position === 0 ? intensity : 0;
            element.style.transform = `translateX(${position}px)`;
        }, 50);
        
        setTimeout(() => {
            clearInterval(vibrateInterval);
            element.style.transform = originalTransform;
        }, 200);
    }
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    const animations = new PortfolioAnimations();
    
    // Exposer certaines méthodes globalement
    window.PortfolioAnimations = {
        showConfetti: PortfolioAnimations.showConfetti,
        vibrate: PortfolioAnimations.vibrate
    };
    
    // Ajouter des animations spécifiques
    animations.setupPageTransition();
    animations.setupFormAnimations();
    
    // Animation pour le succès du formulaire
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            setTimeout(() => {
                PortfolioAnimations.showConfetti();
            }, 500);
        });
    }
    
    // Animation d'entrée pour les sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// ===== ANIMATIONS RESPONSIVES =====
window.addEventListener('resize', () => {
    // Adapter les animations pour mobile
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // Désactiver certaines animations sur mobile
        document.querySelectorAll('.parallax-hover').forEach(el => {
            el.style.transform = 'none';
        });
    }
});

// ===== HELPER FUNCTIONS =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}


