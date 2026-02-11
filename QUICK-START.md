# 🎯 REFERÊNCIA RÁPIDA - MichelDouglas.dev

## 📂 Estrutura de Arquivos

```
micheldouglas.dev/
├── index.html              # Página principal (EDITE AQUI seu conteúdo)
├── README.md               # Documentação do projeto
├── SETUP.md                # Guia de setup e próximos passos
├── .gitignore              # Arquivos ignorados pelo Git
│
├── assets/
│   ├── images/
│   │   ├── logo/                    # ⚠️ ADICIONE: logos e favicon
│   │   ├── hero/                    # ⚠️ ADICIONE: vídeo ou imagem hero
│   │   ├── about/                   # ⚠️ ADICIONE: sua foto
│   │   │   └── floating-tags/       # ⚠️ ADICIONE: tags animadas
│   │   ├── portfolio/
│   │   │   ├── semed/               # ⚠️ ADICIONE: screenshots SEMED
│   │   │   ├── quitinete/           # ⚠️ ADICIONE: screenshots Quitinete
│   │   │   └── outros/              # ⚠️ ADICIONE: outros projetos
│   │   ├── clients/                 # ⚠️ ADICIONE: logos clientes
│   │   └── icons/                   # ⚠️ ADICIONE: ícones serviços
│   ├── videos/                      # ⚠️ ADICIONE: vídeo hero
│   └── fonts/                       # Fontes locais (opcional)
│
├── css/
│   ├── variables.css       # 🎨 EDITE AQUI: cores e variáveis
│   ├── style.css           # Estilos principais
│   ├── animations.css      # Animações
│   └── responsive.css      # Media queries
│
├── js/
│   ├── main.js             # Script principal
│   ├── animations.js       # Efeitos visuais (opcional)
│   └── portfolio.js        # Funcionalidades portfólio
│
└── docs/
    └── portfolio.pdf       # ⚠️ ADICIONE: seu CV em PDF
```

---

## 🎨 PERSONALIZAÇÃO RÁPIDA

### 1️⃣ Cores (css/variables.css)

```css
:root {
    /* Altere estas cores para sua paleta */
    --primary-accent: #3B82F6;      /* Cor principal */
    --secondary-accent: #8B5CF6;    /* Cor secundária */
}
```

### 2️⃣ Conteúdo (index.html)

**Hero Section (Linha ~68):**
```html
<h1>SEU TÍTULO AQUI</h1>
<p>Sua descrição aqui...</p>
```

**Sobre Section (Linha ~89):**
```html
<h2>Sua introdução aqui...</h2>
<p>Sua biografia...</p>
```

**Skills Tags (Linha ~109):**
```html
<span class="skill-tag">Sua Skill</span>
<!-- Adicione mais skills -->
```

### 3️⃣ Redes Sociais (Footer - Linha ~1046)

```html
<a href="https://github.com/SEU-USUARIO">GitHub</a>
<a href="https://linkedin.com/in/SEU-USUARIO">LinkedIn</a>
<a href="https://instagram.com/SEU-USUARIO">Instagram</a>
```

### 4️⃣ Contato (Linha ~868)

```html
<a href="mailto:SEU-EMAIL@exemplo.com">seu-email</a>
<span>Sua Localização</span>
```

---

## 🚀 COMEÇAR AGORA

### Passo 1: Adicionar Logo
1. Coloque seu logo em: `assets/images/logo/micheldouglas-logo-white.svg`
2. O site já está configurado para usar

### Passo 2: Adicionar Foto (Opcional)
1. Coloque sua foto em: `assets/images/about/profile-photo.jpg`
2. Ou remova a seção se preferir apenas tags flutuantes

### Passo 3: Personalizar Cores
1. Abra: `css/variables.css`
2. Altere `--primary-accent` e `--secondary-accent`
3. Salve e recarregue

### Passo 4: Editar Textos
1. Abra: `index.html`
2. Procure por "<!-- HERO SECTION -->"
3. Edite os textos conforme necessário

