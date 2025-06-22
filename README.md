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
└── src/
    ├── css/
    │   └── main.css        # custom styles
    ├── img/                # image assets
    ├── js/
    │   └── main.js         # JavaScript logic
    ├── partials/           # HTML fragments (partials)
    │   └── footer.html
    └── index.html          # includes partials
```

---

## 🧩 Plugins Used

- [`vite-plugin-html-inject`](https://www.npmjs.com/package/vite-plugin-html-inject)
  – inject partials into HTML
- [`vite-plugin-full-reload`](https://www.npmjs.com/package/vite-plugin-full-reload)
  – full reload on HTML changes
- [`postcss-sort-media-queries`](https://www.npmjs.com/package/postcss-sort-media-queries)
  – auto-sort media queries (mobile-first)

---

## 🧩 How HTML partials work?

Example in `index.html`:

```html
<load src="./src/partials/footer.html" />
```

> These are injected during the build via `vite-plugin-html-inject`.

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

## 🦄 License

MIT — use it freely, just don’t forget to drop a star ⭐
