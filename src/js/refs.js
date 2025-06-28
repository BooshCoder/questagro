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