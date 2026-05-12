# 💎 Amethyst – A Physiotherapy Clinic

 A modern, responsive single-page website designed for Amethyst - a physiotherapy clinic.  
The project emphasizes clean UI, performance, and maintainability using semantic HTML, SCSS, and modern JavaScript.

It is ideal for clinics that need a professional online presence with full control over branding and styles.

---

## 🌿 Features

- Responsive single-page layout
- Custom styling using SCSS
- Clean and semantic HTML5 structure
- Lightweight ES6 JavaScript
- Fast loading and SEO-friendly
- Easy to maintain and extend

---

## 🛠️ Tech Stack

- **HTML5** – Semantic and accessible markup  
- **SCSS (Sass)** – Modular and maintainable styling  
- **JavaScript (ES6)** – Minimal interactivity  
- **Node.js & npm** – Build tooling for SCSS
- **Gsap Animations** - A robust animation library for providing jaw-dropping animations

---

## Sass Workflow

- `npm run sass` compiles `src/assets/css/main.scss` into `src/assets/css/main.css`
- `npm run sass:watch` watches SCSS files and recompiles on save
- `npm run sass:verify` recompiles once and confirms the compiled service-page `h1` rule exists in `main.css`

Quick verification flow:

1. Run `npm run sass:watch`
2. Change a visible rule in `src/assets/css/layouts/_services.scss`
3. Save the file
4. Refresh the service page and hard refresh with `Ctrl+F5` if needed
5. Run `npm run sass:verify` for a quick sanity check

