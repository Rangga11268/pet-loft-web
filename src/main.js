
// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  initMobileNav();
  initTabs();
  initTestimonialSlider();
  initActiveNavLink();
});

// Mobile Navigation Logic
function initMobileNav() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const menuToggleIcon = menuToggle.querySelector('svg') || menuToggle;
  
  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isActive = navMenu.classList.contains('active');
    
    // Update Lucide Icon dynamically
    if (typeof lucide !== 'undefined') {
      const iconName = isActive ? 'x' : 'menu';
      menuToggle.innerHTML = `<i data-lucide="${iconName}"></i>`;
      lucide.createIcons({
        attrs: {
          class: 'menu-icon'
        },
        nameAttr: 'data-lucide',
        nodeList: [menuToggle]
      });
    }
  });

  // Close menu when clicking link
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      if (typeof lucide !== 'undefined') {
        menuToggle.innerHTML = `<i data-lucide="menu"></i>`;
        lucide.createIcons({
          attrs: {
            class: 'menu-icon'
          },
          nameAttr: 'data-lucide',
          nodeList: [menuToggle]
        });
      }
    });
  });
}

// Tab Switcher for Grooming vs Klinik
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const groomingContent = document.getElementById('grooming-content');
  const klinikContent = document.getElementById('klinik-content');

  if (!tabButtons.length || !groomingContent || !klinikContent) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabTarget = button.getAttribute('data-tab');

      // Update active button class
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Toggle active content
      if (tabTarget === 'grooming') {
        groomingContent.classList.add('active');
        klinikContent.classList.remove('active');
      } else {
        klinikContent.classList.add('active');
        groomingContent.classList.remove('active');
      }
    });
  });
}

// Testimonials Slider
function initTestimonialSlider() {
  const cards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prevTesti');
  const nextBtn = document.getElementById('nextTesti');
  const dots = document.querySelectorAll('.dot');
  
  if (!cards.length || !prevBtn || !nextBtn || !dots.length) return;

  let currentIndex = 0;

  function showSlide(index) {
    // Wrap around boundaries
    if (index >= cards.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = cards.length - 1;
    } else {
      currentIndex = index;
    }

    // Set classes
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  // Prev & Next Buttons
  prevBtn.addEventListener('click', () => {
    showSlide(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    showSlide(currentIndex + 1);
  });

  // Dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });
}

// Update Active Navlink on Scroll
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // offset for navbar
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
      }
    });
  });
}
