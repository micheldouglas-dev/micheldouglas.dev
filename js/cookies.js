// ==========================================
// COOKIES.JS - MichelDouglas.dev
// Banner de consentimento de cookies (LGPD)
// ==========================================

(function () {
    const STORAGE_KEY = 'md_cookies_accepted';

    if (localStorage.getItem(STORAGE_KEY)) return;

    // ===== ESTILOS =====
    const style = document.createElement('style');
    style.textContent = `
        #cookie-banner {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 9999;
            background: var(--bg-secondary);
            border-top: 1px solid rgba(241, 19, 72, 0.25);
            padding: var(--space-4) var(--space-6);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--space-4);
            box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.4);
            animation: cookieSlideUp var(--transition-slow) ease;
        }
        @keyframes cookieSlideUp {
            from { transform: translateY(100%); opacity: 0; }
            to   { transform: translateY(0);    opacity: 1; }
        }
        #cookie-banner p {
            margin: 0;
            font-size: var(--text-sm);
            color: var(--text-gray);
            line-height: var(--leading-normal);
            flex: 1;
        }
        #cookie-banner a {
            color: var(--primary-accent);
            text-decoration: underline;
            transition: color var(--transition-base);
        }
        #cookie-banner a:hover {
            color: var(--primary-light);
        }
        #cookie-accept {
            flex-shrink: 0;
            background: var(--gradient-primary);
            color: var(--text-white);
            border: none;
            border-radius: var(--radius-lg);
            padding: var(--space-3) var(--space-5);
            font-size: var(--text-sm);
            font-weight: var(--font-semibold);
            font-family: var(--font-primary);
            cursor: pointer;
            transition: all var(--transition-base);
            box-shadow: var(--shadow-accent);
            white-space: nowrap;
        }
        #cookie-accept:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-secondary);
        }
        @media (max-width: 600px) {
            #cookie-banner {
                flex-direction: column;
                align-items: flex-start;
                padding: var(--space-4);
            }
            #cookie-accept { width: 100%; text-align: center; }
        }
    `;
    document.head.appendChild(style);

    // ===== BANNER HTML =====
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML = `
        <p>
            Usamos cookies para analisar o tráfego e melhorar sua experiência.
            Ao continuar navegando, você concorda com nossa
            <a href="/politica-de-privacidade.html">Política de Privacidade</a>.
        </p>
        <button id="cookie-accept">Aceitar</button>
    `;
    document.body.appendChild(banner);

    // ===== ACEITAR =====
    document.getElementById('cookie-accept').addEventListener('click', function () {
        localStorage.setItem(STORAGE_KEY, '1');
        banner.style.animation = 'cookieSlideUp 0.3s ease reverse';
        setTimeout(() => banner.remove(), 300);
    });
})();
