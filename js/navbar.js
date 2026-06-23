/* ============================================================
   NexaWeb Agency — navbar.js
   Active link detection + scroll shadow
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nexa-navbar .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Navbar scroll shadow
  const navbar = document.querySelector('.nexa-navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 20
        ? '0 4px 30px rgba(0,0,0,0.3)'
        : 'none';
    }, { passive: true });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Back to top button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


/* --- Bootstrap tooltips --- */
const tooltipsEls = document.querySelectorAll('[data-bs-toggle="tooltip"]');
tooltipsEls.forEach(el => new bootstrap.Tooltip(el));
});