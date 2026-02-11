# 🚀 GUIA DE SETUP - MichelDouglas.dev

## 📋 Checklist de Assets Necessários

### 🎨 Logos (PRIORIDADE ALTA)
- [ ] `micheldouglas-logo.svg` - Logo principal
- [ ] `micheldouglas-logo-white.svg` - Logo branco para header
- [ ] `micheldouglas-logo-dark.svg` - Logo escuro para footer
- [ ] `favicon.svg` - Favicon SVG
- [ ] `favicon.ico` - Favicon ICO (fallback)

### 📸 Fotos/Imagens (PRIORIDADE ALTA)
- [ ] Foto profissional sua (about section)
- [ ] Screenshots do Instagram SEMED
- [ ] Mockups projetos SEMED
- [ ] Screenshots Quitinete App
- [ ] Protótipos Figma Quitinete
- [ ] Logos clientes (SEMED, IFPA, Quitinete)

### 🎬 Vídeo (PRIORIDADE MÉDIA)
- [ ] Vídeo hero background (ou criar alternativa)
- [ ] Vídeo otimizado em WebM
- [ ] Vídeo otimizado em MP4
- [ ] Imagem fallback para vídeo

### 🏷️ Tags Flutuantes (PRIORIDADE BAIXA)
- [ ] Tag "UX Design"
- [ ] Tag "Development"
- [ ] Tag "Designer"

### 📄 Documentos (PRIORIDADE MÉDIA)
- [ ] CV/Portfólio em PDF
- [ ] Imagem Open Graph (og-image.jpg)

---

## 🎨 Customização de Cores

Edite o arquivo `css/variables.css` para personalizar a paleta:

```css
:root {
    /* Escolha UMA das paletas abaixo ou crie a sua */
    
    /* OPÇÃO 1: Tech Moderno (Azul + Roxo) */
    --primary-accent: #3B82F6;      /* Blue 500 */
    --secondary-accent: #8B5CF6;    /* Violet 500 */
    
    /* OPÇÃO 2: Amazônia Tech (Verde + Dourado) */
    --primary-accent: #10B981;      /* Green 500 */
    --secondary-accent: #F59E0B;    /* Amber 500 */
    
    /* OPÇÃO 3: Regional (Laranja + Vermelho) */
    --primary-accent: #EF7D06;      /* Orange */
    --secondary-accent: #F11348;    /* Red */
}
```

---

## 📝 Personalização de Conteúdo

### 1. Informações Pessoais (index.html)

Edite as seguintes seções:

```html
<!-- Hero -->
<h1>Designer & <span>Full-Stack</span> Developer</h1>
<!-- ☝️ Altere seu título principal -->

<!-- Sobre -->
<p>Sou formado em...</p>
<!-- ☝️ Atualize sua biografia -->

<!-- Skills -->
<span class="skill-tag">UX/UI Design</span>
<!-- ☝️ Adicione/remova suas skills -->
```

### 2. Links de Redes Sociais (index.html - footer)

```html
<a href="https://github.com/SEU-USUARIO" target="_blank">
<a href="https://linkedin.com/in/SEU-USUARIO" target="_blank">
<a href="https://instagram.com/SEU-USUARIO" target="_blank">
```

### 3. Informações de Contato

```html
<a href="mailto:SEU-EMAIL@exemplo.com">
<span>Sua Localização</span>
```

---

## 🛠️ Próximos Passos

### FASE 1: Setup Básico ✅ (COMPLETO)
- [x] Estrutura de pastas criada
- [x] HTML base estruturado
- [x] CSS com variáveis configurado
- [x] JavaScript funcional implementado
- [x] Sistema responsivo completo

### FASE 2: Assets e Conteúdo (PRÓXIMO)
1. [ ] Adicionar logos na pasta `assets/images/logo/`
2. [ ] Adicionar fotos na pasta `assets/images/about/`
3. [ ] Adicionar screenshots de projetos em `assets/images/portfolio/`
4. [ ] Adicionar logos de clientes em `assets/images/clients/`
5. [ ] Criar/adicionar vídeo hero ou usar alternativa

