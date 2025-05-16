(function() {
    'use strict';

    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('#preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500);
        }
    });

    // Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#00ddeb' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: '#ff007a', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 3, direction: 'none', random: false }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
                modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }

    // AOS Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    } else {
        console.warn('AOS is not loaded. Animations will be skipped.');
    }

    // Smooth Scrolling
    const ssMoveTo = function() {
        if (typeof MoveTo === 'undefined') {
            console.warn('MoveTo is not loaded. Smooth scrolling disabled.');
            return;
        }
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 800,
            easing: 'easeOutQuart'
        });
        const triggers = document.querySelectorAll('.smoothscroll');
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                const href = trigger.getAttribute('href');
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const target = document.getElementById(targetId);
                    if (target) {
                        moveTo.move(target);
                    } else {
                        console.warn(`Target ID "${targetId}" not found on page ${currentPage}`);
                    }
                } else if (href.includes('#')) {
                    const [page, targetId] = href.split('#');
                    if (page === currentPage || page === '') {
                        e.preventDefault();
                        const target = document.getElementById(targetId);
                        if (target) {
                            moveTo.move(target);
                        } else {
                            console.warn(`Target ID "${targetId}" not found on page ${currentPage}`);
                        }
                    }
                }
            });
        });
        window.addEventListener('load', () => {
            const hash = window.location.hash.substring(1);
            if (hash) {
                const target = document.getElementById(hash);
                if (target) {
                    moveTo.move(target);
                } else {
                    console.warn(`Hash ID "${hash}" not found on page`);
                }
            }
        });
    };

    // Mobile Menu Toggle
    const ssMenuToggle = function() {
        const toggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav');
        const closeMenu = document.querySelector('.close-menu');

        if (toggle && nav && closeMenu) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                nav.classList.toggle('active');
                document.body.classList.toggle('nav-active');
            });

            closeMenu.addEventListener('click', function() {
                nav.classList.remove('active');
                document.body.classList.remove('nav-active');
            });

            const navLinks = document.querySelectorAll('.nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                    document.body.classList.remove('nav-active');
                });
            });
        }
    };

    // Lightbox functionality for certificates
    const ssLightbox = function() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        document.body.appendChild(lightbox);

        const lightboxContent = document.createElement('div');
        lightboxContent.className = 'lightbox-content';
        lightbox.appendChild(lightboxContent);

        const closeBtn = document.createElement('span');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '×';
        lightboxContent.appendChild(closeBtn);

        document.querySelectorAll('[data-lightbox="certificate"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const imgSrc = this.getAttribute('href');
                
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = 'Certificate';
                
                while (lightboxContent.firstChild) {
                    lightboxContent.removeChild(lightboxContent.firstChild);
                }
                
                lightboxContent.appendChild(img);
                lightboxContent.appendChild(closeBtn);
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    };

    // Project Modal functionality
    const ssProjectModal = function() {
        const projectCards = document.querySelectorAll('.project-card');
        const modals = document.querySelectorAll('.modal');
        const closeButtons = document.querySelectorAll('.modal-close');

        projectCards.forEach(card => {
            card.addEventListener('click', function() {
                const modalId = this.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                
                if (modal) {
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                    
                    setTimeout(() => {
                        modal.classList.add('active');
                    }, 10);
                }
            });
        });

        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                    
                    setTimeout(() => {
                        modal.style.display = 'none';
                        document.body.style.overflow = '';
                    }, 300);
                }
            });
        });

        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    
                    setTimeout(() => {
                        modal.style.display = 'none';
                        document.body.style.overflow = '';
                    }, 300);
                }
            });
        });

        document.querySelectorAll('.modal-content').forEach(content => {
            content.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });
    };

    // Scroll Button functionality
    const ssScrollButton = function() {
        const scrollBtn = document.querySelector('.scroll-btn');
        if (!scrollBtn) return;

        const updateButton = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const threshold = 200;

            if (scrollY < threshold) {
                scrollBtn.classList.remove('up');
                scrollBtn.setAttribute('aria-label', 'Scroll to bottom');
            } else {
                scrollBtn.classList.add('up');
                scrollBtn.setAttribute('aria-label', 'Scroll to top');
            }
        };

        updateButton();
        window.addEventListener('scroll', updateButton);

        scrollBtn.addEventListener('click', () => {
            const isUp = scrollBtn.classList.contains('up');
            if (typeof MoveTo !== 'undefined') {
                const moveTo = new MoveTo({
                    duration: 800,
                    easing: 'easeOutQuart'
                });
                if (isUp) {
                    const topTarget = document.getElementById('top');
                    if (topTarget) moveTo.move(topTarget);
                } else {
                    window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: 'smooth'
                    });
                }
            } else {
                window.scrollTo({
                    top: isUp ? 0 : document.documentElement.scrollHeight,
                    behavior: 'smooth'
                });
            }
        });
    };

    // Contact Form functionality
    const ssContactForm = function() {
        if (typeof emailjs === 'undefined') {
            console.warn('EmailJS is not loaded. Form submission disabled.');
            const formStatus = document.getElementById('formStatus');
            if (formStatus) {
                formStatus.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-circle"></i>
                        Form submission unavailable. Please email <a href="mailto:basilmk771@gmail.com">basilmk771@gmail.com</a>.
                    </div>
                `;
                formStatus.classList.add('show');
            }
            return;
        }

        // Initialize EmailJS with your actual User ID
        emailjs.init('pbM3bcW2In2gaEV_R');

        const contactForm = document.getElementById('contactForm');
        const formStatus = document.getElementById('formStatus');

        if (contactForm && formStatus) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const submitBtn = contactForm.querySelector('.submit-btn');
                const btnText = submitBtn.querySelector('.btn-text');
                const btnIcon = submitBtn.querySelector('i');

                btnText.textContent = 'Sending...';
                btnIcon.className = 'fas fa-spinner fa-spin';
                submitBtn.disabled = true;

                // Send form using your actual Service ID and Template ID
                emailjs.sendForm(
                    'service_vwc9qhn',
                    'template_mtgars3',
                    this
                )
                .then(function(response) {
                    console.log('Success:', response);
                    formStatus.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            Message sent successfully! I'll respond soon.
                        </div>
                    `;
                    formStatus.classList.add('show');
                    contactForm.reset();
                    document.querySelectorAll('.form-group').forEach(group => {
                        group.classList.remove('focused');
                    });
                }, function(error) {
                    console.error('EmailJS Error:', JSON.stringify(error, null, 2));
                    formStatus.innerHTML = `
                        <div class="error-message">
                            <i class="fas fa-exclamation-circle"></i>
                            Oops! Something went wrong: ${error.text || 'Unknown error'}. Try emailing <a href="mailto:basilmk771@gmail.com">basilmk771@gmail.com</a>.
                        </div>
                    `;
                    formStatus.classList.add('show');
                })
                .finally(() => {
                    btnText.textContent = 'Send Message';
                    btnIcon.className = 'fas fa-paper-plane';
                    submitBtn.disabled = false;
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                        formStatus.classList.remove('show');
                    }, 5000);
                });
            });

            // Form field animations
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                const input = group.querySelector('input, textarea');
                input.addEventListener('focus', () => group.classList.add('focused'));
                input.addEventListener('blur', () => {
                    if (!input.value) group.classList.remove('focused');
                });
                if (input.value) group.classList.add('focused');
            });
        }
    };

    // Initialize all functionality
    const ssInit = function() {
        ssMoveTo();
        ssMenuToggle();
        ssLightbox();
        ssProjectModal();
        ssScrollButton();
        ssContactForm();
    };

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ssInit);
    } else {
        ssInit();
    }
})();