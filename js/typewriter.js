// ==========================================
// TYPEWRITER.JS - MichelDouglas.dev
// Efeito de máquina de escrever no Hero
// ==========================================

class TypewriterEffect {
    constructor(elementId, words, options = {}) {
        this.element = document.getElementById(elementId);
        if (!this.element) return;

        this.words = words;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;

        // Velocidades (em milissegundos)
        this.options = {
            typingSpeed: options.typingSpeed || 100,    // Digitar (100ms por letra)
            deletingSpeed: options.deletingSpeed || 100,  // Apagar (50ms por letra - mais rápido)
            pauseAfterWord: options.pauseAfterWord || 2000,  // Pausa após digitar (2s)
            pauseBeforeStart: options.pauseBeforeStart || 500  // Pausa antes de começar (0.5s)
        };

            this.init();
    }

    init() {
        // Aguarda um momento antes de iniciar
        setTimeout(() => {
            this.type();
        }, this.options.pauseBeforeStart);
    }

    type() {

        // Proteção contra aba inativa
        if (this.isPaused || document.hidden) {
            this.pause();
            return;
        }
        const currentWord = this.words[this.wordIndex];

        if (this.isDeleting) {
            // ========== MODO APAGAR ==========
            // Remove uma letra por vez (de trás para frente)
            this.element.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;

            // Terminou de apagar a palavra?
            if (this.charIndex === 0) {
                this.isDeleting = false;
                // Vai para a próxima palavra (circular)
                this.wordIndex = (this.wordIndex + 1) % this.words.length;

                // Pausa antes de começar a próxima palavra
                setTimeout(() => this.type(), this.options.pauseBeforeStart);
                return;
            }

            // Continua apagando
            setTimeout(() => this.type(), this.options.deletingSpeed);

        } else {
            // ========== MODO DIGITAR ==========
            // Adiciona uma letra por vez
            this.element.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;

            // Terminou de digitar a palavra?
            if (this.charIndex === currentWord.length) {
                this.isDeleting = true;

                // Pausa para ler a palavra completa
                setTimeout(() => this.type(), this.options.pauseAfterWord);
                return;
            }

            // Continua digitando
            setTimeout(() => this.type(), this.options.typingSpeed);
        }
    }

    // Método para pausar o efeito
    pause() {
        this.isPaused = true;
    }

    // Método para retomar o efeito
    resume() {
        if (this.isPaused) {
            this.isPaused = false;
            this.type();
        }
    }

    // Método para trocar as palavras dinamicamente
    updateWords(newWords) {
        this.words = newWords;
        this.wordIndex = 0;
    }
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // Array de palavras que vão alternar
    const words = [
        'visuais',
        'funcionais',
        'impactantes',
        'inovadoras',
        'memoráveis',
        'intuitivas'
    ];

    const typewriter = new TypewriterEffect('typewriterWord', words, {
        typingSpeed: 100,      // 100ms por letra
        deletingSpeed: 50,     // 50ms por letra (apaga mais rápido que digita)
        pauseAfterWord: 2000,  // 2s de pausa após completar a palavra
        pauseBeforeStart: 300  // 0.3s antes de iniciar
    });

    // ==========================================
    // Pausa quando o usuário sai da aba (economia de recursos)
    // ==========================================

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            typewriter.pause();
        } else {
            typewriter.resume();
        }
    });

    // Pausa também quando minimiza a janela
    window.addEventListener('blur', () => {
        typewriter.pause();
    });

    window.addEventListener('focus', () => {
        typewriter.resume();
    });

    // ==========================================
    // Easter Egg: pressionar "T" 3x troca as palavras
    // ==========================================

    let secretKeyCount = 0;
    document.addEventListener('keydown', (e) => {
        if (e.key === 't' || e.key === 'T') {
            secretKeyCount++;

            if (secretKeyCount === 3) {
                const secretWords = [
                    'épicas',
                    'fantásticas',
                    'extraordinárias',
                    'revolucionárias',
                    'incríveis'
                ];

                typewriter.updateWords(secretWords);
                secretKeyCount = 0;
            }
        } else {
            secretKeyCount = 0;
        }
    });
});

// ==========================================
// EXPORT (para uso em outros arquivos)
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TypewriterEffect;
}
