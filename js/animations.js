// ==========================================
// ANIMATIONS.JS - MichelDouglas.dev
// Animações e efeitos visuais avançados
// ==========================================

// ========== PARALLAX EFFECT ==========
class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;

        window.addEventListener('scroll', () => {
            this.elements.forEach(el => {
                const speed = el.dataset.parallax || 0.5;
                const yPos = -(window.pageYOffset * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// ========== CURSOR PERSONALIZADO (Opcional) ==========
class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorFollower = null;
        this.createCursor();
        this.bindEvents();
    }

    createCursor() {
        const cursorHTML = `
            <div class="custom-cursor"></div>
            <div class="custom-cursor-follower"></div>
        `;

        document.body.insertAdjacentHTML('beforeend', cursorHTML);
        this.cursor = document.querySelector('.custom-cursor');
        this.cursorFollower = document.querySelector('.custom-cursor-follower');
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';

            setTimeout(() => {
                this.cursorFollower.style.left = e.clientX + 'px';
                this.cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        // Efeitos em links e botões
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.cursorFollower.classList.add('hover');
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.cursorFollower.classList.remove('hover');
            });
        });
    }
}

// ========== SCROLL PROGRESS BAR ==========
class ScrollProgress {
    constructor() {
        this.createProgressBar();
        this.updateProgress();
    }

    createProgressBar() {
        const progressHTML = '<div class="scroll-progress"></div>';
        document.body.insertAdjacentHTML('afterbegin', progressHTML);
        this.progressBar = document.querySelector('.scroll-progress');
    }

    updateProgress() {
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.pageYOffset / windowHeight);
            this.progressBar.style.transform = `scaleX(${scrolled})`;
        });
    }
}

// ========== TYPING EFFECT ==========
class TypingEffect {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        if (!this.element) return;
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let timeout = this.speed;

        if (this.isDeleting) {
            timeout /= 2;
        }

        if (!this.isDeleting && this.charIndex === currentText.length) {
            timeout = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            timeout = 500;
        }

        setTimeout(() => this.type(), timeout);
    }
}

// ========== TEXT REVEAL ON SCROLL ==========
class TextReveal {
    constructor() {
        this.elements = document.querySelectorAll('[data-text-reveal]');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealText(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.elements.forEach(el => observer.observe(el));
    }

    revealText(element) {
        const text = element.textContent;
        element.textContent = '';

        const chars = text.split('');
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.animation = `fadeIn 0.5s ease ${index * 0.03}s forwards`;
            element.appendChild(span);
        });
    }
}

// ========== MAGNETIC BUTTONS ==========
class MagneticButtons {
    constructor() {
        this.buttons = document.querySelectorAll('[data-magnetic]');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }
}



// ========== PARTICLES BACKGROUND (Canvas) ==========
class ParticlesBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
            this.ctx.fill();
        });

        this.connectParticles();

        requestAnimationFrame(() => this.animate());
    }

    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(59, 130, 246, ${1 - distance / 100})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
    }
}

// ========== INFINITE SCROLL LOOP ==========
class InfiniteLoop {
    constructor(selector) {
        this.track = document.querySelector(selector);
        this.init();
    }

    init() {
        if (this.track) {
            // Clona o conteúdo da lista para garantir o loop infinito perfeito
            const clone = this.track.innerHTML;
            this.track.innerHTML += clone;
        }
    }
}

// ========== INICIALIZAÇÃO (Opcional) ==========
document.addEventListener('DOMContentLoaded', () => {

    // Ative apenas os efeitos que deseja usar:
    // 1. Infinite Scroll (Skills)
    const infiniteLoop = new InfiniteLoop('.keywords-track');

    // 2. Outras inicializações (se você for usar)
    // const parallax = new ParallaxEffect();
    // const scrollProgress = new ScrollProgress();
    // const textReveal = new TextReveal();
    // const magneticBtns = new MagneticButtons();

    // Cursor personalizado (apenas desktop)
    // if (window.innerWidth > 768) {
    //     const customCursor = new CustomCursor();
    // }

    // Typing effect no hero (exemplo)
    // const typingElement = document.querySelector('[data-typing]');
    // if (typingElement) {
    //     new TypingEffect(typingElement, [
    //         'Designer',
    //         'Developer',
    //         'Problem Solver'
    //     ]);
    // }

    // Particles background
    // const particles = new ParticlesBackground('particles-canvas');

});

// Export para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ParallaxEffect,
        CustomCursor,
        ScrollProgress,
        TypingEffect,
        TextReveal,
        MagneticButtons,
        ParticlesBackground
    };
}


