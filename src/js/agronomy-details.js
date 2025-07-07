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
export function toggleBurgerMenu() {
  console.log('🍔 Burger clicked!'); // Для debugging
  
  const nav = document.querySelector('.header__nav');
  
  if (!nav) {
    console.error('❌ .header__nav не знайдено!');
    return;
  }
  
  // Просто toggle класу open
  nav.classList.toggle('open');
  
  console.log('📱 Menu toggled, isOpen:', nav.classList.contains('open'));
}

export function closeBurgerMenu() {
  console.log('❌ Close button clicked!'); // Для debugging
  
  const nav = document.querySelector('.header__nav');
  
  if (!nav) {
    console.error('❌ .header__nav не знайдено!');
    return;
  }
  
  // Закриваємо меню
  nav.classList.remove('open');
  
  console.log('📱 Menu closed');
}