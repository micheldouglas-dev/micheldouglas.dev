// ==========================================
// PORTFOLIO.JS - Sistema de Filtros
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            // Atualiza estado ativo dos botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filtra projetos
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    }, 100);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Atualiza ano do copyright
    const yearElement = document.querySelector('.copyright-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
