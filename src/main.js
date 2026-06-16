
// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  initMobileNav();
  initTabs();
  initTestimonialSlider();
  initActiveNavLink();
  initBranchSelector();
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

// Branch Selection Logic
function initBranchSelector() {
  const branchButtons = document.querySelectorAll('.branch-btn');
  
  if (!branchButtons.length) return;
  
  // Data for each branch
  const branchData = {
    bekasi: {
      waNumber: '6281380805836',
      shopeeUrl: 'https://id.shp.ee/xCLsRjJ',
      tokopediaUrl: 'https://www.tokopedia.com/petloftpetshopcare',
      mapIframeUrl: 'https://maps.google.com/maps?q=-6.2215854060046265,107.01373963996512&z=17&output=embed',
      mapDirectUrl: 'https://maps.google.com/maps?q=-6.2215854060046265,107.01373963996512',
      heroDesc: 'Dari PetLoft Grooming profesional hingga penginapan anjing & kucing yang nyaman ber-AC, serta layanan VetLoft Clinic terpercaya di kawasan elite Ruko Burgundy Summarecon Bekasi.',
      contactTitle: 'Kunjungi Workshop Kami di Summarecon',
      addressText: 'Ruko Burgundy Blok RAL 25, Summarecon Bekasi, Harapan Baru, Kec. Bekasi Utara, Kota Bekasi, Jawa Barat 17123',
      phoneText: '+62 813-8080-5836',
      footerDesc: 'Penyedia jasa perawatan hewan peliharaan premium terpercaya di Bekasi Utara. Kami mengutamakan kenyamanan, kebersihan, dan keselamatan hewan kesayangan Anda.',
      copyrightText: '&copy; 2026 PetLoft Summarecon Bekasi. All Rights Reserved.'
    },
    gading: {
      waNumber: '6281380805839',
      shopeeUrl: 'https://id.shp.ee/C16g1ho',
      tokopediaUrl: 'https://www.tokopedia.com/petloft-klpgading',
      mapIframeUrl: 'https://maps.google.com/maps?q=Kelapa+Gading+Boulevard,+Jakarta+Utara&z=15&output=embed',
      mapDirectUrl: 'https://maps.google.com/maps?q=Kelapa+Gading+Boulevard,+Jakarta+Utara',
      heroDesc: 'Dari PetLoft Grooming profesional hingga penginapan anjing & kucing yang nyaman ber-AC, serta layanan VetLoft Clinic terpercaya di kawasan strategis Kelapa Gading, Jakarta Utara.',
      contactTitle: 'Kunjungi Workshop Kami di Kelapa Gading',
      addressText: 'Jl. Boulevard Raya, Kelapa Gading, Jakarta Utara, DKI Jakarta 14240',
      phoneText: '+62 813-8080-5839',
      footerDesc: 'Penyedia jasa perawatan hewan peliharaan premium terpercaya di Kelapa Gading. Kami mengutamakan kenyamanan, kebersihan, dan keselamatan hewan kesayangan Anda.',
      copyrightText: '&copy; 2026 PetLoft Kelapa Gading. All Rights Reserved.'
    }
  };

  const setBranch = (branch) => {
    const data = branchData[branch];
    if (!data) return;

    // Update active class on all selector buttons
    branchButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-branch') === branch);
    });

    // Update text elements
    const heroDesc = document.getElementById('hero-desc-text');
    if (heroDesc) heroDesc.textContent = data.heroDesc;

    const contactTitle = document.getElementById('contact-section-title');
    if (contactTitle) contactTitle.textContent = data.contactTitle;

    const contactAddress = document.getElementById('contact-address-text');
    if (contactAddress) contactAddress.textContent = data.addressText;

    const contactPhone = document.getElementById('contact-phone-text');
    if (contactPhone) contactPhone.textContent = data.phoneText;

    const footerDesc = document.getElementById('footer-desc-text');
    if (footerDesc) footerDesc.textContent = data.footerDesc;

    const footerCopyright = document.getElementById('footer-copyright-text');
    if (footerCopyright) footerCopyright.innerHTML = data.copyrightText;

    // Update Maps Iframe
    const mapIframe = document.getElementById('contact-map-iframe');
    if (mapIframe) mapIframe.setAttribute('src', data.mapIframeUrl);

    // Update WhatsApp links
    const waLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
    waLinks.forEach(link => {
      let href = link.getAttribute('href');
      // Replace phone numbers (retains query parameters & message string)
      href = href.replace(/wa\.me\/(6281388881316|6281380805836|6281380805839)/, `wa.me/${data.waNumber}`);
      link.setAttribute('href', href);
    });

    // Update Shopee card
    const shopeeCard = document.getElementById('hub-shopee');
    if (shopeeCard) shopeeCard.setAttribute('href', data.shopeeUrl);

    // Update Tokopedia card
    const tokopediaCard = document.getElementById('hub-tokopedia');
    if (tokopediaCard) tokopediaCard.setAttribute('href', data.tokopediaUrl);

    // Update Maps card
    const mapsCard = document.getElementById('hub-maps');
    if (mapsCard) mapsCard.setAttribute('href', data.mapDirectUrl);

    // Store preference
    localStorage.setItem('selectedBranch', branch);
  };

  // Add click listeners to all buttons
  branchButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const branch = btn.getAttribute('data-branch');
      setBranch(branch);
    });
  });

  // Load saved preference or default to bekasi
  const savedBranch = localStorage.getItem('selectedBranch') || 'bekasi';
  setBranch(savedBranch);
}
