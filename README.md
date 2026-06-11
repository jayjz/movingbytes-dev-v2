# movingbytes.dev

**High-Performance Portfolio for Agent Systems Architecture**

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=flat-square)](https://movingbytes-dev-v2.vercel.app)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> Production-grade portfolio built with vanilla web technologies. No frameworks, no build tools — just intentional design, systems thinking, and performance at the edge.

## Overview

movingbytes.dev is a cinematic, high-performance portfolio showcasing production autonomous systems and agent architecture work. Built entirely with vanilla HTML, CSS, and JavaScript, the site demonstrates that modern web experiences don't require complex toolchains — just thoughtful engineering and a focus on fundamentals.

The portfolio features a dark, atmospheric design with smooth animations, responsive layouts, and sub-100ms interaction times, proving that "vanilla" doesn't mean "basic."

## ✨ Features

- **🎨 Cinematic Design** - Dark theme with carefully crafted visual hierarchy and atmospheric effects
- **⚡ Zero-Dependency** - No frameworks, build tools, or external dependencies
- **📱 Fully Responsive** - Fluid layouts that work from mobile to 4K displays
- **♿ Accessible** - Semantic HTML, ARIA labels, and keyboard navigation
- **🚀 Performance-First** - < 50KB total, instant loads, 100/100 Lighthouse scores
- **🎯 Progressive Enhancement** - Core content works without JavaScript

## 🛠️ Tech Stack

**Core Technologies**
- **HTML5** - Semantic markup with accessibility in mind
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** - ES6+ with no dependencies

**Design Principles**
- Performance-first architecture
- Mobile-first responsive design
- Progressive enhancement
- Accessibility (WCAG 2.1 AA)

**Deployment**
- Static hosting (Vercel / Cloudflare Pages)
- Zero build step
- Edge-cached globally

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/jayjz/movingbytes-dev-v2.git
cd movingbytes-dev-v2

# Start local server (Python)
python -m http.server 8000

# Or with Node.js
npx serve .

# Or with PHP
php -S localhost:8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

### Deployment

This is a static site — deploy to any static host:

**Vercel:**
```bash
vercel --prod
```

**Cloudflare Pages:**
```bash
# Connect GitHub repo to Cloudflare Pages
# Build command: (none)
# Output directory: /
```

**Netlify:**
```bash
# Drag and drop the folder to Netlify
# Or connect via Git
```

## 📁 Project Structure

```
├── index.html          # Main entry point
├── css/
│   └── style.css       # All styles (no preprocessors)
├── js/
│   └── main.js         # Vanilla JavaScript
├── assets/             # Fonts, icons
├── images/             # Optimized images
├── vercel.json         # Vercel configuration
└── README.md
```

## 🎯 Design Philosophy

### Why Vanilla?

**1. Performance**
- No framework overhead
- Direct DOM manipulation when needed
- < 50KB total payload
- Instant Time to Interactive

**2. Maintainability**
- No build step to break
- No dependency updates
- Works in any browser from 2018+
- Easy to hand off or modify

**3. Learning**
- Demonstrates deep understanding of web fundamentals
- Shows ability to build without abstractions
- Proves systems thinking over framework chasing

### Technical Decisions

- **No Build Tools:** Direct authoring in HTML/CSS/JS for maximum control
- **CSS Custom Properties:** Theming and consistency without preprocessors
- **Vanilla JS Modules:** Native ES modules for code organization
- **Progressive Enhancement:** Works without JS, enhanced with JS

## 🌐 Live Demo

**Production:** [https://movingbytes-dev-v2.vercel.app](https://movingbytes-dev-v2.vercel.app)

**Alternative:** [https://movingbytes.dev](https://movingbytes.dev)

## 📊 Performance

Lighthouse scores (mobile):
- **Performance:** 100/100
- **Accessibility:** 100/100
- **Best Practices:** 100/100
- **SEO:** 100/100

**Metrics:**
- First Contentful Paint: < 0.5s
- Time to Interactive: < 0.8s
- Total Blocking Time: 0ms
- Cumulative Layout Shift: 0

## 🎨 Customization

The site uses CSS custom properties for easy theming:

```css
:root {
  --color-bg: #0a0a0a;
  --color-text: #e0e0e0;
  --color-accent: #00ff88;
  --font-mono: 'JetBrains Mono', monospace;
  --spacing-unit: 8px;
}
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🤝 Contributing

This is a personal portfolio, but suggestions are welcome! Open an issue for:
- Accessibility improvements
- Performance optimizations
- Browser compatibility fixes

## 📬 Contact

**Jay** - Agent Systems Architect  
- Portfolio: [movingbytes.dev](https://movingbytes.dev)
- GitHub: [@jayjz](https://github.com/jayjz)

---

**Built with** vanilla web technologies • **Deployed on** Vercel • **Last updated** June 2026