document.addEventListener('DOMContentLoaded', async () => {
  async function loadPartial(path) {
    const res = await fetch(path);
    const html = await res.text();
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    return wrapper.children[0] || wrapper;
  }


  const header = await loadPartial('/partials/header.html');
  const footer = await loadPartial('/partials/footer.html');

  document.getElementById('header')?.appendChild(header);
  // Підʼєднуємо burger menu тільки після вставки header в DOM
  const burger = header.querySelector('.burger');
  if (burger) {
    const { toggleBurgerMenu } = await import('./refs.js');
    burger.addEventListener('click', toggleBurgerMenu);
  }
  const closeBtn = header.querySelector('.nav-close');
if (closeBtn) {
  const { closeBurgerMenu } = await import('./refs.js');
  
  console.log('✅ Close button знайдено, додаємо обробник');
  
  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeBurgerMenu();
  });
}

// Додаємо закриття меню при кліку на навігаційні посилання
const navLinks = header.querySelectorAll('.nav-item a');
if (navLinks.length > 0) {
  const { closeBurgerMenu } = await import('./refs.js');
  
  console.log('✅ Навігаційні посилання знайдено, додаємо обробники закриття');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeBurgerMenu();
      
      // Отримуємо href посилання
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          // Отримуємо висоту хедера
          const headerHeight = document.querySelector('header')?.offsetHeight || 0;
          // Отримуємо позицію секції
          const sectionTop = targetSection.offsetTop;
          // Прокручуємо з відступом від хедера
          window.scrollTo({
            top: sectionTop - headerHeight - 20, // 20px додатковий відступ
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

  document.getElementById('footer')?.appendChild(footer);
  
  const sections = {
    company: '/partials/company.html',
    agronomy: '/partials/agronomy.html',
    precision: '/partials/precision.html',
    education: '/partials/education.html',
    feedback: '/partials/feedback.html',
    'agronomy-details': '/partials/agronomy-details-content.html'
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

      // Акордеон для компанії
      if (id === 'company') {
        const btn = document.querySelector('.btn-link');
        const accordion = document.getElementById('companyAccordion');
        const closeBtn = accordion?.querySelector('.accordion-close');
        const hero = document.querySelector('.hero');

        if (btn && accordion && closeBtn) {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.style.opacity = '0';
            btn.style.pointerEvents = 'none';
            accordion.hidden = false;
            accordion.classList.add('open');
            closeBtn.style.display = 'flex';
            hero?.classList.add('open');

            setTimeout(() => {
              // Отримуємо висоту хедера
              const headerHeight = document.querySelector('header')?.offsetHeight || 0;
              // Отримуємо позицію акордеону
              const accordionTop = accordion.offsetTop;
              // Прокручуємо з відступом від хедера
              window.scrollTo({
                top: accordionTop - headerHeight - 20, // 20px додатковий відступ
                behavior: 'smooth'
              });
            }, 200);
          });

          closeBtn.addEventListener('click', () => {
            accordion.classList.remove('open');
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
            closeBtn.style.display = 'none';
            hero?.classList.remove('open');

            setTimeout(() => {
              accordion.hidden = true;
              
              // Прокручуємо до секції "Агрономія"
              const agronomySection = document.getElementById('agronomy');
              if (agronomySection) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const agronomyTop = agronomySection.offsetTop;
                window.scrollTo({
                  top: agronomyTop - headerHeight - 20,
                  behavior: 'smooth'
                });
              }
            }, 200);
          });
        }
      }
    }
  }
});