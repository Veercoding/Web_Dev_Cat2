/* ============================================================
   NexaWeb Agency — theme.js
   Dark / Light mode toggle with localStorage persistence
   ============================================================ */

'use strict';

// Apply theme immediately to avoid flash
const savedTheme = localStorage.getItem('nexaTheme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

document.addEventListener('DOMContentLoaded', () => {
  const btn  = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');

  // Set correct icon on load
  if (icon) {
    icon.className = savedTheme === 'light' 
      ? 'bi bi-moon-fill' 
      : 'bi bi-sun-fill';
  }

  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const newTheme = current === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('nexaTheme', newTheme);
      
      if (icon) {
        icon.className = newTheme === 'light' 
          ? 'bi bi-moon-fill' 
          : 'bi bi-sun-fill';
      }
    });
  }
});