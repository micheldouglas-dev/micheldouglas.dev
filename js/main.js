// ==========================================
// MAIN.JS - MichelDouglas.dev
// Script principal do portfólio
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // ========== HEADER SCROLL EFFECT ==========
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Atualiza link ativo baseado na seção visível
        updateActiveLink();
    }

    window.addEventListener('scroll', handleScroll);

    // ========== ACTIVE LINK DETECTION ==========
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        let activeSection = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // Offset maior
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            // Verifica se está na última seção (contato)
            const isNearBottom = (scrollY + windowHeight) >= (documentHeight - 100);

            if (sectionId === 'contato' && isNearBottom) {
                activeSection = sectionId;
            } else if (scrollY >= sectionTop && scrollY < sectionBottom) {
                activeSection = sectionId;
            }
        });

        // Atualiza os links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (activeSection && link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Inicialização do Portfolio Swiper
    if (typeof Swiper !== 'undefined') {
        const portfolioSwiper = new Swiper(".portfolio-swiper", {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            speed: 800,
            effect: "slide",
            grabCursor: true,

            // Paginação
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },

            // Autoplay
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true, // Pausa automaticamente ao passar o mouse
            },

            // Pausa manual no hover (reforço além do pauseOnMouseEnter)
            on: {
                mouseenter: function () {
                    this.autoplay.stop();
                },
                mouseleave: function () {
                    this.autoplay.start();
                }
            }
        });
    }

    // ========== SWIPER SCREENSHOTS (CASE STUDY) ==========
    if (document.querySelector('.screenshots-swiper')) {
        const screenshotsSwiper = new Swiper('.screenshots-swiper', {
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: true,
            loop: false,
            speed: 600,
            grabCursor: true,

            pagination: {
                el: '.screenshots-swiper-container .swiper-pagination', // Seletor específico para não conflitar com outros swipers da página
                clickable: true,
                dynamicBullets: false,
            },
        });

    }
    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Fecha menu mobile se estiver aberto
                if (mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // ========== MOBILE MENU ==========
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const headerNav = document.querySelector('.header-nav');
    const mobileMenu = headerNav; // Alias para legibilidade

    function toggleMobileMenu() {
        const isActive = mobileMenuToggle.classList.toggle('active');
        headerNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        // Atualiza aria-label e aria-expanded para acessibilidade
        mobileMenuToggle.setAttribute('aria-label', isActive ? 'Fechar menu' : 'Abrir menu');
        mobileMenuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Fecha menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') &&
            !e.target.closest('.header-nav') &&
            !e.target.closest('.mobile-menu-toggle')) {
            toggleMobileMenu();
        }
    });

    // ========== ANO DINÂMICO NO FOOTER ==========
    const copyrightYear = document.querySelector('.copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // ========== SCROLL ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Para performance, para de observar após animar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos a serem animados
    const animatedElements = document.querySelectorAll(`
        .service-card,
        .portfolio-item,
        .about-content,
        .about-visual,
        .contact-content,
        .contact-form,
        .section-header-center
    `);

    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Envio de formulário genérico (usado em páginas sem contato.js)
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Enviando...';

            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                showNotification('Mensagem enviada com sucesso! 🎉', 'success');
                contactForm.reset();
            } catch (error) {
                showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }

    // ========== SISTEMA DE NOTIFICAÇÕES ==========
    function showNotification(message, type = 'info') {
        // Remove notificação existente antes de exibir nova
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Estilos inline (notificação é criada dinamicamente)
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '16px 24px',
            background: type === 'success' ? '#10B981' : '#EF4444',
            color: 'white',
            borderRadius: '8px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            zIndex: '10000',
            animation: 'slideInRight 0.3s ease',
            fontWeight: '500'
        });

        document.body.appendChild(notification);

        // Remove automaticamente após 5 segundos
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // ========== OTIMIZAÇÃO DO VÍDEO DO HERO ==========
    const heroVideo = document.querySelector('.hero-video');

    if (heroVideo) {
        // Pausa o vídeo quando sai da viewport (economia de CPU/bateria)
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play();
                } else {
                    heroVideo.pause();
                }
            });
        });

        videoObserver.observe(heroVideo);

        // Oculta o vídeo em conexões lentas (2G) para não prejudicar o carregamento
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
                heroVideo.style.display = 'none';
            }
        }
    }

    // ========== BOTÃO VOLTAR AO TOPO ==========
    const scrollTopBtn = document.querySelector('.scroll-top-btn');

    if (scrollTopBtn) {
        // Exibe o botão após 500px de rolagem
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.pointerEvents = 'auto';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.pointerEvents = 'none';
            }
        });
    }

    // ========== CARREGAMENTO PROGRESSIVO DE IMAGENS ==========
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('loading' in HTMLImageElement.prototype) {
        // Navegador suporta lazy loading nativo (sem código extra necessário)
        lazyImages.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback para navegadores antigos via IntersectionObserver
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }


    // ========== EASTER EGG: KONAMI CODE ==========
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateEasterEgg();
        }
    });

    function activateEasterEgg() {
        document.body.style.animation = 'gradientShift 3s ease infinite';
        document.body.style.backgroundSize = '200% 200%';
        showNotification('🎮 Konami Code Ativado! Você é um verdadeiro gamer!', 'success');

        // Reseta o efeito após 5 segundos
        setTimeout(() => {
            document.body.style.animation = '';
            document.body.style.backgroundSize = '';
        }, 5000);
    }

    // ========== MENSAGEM NO CONSOLE DO NAVEGADOR ==========
    console.log(`
    ╔════════════════════════════════════════╗
    ║   👨‍💻 MichelDouglas.dev                ║
    ║   Designer & Full-Stack Developer     ║
    ║                                        ║
    ║   Procurando algo? 😏                  ║
    ║   Entre em contato:                   ║
    ║   contato@micheldouglas.dev           ║
    ╚════════════════════════════════════════╝
    `);

});

// ========== UTILITÁRIOS ==========

// Debounce: agrupa chamadas rápidas em uma só execução (útil em scroll/resize)
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

// Throttle: limita a frequência de execução de uma função (ideal para eventos de scroll)
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Exporta utilitários para uso em outros módulos (compatibilidade com Node.js/bundlers)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { debounce, throttle };
}
