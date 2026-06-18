/* ============================================================
   NexaWeb Agency — theme.js
   Dark / Light mode toggle with localStorage persistence
   ============================================================ */

'use strict';


const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.getElementById('themeIcon');
    if (icon) {
        icon.className = theme === 'light'
        ? 'bi bi-moon-fill'
        : 'bi bi-sun-fill';
    }
    localStorage.setItem('nexaTheme', theme);
};

//apply saved theme immediately (before paint to avoid flash)
const savedTheme = localStorage.getItem('nexaTheme') || 'dark';
applyTheme(savedTheme);

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }
});