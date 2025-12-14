// ===== CONFIGURATION =====
const CONFIG = {
    email: 'mandedeo17@gmail.com',
    whatsapp: '+243843352870',
    github: 'https://github.com/Mande-Dev',
    formDelay: 1500,
    animations: {
        enabled: true,
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    }
};

// ===== ÉLÉMENTS DOM =====
const elements = {
    backToTop: document.getElementById('backToTop'),
    themeToggle: document.getElementById('themeToggle'),
    contactForm: document.getElementById('contactForm'),
    navbar: document.querySelector('.navbar'),
    currentYear: document.getElementById('currentYear'),
    loadingSpinner: document.querySelector('.loading-spinner')
};

// ===== ÉTAT GLOBAL =====
const state = {
    currentTheme: 'forest',
    isSubmitting: false,
    scrollPosition: 0,
    isMobile: window.innerWidth < 768
};

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio Deo Mande initialisé');
    
    // Initialiser les composants
    initBackToTop();
    initThemeToggle();
    initContactForm();
    initScrollEffects();
    initCurrentYear();
    initMobileMenu();
    initSkillAnimations();
    initIntersectionObserver();
    
    // Vérifier les fonctionnalités du navigateur
    checkBrowserSupport();
    
    // Optimiser les performances
    optimizePerformance();
});

// ===== FONCTIONS D'INITIALISATION =====

function initBackToTop() {
    if (!elements.backToTop) return;
    
    elements.backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        const shouldShow = window.scrollY > 500;
        elements.backToTop.classList.toggle('hidden', !shouldShow);
        elements.backToTop.classList.toggle('animate-fadeInUp', shouldShow);
    });
}

function initThemeToggle() {
    if (!elements.themeToggle) return;
    
    // Vérifier le thème sauvegardé
    const savedTheme = localStorage.getItem('theme') || 'forest';
    state.currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', state.currentTheme);
    
    // Mettre à jour l'icône
    updateThemeIcon();
    
    elements.themeToggle.addEventListener('click', () => {
        state.currentTheme = state.currentTheme === 'forest' ? 'light' : 'forest';
        document.documentElement.setAttribute('data-theme', state.currentTheme);
        localStorage.setItem('theme', state.currentTheme);
        updateThemeIcon();
        
        // Animation de transition
        elements.themeToggle.classList.add('animate-pulse');
        setTimeout(() => {
            elements.themeToggle.classList.remove('animate-pulse');
        }, 300);
    });
}

function updateThemeIcon() {
    if (!elements.themeToggle) return;
    const icon = elements.themeToggle.querySelector('i');
    if (icon) {
        icon.className = state.currentTheme === 'forest' 
            ? 'fas fa-moon text-xl' 
            : 'fas fa-sun text-xl';
    }
}

function initContactForm() {
    if (!elements.contactForm) return;
    
    elements.contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (state.isSubmitting) return;
        state.isSubmitting = true;
        
        // Récupérer les données du formulaire
        const formData = new FormData(elements.contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };
        
        // Validation
        if (!validateFormData(data)) {
            state.isSubmitting = false;
            return;
        }
        
        // Afficher le loader
        showLoading();
        
        try {
            // Simuler l'envoi (remplacer par un vrai appel API)
            await simulateFormSubmission(data);
            
            // Succès
            showSuccessMessage(data);
            
            // Sauvegarder dans localStorage
            saveMessageToLocalStorage(data);
            
            // Réinitialiser le formulaire
            elements.contactForm.reset();
            
            // Envoyer les données par email (simulation)
            sendEmailNotification(data);
            
        } catch (error) {
            showErrorMessage(error);
        } finally {
            state.isSubmitting = false;
            hideLoading();
        }
    });
}

function validateFormData(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Le nom doit contenir au moins 2 caractères');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Veuillez entrer une adresse email valide');
    }
    
    if (!data.subject) {
        errors.push('Veuillez sélectionner un sujet');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Le message doit contenir au moins 10 caractères');
    }
    
    if (errors.length > 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Validation',
            html: errors.map(error => `<div>• ${error}</div>`).join(''),
            confirmButtonText: 'Compris'
        });
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

async function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simuler un succès 95% du temps
            if (Math.random() < 0.95) {
                resolve({ success: true, data });
            } else {
                reject(new Error('Erreur réseau simulée'));
            }
        }, CONFIG.formDelay);
    });
}

function showLoading() {
    if (elements.loadingSpinner) {
        elements.loadingSpinner.style.display = 'block';
    }
    
    const submitBtn = elements.contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Envoi en cours...';
        submitBtn.disabled = true;
    }
}

function hideLoading() {
    if (elements.loadingSpinner) {
        elements.loadingSpinner.style.display = 'none';
    }
    
    const submitBtn = elements.contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Envoyer le message';
        submitBtn.disabled = false;
    }
}

function showSuccessMessage(data) {
    Swal.fire({
        icon: 'success',
        title: 'Message envoyé !',
        html: `
            <div class="text-left space-y-2">
                <p class="font-bold">Merci ${data.name} !</p>
                <p>Votre message a bien été reçu.</p>
                <p class="text-sm opacity-80">
                    Je vous répondrai dans les plus brefs délais à l'adresse :<br>
                    <strong>${data.email}</strong>
                </p>
            </div>
        `,
        confirmButtonText: 'Parfait !',
        confirmButtonColor: '#166534',
        timer: 5000,
        timerProgressBar: true,
        showClass: {
            popup: 'animate__animated animate__fadeInUp'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown'
        }
    });
}

