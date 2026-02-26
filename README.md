<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/micheldouglas-dev/micheldouglas.dev/main/assets/images/logo/micheldouglas-logo-white.svg">
  <img alt="MichelDouglas.dev" src="https://raw.githubusercontent.com/micheldouglas-dev/micheldouglas.dev/main/assets/images/logo/micheldouglas-logo-black.svg" width="280">
</picture>

<br><br>

**✦ Transformando ideias em experiências digitais**

[![Site](https://img.shields.io/badge/micheldouglas.dev-F11348?style=for-the-badge&logo=googlechrome&logoColor=white)](https://micheldouglas.dev)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/)

</div>

---

## ✦ Sobre o Projeto

Portfólio profissional desenvolvido do zero em HTML, CSS e JavaScript puro — sem frameworks, sem dependências desnecessárias. Cada detalhe foi pensado para comunicar identidade, competência e cuidado com a experiência do usuário.

O site reúne minha atuação como **Designer UX/UI e Desenvolvedor Full-Stack especializado em Low-Code**, apresentando serviços, metodologia de trabalho e cases reais de projetos entregues.

<div align="center">

[![Ver site ao vivo →](https://img.shields.io/badge/Ver_site_ao_vivo_→-15161C?style=for-the-badge&logo=vercel&logoColor=F11348)](https://micheldouglas.dev)

</div>

---

## ✦ Preview

<div align="center">

![Preview do site](https://raw.githubusercontent.com/micheldouglas-dev/micheldouglas.dev/main/assets/images/portfolio/quitinete/cover.webp)

</div>

---

## ✦ Stack

| Camada | Tecnologias |
|--------|-------------|
| **Frontend** | HTML5 Semântico · CSS3 (Grid, Flexbox, Custom Properties) · JavaScript ES6+ |
| **Backend** | PHP 8 · PHPMailer · Sessões PHP (CSRF + Math CAPTCHA) |
| **UI / Ícones** | Remix Icons · Inter (Google Fonts) |
| **Libs JS** | Swiper.js · Intersection Observer API |
| **Assets** | WebP · WebM · SVG |
| **Hospedagem** | Hostinger (SMTP + Domínio) |

---

## ✦ Páginas e Seções

```
micheldouglas.dev/
│
├── index.html          → Hero · Sobre · Serviços · Processo · Portfólio · Contato
├── portfolio.html      → Grid de projetos com filtros por categoria
├── contato.html        → Formulário com CAPTCHA matemático + validação CSRF
├── sucesso.html        → Confirmação de envio
│
└── portfolio/
    ├── quitinete.html          → Case: App mobile de gestão de aluguel
    ├── guardioes-floresta.html → Case: Jogo roguelike deck-builder amazônico
    └── semed-rebrand.html      → Case: Rebranding da Secretaria Municipal de Educação
```

---

## ✦ Funcionalidades

- **Hero com vídeo de fundo** — efeito de overlay com gradiente e typewriter animado
- **Menu mobile** — navegação responsiva com animação de abertura/fechamento
- **Scroll Reveal** — elementos entram em cena conforme o scroll com Intersection Observer
- **Portfólio com filtros** — categorias Web, Mobile e Branding com animação de transição
- **Formulário seguro** — CAPTCHA matemático gerado server-side + token CSRF por sessão PHP
- **E-mail automático** — envio via PHPMailer com template HTML fiel ao design system do site
- **Design system próprio** — variáveis CSS centralizadas, tipografia, paleta e espaçamentos consistentes
- **100% responsivo** — Mobile-first, breakpoints de 360px até 1440px

---

## ✦ Estrutura de Arquivos

```
micheldouglas.dev/
├── index.html
├── portfolio.html
├── contato.html
├── sucesso.html
│
├── portfolio/
│   ├── quitinete.html
│   ├── guardioes-floresta.html
│   └── semed-rebrand.html
│
├── css/
│   ├── variables.css       # Design tokens (cores, tipografia, espaçamentos)
│   ├── style.css           # Estilos globais e componentes
│   ├── animations.css      # Animações e transições
│   ├── responsive.css      # Media queries (360px → 1440px)
│   ├── portfolio.css       # Estilos exclusivos da página de portfólio
│   ├── portfolio-case.css  # Estilos dos cases individuais
│   ├── contato.css         # Estilos da página de contato
│   └── sucesso.css         # Estilos da página de sucesso
│
├── js/
│   ├── main.js             # Menu mobile, scroll behavior, footer year
│   ├── animations.js       # Intersection Observer (scroll reveal)
│   ├── typewriter.js       # Efeito de digitação no hero
│   └── portfolio.js        # Filtros e grid do portfólio
│
├── api/
│   ├── captcha.php         # Gera CAPTCHA matemático + token CSRF
│   ├── enviar-email.php    # Processa formulário e envia e-mail via PHPMailer
│   ├── config.example.php  # Modelo de configuração SMTP (sem credenciais reais)
│   ├── templates/
│   │   └── email-template.php  # Template HTML do e-mail (segue o design system)
│   └── PHPMailer/
│       └── src/            # Biblioteca PHPMailer
│
└── assets/
    ├── images/
    │   ├── logo/           # Logos SVG (branco, preto, favicon)
    │   ├── about/          # Foto e elementos visuais da seção Sobre
    │   ├── clients/        # Logos dos clientes
    │   ├── service/        # Covers dos serviços (WebP)
    │   ├── portfolio/      # Covers e screenshots dos projetos (WebP)
    │   └── cta/            # Floating tags e imagens de suporte
    └── videos/
        └── hero-background.webm / .mp4
```

---

## ✦ Cases de Portfólio

<table>
  <tr>
    <td align="center" width="33%">
      <strong>Quitinete App</strong><br>
      <sub>Mobile · FlutterFlow · Firebase</sub><br><br>
      Plataforma de gestão de aluguel de quitinetes para locadores e locatários, com autenticação, contratos e notificações.
    </td>
    <td align="center" width="33%">
      <strong>Guardiões da Floresta</strong><br>
      <sub>Game Design · Web · Unity</sub><br><br>
      Jogo roguelike deck-builder digital com mecânicas inovadoras e narrativa enraizada na cultura amazônica.
    </td>
    <td align="center" width="33%">
      <strong>SEMED Rebranding</strong><br>
      <sub>Branding · Social Media · Figma</sub><br><br>
      Rebranding completo da identidade visual e estratégia de comunicação da Secretaria Municipal de Educação de Cametá.
    </td>
  </tr>
</table>

---

## ✦ Rodando Localmente

O site é composto por arquivos estáticos. Basta clonar e abrir no navegador:

```bash
git clone https://github.com/micheldouglas-dev/micheldouglas.dev.git
cd micheldouglas.dev
```

Abra o `index.html` diretamente no navegador, ou use uma extensão como **Live Server** (VS Code) para desenvolvimento local.

> Para o formulário de contato funcionar, é necessário um servidor PHP com o arquivo `api/config.php` configurado a partir do `api/config.example.php`.

---

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/micheldouglas-dev/micheldouglas.dev/main/assets/images/logo/mi-logo.svg">
  <img alt="MI" src="https://raw.githubusercontent.com/micheldouglas-dev/micheldouglas.dev/main/assets/images/logo/mi-logo.svg" width="40">
</picture>

<br>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/micheldouglasdev/)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://instagram.com/micheldouglas.dev)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/micheldouglas-dev)
[![E-mail](https://img.shields.io/badge/contato@micheldouglas.dev-F11348?style=flat-square&logo=gmail&logoColor=white)](mailto:contato@micheldouglas.dev)

<br>

© 2026 **Michel Douglas** · Todos os direitos reservados · Feito com foco em Cametá, Pará, Brasil 🌿

</div>
