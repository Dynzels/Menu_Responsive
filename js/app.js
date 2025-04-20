// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeAccordion();
    initializeSmoothScroll();
    initializeScrollAnimations();
});

function initializeNavigation() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav__menu');
    const overlay = document.querySelector('.overlay');

    if (!burgerMenu || !navMenu || !overlay) return;

    function toggleMenu() {
        burgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');

        // Reset accordion state when closing menu
        const accordionTrigger = document.querySelector('.accordion-trigger');
        if (accordionTrigger && !navMenu.classList.contains('active')) {
            if (accordionTrigger.classList.contains('active')) {
                toggleAccordion();
            }
        }
    }

    burgerMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    overlay.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Fermer le menu au redimensionnement
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
}

function initializeAccordion() {
    const accordionTrigger = document.querySelector('.accordion-trigger');
    const accordionContent = document.querySelector('.accordion-content');

    if (!accordionTrigger || !accordionContent) return;

    function toggleAccordion() {
        const isExpanding = !accordionTrigger.classList.contains('active');
        
        accordionTrigger.classList.toggle('active');
        accordionContent.classList.toggle('active');

        if (isExpanding) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        } else {
            accordionContent.style.maxHeight = "0";
        }
    }

    accordionTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAccordion();
    });
}

function initializeSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    if (!anchors.length) return;

    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Fermer le menu si ouvert
                const navMenu = document.querySelector('.nav__menu');
                if (window.innerWidth <= 768 && navMenu?.classList.contains('active')) {
                    const burgerMenu = document.querySelector('.burger-menu');
                    const overlay = document.querySelector('.overlay');
                    if (burgerMenu && overlay) {
                        burgerMenu.classList.remove('active');
                        navMenu.classList.remove('active');
                        overlay.classList.remove('active');
                        document.body.classList.remove('no-scroll');
                    }
                }

                // Scroll fluide
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.skills, .projects, .about, .contact, .skill-category, .project-card');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
} 