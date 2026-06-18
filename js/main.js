/* ============================================================
   NexaWeb Agency — main.js
   Features: Dark/Light toggle, Stats counter, Portfolio filter,
             Live search, Contact validation, Scroll reveal
   ============================================================ */

'use strict';

/* ── 1. DARK / LIGHT MODE TOGGLE ─────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeIcon) themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
  localStorage.setItem('nexaTheme', theme);
};

// Load saved theme on every page
const savedTheme = localStorage.getItem('nexaTheme') || 'dark';
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'light' ? 'dark' : 'light');
  });
}

/* ── 2. ANIMATED STATS COUNTER (Intersection Observer) ────── */
const animateCounter = (el) => {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const update = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString() + (el.getAttribute('data-suffix') || '');
    if (current < target) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => statsObserver.observe(el));

/* ── 3. SCROLL REVEAL ─────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children if parent has data-stagger
      if (entry.target.dataset.stagger) {
        entry.target.querySelectorAll('.reveal').forEach((child, idx) => {
          setTimeout(() => child.classList.add('visible'), idx * 100);
        });
      } else {
        entry.target.classList.add('visible');
      }
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
document.querySelectorAll('[data-stagger]').forEach(el => revealObserver.observe(el));

/* ── 4. PORTFOLIO / SERVICE FILTER ───────────────────────── */
const filterBtns  = document.querySelectorAll('.filter-btn');
const filterItems = document.querySelectorAll('[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.getAttribute('data-filter');
    filterItems.forEach(item => {
      const match = cat === 'all' || item.getAttribute('data-category') === cat;
      item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      if (match) {
        item.style.opacity = '0';
        item.classList.remove('hidden');
        setTimeout(() => { item.style.opacity = '1'; }, 50);
      } else {
        item.style.opacity = '0';
        setTimeout(() => { item.classList.add('hidden'); }, 300);
      }
    });
  });
});

/* ── 5. LIVE SEARCH ───────────────────────────────────────── */
const searchInput = document.getElementById('liveSearch');
if (searchInput) {
  const searchables = document.querySelectorAll('[data-searchable]');
  const noResults   = document.getElementById('noResults');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    let visible = 0;

    searchables.forEach(item => {
      const text = item.getAttribute('data-searchable').toLowerCase();
      const match = !query || text.includes(query);
      item.style.display = match ? '' : 'none';
      if (match) visible++;
    });

    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
  });
}

/* ── 6. CONTACT FORM VALIDATION ───────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const showFeedback = (fieldId, msg, type) => {
    const field = document.getElementById(fieldId);
    const fb    = document.getElementById(fieldId + 'Feedback');
    if (!field || !fb) return;
    field.classList.toggle('is-invalid', type === 'error');
    field.classList.toggle('is-valid',   type === 'success');
    fb.textContent = msg;
    fb.className   = `form-feedback ${type}`;
  };

  const validateField = (id) => {
    const el = document.getElementById(id);
    if (!el) return true;
    const val = el.value.trim();

    if (id === 'contactEmail') {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!val) { showFeedback(id, 'Email is required.', 'error'); return false; }
      if (!emailRe.test(val)) { showFeedback(id, 'Enter a valid email address.', 'error'); return false; }
      showFeedback(id, 'Looks good!', 'success'); return true;
    }
    if (id === 'contactMessage') {
      if (val.length < 20) { showFeedback(id, 'Message must be at least 20 characters.', 'error'); return false; }
      showFeedback(id, 'Great message!', 'success'); return true;
    }
    if (!val) { showFeedback(id, 'This field is required.', 'error'); return false; }
    showFeedback(id, '', 'success'); return true;
  };

  ['contactName','contactEmail','contactService','contactMessage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('blur', () => validateField(id));
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = ['contactName','contactEmail','contactService','contactMessage'];
    const allValid = fields.every(id => validateField(id));

    if (allValid) {
      showToast('✅ Message sent! We will  get back to you within 24 hours.');
      contactForm.reset();
      fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.classList.remove('is-valid','is-invalid'); }
      });
    } else {
      // Scroll to first error
      const firstError = contactForm.querySelector('.is-invalid');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

/* ── 7. TOAST NOTIFICATION ────────────────────────────────── */
const showToast = (msg, duration = 4000) => {
  let toast = document.getElementById('nexaToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'nexaToast';
    toast.className = 'nexa-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
};

/* ── 8. NAVBAR ACTIVE LINK ────────────────────────────────── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nexa-navbar .nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ── 9. SMOOTH SCROLL FOR ANCHOR LINKS ───────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── 10. NAVBAR SCROLL SHADOW ─────────────────────────────── */
const navbar = document.querySelector('.nexa-navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 20
      ? '0 4px 30px rgba(0,0,0,0.3)'
      : 'none';
  }, { passive: true });
}
