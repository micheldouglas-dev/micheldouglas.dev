// ==========================================
// PORTFOLIO.JS - MichelDouglas.dev
// Funcionalidades específicas do portfólio
// ==========================================

// ========== PORTFOLIO FILTER (Futuro) ==========
class PortfolioFilter {
    constructor() {
        this.items = document.querySelectorAll('.portfolio-item');
        this.filters = document.querySelectorAll('.portfolio-filter-btn');
        this.init();
    }

    init() {
        this.filters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                this.filterItems(e.target.dataset.filter);
            });
        });
    }

    filterItems(category) {
        this.items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });

        // Atualiza botão ativo
        this.filters.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }
}

// ========== PORTFOLIO MODAL ==========
class PortfolioModal {
    constructor() {
        this.modal = null;
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        const modalHTML = `
            <div class="portfolio-modal" id="portfolioModal">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <button class="modal-close" aria-label="Fechar modal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <div class="modal-body">
                        <!-- Conteúdo dinâmico -->
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('portfolioModal');
    }

    bindEvents() {
        // Botões "Ver Projeto"
        document.querySelectorAll('.btn-view-project').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = btn.dataset.project || 'semed';
                this.open(projectId);
            });
        });

        // Fechar modal
        const closeBtn = this.modal.querySelector('.modal-close');
        const overlay = this.modal.querySelector('.modal-overlay');

        closeBtn.addEventListener('click', () => this.close());
        overlay.addEventListener('click', () => this.close());

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    open(projectId) {
        const projectData = this.getProjectData(projectId);
        const modalBody = this.modal.querySelector('.modal-body');

        modalBody.innerHTML = `
            <div class="modal-header">
                <div class="modal-tags">
                    ${projectData.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <h2>${projectData.title}</h2>
                <p class="modal-subtitle">${projectData.subtitle}</p>
            </div>
            
            <div class="modal-gallery">
                ${projectData.images.map(img => `
                    <img src="${img}" alt="${projectData.title}" loading="lazy">
                `).join('')}
            </div>
            
            <div class="modal-info">
                <div class="info-section">
                    <h3>Desafio</h3>
                    <p>${projectData.challenge}</p>
                </div>
                
                <div class="info-section">
                    <h3>Solução</h3>
                    <p>${projectData.solution}</p>
                </div>
                
                <div class="info-section">
                    <h3>Resultados</h3>
                    <ul>
                        ${projectData.results.map(result => `<li>${result}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="info-section">
                    <h3>Tecnologias</h3>
                    <div class="tech-stack">
                        ${projectData.technologies.map(tech => `
                            <span class="tech-badge">${tech}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            ${projectData.link ? `
                <div class="modal-footer">
                    <a href="${projectData.link}" target="_blank" class="btn-primary">
                        Visitar Projeto
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </a>
                </div>
            ` : ''}
        `;

        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    getProjectData(projectId) {
        const projects = {
            semed: {
                title: 'Rebranding Digital SEMED Cametá',
                subtitle: 'Transformação da comunicação visual da educação municipal',
                tags: ['Design', 'Social Media', 'Branding'],
                challenge: 'A SEMED Cametá precisava modernizar sua presença digital e criar uma identidade visual coesa que representasse a inovação na educação municipal.',
                solution: 'Desenvolvi uma estratégia completa de rebranding incluindo novo sistema de identidade visual, templates para redes sociais, e diretrizes de comunicação institucional.',
                results: [
                    'Aumento de 300% no engajamento nas redes sociais',
                    '+50 peças gráficas institucionais criadas',
                    'Sistema de design unificado implementado',
                    'Melhoria na percepção da marca institucional'
                ],
                technologies: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Canva'],
                images: [
                    'assets/images/portfolio/semed/cover.jpg',
                    'assets/images/portfolio/semed/mockup-1.jpg',
                    'assets/images/portfolio/semed/mockup-2.jpg'
                ],
                link: 'https://instagram.com/semed.cameta'
            },
            quitinete: {
                title: 'Quitinete App',
                subtitle: 'Plataforma regional de aluguel para universitários',
                tags: ['UX/UI', 'Flutter', 'Startup'],
                challenge: 'Criar uma plataforma de aluguel focada no público universitário de Cametá, com ênfase em "domesticidade digital" e experiência regional.',
                solution: 'Desenvolvi uma aplicação completa usando FlutterFlow e Supabase, com sistema de filtros avançados, mapas integrados e design focado na experiência do usuário jovem.',
                results: [
                    'App totalmente funcional desenvolvido',
                    'Sistema de filtros complexo implementado',
                    'Integração com mapas e geolocalização',
                    'Design system completo no Figma'
                ],
                technologies: ['FlutterFlow', 'Supabase', 'Figma', 'Google Maps API'],
                images: [
                    'assets/images/portfolio/quitinete/cover.jpg',
                    'assets/images/portfolio/quitinete/screens.jpg',
                    'assets/images/portfolio/quitinete/prototype.jpg'
                ],
                link: null
            }
        };

        return projects[projectId] || projects.semed;
    }
}

// ========== PORTFOLIO STATS ==========
class PortfolioStats {
    constructor() {
        this.stats = {
            projects: 15,
            clients: 8,
            years: 3,
            satisfaction: 98
        };
        this.animated = false;
        this.init();
    }

    init() {
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateStats();
                    this.animated = true;
                }
            });
        });

        observer.observe(statsSection);
    }

    animateStats() {
        Object.keys(this.stats).forEach(key => {
            const element = document.querySelector(`[data-stat="${key}"]`);
            if (!element) return;

            const target = this.stats[key];
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const animate = () => {
                current += step;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(animate);
                } else {
                    element.textContent = target;
                }
            };

            animate();
        });
    }
}

// ========== IMAGE LAZY LOADING COM BLUR ==========
class LazyImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    imageObserver.unobserve(entry.target);
                }
            });
        });

        this.images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;

        // Cria imagem temporária para preload
        const tempImg = new Image();
        tempImg.onload = () => {
            img.src = src;
            img.classList.add('loaded');
        };
        tempImg.src = src;
    }
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa componentes do portfólio
    // const portfolioFilter = new PortfolioFilter(); // Descomente quando adicionar filtros
    const portfolioModal = new PortfolioModal();
    const portfolioStats = new PortfolioStats();
    const lazyLoader = new LazyImageLoader();
});

// Export para testes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PortfolioModal,
        PortfolioFilter,
        PortfolioStats
    };
}
