/* ============================================================
   NexaWeb Agency — animations.js
   Scroll reveal + animated stats counter
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll Reveal ─────────────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
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

  /* ── Animated Stats Counter ────────────────────────────── */
  const animateCounter = (el) => {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const suffix   = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const step     = target / (duration / 16);
    let current    = 0;

    const update = () => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString() + suffix;
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
});