function showErrorMessage(error) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.',
        footer: `<small>Erreur : ${error.message}</small>`,
        confirmButtonText: 'Réessayer'
    });
}

function saveMessageToLocalStorage(data) {
    try {
        const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
        messages.push({
            ...data,
            id: Date.now(),
            read: false
        });
        
        // Garder seulement les 50 derniers messages
        const recentMessages = messages.slice(-50);
        localStorage.setItem('portfolio_messages', JSON.stringify(recentMessages));
    } catch (error) {
        console.warn('Impossible de sauvegarder dans localStorage:', error);
    }
}

function sendEmailNotification(data) {
    // Cette fonction serait normalement connectée à un service backend
    // Pour l'instant, on simule juste l'envoi
    console.log('📧 Email de notification:', {
        to: CONFIG.email,
        subject: `Nouveau message de ${data.name} - ${data.subject}`,
        body: `Nom: ${data.name}\nEmail: ${data.email}\nSujet: ${data.subject}\n\nMessage:\n${data.message}`
    });
}

function initScrollEffects() {
    window.addEventListener('scroll', () => {
        state.scrollPosition = window.scrollY;
        
        // Navbar effects
        if (elements.navbar) {
            const shouldAddClass = state.scrollPosition > 50;
            elements.navbar.classList.toggle('scrolled', shouldAddClass);
        }
        
        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection && state.scrollPosition < window.innerHeight) {
            const scrolled = state.scrollPosition;
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

function initCurrentYear() {
    if (elements.currentYear) {
        elements.currentYear.textContent = new Date().getFullYear();
    }
}

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.lg\\:hidden .dropdown label');
    const mobileMenu = document.querySelector('.lg\\:hidden .dropdown-content');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            
            // Animation pour les barres du burger menu
            const bars = mobileMenuBtn.querySelectorAll('span');
            bars.forEach((bar, index) => {
                bar.style.transform = mobileMenu.classList.contains('hidden') 
                    ? 'none' 
                    : `rotate(${index === 1 ? '45' : index === 2 ? '-45' : '0'}deg) translate(${index === 0 ? '0' : index === 1 ? '4px, 4px' : '4px, -4px'})`;
                bar.style.width = mobileMenu.classList.contains('hidden') ? '24px' : '20px';
            });
        });
        
        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                const bars = mobileMenuBtn.querySelectorAll('span');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.width = '24px';
                });
            }
        });
    }
}

function initSkillAnimations() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const progressBar = card.querySelector('.progress-bar');
            const percent = card.querySelector('.skill-percent');
            
            if (progressBar) {
                const width = progressBar.style.width;
                progressBar.style.transition = 'none';
                progressBar.style.width = '0';
                
                setTimeout(() => {
                    progressBar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    progressBar.style.width = width;
                }, 50);
            }
            
            if (percent) {
                percent.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    percent.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });
}

function initIntersectionObserver() {
    if (!CONFIG.animations.enabled) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                
                // Pour les cartes de compétences, animation en cascade
                if (entry.target.classList.contains('skill-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: CONFIG.animations.threshold,
        rootMargin: CONFIG.animations.rootMargin
    });
    
    // Observer les sections et cartes
    document.querySelectorAll('section, .skill-card, .contact-info-card').forEach(el => {
        observer.observe(el);
    });
}

function checkBrowserSupport() {
    // Vérifier les fonctionnalités modernes
    const features = {
        'Intersection Observer': 'IntersectionObserver' in window,
        'Local Storage': 'localStorage' in window,
        'CSS Grid': 'CSS' in window && 'supports' in CSS && CSS.supports('display', 'grid'),
        'Flexbox': 'CSS' in window && 'supports' in CSS && CSS.supports('display', 'flex')
    };
    
    const unsupported = Object.entries(features).filter(([_, supported]) => !supported);
    
    if (unsupported.length > 0) {
        console.warn('⚠️ Fonctionnalités non supportées:', unsupported.map(([name]) => name));
        
        // Ajouter une classe pour le fallback CSS
        document.documentElement.classList.add('legacy-browser');
    }
}

function optimizePerformance() {
    // Lazy loading pour les images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }
    
    // Débounce pour les events resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            state.isMobile = window.innerWidth < 768;
        }, 250);
    });
}

// ===== FONCTIONS UTILITAIRES =====

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Copié !',
            text: 'Le texte a été copié dans le presse-papier',
            timer: 1500,
            showConfirmButton: false
        });
    }).catch(err => {
        console.error('Erreur lors de la copie:', err);
    });
}

function sharePortfolio() {
    if (navigator.share) {
        navigator.share({
            title: 'Portfolio Deo Mande',
            text: 'Découvrez le portfolio de Deo Mande, développeur Python spécialisé',
            url: window.location.href
        });
    } else {
        copyToClipboard(window.location.href);
    }
}

// ===== GESTION DES ERREURS GLOBALES =====
window.addEventListener('error', (event) => {
    console.error('Erreur globale:', event.error);
    
    // Ne pas afficher les erreurs en production
    if (window.location.hostname !== 'localhost') {
        event.preventDefault();
    }
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Promise rejetée non gérée:', event.reason);
});

// ===== EXPORT POUR LES TESTS =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG,
        validateFormData,
        isValidEmail
    };
}