### Passo 5: Testar
```bash
# Abra index.html no navegador
# OU use Live Server (VSCode)
# OU use: python -m http.server 8000
```

---

## 📋 CHECKLIST PRÉ-LANÇAMENTO

### Conteúdo
- [ ] Logo adicionado
- [ ] Textos personalizados
- [ ] Foto/imagem sobre
- [ ] Screenshots projetos
- [ ] Links redes sociais atualizados
- [ ] Email de contato atualizado

### Design
- [ ] Cores personalizadas
- [ ] Testado em mobile
- [ ] Testado em tablet
- [ ] Testado em desktop

### SEO
- [ ] Title atualizado (linha 7)
- [ ] Meta description (linha 9)
- [ ] Open Graph tags (linha 16-20)
- [ ] Favicon adicionado

### Performance
- [ ] Imagens otimizadas (< 200KB)
- [ ] Vídeo comprimido (< 2MB)
- [ ] Testado PageSpeed

---

## 🎯 RECURSOS DO SITE

### ✅ Já Implementado:
- ✅ Header fixo com menu responsivo
- ✅ Hero com vídeo background
- ✅ Seção Sobre com animações
- ✅ Cards de Serviços
- ✅ Grid de Portfólio
- ✅ Formulário de Contato
- ✅ Footer completo
- ✅ Scroll suave
- ✅ Animações on-scroll
- ✅ Mobile menu (hamburguer)
- ✅ Responsivo completo
- ✅ SEO básico
- ✅ Performance otimizada

### 🎨 Funcionalidades Extras (Opcional):
- Typing effect no hero
- Particles background
- Cursor personalizado
- Progress bar de scroll
- Modal de projetos
- Filtros de portfólio

**Para ativar:** Descomente no arquivo `js/animations.js`

---

## 🛠️ FERRAMENTAS ÚTEIS

### Para Criar Assets:
- **Logo:** Canva, Figma, Adobe Illustrator
- **Favicon:** [Favicon.io](https://favicon.io)
- **Vídeo:** [Coverr](https://coverr.co) (vídeos grátis)
- **Fotos:** [Unsplash](https://unsplash.com)

### Para Otimizar:
- **Imagens:** [TinyPNG](https://tinypng.com)
- **Vídeo:** [CloudConvert](https://cloudconvert.com)
- **CSS/JS:** [Minifier](https://www.minifier.org)

### Para Testar:
- **Responsivo:** DevTools (F12)
- **Performance:** [PageSpeed](https://pagespeed.web.dev)
- **SEO:** [SEO Checker](https://www.seoptimer.com)
- **HTML:** [W3C Validator](https://validator.w3.org)

---

## 🐛 TROUBLESHOOTING

### Logo não aparece?
- Verifique o caminho: `assets/images/logo/micheldouglas-logo-white.svg`
- Confirme que o arquivo existe
- Verifique console do navegador (F12)

### Vídeo não carrega?
- Verifique tamanho (< 5MB recomendado)
- Use formato WebM + MP4
- Adicione poster/fallback image

### Menu mobile não funciona?
- Abra console (F12) e verifique erros
- Confirme que `js/main.js` está carregando
- Limpe cache do navegador

### Animações não funcionam?
- Verifique se `css/animations.css` está linkado
- Teste em modo anônimo (sem extensions)
- Verifique console por erros JavaScript

---

## 📞 PRÓXIMOS PASSOS

1. **AGORA:** Adicione logo e personalize cores
2. **HOJE:** Complete todos os textos
3. **ESTA SEMANA:** Adicione fotos e screenshots
4. **PRÓXIMA SEMANA:** Teste e otimize
5. **DEPOIS:** Deploy e compartilhe!

---

## 🎉 DICA FINAL

**Não precisa ser perfeito!** Lance uma versão inicial e vá melhorando aos poucos. O importante é ter seu portfólio online.

**Compartilhe sua URL quando estiver pronto!** 🚀

---

**Desenvolvido com ☕ em Cametá, Pará, Brasil**
**© 2026 Michel Douglas - Todos os direitos reservados**