### FASE 3: Otimização
6. [ ] Otimizar imagens (TinyPNG, ImageOptim)
7. [ ] Comprimir vídeo hero (< 2MB)
8. [ ] Minificar CSS e JS para produção
9. [ ] Testar em diferentes dispositivos
10. [ ] Validar HTML/CSS (W3C Validator)

### FASE 4: SEO e Performance
11. [ ] Adicionar Google Analytics
12. [ ] Configurar Google Search Console
13. [ ] Criar sitemap.xml
14. [ ] Testar PageSpeed Insights
15. [ ] Implementar lazy loading de imagens

### FASE 5: Deploy
16. [ ] Escolher hospedagem (Vercel, Netlify, GitHub Pages)
17. [ ] Configurar domínio micheldouglas.dev
18. [ ] Configurar SSL/HTTPS
19. [ ] Testar formulário de contato
20. [ ] Fazer backup do site

---

## 🎯 Alternativas para Assets Faltando

### Se não tiver vídeo hero:
```css
/* Substitua o vídeo por gradiente animado */
.hero {
    background: linear-gradient(
        135deg,
        var(--primary-dark) 0%,
        var(--primary-accent) 100%
    );
}
```

### Se não tiver foto profissional:
- Use um avatar ilustrado do [Avataaars Generator](https://getavataaars.com/)
- Ou remova a seção de foto e foque nos floating tags

### Se não tiver logos de clientes:
- Remova a seção `.hero-clients` temporariamente
- Ou use placeholders com nomes textuais

---

## 🔧 Como Testar Localmente

### Opção 1: Live Server (VSCode)
1. Instale extensão "Live Server"
2. Clique com direito em `index.html`
3. Selecione "Open with Live Server"

### Opção 2: Python
```bash
# Python 3
python -m http.server 8000

# Acesse: http://localhost:8000
```

### Opção 3: Node.js
```bash
npx serve .
```

---

## 📱 Testes de Responsividade

Teste nos seguintes tamanhos:

- [ ] Mobile: 375px (iPhone SE)
- [ ] Mobile: 414px (iPhone Pro Max)
- [ ] Tablet: 768px (iPad)
- [ ] Tablet: 1024px (iPad Pro)
- [ ] Desktop: 1440px (Laptop)
- [ ] Wide: 1920px (Desktop)

---

## ⚡ Performance Checklist

- [ ] Imagens < 200KB cada
- [ ] Vídeo hero < 2MB
- [ ] Total CSS < 100KB
- [ ] Total JS < 100KB
- [ ] Lighthouse Score > 90

---

## 📞 Suporte

Se tiver dúvidas sobre alguma parte do código:

1. Verifique os comentários inline nos arquivos
2. Leia a documentação no README.md
3. Teste em diferentes browsers

---

## 🎨 Ferramentas Recomendadas

### Design
- [Figma](https://figma.com) - Design de interfaces
- [Canva](https://canva.com) - Templates rápidos
- [Coolors](https://coolors.co) - Paletas de cores

### Otimização
- [TinyPNG](https://tinypng.com) - Comprimir imagens
- [Squoosh](https://squoosh.app) - Otimizar imagens
- [CloudConvert](https://cloudconvert.com) - Converter vídeos

### Testes
- [PageSpeed Insights](https://pagespeed.web.dev)
- [W3C Validator](https://validator.w3.org)
- [BrowserStack](https://browserstack.com) - Testar em múltiplos devices

### Deploy
- [Vercel](https://vercel.com) - Deploy automático
- [Netlify](https://netlify.com) - Hosting gratuito
- [GitHub Pages](https://pages.github.com) - Hosting via Git

---

## 🚀 Comandos Git Úteis

```bash
# Inicializar repositório
git init

# Adicionar arquivos
git add .

# Commit inicial
git commit -m "Initial commit - MichelDouglas.dev"

# Adicionar repositório remoto
git remote add origin https://github.com/SEU-USUARIO/micheldouglas.dev.git

# Push
git push -u origin main
```

---

**Desenvolvido com ☕ por Michel Douglas**
**Cametá, Pará, Brasil**
