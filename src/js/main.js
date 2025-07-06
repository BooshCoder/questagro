import '../css/main.css';

document.addEventListener('DOMContentLoaded', async () => {
  // Визначаємо базовий шлях для GitHub Pages
  const getBasePath = () => {
    const pathname = window.location.pathname;
    
    // Якщо ми на GitHub Pages і шлях містить назву репозиторію
    if (pathname.includes('/QuestAGRO_cursor/')) {
      return '/QuestAGRO_cursor/';
    }
    
    // Для всіх інших випадків (включаючи кастомний домен)
    // використовуємо базовий шлях GitHub Pages
    return '/QuestAGRO_cursor/';
  };

  const basePath = getBasePath();

  async function loadPartial(path) {
    // Додаємо базовий шлях до відносного шляху
    const fullPath = path.startsWith('./') ? basePath + path.slice(2) : basePath + path;
    const res = await fetch(fullPath);
    const html = await res.text();
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    return wrapper.children[0] || wrapper;
  }


  const header = await loadPartial('./partials/header.html');
  const footer = await loadPartial('./partials/footer.html');

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
// hfhhfhf
  document.getElementById('footer')?.appendChild(footer);
  
  const sections = {
    company: './partials/company.html',
    agronomy: './partials/agronomy.html',
    precision: './partials/precision.html',
    education: './partials/education.html',
    feedback: './partials/feedback.html',
    'agronomy-details': './partials/agronomy-details.html'
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
        // Шукаємо тільки в межах контейнера company
        const companyContainer = container;
        const btn = companyContainer.querySelector('.btn-link');
        const accordion = companyContainer.querySelector('#companyAccordion');
        const closeBtn = accordion?.querySelector('.accordion-close');
        const hero = companyContainer.querySelector('.hero');

        // Intersection Observer для кнопки
        if (accordion && closeBtn) {
          const observer = new window.IntersectionObserver(
            (entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
                  closeBtn.classList.remove('is-hidden');
                } else {
                  closeBtn.classList.add('is-hidden');
                }
              });
            },
            {
              threshold: [0, 0.2, 1]
            }
          );
          observer.observe(accordion);
        }

        if (btn && accordion && closeBtn) {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.style.opacity = '0';
            btn.style.pointerEvents = 'none';
            accordion.hidden = false;
            requestAnimationFrame(() => {
              accordion.classList.add('open');
            });
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
            }, 400);
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
            }, 600); // Чекаємо завершення анімації max-height
          });
        }
      }
    }
  }

  // Agro-accordion logic
  function initAgroAccordion() {
    const items = document.querySelectorAll('.agro-acc-item');
    
    items.forEach(item => {
      const btn = item.querySelector('.agro-acc-btn');
      const panel = item.querySelector('.agro-acc-panel');
      
      if (!btn || !panel) return;
      
      btn.setAttribute('aria-expanded', 'false');
      
      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        
        // Закриваємо всі інші акордеони
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
        
        // Відкриваємо/закриваємо поточний акордеон
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          item.classList.add('active');
          
          // Невелика затримка для плавності
          requestAnimationFrame(() => {
            panel.classList.add('open');
            
            // Чекаємо завершення анімації відкриття, потім прокручуємо
            setTimeout(() => {
              const headerHeight = document.querySelector('header')?.offsetHeight || 0;
              
              // Знаходимо позицію відкритого контенту відносно екрану
              const panelRect = panel.getBoundingClientRect();
              const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
              
              // Прокручуємо так, щоб верхній край відкритого контенту був на верхньому краю екрану
              const scrollTarget = currentScrollTop + panelRect.top - headerHeight;
              
              window.scrollTo({
                top: scrollTarget,
                behavior: 'smooth'
              });
            }, 600); // Чекаємо завершення анімації відкриття
          });
          
        } else {
          btn.setAttribute('aria-expanded', 'false');
          item.classList.remove('active');
          panel.classList.remove('open');
        }
      });
      
      // Додаємо hover ефекти
      btn.addEventListener('mouseenter', () => {
        if (btn.getAttribute('aria-expanded') !== 'true') {
          item.style.transform = 'translateY(-2px)';
        }
      });
      
      btn.addEventListener('mouseleave', () => {
        if (btn.getAttribute('aria-expanded') !== 'true') {
          item.style.transform = 'translateY(0)';
        }
      });
    });
  }

  // Викликаємо акордеон після DOMContentLoaded
  if (document.querySelector('.agro-accordion')) {
    initAgroAccordion();
  }
});