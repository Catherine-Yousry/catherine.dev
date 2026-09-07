// Force Page Reset on Refresh
if ('scrollRestoration' in history) {
  // history.scrollRestoration = 'manual';
  history.scrollRestoration = 'auto';
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});



// Dark / Light Mode Toggle (default: light)
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (themeIcon) {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }
  localStorage.setItem('theme', theme);
  // setTheme('light');
}

// Light mode is the default; only switch to dark if the user chose it before.
const savedTheme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
setTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  });
}

// Mobile Menu Navigation Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Project Filter Setup - No Empty Grid Gaps
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach((card) => {
      const categories = card.getAttribute('data-category') ? card.getAttribute('data-category').split(' ') : [];
      if (filter === 'all' || categories.includes(filter)) {
        card.classList.remove('is-hidden');
      } else {
        card.classList.add('is-hidden');
      }
    });
  });
});

// Carousel Controls for Featured Case Study
const carouselTrack = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (carouselTrack && slides.length > 1 && prevBtn && nextBtn) {
  let currentSlide = 0;

  function updateCarousel(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel(currentSlide);
  });

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel(currentSlide);
  });
}

// Lightbox Modal Mechanism
const modal = document.getElementById('lightbox-modal');
const modalImg = document.getElementById('lightbox-img');
const modalCaption = document.getElementById('lightbox-caption');
const modalClose = document.getElementById('lightbox-close');

function openLightbox(src, caption) {
  if (!modal || !modalImg) return;
  modalImg.src = src;
  modalImg.alt = caption || 'Dashboard High Resolution Preview';
  if (modalCaption) modalCaption.textContent = caption || '';
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.lightbox-trigger').forEach((img) => {
  img.addEventListener('click', () => {
    const src = img.getAttribute('src');
    const caption = img.getAttribute('data-caption') || img.getAttribute('alt');
    openLightbox(src, caption);
  });
});

if (modalClose) {
  modalClose.addEventListener('click', closeLightbox);
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeLightbox();
  }
});

// Canvas Particle Motion Background
const canvas = document.getElementById('bg-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 35 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2 + 1,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(2, 132, 199, 0.25)';

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

