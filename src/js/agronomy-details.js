// Логіка для agronomy-details.html

// Акордеон для агрономічних етапів
function initAgroAccordion() {
  const items = document.querySelectorAll('.agro-acc-item');
  items.forEach(item => {
    const btn = item.querySelector('.agro-acc-btn');
    const panel = item.querySelector('.agro-acc-panel');
    if (!btn || !panel) return;
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      items.forEach(otherItem => {
        if (otherItem !== item) {
          const otherBtn = otherItem.querySelector('.agro-acc-btn');
          const otherPanel = otherItem.querySelector('.agro-acc-panel');
          if (otherBtn && otherPanel) {
            otherBtn.setAttribute('aria-expanded', 'false');
            otherPanel.classList.remove('open');
            otherItem.classList.remove('active');
          }
        }
      });
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        panel.classList.add('open');
        item.classList.add('active');
      } else {
        btn.setAttribute('aria-expanded', 'false');
        panel.classList.remove('open');
        item.classList.remove('active');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initAgroAccordion();
});
