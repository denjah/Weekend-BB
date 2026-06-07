// Utility to split text into chars for staggered animation
function splitTextIntoChars(elementOrSelector) {
  const elements = typeof elementOrSelector === 'string' ? document.querySelectorAll(elementOrSelector) : [elementOrSelector];
  elements.forEach(el => {
    if (!el) return;
    const text = el.innerText;
    el.innerHTML = '';
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.innerText = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.className = 'char';
      el.appendChild(span);
    });
  });
}

// Ensure GSAP is loaded
window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Initial animations for the dashboard (if active on load)
  const activePage = document.querySelector('.page-section.active');
  if (activePage) {
    animatePageIn(activePage);
  }

  // Hook hover effects to cards
  initCardHoverEffects();
});

// Main Page Transition Animation
window.navigateTo = function(pageId) {
  const currentActive = document.querySelector('.page-section.active');
  const nextActive = document.getElementById('page-' + pageId);
  if (!nextActive || currentActive === nextActive) return;

  // 1. Fade out current
  if (currentActive) {
    gsap.to(currentActive, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        currentActive.classList.remove('active');
        // Reset state for next time
        gsap.set(currentActive, { clearProps: "all" });
        currentActive.querySelectorAll('.fade-in-up').forEach(el => el.classList.remove('visible'));
        showNextPage(nextActive, pageId);
      }
    });
  } else {
    showNextPage(nextActive, pageId);
  }

  // Update Nav
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navItem = document.querySelector(`.nav-item[data-page="${pageId}"]`);
  if (navItem) navItem.classList.add('active');

  // Handle Submenu
  const logobookSubmenu = document.getElementById('logobookSubmenu');
  if (logobookSubmenu) {
    if (pageId === 'logo-usage') {
      gsap.fromTo(logobookSubmenu, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.4, display: 'block' });
    } else {
      logobookSubmenu.style.display = 'none';
      document.querySelectorAll('.submenu-item').forEach(n => n.classList.remove('active'));
    }
  }

  // Update Breadcrumbs
  const titles = {
    'dashboard': 'Главная',
    'brand-identity': 'Brand Identity',
    'visual-system': 'Visual System',
    'logo-usage': 'Логотип & Logobook',
    'marketing': 'Marketing Assets',
    'corporate': 'Деловая документация',
    'digital': 'Digital Presence',
    'physical': 'Физические носители',
    'resources': 'Ресурсы & Загрузки'
  };
  
  const breadcrumb = document.getElementById('breadcrumbCurrent');
  if (breadcrumb) {
    gsap.to(breadcrumb, {
      opacity: 0, y: -5, duration: 0.15, onComplete: () => {
        breadcrumb.textContent = titles[pageId] || pageId;
        gsap.to(breadcrumb, { opacity: 1, y: 0, duration: 0.2 });
      }
    });
  }

  document.getElementById('appMain').scrollTo({ top: 0, behavior: 'smooth' });
  
  if (typeof initSectionParticles === 'function') {
    initSectionParticles(pageId);
  }
};

function showNextPage(page, pageId) {
  page.classList.add('active');
  animatePageIn(page);
}

function animatePageIn(page) {
  // Setup elements
  const title = page.querySelector('.section-title');
  const desc = page.querySelector('.section-desc');
  const items = page.querySelectorAll('.fade-in-up');

  const tl = gsap.timeline();

  // Reveal main page container
  tl.fromTo(page, 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
  );

  // SplitText effect for titles
  if (title && !title.querySelector('.char')) {
    splitTextIntoChars(title);
  }

  if (title) {
    const chars = title.querySelectorAll('.char');
    if (chars.length) {
      tl.fromTo(chars, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.02, ease: 'back.out(1.5)' },
        "-=0.3"
      );
    } else {
      tl.fromTo(title, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4 }, "-=0.3");
    }
  }

  if (desc) {
    tl.fromTo(desc, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.2");
  }

  // Stagger fade-in-up elements
  if (items.length > 0) {
    tl.fromTo(items, 
      { opacity: 0, y: 40, transition: 'none' },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', onComplete: () => {
        items.forEach(el => el.classList.add('visible')); // keep CSS state sync
      }},
      "-=0.2"
    );
  }
}

function initCardHoverEffects() {
  document.querySelectorAll('.card, .upload-zone').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.08)', duration: 0.4, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.03)', duration: 0.4, ease: 'power2.out' });
    });
  });
}
