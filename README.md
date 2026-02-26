<!-- ══════════════════════ HEADER ══════════════════════ -->
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td valign="middle">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/micheldouglas-dev/micheldouglas.dev/main/assets/images/logo/micheldouglas-logo-white.svg">
        <img alt="MichelDouglas.dev" src="https://raw.githubusercontent.com/micheldouglas-dev/micheldouglas.dev/main/assets/images/logo/micheldouglas-logo-black.svg" width="220">
      </picture>
    </td>
    <td align="right" valign="middle">
      <a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML"><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"></a>
      <a href="https://developer.mozilla.org/pt-BR/docs/Web/CSS"><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"></a>
      <a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"></a>
      <a href="https://www.php.net/"><img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP"></a>
    </td>
  </tr>
</table>

<div align="center">

<br>

**✦ Transformando ideias em experiências digitais**

[![Ver site ao vivo →](https://img.shields.io/badge/Ver_site_ao_vivo_→-15161C?style=for-the-badge&logo=googlechrome&logoColor=F11348)](https://micheldouglas.dev)

</div>

---

## ✦ Sobre o Projeto

Portfólio profissional desenvolvido do zero em HTML, CSS e JavaScript puro — sem frameworks, sem dependências desnecessárias. Cada detalhe foi pensado para comunicar identidade, competência e cuidado com a experiência do usuário.

O site reúne minha atuação como **Designer UX/UI e Desenvolvedor Full-Stack especializado em Low-Code**, apresentando serviços, metodologia de trabalho e cases reais de projetos entregues.

---

## ✦ Preview

<div align="center">

![Preview do site](https://raw.githubusercontent.com/micheldouglas-dev/micheldouglas.dev/main/assets/images/about/micheldouglas.dev.jpeg)

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

<!-- ══════════════════════ FOOTER ══════════════════════ -->
<table width="100%" border="0" cellspacing="0" cellpadding="8">
  <tr>
    <td valign="top" width="45%">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/micheldouglas-dev/micheldouglas.dev/main/assets/images/logo/micheldouglas-logo-white.svg">
        <img alt="MichelDouglas.dev" src="https://raw.githubusercontent.com/micheldouglas-dev/micheldouglas.dev/main/assets/images/logo/micheldouglas-logo-black.svg" width="200">
      </picture>
      <br><br>
      <sub>Designer UX/UI e Desenvolvedor Full-Stack especializado em Low-Code, trazendo o equilíbrio perfeito entre domínio técnico e visão criativa.</sub>
    </td>
    <td valign="top" width="28%">
      <strong>Atendimento</strong><br><br>
      <a href="mailto:contato@micheldouglas.dev"><img src="https://img.shields.io/badge/contato%40micheldouglas.dev-F11348?style=flat-square&logo=gmail&logoColor=white" alt="E-mail"></a><br><br>
      <a href="https://wa.me/5591993706923"><img src="https://img.shields.io/badge/(91)%2099370--6923-25D366?style=flat-square&logo=whatsapp&logoColor=white" alt="WhatsApp"></a><br><br>
      <a href="https://maps.app.goo.gl/MFLq5aW8mKk6zvJTA"><img src="https://img.shields.io/badge/Cametá%2C%20PA%2C%20Brasil-F11348?style=flat-square&logo=googlemaps&logoColor=white" alt="Localização"></a>
    </td>
    <td valign="top" width="27%">
      <strong>Me acompanhe</strong><br><br>
      <a href="https://github.com/micheldouglas-dev"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub"></a>
      <a href="https://linkedin.com/in/micheldouglasdev/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn"></a><br><br>
      <a href="https://instagram.com/micheldouglas.dev"><img src="https://img.shields.io/badge/Instagram-E4405F?style=flat-square&logo=instagram&logoColor=white" alt="Instagram"></a>
      <a href="https://facebook.com/micheldouglasdev"><img src="https://img.shields.io/badge/Facebook-1877F2?style=flat-square&logo=facebook&logoColor=white" alt="Facebook"></a>
    </td>
  </tr>
</table>

---

<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td valign="middle">
      <img src="https://raw.githubusercontent.com/micheldouglas-dev/micheldouglas.dev/main/assets/images/logo/mi-logo.svg" alt="MI" width="32">
    </td>
    <td align="right" valign="middle">
      <sub>© 2026 <strong>Michel Douglas</strong> – Todos os direitos reservados.</sub>
    </td>
  </tr>
</table>
