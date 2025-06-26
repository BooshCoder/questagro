import { toggleBurgerMenu } from './refs.js';

// console.log("Vite + Vanilla JS працює!");

document.addEventListener('DOMContentLoaded', async () => {
  // console.log("DOM повністю завантажено");
  async function loadPartial(path) {
    const res = await fetch(path);
    const html = await res.text();
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    // console.log(`📦 Завантажено з ${path}:`, html);
    return wrapper.children[0] || wrapper;
  }


  const header = await loadPartial('/partials/header.html');
  const footer = await loadPartial('/partials/footer.html');

  document.getElementById('header')?.appendChild(header);
  document.getElementById('footer')?.appendChild(footer);
  
  const sections = {
    company: '/partials/company.html',
    agronomy: '/partials/agronomy.html',
    precision: '/partials/precision.html',
    education: '/partials/education.html',
    feedback: '/partials/feedback.html'
  };

  for (const [id, path] of Object.entries(sections)) {
    const container = document.getElementById(id);
    if (container) {
      const section = await loadPartial(path);
      if (!section) {
        // console.warn(`⚠️ Не вдалося створити DOM з паршалу: ${id}`);
      } else {
        // console.log(`✅ Вставляємо секцію ${id}`);
      }
      container.appendChild(section);
    }
  }
});