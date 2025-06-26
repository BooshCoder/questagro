# 🌾 QuestAGRO

> **BooshCoder Vite Starter** — a minimal and clean starter template using Vite,
> HTML partials, custom CSS, and vanilla JavaScript. Ideal for landing pages,
> quick MVPs, or micro frontends.

---

## 🔧 Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm install`     | install dependencies                     |
| `npm run dev`     | launch local dev server (localhost:5173) |
| `npm run build`   | build the project into `/dist`           |
| `npm run preview` | preview production build                 |

---

## 📁 Project Structure

```
questagro/
├── .gitignore
├── .editorconfig
├── .prettierrc.json
├── index.html             # main entry HTML
├── package.json           # project config
├── vite.config.js         # custom Vite config
├── public/
│   └── partials/          # HTML fragments (partials)
│       ├── header.html
│       ├── company.html
│       ├── agronomy.html
│       ├── precision.html
│       ├── education.html
│       ├── feedback.html
│       └── footer.html
└── src/
    ├── css/               # custom styles
    │   ├── base.css
    │   ├── reset.css
    │   ├── responsive.css
    │   └── sections.css
    ├── img/               # image assets
    └── js/
        └── main.js        # JavaScript logic for loading partials
```

---

## 🧩 Plugins Used

- [`vite-plugin-full-reload`](https://www.npmjs.com/package/vite-plugin-full-reload)
  – full reload on HTML changes
- [`postcss-sort-media-queries`](https://www.npmjs.com/package/postcss-sort-media-queries)
  – auto-sort media queries (mobile-first)

---

## 🧩 How HTML partials work?

HTML partials live in `/public/partials/` and are loaded dynamically using
JavaScript at runtime:

```js
const section = await loadPartial('/partials/company.html');
document.querySelector('#sections').appendChild(section);
```

This keeps the HTML clean and modular while keeping build tools minimal.

---

## 📦 Quick Start

```bash
git clone https://github.com/your-username/questagro.git
cd questagro
npm install
npm run dev
```

---

## 🚀 GitHub Pages (optional)

Want to deploy automatically?  
Add `.github/workflows/deploy.yml` — just ask me:  
**“Add GitHub Pages deploy flow”** and I’ll handle it 😉

---

## ✍️ Author

> Made with 💚 and `console.log(dedication)`  
> **BooshCoder** (Bushmakin_Eu)  
> 📩 [Bushmakin07@gmail.com](mailto:Bushmakin07@gmail.com)

---
